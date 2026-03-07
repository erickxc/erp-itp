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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Materia = exports.Prioridade = void 0;
const typeorm_1 = require("typeorm");
var Prioridade;
(function (Prioridade) {
    Prioridade["ALTA"] = "Alta";
    Prioridade["MEDIA"] = "M\u00E9dia";
    Prioridade["BAIXA"] = "Baixa";
})(Prioridade || (exports.Prioridade = Prioridade = {}));
let Materia = class Materia {
};
exports.Materia = Materia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Materia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Materia.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Materia.prototype, "conceito", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Materia.prototype, "sigla", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Prioridade, default: Prioridade.MEDIA }),
    __metadata("design:type", String)
], Materia.prototype, "prioridade", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Materia.prototype, "periodo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Materia.prototype, "cargaHorariaEmenta", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Materia.prototype, "professor", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'Pendente' }),
    __metadata("design:type", String)
], Materia.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Materia.prototype, "media", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Materia.prototype, "acertos", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Materia.prototype, "totalQuestoes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Materia.prototype, "progresso", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Materia.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Materia.prototype, "updatedAt", void 0);
exports.Materia = Materia = __decorate([
    (0, typeorm_1.Entity)('materias')
], Materia);
//# sourceMappingURL=materia.entity.js.map