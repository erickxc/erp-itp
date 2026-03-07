import { AuthService } from './auth.service';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService);
    login(body: any, res: Response): Promise<{
        usuario: {
            id: string;
            nome: string;
            email: string;
            role: string;
            fotoUrl: string;
            grupo: import("../grupos/grupo.entity").Grupo;
            createdAt: Date;
            updatedAt: Date;
        };
        message: string;
    }>;
    logout(res: Response): Promise<{
        message: string;
    }>;
}
