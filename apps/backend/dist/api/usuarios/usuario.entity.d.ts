import { Grupo } from '../grupos/grupo.entity';
export declare class Usuario {
    id: string;
    nome: string;
    email: string;
    password: string;
    role: string;
    fotoUrl: string;
    grupo: Grupo;
    createdAt: Date;
    updatedAt: Date;
}
