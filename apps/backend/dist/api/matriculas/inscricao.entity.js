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
exports.Inscricao = exports.StatusMatricula = void 0;
const typeorm_1 = require("typeorm");
const aluno_entity_1 = require("../alunos/aluno.entity");
var StatusMatricula;
(function (StatusMatricula) {
    StatusMatricula["PENDENTE"] = "Pendente";
    StatusMatricula["INCOMPLETO"] = "Incompleto";
    StatusMatricula["AGUARDANDO_LGPD"] = "Aguardando Assinatura LGPD";
    StatusMatricula["EM_VALIDACAO"] = "Em Valida\u00E7\u00E3o";
    StatusMatricula["MATRICULADO"] = "Matriculado";
    StatusMatricula["DESISTENTE"] = "Desistente";
    StatusMatricula["CANCELADA"] = "Cancelada";
})(StatusMatricula || (exports.StatusMatricula = StatusMatricula = {}));
let Inscricao = class Inscricao {
};
exports.Inscricao = Inscricao;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Inscricao.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nome_completo' }),
    __metadata("design:type", String)
], Inscricao.prototype, "nome_completo", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Inscricao.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Inscricao.prototype, "celular", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'data_nascimento', nullable: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "data_nascimento", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'idade', nullable: true, type: 'int' }),
    __metadata("design:type", Number)
], Inscricao.prototype, "idade", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sexo', nullable: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "sexo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'escolaridade', nullable: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "escolaridade", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'turno_escolar', nullable: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "turno_escolar", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'logradouro', nullable: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "logradouro", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'numero', nullable: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "numero", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'complemento', nullable: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "complemento", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cidade', nullable: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "cidade", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'bairro', nullable: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "bairro", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'estado_uf', nullable: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "estado_uf", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cep', nullable: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "cep", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'maior_18_anos', type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], Inscricao.prototype, "maior_18_anos", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nome_responsavel', nullable: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "nome_responsavel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'grau_parentesco', nullable: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "grau_parentesco", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cpf_responsavel', nullable: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "cpf_responsavel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'telefone_alternativo', nullable: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "telefone_alternativo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'possui_alergias', nullable: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "possui_alergias", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cuidado_especial', nullable: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "cuidado_especial", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'detalhes_cuidado', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "detalhes_cuidado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'uso_medicamento', nullable: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "uso_medicamento", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cursos_desejados', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "cursos_desejados", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'autoriza_imagem', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Inscricao.prototype, "autoriza_imagem", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nome_assinatura_imagem', nullable: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "nome_assinatura_imagem", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lgpd_aceito', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Inscricao.prototype, "lgpd_aceito", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'data_assinatura_lgpd', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Inscricao.prototype, "data_assinatura_lgpd", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status_matricula', type: 'varchar', default: StatusMatricula.PENDENTE }),
    __metadata("design:type", String)
], Inscricao.prototype, "status_matricula", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'motivo_status', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "motivo_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'url_documentos_zip', nullable: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "url_documentos_zip", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'url_termo_lgpd', nullable: true }),
    __metadata("design:type", String)
], Inscricao.prototype, "url_termo_lgpd", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => aluno_entity_1.Aluno, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'aluno_id' }),
    __metadata("design:type", aluno_entity_1.Aluno)
], Inscricao.prototype, "aluno", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Inscricao.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Inscricao.prototype, "updatedAt", void 0);
exports.Inscricao = Inscricao = __decorate([
    (0, typeorm_1.Entity)('inscricoes')
], Inscricao);
//# sourceMappingURL=inscricao.entity.js.map