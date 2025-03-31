import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PacientesPage from '../page'

// Mock para clipboard API
const mockClipboard = {
  writeText: jest.fn().mockImplementation(() => Promise.resolve()),
};
Object.defineProperty(navigator, 'clipboard', {
  value: mockClipboard,
});

// Mock para o useRouter do next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('PacientesPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza a lista de pacientes ativos', () => {
    render(<PacientesPage />);
    
    // Verifica o título da página
    expect(screen.getByText('Pacientes')).toBeInTheDocument();
    
    // Verifica os cards de pacientes
    expect(screen.getByText('Ana Silva')).toBeInTheDocument();
    expect(screen.getByText('Carlos Oliveira')).toBeInTheDocument();
    expect(screen.getByText('Maria Santos')).toBeInTheDocument();
    expect(screen.getByText('João Ferreira')).toBeInTheDocument();
    expect(screen.getByText('Paula Martins')).toBeInTheDocument();
  });

  it('renderiza a lista de pacientes inativos', () => {
    render(<PacientesPage />);
    
    // Verifica o título da seção
    expect(screen.getByText('Pacientes Inativos')).toBeInTheDocument();
    
    // Verifica os pacientes inativos
    expect(screen.getByText('Roberto Alves')).toBeInTheDocument();
    expect(screen.getByText('Fernanda Lima')).toBeInTheDocument();
    expect(screen.getByText('Tratamento concluído')).toBeInTheDocument();
    expect(screen.getByText('Mudou de cidade')).toBeInTheDocument();
  });

  it('abre o modal ao clicar em "Novo Paciente"', async () => {
    const user = userEvent.setup();
    render(<PacientesPage />);
    
    // Verifica se o botão existe
    const addButton = screen.getByText('Novo Paciente');
    expect(addButton).toBeInTheDocument();
    
    // Clica no botão
    await user.click(addButton);
    
    // Verifica se o modal foi aberto
    expect(screen.getByText('Adicionar Novo Paciente')).toBeInTheDocument();
    expect(screen.getByText('Nome Completo *')).toBeInTheDocument();
    expect(screen.getByText('Email *')).toBeInTheDocument();
    expect(screen.getByText('Telefone *')).toBeInTheDocument();
  });

  it('filtra pacientes ao usar a busca', async () => {
    const user = userEvent.setup();
    render(<PacientesPage />);
    
    // Verifica se todos os pacientes estão visíveis inicialmente
    expect(screen.getByText('Ana Silva')).toBeInTheDocument();
    expect(screen.getByText('Carlos Oliveira')).toBeInTheDocument();
    
    // Digita na caixa de busca
    const searchInput = screen.getByPlaceholderText('Buscar paciente...');
    await user.type(searchInput, 'Ana');
    
    // Verifica se apenas o paciente "Ana Silva" está visível
    expect(screen.getByText('Ana Silva')).toBeInTheDocument();
    expect(screen.queryByText('Carlos Oliveira')).not.toBeInTheDocument();
  });

  it('mostra e oculta o código de conexão', async () => {
    const user = userEvent.setup();
    render(<PacientesPage />);
    
    // Pega o botão "Ver código de conexão" do primeiro paciente
    const codeButtons = screen.getAllByText('Ver código de conexão');
    expect(codeButtons.length).toBeGreaterThan(0);
    
    // Clica para mostrar o código
    await user.click(codeButtons[0]);
    
    // Verifica se o código está visível
    const codeElement = screen.getByText(/PSI-\d+/);
    expect(codeElement).toBeInTheDocument();
    
    // Clica para ocultar o código
    const hideButton = screen.getByText('Ocultar código');
    await user.click(hideButton);
    
    // Verifica se o código não está mais visível
    expect(screen.queryByText(/PSI-\d+/)).not.toBeInTheDocument();
  });

  it('copia o código de conexão para a área de transferência', async () => {
    const user = userEvent.setup();
    render(<PacientesPage />);
    
    // Mostra o código primeiro
    const codeButtons = screen.getAllByText('Ver código de conexão');
    await user.click(codeButtons[0]);
    
    // Encontra o botão de copiar (ícone)
    const copyButton = screen.getByRole('button', { name: '' });
    
    // Clica para copiar
    await user.click(copyButton);
    
    // Verifica se a função de cópia foi chamada
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
}); 