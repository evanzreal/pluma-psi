import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Gera uma URL para avatar baseado no nome usando o serviço UI Avatars
 * @param name Nome do usuário/paciente para gerar o avatar
 * @param backgroundColor Cor de fundo em hexadecimal (sem #)
 * @param foregroundColor Cor da letra em hexadecimal (sem #)
 * @param size Tamanho da imagem do avatar
 * @returns URL do avatar gerado
 */
export function generateAvatarUrl(
  name: string, 
  backgroundColor: string = '4F46E5', 
  foregroundColor: string = 'FFFFFF',
  size: number = 200
): string {
  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&background=${backgroundColor}&color=${foregroundColor}&size=${size}`;
}

/**
 * Verifica se uma URL de avatar é válida para uso
 * @param avatarUrl URL do avatar para verificar
 * @returns Booleano indicando se o avatar é válido
 */
export function isValidAvatarUrl(avatarUrl?: string): boolean {
  if (!avatarUrl) return false;
  
  // Padrões de URL inválidas ou locais que não existem
  const invalidPatterns = [
    /^\/?avatars\//,  // Começa com /avatars/ ou avatars/
    /^data:image\/svg/  // SVG em base64 que pode ser inválido
  ];
  
  return !invalidPatterns.some(pattern => pattern.test(avatarUrl));
}
