"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MatriculasService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatriculasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const inscricao_entity_1 = require("./inscricao.entity");
const aluno_entity_1 = require("../alunos/aluno.entity");
let MatriculasService = MatriculasService_1 = class MatriculasService {
    constructor(inscricaoRepository, dataSource) {
        this.inscricaoRepository = inscricaoRepository;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(MatriculasService_1.name);
    }
    async listarTodas() {
        try {
            return await this.inscricaoRepository.find({
                relations: { aluno: true },
                order: { createdAt: 'DESC' },
            });
        }
        catch (error) {
            this.logger.error(`❌ Erro ao listar matrículas: ${error.message}`);
            throw new common_1.BadRequestException('Não foi possível carregar a lista de matrículas.');
        }
    }
    async marcarComoAguardandoLGPD(id) {
        const inscricao = await this.inscricaoRepository.findOneBy({ id });
        if (!inscricao)
            throw new common_1.NotFoundException('Inscrição não encontrada.');
        inscricao.status_matricula = inscricao_entity_1.StatusMatricula.AGUARDANDO_LGPD;
        this.logger.log(`📧 Termo LGPD disparado para: ${inscricao.nome_completo}`);
        return (await this.inscricaoRepository.save(inscricao));
    }
    async confirmarAssinaturaLGPD(id) {
        const inscricao = await this.inscricaoRepository.findOneBy({ id });
        if (!inscricao)
            throw new common_1.NotFoundException('Inscrição não encontrada.');
        if (inscricao.lgpd_aceito)
            return inscricao;
        inscricao.status_matricula = inscricao_entity_1.StatusMatricula.EM_VALIDACAO;
        inscricao.lgpd_aceito = true;
        inscricao.data_assinatura_lgpd = new Date();
        this.logger.log(`✅ Assinatura LGPD confirmada: ${inscricao.nome_completo}`);
        return (await this.inscricaoRepository.save(inscricao));
    }
    async confirmarAssinaturaPorCpf(cpf) {
        const cpfLimpo = cpf.replace(/\D/g, '');
        const inscricao = await this.inscricaoRepository.findOneBy({ cpf: cpfLimpo });
        if (!inscricao)
            throw new common_1.NotFoundException('CPF não localizado na base de inscritos.');
        return this.confirmarAssinaturaLGPD(inscricao.id);
    }
    async receberInscricao(dados) {
        const cpfLimpo = String(dados.cpf).replace(/\D/g, '');
        const existente = await this.inscricaoRepository.findOneBy({ cpf: cpfLimpo });
        if (existente)
            throw new common_1.BadRequestException('Este CPF já possui uma inscrição ativa.');
        const novaInscricao = this.inscricaoRepository.create({
            ...dados,
            cpf: cpfLimpo,
            status_matricula: inscricao_entity_1.StatusMatricula.PENDENTE
        });
        const salva = (await this.inscricaoRepository.save(novaInscricao));
        this.logger.log(`📥 Nova inscrição recebida: ${salva.nome_completo} (ID: ${salva.id})`);
        return salva;
    }
    async atualizarStatus(id, novoStatus, motivo) {
        const inscricao = await this.inscricaoRepository.findOneBy({ id });
        if (!inscricao)
            throw new common_1.NotFoundException(`Inscrição ID ${id} não encontrada.`);
        if (novoStatus === inscricao_entity_1.StatusMatricula.MATRICULADO) {
            return await this.finalizarMatricula(id);
        }
        inscricao.status_matricula = novoStatus;
        if (motivo)
            inscricao.motivo_status = motivo;
        return (await this.inscricaoRepository.save(inscricao));
    }
    async finalizarMatricula(inscricaoId, cursosSelecionados) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const inscricao = await queryRunner.manager.findOne(inscricao_entity_1.Inscricao, {
                where: { id: inscricaoId },
                lock: { mode: 'pessimistic_write' }
            });
            if (!inscricao)
                throw new common_1.NotFoundException('Inscrição não encontrada.');
            if (inscricao.status_matricula === inscricao_entity_1.StatusMatricula.MATRICULADO) {
                throw new common_1.BadRequestException('Candidato já possui matrícula ativa.');
            }
            if (cursosSelecionados && cursosSelecionados.length > 0) {
                inscricao.cursos_desejados = cursosSelecionados.join(', ');
            }
            const matriculaGerada = `ITP-${new Date().getFullYear()}-${inscricao.cpf?.substring(0, 4)}`;
            const novoAluno = queryRunner.manager.create(aluno_entity_1.Aluno, {
                nome: inscricao.nome_completo,
                email: inscricao.email,
                cpf: inscricao.cpf,
                data_nascimento: inscricao.data_nascimento,
                matricula: matriculaGerada,
                ativo: true
            });
            const alunoSalvo = await queryRunner.manager.save(novoAluno);
            inscricao.status_matricula = inscricao_entity_1.StatusMatricula.MATRICULADO;
            inscricao.aluno = alunoSalvo;
            await queryRunner.manager.save(inscricao_entity_1.Inscricao, inscricao);
            await queryRunner.commitTransaction();
            this.logger.log(`🎉 Matrícula efetivada: ${alunoSalvo.matricula} - ${alunoSalvo.nome}`);
            return alunoSalvo;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            this.logger.error(`💥 Falha na transação de matrícula: ${err.message}`);
            throw new common_1.BadRequestException(err.message || 'Erro interno ao processar matrícula.');
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.MatriculasService = MatriculasService;
exports.MatriculasService = MatriculasService = MatriculasService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inscricao_entity_1.Inscricao)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], MatriculasService);
//# sourceMappingURL=matriculas.service.js.map