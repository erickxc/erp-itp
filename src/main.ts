import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // MODO ARQUITETURA: Configuração de Segurança e Cross-Origin
  const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://itp.institutotiapretinha.org',
    'https://institutotiapretinha.org',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Se não houver origin (ex: Postman/Mobile) ou se estiver na lista permitida
      if (!origin || allowedOrigins.some(o => o === origin)) {
        callback(null, true);
      } else {
        logger.warn(`🚫 Origin bloqueada pelo CORS: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Necessário para permitir o envio de Cookies/Tokens
    allowedHeaders: 'Content-Type,Authorization,Accept',
  });

  // MODO DEBUG: Validação Global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove campos que não estão no DTO
      forbidNonWhitelisted: true, // Retorna erro se enviar campos extras
      transform: true, // Converte tipos automaticamente (ex: string para number)
    }),
  );

  // Definição da Porta (Prioriza variável do servidor de deploy)
  const port = process.env.PORT || 3001;
  
  // O '0.0.0.0' é essencial para que o servidor seja acessível externamente em VPS/Containers
  await app.listen(port, '0.0.0.0');

  logger.log(`✅ ITP-BACKEND ATIVO NA PORTA: ${port}`);
  logger.log(`🔗 ORIGENS PERMITIDAS: ${allowedOrigins.join(', ')}`);
}

bootstrap();