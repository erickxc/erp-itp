import { Repository } from 'typeorm';
import { Materia } from '../materia.entity';
export declare class MateriasService {
    private readonly materiaRepository;
    constructor(materiaRepository: Repository<Materia>);
    create(dados: Partial<Materia>): Promise<Materia>;
    findAll(): Promise<Materia[]>;
    findOne(id: string): Promise<Materia>;
    updateProgress(id: string, novoProgresso: number): Promise<Materia>;
    remove(id: string): Promise<void>;
}
