import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Inscricao, StatusMatricula } from './inscricao.entity';
import { Aluno } from '../alunos/aluno.entity';

@Injectable()
export class MatriculasService {
  private readonly logger = new Logger(MatriculasService.name);

  constructor(
    @InjectRepository(Inscricao)
    private readonly inscricaoRepository: Repository<Inscricao>,
    private readonly dataSource: DataSource,
  ) {}

  async listarTodas(): Promise<Inscricao[]> {
    return await this.inscricaoRepository.find({ order: { createdAt: 'DESC' } });
  }

  /**
   * FASE 1 -> 2: DISPARO MANUAL DO TERMO LGPD
   */
  async marcarComoAguardandoLGPD(id: number): Promise<Inscricao> {
    const inscricao = await this.inscricaoRepository.findOneBy({ id });
    if (!inscricao) throw new NotFoundException('Inscrição não encontrada.');

    this.logger.log(`📧 Termo LGPD enviado para ID ${id} (${inscricao.nome_completo})`);

    inscricao.status_matricula = StatusMatricula.AGUARDANDO_LGPD;
    
    // O TypeORM retorna o objeto salvo. Usamos unknown para evitar conflito de inferência.
    return (await this.inscricaoRepository.save(inscricao)) as unknown as Inscricao;
  }

  /**
   * FASE 2 -> 3: CONFIRMAÇÃO DE ASSINATURA
   */
  async confirmarAssinaturaLGPD(id: number): Promise<Inscricao> {
    const inscricao = await this.inscricaoRepository.findOneBy({ id });
    if (!inscricao) throw new NotFoundException('Inscrição não encontrada.');

    this.logger.log(`✅ LGPD Confirmado para ID ${id}. Movendo para FASE 3 (Em Validação).`);

    inscricao.status_matricula = StatusMatricula.EM_VALIDACAO;
    inscricao.lgpd_aceito = true;
    inscricao.data_assinatura_lgpd = new Date();

    return (await this.inscricaoRepository.save(inscricao)) as unknown as Inscricao;
  }

  /**
   * RECURSO ADICIONAL: Buscar por CPF para o Gatilho do Google Forms
   */
  async confirmarAssinaturaPorCpf(cpf: string): Promise<Inscricao> {
    const cpfLimpo = cpf.replace(/\D/g, '');
    const inscricao = await this.inscricaoRepository.findOneBy({ cpf: cpfLimpo });
    if (!inscricao) throw new NotFoundException('CPF não encontrado nas inscrições.');
    
    return this.confirmarAssinaturaLGPD(inscricao.id);
  }

  async receberInscricao(dados: any): Promise<Inscricao> {
    this.logger.log(`📥 Recebendo inscrição via Form: CPF ${dados.cpf}`);
    
    if (dados.id) delete dados.id;

    const existente = await this.inscricaoRepository.findOneBy({ cpf: dados.cpf });
    if (existente) throw new BadRequestException('Este CPF já possui uma inscrição.');

    const novaInscricao = this.inscricaoRepository.create({
      ...dados,
      status_matricula: StatusMatricula.PENDENTE
    });

    // ✅ SOLUÇÃO DO ERRO TS2352: Double casting (as unknown as Inscricao)
    // Isso diz ao TS: "Eu sei o que estou fazendo, trate o retorno como Inscricao"
    const salva = (await this.inscricaoRepository.save(novaInscricao)) as unknown as Inscricao;
    
    this.logger.log(`✅ Inscrição criada ID ${salva.id}`);
    return salva;
  }
  
  async atualizarStatus(id: number, novoStatus: StatusMatricula, motivo?: string): Promise<Inscricao | Aluno> {
    const inscricao = await this.inscricaoRepository.findOneBy({ id });
    if (!inscricao) throw new NotFoundException(`Inscrição ID ${id} não encontrada.`);

    this.logger.warn(`🔔 MUDANÇA MANUAL: [${inscricao.status_matricula}] ➡️ [${novoStatus}]`);

    if (novoStatus === StatusMatricula.MATRICULADO) {
      return await this.finalizarMatricula(id);
    }

    inscricao.status_matricula = novoStatus;
    if (motivo) inscricao.motivo_status = motivo;
    
    return (await this.inscricaoRepository.save(inscricao)) as unknown as Inscricao;
  }

  /**
   * FASE 3 -> 4: EFETIVAÇÃO DE MATRÍCULA
   */
  async finalizarMatricula(inscricaoId: number, cursosSelecionados?: string[]): Promise<Aluno> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const inscricao = await queryRunner.manager.findOne(Inscricao, { where: { id: inscricaoId } });
      if (!inscricao) throw new NotFoundException('Inscrição não encontrada.');

      if (cursosSelecionados && cursosSelecionados.length > 0) {
        inscricao.cursos_desejados = cursosSelecionados.join(', ');
      }

      const matriculaGerada = `ITP-${new Date().getFullYear()}-${inscricao.cpf?.replace(/\D/g, '').substring(0, 4) || '0000'}`;

      const novoAluno = queryRunner.manager.create(Aluno, {
        nome: inscricao.nome_completo,
        email: inscricao.email,
        cpf: inscricao.cpf,
        data_nascimento: inscricao.data_nascimento,
        matricula: matriculaGerada,
        ativo: true
      });

      const alunoSalvo = await queryRunner.manager.save(novoAluno);
      
      inscricao.status_matricula = StatusMatricula.MATRICULADO;
      await queryRunner.manager.save(Inscricao, inscricao);

      await queryRunner.commitTransaction();
      
      this.logger.log(`🎉 Aluno ${alunoSalvo.nome} matriculado com sucesso!`);
      return alunoSalvo;
    } catch (err: any) { 
      await queryRunner.rollbackTransaction();
      const errorMsg = err?.message || 'Erro desconhecido na efetivação';
      this.logger.error(`💥 Erro na efetivação: ${errorMsg}`);
      throw new BadRequestException(`Erro: ${errorMsg}`);
    } finally {
      await queryRunner.release();
    }
  }
}