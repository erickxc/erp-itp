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
exports.MateriasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const materia_entity_1 = require("../materia.entity");
let MateriasService = class MateriasService {
    constructor(materiaRepository) {
        this.materiaRepository = materiaRepository;
    }
    async create(dados) {
        const novaMateria = this.materiaRepository.create({
            ...dados,
            status: 'Pendente',
            progresso: 0,
            media: 0,
            acertos: 0,
            totalQuestoes: 0,
        });
        return await this.materiaRepository.save(novaMateria);
    }
    async findAll() {
        return await this.materiaRepository.find({
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const materia = await this.materiaRepository.findOneBy({ id });
        if (!materia) {
            throw new common_1.NotFoundException(`Matéria com ID ${id} não encontrada`);
        }
        return materia;
    }
    async updateProgress(id, novoProgresso) {
        const materia = await this.findOne(id);
        materia.progresso = novoProgresso;
        if (novoProgresso >= 100) {
            materia.status = 'Concluída';
        }
        else if (novoProgresso > 0) {
            materia.status = 'Em Andamento';
        }
        return await this.materiaRepository.save(materia);
    }
    async remove(id) {
        const materia = await this.findOne(id);
        await this.materiaRepository.remove(materia);
    }
};
exports.MateriasService = MateriasService;
exports.MateriasService = MateriasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(materia_entity_1.Materia)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MateriasService);
//# sourceMappingURL=materias.service.js.map