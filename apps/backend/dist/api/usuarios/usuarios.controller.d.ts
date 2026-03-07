import { AuthService } from '../auth/auth.service';
export declare class UsuariosController {
    private readonly authService;
    constructor(authService: AuthService);
    updateProfile(data: {
        nome: string;
        email: string;
    }, file: any, req: any): Promise<{
        id: string;
        nome: string;
        email: string;
        role: string;
        fotoUrl: string;
        grupo: import("../grupos/grupo.entity").Grupo;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
