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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const roles_decorator_1 = require("../decorators/roles.decorator");
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
        this.logger = new common_1.Logger('RolesGuard');
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles)
            return true;
        const { user } = context.switchToHttp().getRequest();
        if (!user || !user.role) {
            throw new common_1.ForbiddenException('Cargo não identificado no token de acesso.');
        }
        const mapaHierarquia = {
            'user': 0,
            'cozinha': 1,
            'assist': 2,
            'monitor': 3,
            'prof': 4,
            'adjunto': 5,
            'drt': 8,
            'vp': 9,
            'admin': 10,
            'aadmin': 10
        };
        const roleUsuario = String(user.role).toLowerCase().trim();
        const userValue = mapaHierarquia[roleUsuario];
        const requiredValues = requiredRoles.map(r => {
            if (typeof r === 'number')
                return r;
            return mapaHierarquia[String(r).toLowerCase()] ?? 99;
        });
        const minRequired = Math.min(...requiredValues);
        this.logger.debug(`🛡️ [ITP] Usuário: ${roleUsuario} (Nível ${userValue}) | Mínimo Exigido: ${minRequired}`);
        if (userValue === undefined) {
            throw new common_1.ForbiddenException(`Cargo '${roleUsuario}' não existe no mapa do ITP.`);
        }
        if (userValue < minRequired) {
            throw new common_1.ForbiddenException('Nível de acesso insuficiente.');
        }
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map