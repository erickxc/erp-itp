import { 
  Controller, 
  Post, 
  Body, 
  HttpCode, 
  HttpStatus, 
  UnauthorizedException, 
  BadRequestException 
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registro')
  @HttpCode(HttpStatus.CREATED) // 201 para criação
  async registrar(@Body() dados: any) {
    if (!dados.email || !dados.senha) {
      throw new BadRequestException('Email e senha são obrigatórios para o registro.');
    }
    return await this.authService.registrar(dados);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK) // 200 para login (correto conforme você observou)
  async login(@Body() body: any) {
    const { email, senha, password } = body;
    const pass = senha || password;

    if (!email || !pass) {
      throw new BadRequestException('Email e senha/password são obrigatórios.');
    }

    try {
      const result = await this.authService.login(email, pass);
      if (!result) {
        throw new UnauthorizedException('Credenciais inválidas.');
      }
      return result;
    } catch (error) {
      // Se o erro vier do serviço, repassa ou trata aqui
      throw error;
    }
  }
}