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
exports.GruposService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const grupo_entity_1 = require("./grupo.entity");
let GruposService = class GruposService {
    constructor(grupoRepository) {
        this.grupoRepository = grupoRepository;
    }
    async criar(nome, permissoes) {
        const nomeNormalizado = nome.toUpperCase().trim();
        const existe = await this.grupoRepository.findOneBy({ nome: nomeNormalizado });
        if (existe) {
            throw new common_1.ConflictException('Este cargo/grupo já está cadastrado.');
        }
        const novoGrupo = this.grupoRepository.create({
            nome: nomeNormalizado,
            grupo_permissoes: permissoes,
        });
        return await this.grupoRepository.save(novoGrupo);
    }
    async listarTodos() {
        return await this.grupoRepository.find({ relations: ['usuarios'] });
    }
    async buscarPorId(id) {
        const grupo = await this.grupoRepository.findOneBy({ id });
        if (!grupo)
            throw new common_1.NotFoundException('Grupo não encontrado.');
        return grupo;
    }
};
exports.GruposService = GruposService;
exports.GruposService = GruposService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(grupo_entity_1.Grupo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GruposService);
//# sourceMappingURL=grupos.service.js.map