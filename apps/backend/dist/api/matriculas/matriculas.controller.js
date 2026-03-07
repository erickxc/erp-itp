"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatriculasController = void 0;
const common_1 = require("@nestjs/common");
const matriculas_service_1 = require("./matriculas.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_enum_1 = require("../auth/constants/roles.enum");
let MatriculasController = class MatriculasController {
    constructor(matriculasService) {
        this.matriculasService = matriculasService;
    }
    async listarInscricoes() {
        return await this.matriculasService.listarTodas();
    }
    async receberInscricao(dados) {
        if (!dados?.nome_completo || !dados?.cpf) {
            throw new common_1.BadRequestException('Campos obrigatórios (nome, cpf) ausentes.');
        }
        return await this.matriculasService.receberInscricao(dados);
    }
    async enviarLGPD(id) {
        return await this.matriculasService.marcarComoAguardandoLGPD(id);
    }
    async confirmarLGPD(id) {
        return await this.matriculasService.confirmarAssinaturaLGPD(id);
    }
    async finalizarMatricula(id, body) {
        return await this.matriculasService.finalizarMatricula(id, body.cursos);
    }
    async atualizarStatus(id, body) {
        return await this.matriculasService.atualizarStatus(id, body.status, body.motivo);
    }
};
exports.MatriculasController = MatriculasController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.CZNH),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MatriculasController.prototype, "listarInscricoes", null);
__decorate([
    (0, common_1.Post)('inscricao'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.DRT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MatriculasController.prototype, "receberInscricao", null);
__decorate([
    (0, common_1.Patch)(':id/enviar-lgpd'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.DRT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MatriculasController.prototype, "enviarLGPD", null);
__decorate([
    (0, common_1.Patch)(':id/confirmar-lgpd'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.DRT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MatriculasController.prototype, "confirmarLGPD", null);
__decorate([
    (0, common_1.Patch)(':id/finalizar'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.DRT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MatriculasController.prototype, "finalizarMatricula", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.DRT),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MatriculasController.prototype, "atualizarStatus", null);
exports.MatriculasController = MatriculasController = __decorate([
    (0, common_1.Controller)('matriculas'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [matriculas_service_1.MatriculasService])
], MatriculasController);
//# sourceMappingURL=matriculas.controller.js.map