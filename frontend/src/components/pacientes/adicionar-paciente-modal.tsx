'use client'

import { useState } from "react"
import { X } from "lucide-react"

export interface NovoPatienteFormData {
  name: string
  email: string
  phone: string
  notes: string
}

interface AdicionarPacienteModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: NovoPatienteFormData) => void
}

export function AdicionarPacienteModal({ isOpen, onClose, onSubmit }: AdicionarPacienteModalProps) {
  const [formData, setFormData] = useState<NovoPatienteFormData>({
    name: '',
    email: '',
    phone: '',
    notes: ''
  })
  
  // Função para atualizar o estado do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  // Função para enviar o formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    
    // Resetar o formulário
    setFormData({
      name: '',
      email: '',
      phone: '',
      notes: ''
    })
  }
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Adicionar Novo Paciente</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome Completo *</label>
            <input 
              type="text" 
              name="name"
              className="w-full p-2 border rounded-md" 
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input 
              type="email" 
              name="email"
              className="w-full p-2 border rounded-md" 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Telefone *</label>
            <input 
              type="text" 
              name="phone"
              className="w-full p-2 border rounded-md" 
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Observações Iniciais</label>
            <textarea 
              name="notes"
              className="w-full p-2 border rounded-md h-24" 
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex space-x-2 justify-end pt-2">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              disabled={!formData.name || !formData.email || !formData.phone}
            >
              Adicionar Paciente
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 