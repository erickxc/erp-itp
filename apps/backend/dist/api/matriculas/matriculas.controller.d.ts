import { MatriculasService } from './matriculas.service';
import { StatusMatricula } from './inscricao.entity';
export declare class MatriculasController {
    private readonly matriculasService;
    constructor(matriculasService: MatriculasService);
    listarInscricoes(): Promise<import("./inscricao.entity").Inscricao[]>;
    receberInscricao(dados: any): Promise<import("./inscricao.entity").Inscricao>;
    enviarLGPD(id: number): Promise<import("./inscricao.entity").Inscricao>;
    confirmarLGPD(id: number): Promise<import("./inscricao.entity").Inscricao>;
    finalizarMatricula(id: number, body: {
        cursos?: string[];
    }): Promise<import("../alunos/aluno.entity").Aluno>;
    atualizarStatus(id: number, body: {
        status: StatusMatricula;
        motivo?: string;
    }): Promise<import("../alunos/aluno.entity").Aluno | import("./inscricao.entity").Inscricao>;
}
