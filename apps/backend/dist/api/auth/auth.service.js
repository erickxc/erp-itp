"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const usuario_entity_1 = require("../usuarios/usuario.entity");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = AuthService_1 = class AuthService {
    constructor(usuarioRepository, jwtService) {
        this.usuarioRepository = usuarioRepository;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async registrar(dados) {
        const { email, password, senha, nome } = dados;
        const pass = password || senha;
        if (!email || !pass) {
            throw new common_1.ConflictException('E-mail e senha são obrigatórios.');
        }
        const emailNormalizado = email.toLowerCase().trim();
        const existe = await this.usuarioRepository.findOneBy({ email: emailNormalizado });
        if (existe) {
            throw new common_1.ConflictException('E-mail já registrado no Instituto.');
        }
        const hashedPassword = await bcrypt.hash(pass, 10);
        const usuario = this.usuarioRepository.create({
            nome,
            email: emailNormalizado,
            password: hashedPassword,
            role: 'assist',
        });
        const salvo = await this.usuarioRepository.save(usuario);
        this.logger.log(`Novo usuário registrado: ${emailNormalizado}`);
        return {
            id: salvo.id,
            nome: salvo.nome,
            email: salvo.email,
            role: salvo.role,
        };
    }
    async login(email, pass) {
        if (!email || !pass || email.trim() === '' || pass.trim() === '') {
            throw new common_1.UnauthorizedException('E-mail e senha devem ser preenchidos.');
        }
        const usuario = await this.usuarioRepository.createQueryBuilder('user')
            .addSelect('user.password')
            .leftJoinAndSelect('user.grupo', 'grupo')
            .where('LOWER(user.email) = LOWER(:email)', { email: email.trim() })
            .getOne();
        if (!usuario) {
            this.logger.warn(`Tentativa de login falhou: Usuário ${email} não existe.`);
            throw new common_1.UnauthorizedException('Credenciais incorretas.');
        }
        if (!usuario.password) {
            this.logger.error(`❌ Usuário ${email} está sem senha definida no banco de dados!`);
            throw new common_1.UnauthorizedException('Problema na conta de acesso. Contate o administrador.');
        }
        try {
            const isPasswordValid = await bcrypt.compare(pass, usuario.password);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('Credenciais incorretas.');
            }
            const roleLimpa = String(usuario.role || 'assist')
                .toLowerCase()
                .trim()
                .replace(/^aadmin$/, 'admin');
            const payload = {
                sub: usuario.id,
                email: usuario.email,
                role: roleLimpa,
                grupo: usuario.grupo?.nome || 'SEM_GRUPO',
                permissoes: usuario.grupo?.grupo_permissoes || {}
            };
            const { password, ...usuarioSemSenha } = usuario;
            usuarioSemSenha.role = roleLimpa;
            this.logger.log(`✅ Login realizado: ${email} [Cargo: ${roleLimpa}]`);
            return {
                access_token: await this.jwtService.signAsync(payload),
                usuario: usuarioSemSenha
            };
        }
        catch (err) {
            this.logger.error(`💥 Erro interno no processo de login: ${err.message}`);
            throw new common_1.UnauthorizedException('Erro ao validar credenciais.');
        }
    }
    async updateProfile(email, data) {
        const usuario = await this.usuarioRepository.findOne({
            where: { email: email.toLowerCase().trim() },
            relations: ['grupo'],
        });
        if (!usuario) {
            throw new common_1.NotFoundException('Usuário não encontrado.');
        }
        if (data.nome)
            usuario.nome = data.nome;
        if (data.fotoUrl)
            usuario.fotoUrl = data.fotoUrl;
        await this.usuarioRepository.save(usuario);
        this.logger.log(`Perfil atualizado: ${email}`);
        const { password, ...usuarioSemSenha } = usuario;
        return usuarioSemSenha;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map