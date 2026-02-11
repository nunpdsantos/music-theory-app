import type { TemplateLevelOverlay } from '../types';

// ---------------------------------------------------------------------------
// European Portuguese (PT-PT) overlay for Level 2 exercise templates
// 12 modules, ~65 generated exercises
// ---------------------------------------------------------------------------

const overlay: TemplateLevelOverlay = {
  // =========================================================================
  // Unidade 4: Todas as Tonalidades Maiores e Graus da Escala
  // =========================================================================

  // ---- l2u4m1: Todas as Tonalidades Maiores / Circulo de Quintas ----
  l2u4m1: [
    {
      // scale_build
      promptTemplate:
        'Constroi a escala de {root} maior. Seleciona as 7 notas usando os sustenidos ou bemois corretos.',
      hintTemplate:
        'Aplica o padrao T-T-mT-T-T-T-mT a partir de {root}. Consulta o circulo de quintas para a armacao de clave.',
    },
    {
      // multiple_choice
      promptTemplate:
        'Quantos sustenidos ou bemois tem esta tonalidade maior?',
      hintTemplate:
        'Segue o circulo de quintas. Sustenidos: G(1), D(2), A(3), E(4), B(5). Bemois: F(1), Bb(2), Eb(3), Ab(4), Db(5).',
      choiceSets: [
        [
          'B maior tem 5 sustenidos',
          'B maior tem 4 sustenidos',
          'B maior tem 6 sustenidos',
          'B maior tem 3 sustenidos',
        ],
        [
          'Eb maior tem 3 bemois',
          'Eb maior tem 2 bemois',
          'Eb maior tem 4 bemois',
          'Eb maior tem 1 bemol',
        ],
        [
          'Db maior tem 5 bemois',
          'Db maior tem 4 bemois',
          'Db maior tem 6 bemois',
          'Db maior tem 3 bemois',
        ],
      ],
    },
  ],

  // ---- l2u4m2: Nomes dos Graus da Escala ----
  l2u4m2: [
    {
      // scale_degree_id
      promptTemplate:
        'Na escala de {root} {scaleType}, qual e o numero do grau da nota indicada?',
      hintTemplate:
        'Conta a partir de {root} como grau 1 ao longo da escala {scaleType}. Os nomes dos graus sao: tonica, supertonica, mediante, subdominante, dominante, submediante, sensivel.',
    },
    {
      // multiple_choice
      promptTemplate:
        'Associa o numero do grau da escala ao seu nome tradicional.',
      hintTemplate:
        '1=tonica, 2=supertonica, 3=mediante, 4=subdominante, 5=dominante, 6=submediante, 7=sensivel.',
      choiceSets: [
        [
          'A mediante e o grau 3',
          'A mediante e o grau 4',
          'A mediante e o grau 5',
          'A mediante e o grau 2',
        ],
        [
          'A submediante e o grau 6',
          'A submediante e o grau 4',
          'A submediante e o grau 5',
          'A submediante e o grau 3',
        ],
        [
          'A supertonica e o grau 2',
          'A supertonica e o grau 3',
          'A supertonica e o grau 7',
          'A supertonica e o grau 1',
        ],
      ],
    },
  ],

  // =========================================================================
  // Unidade 5: Escalas Menores e Relacoes entre Tonalidades
  // =========================================================================

  // ---- l2u5m1: Menor Natural ----
  l2u5m1: [
    {
      // scale_build
      promptTemplate:
        'Constroi a escala de {root} menor natural. Seleciona as 7 notas seguindo o padrao T-mT-T-T-mT-T-T.',
      hintTemplate:
        'A escala de {root} menor natural segue o padrao T-mT-T-T-mT-T-T. Em relacao a maior, os graus 3, 6 e 7 sao baixados meio-tom.',
    },
  ],

  // ---- l2u5m2: Menor Harmonica/Melodica ----
  l2u5m2: [
    {
      // scale_build (harmonic)
      promptTemplate:
        'Constroi a escala de {root} menor harmonica. O 7.o grau e elevado em relacao a menor natural.',
      hintTemplate:
        'Menor harmonica = menor natural com o 7.o grau elevado. Isso cria uma sensivel a meio-tom abaixo da tonica {root}.',
    },
    {
      // scale_build (melodic)
      promptTemplate:
        'Constroi a escala de {root} menor melodica (forma ascendente). Tanto o 6.o como o 7.o grau sao elevados.',
      hintTemplate:
        'Menor melodica ascendente = menor natural com o 6.o e 7.o graus elevados. Isso elimina a 2.a aumentada presente na menor harmonica.',
    },
  ],

  // ---- l2u5m3: Tonalidades Relativas/Paralelas ----
  l2u5m3: [
    {
      // multiple_choice
      promptTemplate:
        'Identifica a relacao entre estas tonalidades.',
      hintTemplate:
        'Tonalidades relativas partilham a mesma armacao de clave (ex: C maior / A menor). Tonalidades paralelas partilham a mesma tonica (ex: C maior / C menor).',
      choiceSets: [
        [
          'A relativa menor de G maior e E menor',
          'A relativa menor de G maior e G menor',
          'A relativa menor de G maior e D menor',
          'A relativa menor de G maior e B menor',
        ],
        [
          'A relativa menor de D maior e B menor',
          'A relativa menor de D maior e D menor',
          'A relativa menor de D maior e A menor',
          'A relativa menor de D maior e F# menor',
        ],
        [
          'A relativa maior de F# menor e A maior',
          'A relativa maior de F# menor e F# maior',
          'A relativa maior de F# menor e D maior',
          'A relativa maior de F# menor e E maior',
        ],
        [
          'A relativa menor de Eb maior e C menor',
          'A relativa menor de Eb maior e Eb menor',
          'A relativa menor de Eb maior e Bb menor',
          'A relativa menor de Eb maior e Ab menor',
        ],
        [
          'Tonalidades paralelas partilham a mesma tonica mas diferem na qualidade',
          'Tonalidades paralelas partilham a mesma armacao de clave',
          'Tonalidades paralelas estao sempre a uma 5.a de distancia',
          'Tonalidades paralelas usam as mesmas notas',
        ],
      ],
    },
  ],

  // =========================================================================
  // Unidade 6: Compasso Composto e Sincopa
  // =========================================================================

  // ---- l2u6m1: Compasso Composto ----
  l2u6m1: [
    {
      // multiple_choice
      promptTemplate:
        'Classifica esta indicacao de compasso como simples ou composto.',
      hintTemplate:
        'No compasso composto o numero de cima e 6, 9 ou 12 e o tempo divide-se em 3. No compasso simples o tempo divide-se em 2.',
      choiceSets: [
        [
          '12/8 e composto quaternario: 4 tempos, cada um dividido em 3',
          '12/8 e simples: 12 tempos por compasso',
          '12/8 e composto ternario: 3 tempos, cada um dividido em 4',
          '12/8 e simples quaternario: 4 tempos de 3 colcheias',
        ],
        [
          '3/8 e simples ternario: 3 tempos de colcheia por compasso',
          '3/8 e composto: 1 tempo dividido em 3',
          '3/8 e igual a 6/8',
          '3/8 e composto ternario',
        ],
        [
          '9/8 e composto ternario: 3 tempos principais, cada um dividido em 3',
          '9/8 e simples: 9 tempos de colcheia por compasso',
          '9/8 e composto binario',
          '9/8 e igual a 3/4',
        ],
      ],
    },
  ],

  // ---- l2u6m2: Sincopa ----
  l2u6m2: [
    {
      // multiple_choice
      promptTemplate:
        'Responde a esta pergunta sobre sincopa e tecnicas ritmicas.',
      hintTemplate:
        'A sincopa coloca enfase em tempos ou subdivisoes normalmente fracos. Cria surpresa ritmica e impulso para a frente.',
      choiceSets: [
        [
          'A sincopa cria interesse ritmico ao acentuar contratempos',
          'A sincopa significa tocar tudo no tempo',
          'A sincopa remove todos os acentos da musica',
          'A sincopa envolve sempre tercinas',
        ],
        [
          'Uma ligadura sobre a barra de compasso cria sincopa ao prolongar o som para o tempo forte',
          'Uma ligadura sobre a barra de compasso nao tem efeito ritmico',
          'Uma ligadura sobre a barra de compasso duplica sempre o andamento',
          'As ligaduras so podem ocorrer dentro de um unico compasso',
        ],
        [
          'A hemiola cria a ilusao de alternancia entre agrupamentos binarios e ternarios',
          'A hemiola e o mesmo que um ritardando',
          'A hemiola significa tocar notas uma oitava acima',
          'A hemiola so ocorre em compasso 4/4',
        ],
      ],
    },
  ],

  // =========================================================================
  // Unidade 7: Intervalos, Triades e Harmonia Diatonica
  // =========================================================================

  // ---- l2u7m1: Qualidade do Intervalo ----
  l2u7m1: [
    {
      // interval_id
      promptTemplate:
        'Identifica o intervalo a partir de {root} no sentido {direction}. Determina tanto o numero como a qualidade.',
      hintTemplate:
        'Conta os nomes das notas a partir de {root} para o numero do intervalo, depois conta os meios-tons para a qualidade (maior, menor, perfeito, aumentado, diminuto).',
    },
  ],

  // ---- l2u7m2: Intervalos Aumentados/Diminutos/Compostos ----
  l2u7m2: [
    {
      // interval_id
      promptTemplate:
        'Identifica este intervalo a partir de {root}. Pode ser aumentado, diminuto ou composto.',
      hintTemplate:
        'Intervalos aumentados sao um meio-tom maiores que perfeitos/maiores. Diminutos sao um meio-tom menores que perfeitos/menores. Intervalos compostos excedem a oitava.',
    },
  ],

  // ---- l2u7m3: Os Quatro Tipos de Triades ----
  l2u7m3: [
    {
      // chord_build
      promptTemplate:
        'Constroi uma triade de {root} {quality}. Seleciona as 3 notas que formam este acorde.',
      hintTemplate:
        'Maior = fundamental + 3.aM(4) + 5.aP(7). Menor = fundamental + 3.am(3) + 5.aP(7). Diminuta = fundamental + 3.am(3) + 5.adim(6). Aumentada = fundamental + 3.aM(4) + 5.aaum(8). Comeca em {root}.',
    },
  ],

  // ---- l2u7m4: Inversoes/Baixo Cifrado ----
  l2u7m4: [
    {
      // multiple_choice
      promptTemplate:
        'Responde a esta pergunta sobre inversoes de acordes e notacao de baixo cifrado.',
      hintTemplate:
        'Estado fundamental = 5/3. 1.a inversao = 6/3 (6). 2.a inversao = 6/4. A nota do baixo determina a inversao.',
      choiceSets: [
        [
          'Na 2.a inversao, a 5.a do acorde esta no baixo',
          'Na 2.a inversao, a 3.a do acorde esta no baixo',
          'Na 2.a inversao, a fundamental esta no baixo',
          'Na 2.a inversao, a 7.a esta no baixo',
        ],
        [
          'Um acorde C/E e C maior em 1.a inversao',
          'Um acorde C/E e E maior em estado fundamental',
          'Um acorde C/E e C maior em 2.a inversao',
          'Um acorde C/E e um acorde de E menor',
        ],
        [
          'Baixo cifrado 6/4 indica 2.a inversao',
          'Baixo cifrado 6/4 indica estado fundamental',
          'Baixo cifrado 6/4 indica 1.a inversao',
          'Baixo cifrado 6/4 indica um acorde de 7.a',
        ],
        [
          'O 6/4 cadencial funciona como ornamentacao da dominante',
          'O 6/4 cadencial funciona como acorde de tonica',
          'O 6/4 cadencial funciona como subdominante',
          'O 6/4 cadencial nunca e usado na musica classica',
        ],
      ],
    },
  ],

  // ---- l2u7m5: Triades Diatonicas/Numeracao Romana ----
  l2u7m5: [
    {
      // chord_build
      promptTemplate:
        'Constroi a triade diatonica sobre {root} tal como aparece em C maior.',
      hintTemplate:
        'Usa apenas as notas de C maior (sem sustenidos nem bemois). A qualidade depende de qual grau da escala {root} ocupa: I, IV, V sao maiores; ii, iii, vi sao menores; vii e diminuta.',
    },
    {
      // multiple_choice
      promptTemplate:
        'Identifica o algarismo romano e a qualidade desta triade diatonica.',
      hintTemplate:
        'Nas tonalidades maiores: I(M) ii(m) iii(m) IV(M) V(M) vi(m) viio(dim). Maiuscula = maior, minuscula = menor, o = diminuta.',
      choiceSets: [
        [
          'O acorde ii numa tonalidade maior e menor',
          'O acorde ii numa tonalidade maior e maior',
          'O acorde ii numa tonalidade maior e diminuto',
          'O acorde ii numa tonalidade maior e aumentado',
        ],
        [
          'O acorde vi numa tonalidade maior e menor',
          'O acorde vi numa tonalidade maior e maior',
          'O acorde vi numa tonalidade maior e diminuto',
          'O acorde vi numa tonalidade maior e aumentado',
        ],
        [
          'O acorde IV numa tonalidade maior e maior',
          'O acorde IV numa tonalidade maior e menor',
          'O acorde IV numa tonalidade maior e aumentado',
          'O acorde IV numa tonalidade maior e diminuto',
        ],
      ],
    },
  ],
};

export default overlay;
