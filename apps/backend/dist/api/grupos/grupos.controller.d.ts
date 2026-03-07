import { GruposService } from './grupos.service';
export declare class GruposController {
    private readonly gruposService;
    constructor(gruposService: GruposService);
    criarGrupo(body: {
        nome: string;
        permissoes: any;
    }): Promise<import("./grupo.entity").Grupo>;
    listar(): Promise<import("./grupo.entity").Grupo[]>;
    buscar(id: string): Promise<import("./grupo.entity").Grupo>;
}
