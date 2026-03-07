import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usuarioRepository;
    private readonly jwtService;
    private readonly logger;
    constructor(usuarioRepository: Repository<Usuario>, jwtService: JwtService);
    registrar(dados: any): Promise<{
        id: string;
        nome: string;
        email: string;
        role: string;
    }>;
    login(email: string, pass: string): Promise<{
        access_token: string;
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
    }>;
    updateProfile(email: string, data: {
        nome?: string;
        fotoUrl?: string;
    }): Promise<{
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
