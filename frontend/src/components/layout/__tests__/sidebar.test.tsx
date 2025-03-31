import { render, screen } from '@testing-library/react'
import { Sidebar } from '../sidebar'

// Mock de componentes externos que poderiam causar problemas nos testes
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ''} />
  },
}))

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/',
}))

jest.mock('@clerk/nextjs', () => ({
  SignedIn: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SignedOut: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  UserButton: () => <button>User Profile</button>,
}))

describe('Sidebar', () => {
  it('renderiza com todos os itens de menu', () => {
    render(<Sidebar />)
    
    // Verifica os itens do menu principal
    expect(screen.getByText('Menu')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Pacientes')).toBeInTheDocument()
    expect(screen.getByText('Agenda')).toBeInTheDocument()
    expect(screen.getByText('Alertas')).toBeInTheDocument()
    
    // Verifica os itens do menu de perfil
    expect(screen.getByText('Configurações')).toBeInTheDocument()
    expect(screen.getByText('Sair')).toBeInTheDocument()
  })
}) 