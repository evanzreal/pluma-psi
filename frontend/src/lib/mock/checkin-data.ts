// Tipos para checkin diário
export interface CheckinEntry {
  id: number;
  patientId: number;
  date: string;
  feeling: 'Muito positivo' | 'Positivo' | 'Neutro' | 'Negativo' | 'Muito negativo';
  emotions: string[];
  bodyReactions: string[];
  situation: string;
  thoughts: string;
  behaviors: string[];
}

// Opções disponíveis no formulário
export const checkinOptions = {
  feelings: [
    'Muito positivo',
    'Positivo',
    'Neutro',
    'Negativo',
    'Muito negativo'
  ],
  emotions: [
    'Ansioso',
    'Alegre',
    'Surpreso',
    'Amoroso',
    'Feliz',
    'Otimista',
    'Calmo',
    'Leve',
    'Orgulhoso',
    'Excitado',
    'Constrangido',
    'Apático'
  ],
  bodyReactions: [
    'Falta de ar',
    'Tontura',
    'Sudorese',
    'Tremores',
    'Agitação',
    'Nervosismo',
    'Palpitações',
    'Dor no peito',
    'Sensação de paz',
    'Cansaço',
    'Despersonalização',
    'Desrealização',
    'Ruborização',
    'Tensão muscular',
    'Frio na barriga'
  ],
  behaviors: [
    'Pratiquei atividades físicas',
    'Pratiquei yoga ou meditação',
    'Busquei por passeios/lazer',
    'Consumi álcool',
    'Fiz compras',
    'Fumei',
    'Me isolei socialmente',
    'Tomei banho',
    'Me dediquei a hobbies',
    'Fui dormir',
    'Não saí da cama',
    'Busquei atividades "de adrenalina"',
    'Roí as unhas',
    'Comi mais ou compulsivamente',
    'Me machuquei propositalmente',
    'Relações sexuais',
    'Pesquisei ou planejei suicídio',
    'Mantive relação sexual desprotegida',
    'Usei drogas'
  ]
};

// Dados mock para checkins diários
export const mockCheckinData: CheckinEntry[] = [
  {
    id: 1,
    patientId: 1, // Ana Silva
    date: '10/05/2024',
    feeling: 'Neutro',
    emotions: ['Ansioso', 'Apático'],
    bodyReactions: ['Agitação', 'Nervosismo', 'Tensão muscular'],
    situation: 'Reunião de trabalho com muitas pessoas desconhecidas',
    thoughts: 'Todos estão me julgando. Não vou conseguir me expressar bem.',
    behaviors: ['Me isolei socialmente', 'Roí as unhas']
  },
  {
    id: 2,
    patientId: 1,
    date: '09/05/2024',
    feeling: 'Negativo',
    emotions: ['Ansioso', 'Constrangido'],
    bodyReactions: ['Falta de ar', 'Sudorese', 'Palpitações'],
    situation: 'Apresentação para colegas de trabalho',
    thoughts: 'Vou gaguejar. Vão perceber que estou nervoso. Vou ser demitido.',
    behaviors: ['Consumi álcool', 'Me isolei socialmente']
  },
  {
    id: 3,
    patientId: 1,
    date: '08/05/2024',
    feeling: 'Negativo',
    emotions: ['Ansioso', 'Constrangido'],
    bodyReactions: ['Tremores', 'Agitação', 'Nervosismo'],
    situation: 'Conversa com chefe sobre promoção',
    thoughts: 'Não mereço ser promovido. Vão descobrir que não sou competente.',
    behaviors: ['Roí as unhas', 'Me isolei socialmente']
  },
  {
    id: 4,
    patientId: 1,
    date: '07/05/2024',
    feeling: 'Neutro',
    emotions: ['Calmo', 'Ansioso'],
    bodyReactions: ['Frio na barriga', 'Nervosismo'],
    situation: 'Caminhada no parque',
    thoughts: 'Está melhor que ontem, mas ainda me sinto tenso.',
    behaviors: ['Pratiquei atividades físicas']
  },
  {
    id: 5,
    patientId: 1,
    date: '06/05/2024',
    feeling: 'Positivo',
    emotions: ['Calmo', 'Leve'],
    bodyReactions: ['Sensação de paz'],
    situation: 'Sessão de meditação guiada',
    thoughts: 'Me sinto mais centrado e presente.',
    behaviors: ['Pratiquei yoga ou meditação', 'Tomei banho']
  },
  {
    id: 6,
    patientId: 1,
    date: '05/05/2024',
    feeling: 'Positivo',
    emotions: ['Alegre', 'Otimista'],
    bodyReactions: ['Sensação de paz'],
    situation: 'Encontro com amigos no final de semana',
    thoughts: 'É bom estar com pessoas que me aceitam como sou.',
    behaviors: ['Busquei por passeios/lazer']
  },
  {
    id: 7,
    patientId: 2, // Carlos Oliveira
    date: '09/05/2024',
    feeling: 'Negativo',
    emotions: ['Apático', 'Constrangido'],
    bodyReactions: ['Cansaço', 'Tensão muscular'],
    situation: 'Discussão com colega de trabalho',
    thoughts: 'Ninguém me respeita. Não consigo fazer nada direito.',
    behaviors: ['Me isolei socialmente', 'Consumi álcool']
  },
  {
    id: 8,
    patientId: 2,
    date: '08/05/2024',
    feeling: 'Negativo',
    emotions: ['Apático'],
    bodyReactions: ['Cansaço'],
    situation: 'Acordei muito cedo para o trabalho',
    thoughts: 'Não aguento mais essa rotina. Me sinto esgotado.',
    behaviors: ['Não saí da cama', 'Consumi álcool']
  },
  {
    id: 9,
    patientId: 2,
    date: '07/05/2024',
    feeling: 'Neutro',
    emotions: ['Calmo'],
    bodyReactions: ['Sensação de paz'],
    situation: 'Assistindo um filme em casa',
    thoughts: 'Momentos de calma são raros, preciso valorizar.',
    behaviors: ['Me dediquei a hobbies']
  },
  {
    id: 10,
    patientId: 3, // Maria Santos
    date: '08/05/2024',
    feeling: 'Positivo',
    emotions: ['Otimista', 'Alegre'],
    bodyReactions: ['Sensação de paz'],
    situation: 'Sessão de terapia',
    thoughts: 'Estou progredindo, mesmo com dificuldades.',
    behaviors: ['Me dediquei a hobbies', 'Pratiquei yoga ou meditação']
  },
  {
    id: 11,
    patientId: 3,
    date: '07/05/2024',
    feeling: 'Neutro',
    emotions: ['Apático', 'Calmo'],
    bodyReactions: ['Cansaço'],
    situation: 'Dia de trabalho comum',
    thoughts: 'Sobrevivendo a mais um dia.',
    behaviors: ['Fui dormir']
  },
  {
    id: 12,
    patientId: 3,
    date: '06/05/2024',
    feeling: 'Negativo',
    emotions: ['Ansioso', 'Constrangido'],
    bodyReactions: ['Falta de ar', 'Palpitações'],
    situation: 'Lembranças do divórcio recente',
    thoughts: 'Nunca mais vou conseguir ser feliz. A culpa foi minha.',
    behaviors: ['Me isolei socialmente', 'Comi mais ou compulsivamente']
  }
]; 