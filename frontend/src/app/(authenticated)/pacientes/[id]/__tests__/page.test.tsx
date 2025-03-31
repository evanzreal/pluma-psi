import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PatientDetailPage from '../page'

// Mock do clipboard API
const mockClipboard = {
  writeText: jest.fn().mockImplementation(() => Promise.resolve()),
};
Object.defineProperty(navigator, 'clipboard', {
  value: mockClipboard,
});

// Mock window.setTimeout
jest.useFakeTimers();

describe('PatientDetailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('mostra tela de carregamento inicialmente', () => {
    render(<PatientDetailPage />);
    
    // Verifica se a mensagem de carregamento está presente
    expect(screen.getByText('Carregando informações do paciente...')).toBeInTheDocument();
  });

  it('renderiza as informações do paciente após carregamento', async () => {
    render(<PatientDetailPage />);
    
    // Avança no tempo para simular o carregamento concluído
    jest.advanceTimersByTime(600);
    
    // Verifica se as informações do paciente são exibidas
    await waitFor(() => {
      expect(screen.getByText('Ana Silva')).toBeInTheDocument();
    });
    
    // Verifica outras informações importantes
    expect(screen.getByText('Informações de Contato')).toBeInTheDocument();
    expect(screen.getByText('ana.silva@email.com')).toBeInTheDocument();
    expect(screen.getByText('(11) 98765-4321')).toBeInTheDocument();
  });

  it('permite navegar entre as abas', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PatientDetailPage />);
    
    // Avança no tempo para simular o carregamento concluído
    jest.advanceTimersByTime(600);
    
    // Espera o carregamento terminar
    await waitFor(() => {
      expect(screen.getByText('Visão Geral')).toBeInTheDocument();
    });
    
    // Verifica se a aba inicial 'Visão Geral' está ativa
    expect(screen.getByRole('tabpanel', { name: /visão geral/i })).toBeInTheDocument();
    
    // Clica na aba de Sessões
    const sessionsTab = screen.getByRole('tab', { name: /sessões/i });
    await user.click(sessionsTab);
    
    // Verifica se a aba de Sessões foi carregada
    expect(screen.getByText('Histórico de Sessões')).toBeInTheDocument();
    expect(screen.getByText('Registrar Sessão')).toBeInTheDocument();
    
    // Clica na aba de Questionários
    const questionnairesTab = screen.getByRole('tab', { name: /questionários/i });
    await user.click(questionnairesTab);
    
    // Verifica se a aba de Questionários foi carregada
    expect(screen.getByText('Questionários Respondidos')).toBeInTheDocument();
    expect(screen.getByText('Solicitar Questionário')).toBeInTheDocument();
  });

  it('permite copiar o código de conexão', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PatientDetailPage />);
    
    // Avança no tempo para simular o carregamento concluído
    jest.advanceTimersByTime(600);
    
    // Espera o carregamento terminar
    await waitFor(() => {
      expect(screen.getByText('PSI-45678')).toBeInTheDocument();
    });
    
    // Localiza o botão de copiar ao lado do código
    const copyButton = screen.getByRole('button', { name: '' });
    
    // Clica para copiar
    await user.click(copyButton);
    
    // Verifica se a função de cópia foi chamada com o código correto
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('PSI-45678');
  });

  it('exibe corretamente as sessões do paciente', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<PatientDetailPage />);
    
    // Avança no tempo para simular o carregamento concluído
    jest.advanceTimersByTime(600);
    
    // Espera o carregamento terminar
    await waitFor(() => {
      expect(screen.getByText('Ana Silva')).toBeInTheDocument();
    });
    
    // Clica na aba de Sessões
    const sessionsTab = screen.getByRole('tab', { name: /sessões/i });
    await user.click(sessionsTab);
    
    // Verifica se as sessões são exibidas corretamente
    expect(screen.getByText('10/05/2024')).toBeInTheDocument();
    expect(screen.getByText('Sessão produtiva. Paciente relatou melhora no sono.')).toBeInTheDocument();
    expect(screen.getByText('03/05/2024')).toBeInTheDocument();
    expect(screen.getByText('Discutimos estratégias para lidar com ansiedade em ambientes sociais.')).toBeInTheDocument();
  });
}); 