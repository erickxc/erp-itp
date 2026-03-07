"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_service_1 = require("./auth/auth.service");
const auth_controller_1 = require("./auth/auth.controller");
const jwt_strategy_1 = require("./auth/jwt.strategy");
const jwt_auth_guard_1 = require("./auth/jwt-auth.guard");
const roles_guard_1 = require("./auth/guards/roles.guard");
const materia_entity_1 = require("./materia.entity");
const usuario_entity_1 = require("./usuarios/usuario.entity");
const aluno_entity_1 = require("./alunos/aluno.entity");
const inscricao_entity_1 = require("./matriculas/inscricao.entity");
const grupo_entity_1 = require("./grupos/grupo.entity");
const materias_service_1 = require("./materias/materias.service");
const matriculas_service_1 = require("./matriculas/matriculas.service");
const materias_controller_1 = require("./materias/materias.controller");
const matriculas_controller_1 = require("./matriculas/matriculas.controller");
const usuarios_controller_1 = require("./usuarios/usuarios.controller");
const grupos_module_1 = require("./grupos/grupos.module");
const users_module_1 = require("./modules/users/users.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
                cache: true,
            }),
            jwt_1.JwtModule.registerAsync({
                global: true,
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    secret: config.get('JWT_SECRET'),
                    signOptions: { expiresIn: '8h' },
                }),
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    url: config.get('DATABASE_URL'),
                    entities: [materia_entity_1.Materia, usuario_entity_1.Usuario, aluno_entity_1.Aluno, inscricao_entity_1.Inscricao, grupo_entity_1.Grupo],
                    autoLoadEntities: true,
                    synchronize: false,
                    ssl: { rejectUnauthorized: false },
                }),
            }),
            typeorm_1.TypeOrmModule.forFeature([materia_entity_1.Materia, usuario_entity_1.Usuario, aluno_entity_1.Aluno, inscricao_entity_1.Inscricao, grupo_entity_1.Grupo]),
            grupos_module_1.GruposModule,
            users_module_1.UsersModule,
        ],
        controllers: [
            app_controller_1.AppController,
            materias_controller_1.MateriasController,
            auth_controller_1.AuthController,
            matriculas_controller_1.MatriculasController,
            usuarios_controller_1.UsuariosController
        ],
        providers: [
            app_service_1.AppService,
            materias_service_1.MateriasService,
            auth_service_1.AuthService,
            matriculas_service_1.MatriculasService,
            jwt_strategy_1.JwtStrategy,
            { provide: core_1.APP_GUARD, useClass: jwt_auth_guard_1.JwtAuthGuard },
            { provide: core_1.APP_GUARD, useClass: roles_guard_1.RolesGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map