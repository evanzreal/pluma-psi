-- Criar função para configurar políticas RLS
CREATE OR REPLACE FUNCTION public.setup_rls_policies()
RETURNS void AS $$
BEGIN
  -- Remover políticas existentes para recriar
  DROP POLICY IF EXISTS "Usuários podem ver seus próprios dados" ON public.users;
  DROP POLICY IF EXISTS "Usuários podem atualizar seus próprios dados" ON public.users;
  
  DROP POLICY IF EXISTS "Terapeutas podem ver seus pacientes" ON public.pacientes;
  DROP POLICY IF EXISTS "Terapeutas podem criar pacientes" ON public.pacientes;
  DROP POLICY IF EXISTS "Terapeutas podem atualizar seus pacientes" ON public.pacientes;
  DROP POLICY IF EXISTS "Terapeutas podem excluir seus pacientes" ON public.pacientes;
  
  DROP POLICY IF EXISTS "Terapeutas podem ver sessões de seus pacientes" ON public.sessoes;
  DROP POLICY IF EXISTS "Terapeutas podem criar sessões para seus pacientes" ON public.sessoes;
  DROP POLICY IF EXISTS "Terapeutas podem atualizar sessões de seus pacientes" ON public.sessoes;
  DROP POLICY IF EXISTS "Terapeutas podem excluir sessões de seus pacientes" ON public.sessoes;
  
  DROP POLICY IF EXISTS "Terapeutas podem ver questionários de seus pacientes" ON public.questionarios;
  DROP POLICY IF EXISTS "Terapeutas podem criar questionários para seus pacientes" ON public.questionarios;
  DROP POLICY IF EXISTS "Terapeutas podem atualizar questionários de seus pacientes" ON public.questionarios;
  DROP POLICY IF EXISTS "Terapeutas podem excluir questionários de seus pacientes" ON public.questionarios;
  
  -- Políticas para a tabela de usuários
  CREATE POLICY "Usuários podem ver seus próprios dados"
    ON public.users FOR SELECT
    USING (auth.jwt() ->> 'sub' = clerk_id);
    
  CREATE POLICY "Usuários podem atualizar seus próprios dados"
    ON public.users FOR UPDATE
    USING (auth.jwt() ->> 'sub' = clerk_id);
  
  -- Políticas para a tabela de pacientes
  CREATE POLICY "Terapeutas podem ver seus pacientes"
    ON public.pacientes FOR SELECT
    USING (
      terapeuta_id IN (
        SELECT id FROM public.users 
        WHERE clerk_id = auth.jwt() ->> 'sub'
      )
    );
    
  CREATE POLICY "Terapeutas podem criar pacientes"
    ON public.pacientes FOR INSERT
    WITH CHECK (
      terapeuta_id IN (
        SELECT id FROM public.users 
        WHERE clerk_id = auth.jwt() ->> 'sub'
      )
    );
    
  CREATE POLICY "Terapeutas podem atualizar seus pacientes"
    ON public.pacientes FOR UPDATE
    USING (
      terapeuta_id IN (
        SELECT id FROM public.users 
        WHERE clerk_id = auth.jwt() ->> 'sub'
      )
    );
    
  CREATE POLICY "Terapeutas podem excluir seus pacientes"
    ON public.pacientes FOR DELETE
    USING (
      terapeuta_id IN (
        SELECT id FROM public.users 
        WHERE clerk_id = auth.jwt() ->> 'sub'
      )
    );
  
  -- Políticas para a tabela de sessões
  CREATE POLICY "Terapeutas podem ver sessões de seus pacientes"
    ON public.sessoes FOR SELECT
    USING (
      paciente_id IN (
        SELECT id FROM public.pacientes 
        WHERE terapeuta_id IN (
          SELECT id FROM public.users 
          WHERE clerk_id = auth.jwt() ->> 'sub'
        )
      )
    );
    
  CREATE POLICY "Terapeutas podem criar sessões para seus pacientes"
    ON public.sessoes FOR INSERT
    WITH CHECK (
      paciente_id IN (
        SELECT id FROM public.pacientes 
        WHERE terapeuta_id IN (
          SELECT id FROM public.users 
          WHERE clerk_id = auth.jwt() ->> 'sub'
        )
      )
    );
    
  CREATE POLICY "Terapeutas podem atualizar sessões de seus pacientes"
    ON public.sessoes FOR UPDATE
    USING (
      paciente_id IN (
        SELECT id FROM public.pacientes 
        WHERE terapeuta_id IN (
          SELECT id FROM public.users 
          WHERE clerk_id = auth.jwt() ->> 'sub'
        )
      )
    );
    
  CREATE POLICY "Terapeutas podem excluir sessões de seus pacientes"
    ON public.sessoes FOR DELETE
    USING (
      paciente_id IN (
        SELECT id FROM public.pacientes 
        WHERE terapeuta_id IN (
          SELECT id FROM public.users 
          WHERE clerk_id = auth.jwt() ->> 'sub'
        )
      )
    );
  
  -- Políticas para a tabela de questionários
  CREATE POLICY "Terapeutas podem ver questionários de seus pacientes"
    ON public.questionarios FOR SELECT
    USING (
      paciente_id IN (
        SELECT id FROM public.pacientes 
        WHERE terapeuta_id IN (
          SELECT id FROM public.users 
          WHERE clerk_id = auth.jwt() ->> 'sub'
        )
      )
    );
    
  CREATE POLICY "Terapeutas podem criar questionários para seus pacientes"
    ON public.questionarios FOR INSERT
    WITH CHECK (
      paciente_id IN (
        SELECT id FROM public.pacientes 
        WHERE terapeuta_id IN (
          SELECT id FROM public.users 
          WHERE clerk_id = auth.jwt() ->> 'sub'
        )
      )
    );
    
  CREATE POLICY "Terapeutas podem atualizar questionários de seus pacientes"
    ON public.questionarios FOR UPDATE
    USING (
      paciente_id IN (
        SELECT id FROM public.pacientes 
        WHERE terapeuta_id IN (
          SELECT id FROM public.users 
          WHERE clerk_id = auth.jwt() ->> 'sub'
        )
      )
    );
    
  CREATE POLICY "Terapeutas podem excluir questionários de seus pacientes"
    ON public.questionarios FOR DELETE
    USING (
      paciente_id IN (
        SELECT id FROM public.pacientes 
        WHERE terapeuta_id IN (
          SELECT id FROM public.users 
          WHERE clerk_id = auth.jwt() ->> 'sub'
        )
      )
    );
END;
$$ LANGUAGE plpgsql; 