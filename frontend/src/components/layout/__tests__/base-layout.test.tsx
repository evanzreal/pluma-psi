import { render, screen } from '@testing-library/react'
import { BaseLayout } from '../base-layout'

// Mock para o componente Sidebar
jest.mock('../sidebar', () => ({
  Sidebar: () => <div data-testid="sidebar-mock">Sidebar Component</div>,
}))

describe('BaseLayout', () => {
  it('renderiza o sidebar e o conteúdo', () => {
    // Renderiza o BaseLayout com conteúdo fictício
    render(
      <BaseLayout>
        <div data-testid="test-content">Test Content</div>
      </BaseLayout>
    )
    
    // Verifica se o sidebar foi renderizado
    expect(screen.getByTestId('sidebar-mock')).toBeInTheDocument()
    
    // Verifica se o conteúdo foi renderizado
    expect(screen.getByTestId('test-content')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })
  
  it('aplica as classes corretas de estilo', () => {
    render(
      <BaseLayout>
        <div>Content</div>
      </BaseLayout>
    )
    
    // Verifica se a classe flex está aplicada ao elemento principal
    const mainElement = screen.getByRole('main')
    expect(mainElement).toHaveClass('flex-1')
    expect(mainElement).toHaveClass('p-6')
  })
}) 