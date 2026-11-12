// lista compartilhada para não repetir os mesmos dados em cada tela
export const courses = [
  { id: 'programacao', title: 'Introdução à Programação', area: 'Tecnologia', detail: 'Aprenda lógica e crie seus primeiros programas.', duration: '8 semanas', level: 'Iniciante' },
  { id: 'web', title: 'Desenvolvimento Web', area: 'Tecnologia', detail: 'Construa páginas e aplicações para a internet.', duration: '12 semanas', level: 'Intermediário' },
  { id: 'design', title: 'Design para Iniciantes', area: 'Design', detail: 'Conheça cores, tipografia e composição visual.', duration: '6 semanas', level: 'Iniciante' },
  { id: 'ingles', title: 'Inglês para o Dia a Dia', area: 'Idiomas', detail: 'Pratique vocabulário e conversação.', duration: '10 semanas', level: 'Todos os níveis' },
  { id: 'financas', title: 'Educação Financeira', area: 'Negócios', detail: 'Organize seu dinheiro e planeje seus objetivos.', duration: '4 semanas', level: 'Iniciante' },
];

export type Course = (typeof courses)[number];
