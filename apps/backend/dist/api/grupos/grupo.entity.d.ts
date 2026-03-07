import { Usuario } from '../usuarios/usuario.entity';
export declare class Grupo {
    id: string;
    nome: string;
    grupo_permissoes: any;
    usuarios: Usuario[];
    createdAt: Date;
    updatedAt: Date;
}
