import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

// Função para inicializar o NestJS dentro do Express
export const createServer = async (expressInstance: any) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  app.enableCors({
    origin: [
      'https://itp.institutotiapretinha.org',
      'https://institutotiapretinha.org',
      'http://localhost:3000'
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization,Accept',
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // Importante: Aguarda a inicialização dos módulos e controllers
  await app.init();
};

// Lógica de execução
if (process.env.NODE_ENV !== 'production') {
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(3001);
    console.log('🚀 Local: http://localhost:3001');
  }
  bootstrap();
} else {
  // Em produção (Vercel), inicializamos a ponte Express-Nest
  // A Vercel chamará o 'server' exportado abaixo
  createServer(server);
}

// Exportação obrigatória para o @vercel/node funcionar
export default server;