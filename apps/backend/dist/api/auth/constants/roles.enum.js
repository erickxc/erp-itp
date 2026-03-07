"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleLabels = exports.Role = void 0;
var Role;
(function (Role) {
    Role["USER"] = "user";
    Role["CZNH"] = "cozinha";
    Role["ASSIST"] = "assist";
    Role["MNT"] = "monitor";
    Role["PROF"] = "prof";
    Role["DRT_ADJ"] = "adjunto";
    Role["DRT"] = "drt";
    Role["VP"] = "vp";
    Role["ADMIN"] = "admin";
})(Role || (exports.Role = Role = {}));
exports.RoleLabels = {
    [Role.USER]: 'Pendente/Visitante',
    [Role.CZNH]: 'Cozinheiro(a)',
    [Role.ASSIST]: 'Assistente',
    [Role.MNT]: 'Monitor',
    [Role.PROF]: 'Professor',
    [Role.DRT_ADJ]: 'Diretor(a) Adjunto(a)',
    [Role.DRT]: 'Diretor(a)',
    [Role.VP]: 'Vice-Presidente',
    [Role.ADMIN]: 'Presidente',
};
//# sourceMappingURL=roles.enum.js.map