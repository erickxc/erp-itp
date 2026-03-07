export declare enum Prioridade {
    ALTA = "Alta",
    MEDIA = "M\u00E9dia",
    BAIXA = "Baixa"
}
export declare class Materia {
    id: string;
    nome: string;
    conceito: string;
    sigla: string;
    prioridade: Prioridade;
    periodo: string;
    cargaHorariaEmenta: number;
    professor: string;
    status: string;
    media: number;
    acertos: number;
    totalQuestoes: number;
    progresso: number;
    createdAt: Date;
    updatedAt: Date;
}
