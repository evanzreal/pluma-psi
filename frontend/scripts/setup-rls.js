#!/usr/bin/env node
import 'dotenv/config';
import fetch from 'node-fetch';

async function setupRLS() {
  console.log('Configurando políticas RLS no Supabase...');

  try {
    const apiKey = process.env.SETUP_API_KEY;
    if (!apiKey) {
      throw new Error('SETUP_API_KEY não encontrada em .env.local');
    }

    const response = await fetch('http://localhost:3000/api/setup-rls', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${JSON.stringify(data)}`);
    }

    console.log('✅ Políticas RLS configuradas com sucesso!');
    console.log(data.message);
  } catch (error) {
    console.error('❌ Falha ao configurar políticas RLS:');
    console.error(error.message);
    process.exit(1);
  }
}

setupRLS(); 