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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
exports.default = handler;
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const app_module_1 = require("../api/app.module");
const cookieParser = __importStar(require("cookie-parser"));
const logger = new common_1.Logger('Bootstrap');
const setupApp = async (app) => {
    const cookieMiddleware = cookieParser.default || cookieParser;
    app.use(cookieMiddleware());
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
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Cookie', 'X-Requested-With'],
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
async function bootstrapLocal() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await (0, exports.setupApp)(app);
    const port = process.env.PORT || 3001;
    await app.listen(port);
    logger.log(`🚀 SERVIDOR LOCAL ONLINE: http://localhost:${port}/api`);
}
let cachedServer;
async function handler(req, res) {
    if (!cachedServer) {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        await (0, exports.setupApp)(app);
        await app.init();
        cachedServer = app.getHttpAdapter().getInstance();
    }
    return cachedServer(req, res);
}
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    bootstrapLocal();
}
//# sourceMappingURL=main.js.map