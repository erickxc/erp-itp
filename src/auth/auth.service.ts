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
    const { email, password, nome, role } = dados;

    // 1. Normalização rigorosa
    const emailNormalizado = email.toLowerCase().trim();

    // 2. Verificação de existência
    const usuarioExistente = await this.usuarioRepository.findOneBy({ email: emailNormalizado });
    if (usuarioExistente) {
      throw new ConflictException('Este e-mail já está cadastrado.');
    }

    // 3. Hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Criação da instância
    const novoUsuario = this.usuarioRepository.create({
      nome,
      email: emailNormalizado,
      password: hashedPassword,
      role: role || 'assistente',
    });

    // 5. Salvamento
    const salvo = await this.usuarioRepository.save(novoUsuario);

    // 6. Retorno seguro (Removendo password sem erro de TS)
    const usuarioExibicao = { ...salvo };
    delete (usuarioExibicao as any).password;
    
    return usuarioExibicao;
  }
  
  async login(email: string, pass: string) {
    this.logger.log(`Tentativa de login para: ${email}`);

    // Uso do QueryBuilder é essencial aqui por causa do { select: false } na Entity
    const usuario = await this.usuarioRepository.createQueryBuilder('user')
      .addSelect('user.password')
      .where('LOWER(user.email) = LOWER(:email)', { email: email.trim() })
      .getOne();

    if (!usuario) {
      this.logger.warn(`Usuário não encontrado: ${email}`);
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    // O bcrypt.compare precisa receber o texto puro e depois o hash
    const isPasswordMatching = await bcrypt.compare(pass, usuario.password);

    if (!isPasswordMatching) {
      this.logger.warn(`Senha incorreta para o usuário: ${email}`);
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const payload = { 
      sub: usuario.id, 
      email: usuario.email, 
      role: usuario.role 
    };

    this.logger.log(`Login bem-sucedido: ${email}`);

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