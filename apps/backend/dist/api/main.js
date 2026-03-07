"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
exports.default = handler;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = require("path");
const logger = new common_1.Logger('Bootstrap');
const setupApp = async (app) => {
    app.use((0, cookie_parser_1.default)());
    app.setGlobalPrefix('api');
    app.useStaticAssets((0, path_1.join)(process.cwd(), 'public'), {
        prefix: '/public/',
    });
    app.enableCors({
        origin: [
            'https://itp.institutotiapretinha.org',
            'https://api.itp.institutotiapretinha.org',
            'https://institutotiapretinha.org',
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            'http://localhost:3001',
        ],
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept',
            'Cookie',
            'X-Requested-With',
        ],
        exposedHeaders: ['Set-Cookie'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: false,
    }));
    return app;
};
exports.setupApp = setupApp;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await (0, exports.setupApp)(app);
    await app.init();
    return app;
}
let app;
async function handler(req, res) {
    if (!app) {
        app = await bootstrap();
    }
    const server = app.getHttpAdapter().getInstance();
    return server(req, res);
}
//# sourceMappingURL=main.js.map