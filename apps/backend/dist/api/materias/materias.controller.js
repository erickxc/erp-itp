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
exports.MateriasController = void 0;
const common_1 = require("@nestjs/common");
const materias_service_1 = require("./materias.service");
let MateriasController = class MateriasController {
    constructor(materiasService) {
        this.materiasService = materiasService;
    }
    async create(dados) {
        return await this.materiasService.create(dados);
    }
    async findAll() {
        return await this.materiasService.findAll();
    }
    async findOne(id) {
        return await this.materiasService.findOne(id);
    }
    async updateProgress(id, progresso) {
        return await this.materiasService.updateProgress(id, progresso);
    }
    async remove(id) {
        return await this.materiasService.remove(id);
    }
};
exports.MateriasController = MateriasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MateriasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MateriasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MateriasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/progresso'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('progresso')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], MateriasController.prototype, "updateProgress", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MateriasController.prototype, "remove", null);
exports.MateriasController = MateriasController = __decorate([
    (0, common_1.Controller)('materias'),
    __metadata("design:paramtypes", [materias_service_1.MateriasService])
], MateriasController);
//# sourceMappingURL=materias.controller.js.map