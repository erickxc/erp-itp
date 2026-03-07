import { Usuario } from '../usuarios/usuario.entity';
export declare class Aluno {
    id: string;
    matricula: string;
    nome: string;
    email: string;
    cpf: string;
    data_nascimento: string;
    ativo: boolean;
    usuario: Usuario;
    createdAt: Date;
    updatedAt: Date;
}
