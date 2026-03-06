import { Role } from '@/types/role.enum'; // Importe o Enum local do Frontend

export function usePermissions(userRole?: string) {
  // Traduz a string do cargo para o valor numérico da hierarquia
  const userLevel = userRole ? Role[userRole as keyof typeof Role] : 0;

  return {
    // Permissão de escrita apenas para Nível 8 (DRT) ou superior
    canWrite: userLevel >= Role.DRT,
    // Permissão de leitura para todos os logados
    canRead: userLevel >= Role.CZNH,
    userLevel
  };
}