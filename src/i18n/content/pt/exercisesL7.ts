import type { ExerciseLevelOverlay } from '../types';

// ---------------------------------------------------------------------------
// European Portuguese translations for Level 7 hand-authored exercises
// Note names (C, D, E, F#, Bb, etc.) kept in international notation.
// ---------------------------------------------------------------------------

const overlay: ExerciseLevelOverlay = {
  // =========================================================================
  // Unidade 21: Harmonia Jazz
  // =========================================================================

  // ---- l7u21m1: Cifras de Jazz e Extensoes ----

  l7u21m1e1: {
    prompt:
      'Constroi um acorde Cmaj9. Seleciona as 5 notas: fundamental, terca maior, quinta perfeita, setima maior e nona maior.',
    hint: 'Cmaj9 = C, E, G, B, D. Empilhamento: fundamental (C), terca maior (E), quinta perfeita (G), setima maior (B), nona maior (D). Pitch classes: 0, 4, 7, 11, 2.',
  },
  l7u21m1e2: {
    prompt:
      'Constroi um acorde Dm9. Seleciona as 5 notas: fundamental, terca menor, quinta perfeita, setima menor e nona maior.',
    hint: 'Dm9 = D, F, A, C, E. Empilhamento: fundamental (D), terca menor (F), quinta perfeita (A), setima menor (C), nona maior (E). Pitch classes: 2, 5, 9, 0, 4.',
  },
  l7u21m1e3: {
    prompt:
      'Nas cifras de jazz, o que indica "alt" (como em G7alt)?',
    choices: [
      'Um acorde dominante com quintas e nonas alteradas (b5/#5, b9/#9)',
      'Um voicing alternativo de um acorde dominante padrao',
      'Um acorde que alterna entre qualidade maior e menor',
      'Um acorde que pode ser substituido por qualquer outro',
    ],
    hint: 'O sufixo "alt" significa que o acorde tem extensoes alteradas: b9, #9, b5 (ou #11) e #5 (ou b13). Emparelha-se com a escala alterada (superlócria).',
  },

  // ---- l7u21m2: Voicings de Shell ----

  l7u21m2e1: {
    prompt: 'Um voicing de shell tipicamente contem que notas do acorde?',
    choices: [
      'Apenas fundamental, terca e setima — omitindo a quinta e as extensoes',
      'Fundamental, quinta e oitava — omitindo a terca e a setima',
      'Todas as sete notas da escala-mae',
      'Apenas fundamental e quinta — um voicing de power chord',
    ],
    hint: 'Os voicings de shell reduzem o acorde ao essencial: a fundamental define o baixo, a terca determina a qualidade maior/menor e a setima determina o tipo de acorde (maj7, dom7, m7). A quinta e redundante.',
  },
  l7u21m2e2: {
    prompt:
      'Qual e a caracteristica definidora de um acorde dominante alterado?',
    choices: [
      'Tem uma setima dominante com uma ou mais quintas ou nonas cromaticamente alteradas',
      'Substitui a terca por uma quarta suspensa',
      'Usa apenas notas da escala de tons inteiros',
      'Omite a fundamental inteiramente',
    ],
    hint: 'Um acorde dominante alterado mantem a fundamental, terca e b7, mas altera cromaticamente a quinta (b5 ou #5) e a nona (b9 ou #9), criando tensao maxima antes da resolucao.',
  },
  l7u21m2e3: {
    prompt:
      'Na harmonia jazz, qual e a funcao tipica de um acorde sus4 (ex: G7sus4)?',
    choices: [
      'Atrasa a resolucao substituindo a terca por uma quarta, criando antecipacao antes do V7',
      'Funciona sempre como acorde de tonica',
      'Atua como substituto do acorde ii',
      'E usado exclusivamente no jazz modal',
    ],
    hint: 'Um acorde sus4 substitui a terca por uma quarta, removendo a qualidade maior/menor. No jazz, G7sus4 precede frequentemente G7 numa resolucao V7sus4 para V7 para I, atrasando a sensivel.',
  },

  // ---- l7u21m3: Progressao ii-V-I ----

  l7u21m3e1: {
    prompt:
      'Constroi o acorde ii7 em Do maior (Dm7). Seleciona as 4 notas: D, F, A, C.',
    hint: 'Dm7 = D, F, A, C. Fundamental (D), terca menor (F), quinta perfeita (A), setima menor (C). Pitch classes: 2, 5, 9, 0.',
  },
  l7u21m3e2: {
    prompt:
      'Constroi o acorde V7 em Do maior (G7). Seleciona as 4 notas: G, B, D, F.',
    hint: 'G7 = G, B, D, F. Fundamental (G), terca maior (B), quinta perfeita (D), setima menor (F). Pitch classes: 7, 11, 2, 5.',
  },
  l7u21m3e3: {
    prompt: 'Por que e a ii-V-I a progressao mais importante no jazz?',
    choices: [
      'Combina as funcoes de subdominante, dominante e tonica no movimento cadencial mais forte possivel',
      'Foi inventada por Duke Ellington e tornou-se um padrao do jazz',
      'Usa apenas tres notas no total entre os tres acordes',
      'Evita qualquer dissonancia, facilitando a improvisacao',
    ],
    hint: 'A ii-V-I encapsula o movimento harmonico completo: preparacao (ii), tensao (V), resolucao (I). Quase todos os standards de jazz contem multiplas progressoes ii-V-I em varias tonalidades.',
  },

  // ---- l7u21m4: Substituicao Tritonica ----

  l7u21m4e1: {
    prompt:
      'Constroi a substituicao tritonica de G7: Db7. Seleciona as 4 notas: Db, F, Ab, Cb.',
    hint: 'Db7 = Db, F, Ab, Cb. A substituicao tritonica partilha o mesmo intervalo de tritono (F-Cb enarmonico de F-B) do acorde G7 original. Pitch classes: 1, 5, 8, 11.',
  },
  l7u21m4e2: {
    prompt: 'Qual e o principio por detras da substituicao tritonica?',
    choices: [
      'Dois acordes de setima dominante a um tritono de distancia partilham a mesma terca e setima (enarmonicamente), por isso um pode substituir o outro',
      'Qualquer acorde pode ser substituido pelo acorde a um tritono de distancia independentemente da qualidade',
      'A substituicao tritonica move sempre a fundamental um tom acima',
      'Substitui o acorde V pelo acorde IV',
    ],
    hint: 'G7 tem B e F como terca e setima. Db7 tem F e Cb (=B) como terca e setima. Os guide tones sao identicos (enarmonicamente), por isso Db7 pode resolver para C tal como G7.',
  },
  l7u21m4e3: {
    prompt: 'Na progressao Dm7 - Db7 - Cmaj7, o que e o acorde Db7?',
    choices: [
      'Uma substituicao tritonica de G7, criando uma linha cromatica de baixo (D - Db - C)',
      'Um acorde emprestado de Reb maior',
      'O acorde napolitano em primeira inversao',
      'Um acorde diminuto de passagem reescrito enarmonicamente',
    ],
    hint: 'Db7 substitui G7 (o V7). O baixo desce cromaticamente: D (ii) - Db (sub tritonica do V) - C (I). Esta conducao de vozes suave e um dos principais beneficios das substituicoes tritonicas.',
  },

  // ---- l7u21m5: Formas de Blues ----

  l7u21m5e1: {
    prompt:
      'Qual e a progressao padrao para um blues basico de 12 compassos na tonalidade de Do?',
    choices: [
      'I7-I7-I7-I7 | IV7-IV7-I7-I7 | V7-IV7-I7-V7 (forma C7-F7-G7)',
      'I-IV-V-I | I-IV-V-I | I-IV-V-I (tres acordes simples repetidos)',
      'ii-V-I-vi | ii-V-I-vi | ii-V-I-vi (turnaround jazz repetido)',
      'I-V-vi-IV | I-V-vi-IV | I-V-vi-IV (loop pop repetido)',
    ],
    hint: 'O blues de 12 compassos segue um padrao especifico ao longo de 12 compassos: 4 compassos de I7, 2 de IV7, 2 de I7, depois V7-IV7-I7-V7 (turnaround). Todos os acordes sao de setima dominante.',
  },
  l7u21m5e2: {
    prompt:
      'Por que e que o acorde I no blues usa qualidade de setima dominante (ex: C7) em vez de setima maior?',
    choices: [
      'A tonalidade blues usa a b7 como blue note; a setima dominante em todos os acordes e uma caracteristica definidora do estilo',
      'Porque os musicos de blues nao conheciam os acordes de setima maior',
      'A setima dominante e mais facil de tocar na guitarra',
      'E uma convencao notacional que nao afeta o som',
    ],
    hint: 'No blues, a b7 faz parte da escala blues e do som geral do blues. Todos os acordes — I, IV e V — usam qualidade de setima dominante. Isto desafia a teoria classica, onde I7 implicaria um dominante secundario.',
  },
  l7u21m5e3: {
    prompt:
      'O que e normalmente adicionado ao blues basico de 12 compassos para criar um "jazz blues"?',
    choices: [
      'Turnarounds ii-V, substituicoes tritonicas e acordes diminutos de passagem',
      'Apenas acordes de setima maior substituem todas as setimas dominantes',
      'Uma mudanca de tonalidade a cada 4 compassos',
      'Exclusivamente acordes menores ao longo de toda a forma',
    ],
    hint: 'O jazz blues enriquece a forma basica inserindo progressoes ii-V (ex: compassos 9-10 tornam-se ii-V em vez de apenas V-IV), adicionando substituicoes tritonicas e usando turnarounds rapidos ii-V para criar movimento harmonico.',
  },

  // ---- l7u21m6: Rhythm Changes ----

  l7u21m6e1: {
    prompt: 'Qual e a forma dos "rhythm changes" no jazz?',
    choices: [
      'AABA — 32 compassos com uma ponte de 8 compassos',
      'ABAB — seccoes alternadas de 8 compassos',
      'Blues de 12 compassos repetido com variacoes',
      'Forma continua sem seccoes repetidas',
    ],
    hint: 'Os rhythm changes seguem uma forma AABA de 32 compassos: as seccoes A usam progressoes baseadas em I-vi-ii-V, e a seccao B (ponte) usa tipicamente um ciclo de dominantes. Baseado nas mudancas harmonicas de uma famosa peca de Gershwin.',
  },
  l7u21m6e2: {
    prompt:
      'Qual e uma progressao tipica de turnaround no final de uma seccao A nos rhythm changes?',
    choices: [
      'I - vi - ii - V (ou I - VI7 - ii - V7)',
      'IV - V - I - I',
      'I - IV - I - V',
      'vi - IV - I - V',
    ],
    hint: 'O turnaround (I-vi-ii-V) recicla para o inicio da forma. No jazz, o vi e frequentemente substituido por VI7 (um dominante secundario), e ainda mais enriquecido com substituicoes tritonicas e acordes de passagem.',
  },
  l7u21m6e3: {
    prompt:
      'Que dispositivo harmonico e comummente usado na ponte dos rhythm changes?',
    choices: [
      'Um ciclo de acordes de setima dominante a descer por tons ou a mover-se pelo ciclo de quintas',
      'Uma nota pedal sustida sem mudancas de acordes',
      'Uma repeticao exata da seccao A noutra tonalidade',
      'Uma serie dodecafonica',
    ],
    hint: 'A ponte apresenta tipicamente uma cadeia de setimas dominantes: III7-VI7-II7-V7 (em Sib: D7-G7-C7-F7). Cada dominante resolve uma quinta abaixo para o seguinte, criando forte impulso para a frente.',
  },

  // =========================================================================
  // Unidade 22: Jazz Avancado, Modal, Pop
  // =========================================================================

  // ---- l7u22m1: Teoria Acorde-Escala ----

  l7u22m1e1: {
    prompt:
      'Constroi Re dorico — a escala de acorde para Dm7 numa ii-V-I em Do. Seleciona as 7 notas.',
    hint: 'Re dorico: D, E, F, G, A, B, C. E o 2.o modo de Do maior. A sexta natural (B) distingue-o do menor natural (que tem Bb). Pitch classes: 2, 4, 5, 7, 9, 11, 0.',
  },
  l7u22m1e2: {
    prompt:
      'Constroi Sol mixolidio — a escala de acorde para G7 numa ii-V-I em Do. Seleciona as 7 notas.',
    hint: 'Sol mixolidio: G, A, B, C, D, E, F. E o 5.o modo de Do maior. A b7 (F em vez de F#) define o som dominante. Pitch classes: 7, 9, 11, 0, 2, 4, 5.',
  },
  l7u22m1e3: {
    prompt: 'Qual e o principio fundamental da teoria acorde-escala?',
    choices: [
      'Cada acorde numa progressao tem uma escala correspondente cujas notas estao todas disponiveis para melodia e improvisacao',
      'Cada acorde so pode usar notas de uma escala fixa ao longo de toda a peca',
      'As escalas constroem-se empilhando acordes uns sobre os outros',
      'A teoria acorde-escala aplica-se apenas a tonalidades maiores',
    ],
    hint: 'A teoria acorde-escala emparelha cada acorde com uma escala-mae. Sobre Dm7, toca Re dorico; sobre G7, toca Sol mixolidio; sobre Cmaj7, toca Do jonio. A escala muda com cada acorde.',
  },

  // ---- l7u22m2: Estruturas Superiores ----

  l7u22m2e1: {
    prompt: 'O que e uma triade de estrutura superior nos voicings de jazz?',
    choices: [
      'Uma triade tocada no registo agudo sobre uma fundamental e setima diferentes no baixo, produzindo extensoes e alteracoes',
      'As tres notas superiores de qualquer acorde de setima',
      'Uma triade tocada uma oitava acima do escrito',
      'Uma tecnica de analise estrutural para identificar formas',
    ],
    hint: 'As estruturas superiores sobrepõem uma triade simples (ex: Re maior) sobre uma nota de baixo e setima (ex: C e Bb), criando extensoes complexas. D/C7 resulta em C7 com nona, #11 e decima terceira.',
  },
  l7u22m2e2: {
    prompt: 'O que e rearmonizacao no jazz?',
    choices: [
      'Substituir os acordes originais de uma melodia por acordes diferentes que continuam a suportar as notas melodicas',
      'Tocar os mesmos acordes mas noutra tonalidade',
      'Adicionar vozes harmonicas a uma melodia a solo',
      'Remover todos os acordes e tocar a melodia sem acompanhamento',
    ],
    hint: 'A rearmonizacao altera o contexto harmonico sob uma melodia. As tecnicas incluem substituicao tritonica, mudancas de qualidade de acordes, abordagens cromaticas e movimento de estrutura constante.',
  },
  l7u22m2e3: {
    prompt: 'O que e uma linha cromatica de baixo na harmonia jazz?',
    choices: [
      'Uma linha de baixo que se move por meios-tons, frequentemente conseguida atraves de inversoes, acordes de passagem e substituicoes tritonicas',
      'Uma linha de baixo que usa apenas a escala cromatica de 12 notas sem repeticao',
      'Uma linha de baixo que toca apenas nas notas cromaticas (teclas pretas)',
      'Uma linha de baixo que se move em movimento contrario a melodia',
    ],
    hint: 'O movimento cromatico do baixo cria conducao de vozes suave: ex: C - B - Bb - A (Cmaj7 - B7 ou G/B - Bb7 ou C7/Bb - Am7). Cada acorde e escolhido para suportar uma descida do baixo por meio-tom.',
  },

  // ---- l7u22m3: Mudancas de Coltrane ----

  l7u22m3e1: {
    prompt:
      'Que movimento de centros tonais define as "mudancas de Coltrane" (como em Giant Steps)?',
    choices: [
      'Centros tonais a moverem-se por tercas maiores, dividindo a oitava em tres partes iguais',
      'Centros tonais a moverem-se por segundas menores cromaticamente',
      'Centros tonais a moverem-se por quintas perfeitas ao longo do ciclo',
      'Centros tonais a alternarem entre duas tonalidades a um tritono de distancia',
    ],
    hint: 'As mudancas de Coltrane percorrem tres centros tonais a uma terca maior de distancia (ex: Si, Sol, Mib). Estas tres tonalidades dividem a oitava simetricamente em tres segmentos iguais de 4 semitons cada.',
  },
  l7u22m3e2: {
    prompt:
      'Nas mudancas de Coltrane, como sao tipicamente abordados os centros tonais?',
    choices: [
      'Cada centro tonal e precedido pelo seu proprio acorde V7, criando movimento rapido ii-V ou V-I',
      'Os centros tonais sao ligados apenas por acordes diminutos de passagem',
      'Modulacao direta sem qualquer preparacao',
      'Cada tonalidade e abordada por uma cadencia de engano a partir da tonalidade anterior',
    ],
    hint: 'Coltrane prepara cada tonica com o seu dominante: ex: Bmaj7 - D7 - Gmaj7 - Bb7 - Ebmaj7. O D7 e o V7 de Sol, Bb7 e o V7 de Mib. Isto cria movimento constante dominante-tonica.',
  },
  l7u22m3e3: {
    prompt: 'O que e "estrutura constante" na harmonia jazz?',
    choices: [
      'Mover a mesma qualidade de acorde em paralelo atraves de um padrao de fundamentais nao diatonico, mantendo a forma do voicing',
      'Usar o mesmo acorde durante uma musica inteira',
      'Um metodo de analise estrutural para identificar motivos melodicos',
      'Construir todos os acordes a partir das mesmas quatro notas',
    ],
    hint: 'A estrutura constante move um tipo de acorde fixo (ex: maj7) atraves de uma sequencia de fundamentais (ex: Cmaj7 - Ebmaj7 - Gbmaj7 - Amaj7). A forma do voicing mantem-se identica enquanto o padrao de fundamentais cria interesse harmonico.',
  },

  // ---- l7u22m4: Harmonia Modal ----

  l7u22m4e1: {
    prompt:
      'Constroi o modo Re dorico. Este modo cria um som menor com uma sexta natural caracteristica.',
    hint: 'Re dorico: D, E, F, G, A, B, C. Comparado com Re menor natural, o 6.o grau e elevado (Si natural em vez de Sib). Pitch classes: 2, 4, 5, 7, 9, 11, 0.',
  },
  l7u22m4e2: {
    prompt:
      'Constroi o modo Mi frigio. Este modo tem um meio-tom distinto da fundamental ate ao 2.o grau.',
    hint: 'Mi frigio: E, F, G, A, B, C, D. A b2 (Fa natural, um meio-tom acima de Mi) da ao frigio o seu carater escuro e com sabor espanhol. Pitch classes: 4, 5, 7, 9, 11, 0, 2.',
  },
  l7u22m4e3: {
    prompt:
      'Como difere a harmonia modal da harmonia tonal (funcional)?',
    choices: [
      'A harmonia modal enfatiza um centro tonal estatico e evita resolucao dominante-tonica, deixando a cor do modo definir o som',
      'A harmonia modal usa mais acordes do que a harmonia tonal',
      'A harmonia modal usa sempre escalas menores exclusivamente',
      'Nao ha diferenca funcional; sao termos intercambiaveis',
    ],
    hint: 'Na harmonia tonal, os acordes tem funcoes (tonica, dominante, subdominante) que impulsionam a resolucao. Na harmonia modal, um modo colora um vamp ou pedal estatico, e as progressoes evitam cadencias V-I que estabeleceriam uma tonalidade.',
  },

  // ---- l7u22m5: Voicings Quartais/Quintais ----

  l7u22m5e1: {
    prompt: 'O que define um voicing quartal?',
    choices: [
      'Notas empilhadas em intervalos de quartas perfeitas em vez de tercas',
      'Um voicing que usa quatro notas de um acorde de setima',
      'Um acorde tocado em quatro oitavas simultaneamente',
      'Uma tecnica de voicing exclusiva de quartetos de cordas',
    ],
    hint: 'A harmonia quartal empilha quartas (ex: C-F-Bb-Eb). Isto cria um som ambiguo e aberto que evita qualidade maior/menor clara. McCoy Tyner popularizou os voicings quartais no jazz modal.',
  },
  l7u22m5e2: {
    prompt: 'Como difere a harmonia quintal da harmonia quartal?',
    choices: [
      'A harmonia quintal empilha quintas perfeitas em vez de quartas, produzindo um som igualmente aberto mas ligeiramente diferente',
      'Quintal usa cinco notas enquanto quartal usa quatro',
      'Quintal e usada no pop enquanto quartal e usada no jazz',
      'Sao identicas ja que uma quarta invertida e uma quinta',
    ],
    hint: 'Embora uma quarta invertida seja uma quinta, o som do voicing difere consoante o registo e o espacamento. Os voicings quintais (ex: C-G-D-A) criam sonoridades amplas e brilhantes. Ambos evitam a harmonia tradicional tercial (baseada em tercas).',
  },
  l7u22m5e3: {
    prompt:
      'Que papel desempenham os pedais na harmonia modal e quartal?',
    choices: [
      'Ancoram o centro tonal, permitindo que as cores modais se desenvolvam sem progressoes de acordes funcionais',
      'Fornecem subdivisao ritmica para o ensemble',
      'Sao usados apenas na musica classica indiana, nao no jazz',
      'Criam funcao dominante ao sustentar a quinta da tonalidade',
    ],
    hint: 'Um pedal (nota de baixo sustida ou quinta aberta) estabelece um centro modal. Sobre um pedal de Re, podes explorar livremente Re dorico, Re mixolidio ou outros modos sem que a harmonia puxe para a resolucao.',
  },

  // =========================================================================
  // Unidade 23: Harmonia Pop e Taxonomia
  // =========================================================================

  // ---- l7u23m1: Progressoes Pop ----

  l7u23m1e1: {
    prompt:
      'Que progressao e frequentemente chamada o "loop pop de quatro acordes"?',
    choices: [
      'I - V - vi - IV',
      'I - IV - V - I',
      'ii - V - I - vi',
      'I - bVII - IV - I',
    ],
    hint: 'I-V-vi-IV (em Do: C-G-Am-F) e uma das progressoes pop mais comuns. Repete-se indefinidamente e suporta tanto melodias edificantes como melancolicas dependendo de qual acorde a melodia enfatiza.',
  },
  l7u23m1e2: {
    prompt: 'O que e o sistema de numeros de Nashville?',
    choices: [
      'Uma notacao abreviada que usa numeros arabicos (1-7) para graus da escala, permitindo transposicao instantanea para qualquer tonalidade',
      'Um metodo de contar compassos em gravacoes de musica country',
      'Um sistema de afinacao desenvolvido em estudios de gravacao de Nashville',
      'Um sistema de notacao ritmica para bateristas de sessao',
    ],
    hint: 'O sistema de numeros de Nashville escreve acordes como numeros de graus da escala (1=I, 4=IV, 5=V). Uma cifra a ler "1-5-6m-4" pode ser tocada em qualquer tonalidade instantaneamente. E usado extensivamente em sessoes de estudio de Nashville.',
  },
  l7u23m1e3: {
    prompt: 'O que e um "loop pop" e por que e eficaz?',
    choices: [
      'Uma progressao curta de acordes que se repete (normalmente 4 compassos) que fornece continuidade harmonica enquanto a melodia e a letra evoluem',
      'Um loop de audio digital amostrado de um exito existente',
      'Uma tecnica de producao especifica que repete a melodia do refrrao',
      'Um riff de baixo que percorre todas as 12 notas',
    ],
    hint: 'Os loops pop (como I-V-vi-IV ou vi-IV-I-V) repetem um pequeno padrao harmonico ao longo da musica. A harmonia estatica permite que a melodia, o ritmo e a producao carreguem o interesse musical, o que se adequa a formas verso/refrrao.',
  },

  // ---- l7u23m2: Mistura Modal no Pop ----

  l7u23m2e1: {
    prompt:
      'Quando uma musica pop numa tonalidade maior usa um acorde bVII (ex: Sib maior na tonalidade de Do), que tecnica esta a ser usada?',
    choices: [
      'Mistura modal (emprestimo do paralelo menor/modo mixolidio)',
      'Uma modulacao para a tonalidade de Sib maior',
      'Um dominante secundario a apontar para o acorde IV',
      'Uma reescrita enarmonica do acorde vii diminuto',
    ],
    hint: 'bVII e emprestado do mixolidio de Do ou de Do menor natural. Em Do maior, Sib nao e diatonico, mas empresta-lo cria um som rock/pop. Isto e mistura modal (tambem chamada intercambio modal ou acordes emprestados).',
  },
  l7u23m2e2: {
    prompt:
      'Que efeito emocional cria tipicamente uma relacao de mediante cromatica (ex: Do maior para Lab maior) na musica pop?',
    choices: [
      'Uma mudanca dramatica e cinematica de cor — inesperada mas suave devido a notas partilhadas ou proximamente relacionadas',
      'Uma sensacao de regresso a casa, a tonica',
      'Nenhum efeito notavel ja que os acordes sao proximamente relacionados',
      'Um choque dissonante que soa como um erro',
    ],
    hint: 'As mediantes cromaticas partilham uma nota comum (Do maior e Lab maior partilham Do e estao na fronteira Mib/Mi). A fundamental move-se uma terca mas a mudanca de qualidade cria uma alteracao de cor rica e inesperada, frequentemente ouvida em bandas sonoras e momentos pop dramaticos.',
  },
  l7u23m2e3: {
    prompt:
      'O que e uma modulacao direta (ou abrupta) na composicao pop?',
    choices: [
      'Mudar de tonalidade sem acorde pivot ou preparacao — a nova tonalidade simplesmente comeca',
      'Uma mudanca gradual de tonalidade que demora varios compassos a completar',
      'Uma modulacao que sobe sempre um meio-tom',
      'Usar uma ii-V-I para fazer a transicao suave entre tonalidades',
    ],
    hint: 'A modulacao direta (tambem chamada abrupta ou de frase) simplesmente comeca uma nova seccao na nova tonalidade sem preparacao harmonica. Comum no pop: o ultimo refrrao salta um meio-tom ou um tom para mais energia.',
  },

  // ---- l7u23m3: Modos da Menor Melodica ----

  l7u23m3e1: {
    prompt:
      'Constroi a escala de Do menor melodica (forma ascendente). Seleciona as 7 notas.',
    hint: 'Do menor melodica: C, D, Eb, F, G, A, B. E como Do maior com uma b3. A sexta natural (A) e a setima natural (B) distinguem-na da menor natural e da menor harmonica. Pitch classes: 0, 2, 3, 5, 7, 9, 11.',
  },
  l7u23m3e2: {
    prompt:
      'Constroi a escala alterada de Sol (7.o modo de Lab menor melodica). Seleciona as 7 notas.',
    hint: 'Sol alterada (superlócria): G, Ab, Bb, Cb, Db, Eb, F. Todas as notas nao essenciais estao alteradas: b9, #9 (=b3), b5 (#11), b13 (#5). Pitch classes: 7, 8, 10, 11, 1, 3, 5.',
  },
  l7u23m3e3: {
    prompt:
      'A escala lidia dominante (4.o modo da menor melodica) e comummente usada sobre que tipo de acorde?',
    choices: [
      'Acordes de setima dominante com #11, especialmente substituicoes tritonicas e dominantes nao resolutivos',
      'Acordes m7 numa ii-V-I',
      'Acordes maj7 com funcao de tonica',
      'Acordes diminutos de passagem',
    ],
    hint: 'A lidia dominante (ex: C D E F# G A Bb) combina uma #4 (lidia) com uma b7 (dominante). Encaixa em acordes dominantes 7(#11) e e a escala de referencia para acordes de substituicao tritonica.',
  },

  // ---- l7u23m4: Menor Harmonica/Simetricas/Mundo ----

  l7u23m4e1: {
    prompt:
      'Constroi a escala de Do tons inteiros. Esta escala simetrica de 6 notas tem intervalos de tom iguais ao longo de toda a escala.',
    hint: 'Do tons inteiros: C, D, E, F#, G#, A#. Cada intervalo e um tom (2 semitons). Existem apenas duas escalas de tons inteiros unicas (a outra comeca em Db). Pitch classes: 0, 2, 4, 6, 8, 10.',
  },
  l7u23m4e2: {
    prompt:
      'Constroi a escala diminuta meio-tom/tom de Do. Esta escala simetrica de 8 notas alterna meios-tons e tons.',
    hint: 'Do diminuta meio-tom/tom: C, Db, Eb, E, F#, G, A, Bb. Alterna meio-tom, tom ao longo de toda a escala. Existem apenas tres escalas diminutas distintas. Pitch classes: 0, 1, 3, 4, 6, 7, 9, 10.',
  },
  l7u23m4e3: {
    prompt: 'Qual e a propriedade definidora de uma escala simetrica?',
    choices: [
      'Divide a oitava em segmentos iguais usando um padrao de intervalos repetitivo, produzindo transposicoes limitadas',
      'Tem a mesma forma ascendente e descendente',
      'Contem exatamente 7 notas como as escalas diatonicas',
      'Soa igual tocada de frente para tras ou de tras para a frente',
    ],
    hint: 'As escalas simetricas repetem um padrao fixo de intervalos (ex: tons inteiros = T-T-T-T-T-T; diminuta = mT-T-mT-T-mT-T-mT-T). Esta simetria significa que tem menos transposicoes unicas do que as escalas assimetricas.',
  },

  // ---- l7u23m5: Taxonomia Completa de Acordes ----

  l7u23m5e1: {
    prompt:
      'Quantos tipos basicos de triade existem na teoria musical ocidental?',
    choices: [
      '4 — maior, menor, diminuta e aumentada',
      '2 — apenas maior e menor',
      '3 — maior, menor e diminuta',
      '7 — uma para cada grau da escala',
    ],
    hint: 'Existem exatamente 4 tipos de triade, definidos pela terca e pela quinta: maior (3.aM+5.aP), menor (3.am+5.aP), diminuta (3.am+5.adim) e aumentada (3.aM+5.aaum). Todas as outras designacoes triadicas sao variantes destas quatro.',
  },
  l7u23m5e2: {
    prompt: 'O que faz de um acorde um acorde "com extensoes"?',
    choices: [
      'Inclui notas alem da setima — a nona, decima primeira ou decima terceira — construidas continuando a empilhar tercas',
      'Usa mais de 4 notas de qualquer fonte',
      'Abrange mais de uma oitava no instrumento',
      'Acrescenta notas cromaticas nao encontradas na escala-mae',
    ],
    hint: 'Os acordes com extensoes continuam o principio tercial (empilhamento de tercas) alem da setima: nona = oitava + segunda, decima primeira = oitava + quarta, decima terceira = oitava + sexta. Um acorde de decima terceira contem teoricamente todos os 7 graus da escala.',
  },
  l7u23m5e3: {
    prompt:
      'Que agrupamento organiza corretamente as principais familias de qualidade de acordes?',
    choices: [
      'Familia maior (maj, maj7, maj9), familia menor (m, m7, m9), familia dominante (7, 9, 13), familia diminuta (dim, dim7), familia aumentada (aug, aug7)',
      'Acordes consonantes (maior, menor) e acordes dissonantes (todos os acordes de setima e alem)',
      'Familia diatonica (I, ii, iii, IV, V, vi) e familia cromatica (tudo o resto)',
      'Acordes simples (triades) e acordes complexos (tudo com mais de 3 notas)',
    ],
    hint: 'As familias de qualidade de acorde agrupam acordes pelo seu som essencial: a familia maior tem terca maior e setima maior; a familia dominante tem terca maior e setima menor; a familia menor tem terca menor. As extensoes expandem cada familia.',
  },
};

export default overlay;
