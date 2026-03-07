import { Repository, DataSource } from 'typeorm';
import { Inscricao, StatusMatricula } from './inscricao.entity';
import { Aluno } from '../alunos/aluno.entity';
export declare class MatriculasService {
    private readonly inscricaoRepository;
    private readonly dataSource;
    private readonly logger;
    constructor(inscricaoRepository: Repository<Inscricao>, dataSource: DataSource);
    listarTodas(): Promise<Inscricao[]>;
    marcarComoAguardandoLGPD(id: number): Promise<Inscricao>;
    confirmarAssinaturaLGPD(id: number): Promise<Inscricao>;
    confirmarAssinaturaPorCpf(cpf: string): Promise<Inscricao>;
    receberInscricao(dados: any): Promise<Inscricao>;
    atualizarStatus(id: number, novoStatus: StatusMatricula, motivo?: string): Promise<Inscricao | Aluno>;
    finalizarMatricula(inscricaoId: number, cursosSelecionados?: string[]): Promise<Aluno>;
}
