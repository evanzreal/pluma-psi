/**
 * Hook para gerar códigos de conexão de pacientes
 */
export function useCodeGenerator() {
  /**
   * Gera um código de conexão para paciente no formato PSI-XXXXX
   * @returns Código gerado no formato PSI-XXXXX
   */
  const generateConnectionCode = () => {
    const prefix = "PSI"
    const numbers = Math.floor(10000 + Math.random() * 90000)
    return `${prefix}-${numbers}`
  }

  return {
    generateConnectionCode
  }
} 