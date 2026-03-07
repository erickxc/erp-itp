import { MateriasService } from './materias.service';
import { Materia } from '../materia.entity';
export declare class MateriasController {
    private readonly materiasService;
    constructor(materiasService: MateriasService);
    create(dados: Partial<Materia>): Promise<Materia>;
    findAll(): Promise<Materia[]>;
    findOne(id: string): Promise<Materia>;
    updateProgress(id: string, progresso: number): Promise<Materia>;
    remove(id: string): Promise<void>;
}
