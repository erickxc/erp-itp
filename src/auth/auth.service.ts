import { Injectable, ConflictException, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly jwtService: JwtService,
  ) {}

  async registrar(dados: any) {
    const { email, password, senha, nome, role } = dados;
    const pass = password || senha; // Suporte para os dois nomes de campo

    if (!email || !pass) {
      throw new ConflictException('Dados insuficientes para registro.');
    }

    const emailNormalizado = email.toLowerCase().trim();

    const usuarioExistente = await this.usuarioRepository.findOneBy({ email: emailNormalizado });
    if (usuarioExistente) {
      throw new ConflictException('Este e-mail já está cadastrado.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    const novoUsuario = this.usuarioRepository.create({
      nome,
      email: emailNormalizado,
      password: hashedPassword,
      role: role || 'assistente',
    });

    const salvo = await this.usuarioRepository.save(novoUsuario);

    // Retorno seguro (Removendo password de forma idiomática)
    const { password: _, ...usuarioExibicao } = salvo;
    
    return usuarioExibicao;
  }
  
  async login(email: string, pass: string) {
    if (!email || !pass) {
      throw new UnauthorizedException('Credenciais incompletas.');
    }

    this.logger.log(`Tentativa de login: ${email.toLowerCase().trim()}`);

    // QueryBuilder para contornar o { select: false } da Entity
    const usuario = await this.usuarioRepository.createQueryBuilder('user')
      .addSelect('user.password')
      .where('LOWER(user.email) = LOWER(:email)', { email: email.trim() })
      .getOne();

    if (!usuario) {
      this.logger.warn(`Usuário não encontrado: ${email}`);
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const isPasswordMatching = await bcrypt.compare(pass, usuario.password);

    if (!isPasswordMatching) {
      this.logger.warn(`Senha incorreta: ${email}`);
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const payload = { 
      sub: usuario.id, 
      email: usuario.email, 
      role: usuario.role 
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: { 
        id: usuario.id, 
        nome: usuario.nome, 
        role: usuario.role 
      },
    };
  }
}