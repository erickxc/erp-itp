import { Aluno } from '../alunos/aluno.entity';
export declare enum StatusMatricula {
    PENDENTE = "Pendente",
    INCOMPLETO = "Incompleto",
    AGUARDANDO_LGPD = "Aguardando Assinatura LGPD",
    EM_VALIDACAO = "Em Valida\u00E7\u00E3o",
    MATRICULADO = "Matriculado",
    DESISTENTE = "Desistente",
    CANCELADA = "Cancelada"
}
export declare class Inscricao {
    id: number;
    nome_completo: string;
    cpf: string;
    email: string;
    celular: string;
    data_nascimento: string;
    idade: number;
    sexo: string;
    escolaridade: string;
    turno_escolar: string;
    logradouro: string;
    numero: string;
    complemento: string;
    cidade: string;
    bairro: string;
    estado_uf: string;
    cep: string;
    maior_18_anos: boolean;
    nome_responsavel: string;
    grau_parentesco: string;
    cpf_responsavel: string;
    telefone_alternativo: string;
    possui_alergias: string;
    cuidado_especial: string;
    detalhes_cuidado: string;
    uso_medicamento: string;
    cursos_desejados: string;
    autoriza_imagem: boolean;
    nome_assinatura_imagem: string;
    lgpd_aceito: boolean;
    data_assinatura_lgpd: Date;
    status_matricula: string;
    motivo_status: string;
    url_documentos_zip: string;
    url_termo_lgpd: string;
    aluno: Aluno;
    createdAt: Date;
    updatedAt: Date;
}
