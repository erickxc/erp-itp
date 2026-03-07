import { Repository } from 'typeorm';
import { Grupo } from './grupo.entity';
export declare class GruposService {
    private readonly grupoRepository;
    constructor(grupoRepository: Repository<Grupo>);
    criar(nome: string, permissoes: any): Promise<Grupo>;
    listarTodos(): Promise<Grupo[]>;
    buscarPorId(id: string): Promise<Grupo>;
}
