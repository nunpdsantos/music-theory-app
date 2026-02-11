import type { ExerciseLevelOverlay } from '../types';

// ---------------------------------------------------------------------------
// European Portuguese translations for Level 3 hand-authored exercises
// Note names (C, D, E, F#, Bb, etc.) kept in international notation.
// ---------------------------------------------------------------------------

const overlay: ExerciseLevelOverlay = {
  // =========================================================================
  // Unidade 9: Acordes de Setima e Harmonia Diatonica
  // =========================================================================

  // ---- l3u9m1: Acordes de Setima — Cinco Qualidades ----

  l3u9m1e1: {
    prompt:
      'Constroi um acorde de Cmaj7. Seleciona as 4 notas: fundamental, 3.a maior, 5.a perfeita e 7.a maior.',
    hint: 'Cmaj7 = C, E, G, B. Uma triade maior (C-E-G) mais uma 7.a maior (B, 11 semitons acima da fundamental).',
  },
  l3u9m1e2: {
    prompt:
      'Constroi um acorde de Dm7. Seleciona as 4 notas: fundamental, 3.a menor, 5.a perfeita e 7.a menor.',
    hint: 'Dm7 = D, F, A, C. Uma triade menor (D-F-A) mais uma 7.a menor (C, 10 semitons acima da fundamental).',
  },
  l3u9m1e3: {
    prompt: 'Qual qualidade de acorde de setima tem uma triade maior com uma 7.a menor?',
    choices: [
      'Setima da dominante',
      'Setima maior',
      'Setima menor',
      'Setima meio-diminuta',
    ],
    hint: 'A setima da dominante (ex.: G7) combina uma triade maior com uma 7.a menor. E o unico tipo de acorde de setima com esta combinacao, criando forte tensao que resolve para a tonica.',
  },
  l3u9m1e4: {
    prompt: 'Qual e a diferenca entre um acorde de setima meio-diminuto e um totalmente diminuto?',
    choices: [
      'O meio-diminuto tem 7.a menor; o totalmente diminuto tem 7.a diminuta (duplo bemol)',
      'O meio-diminuto tem 7.a maior; o totalmente diminuto tem 7.a menor',
      'Usam triades diferentes: o meio-diminuto e menor, o totalmente diminuto e diminuto',
      'Nao ha diferenca; sao o mesmo acorde',
    ],
    hint: 'Ambos partilham uma triade diminuta (fundamental, 3.am, 5.adim). O meio-diminuto acrescenta uma 7.a menor (10 semitons), enquanto o totalmente diminuto acrescenta uma 7.a diminuta (9 semitons).',
  },
  l3u9m1e_ear1: {
    prompt: 'Ouve este acorde e identifica a sua qualidade.',
    choices: [
      'Maior',
      'Menor',
      'Diminuto',
      'Aumentado',
    ],
    hint: 'Os acordes maiores soam brilhantes e alegres. Este acorde e construido sobre C com uma 3.a maior e 5.a perfeita.',
  },
  l3u9m1e_ear2: {
    prompt: 'Ouve este acorde e identifica a sua qualidade.',
    choices: [
      'Maior',
      'Menor',
      'Diminuto',
      'Aumentado',
    ],
    hint: 'Os acordes menores soam mais escuros e melancolicos do que os maiores. A 3.a e baixada meio-tom.',
  },
  l3u9m1e_ear3: {
    prompt: 'Ouve este acorde e identifica a sua qualidade.',
    choices: [
      'Maior',
      'Menor',
      'Diminuto',
      'Aumentado',
    ],
    hint: 'Este acorde tem a qualidade brilhante e estavel de uma triade maior construida sobre D.',
  },
  l3u9m1e_ear4: {
    prompt: 'Ouve este acorde e identifica a sua qualidade.',
    choices: [
      'Maior',
      'Menor',
      'Diminuto',
      'Aumentado',
    ],
    hint: 'Este acorde tem a qualidade sombria e introspetiva de uma triade menor construida sobre E.',
  },

  // ---- l3u9m2: Inversoes de Acordes de Setima ----

  l3u9m2e1: {
    prompt: 'Qual simbolo de baixo cifrado representa um acorde de setima em estado fundamental?',
    choices: [
      '7 (abreviatura de 7/5/3)',
      '6/5',
      '4/3',
      '4/2',
    ],
    hint: 'Em estado fundamental, os intervalos acima do baixo sao 3.a, 5.a e 7.a. A cifragem completa 7/5/3 e abreviada para apenas 7.',
  },
  l3u9m2e2: {
    prompt: 'Qual simbolo de baixo cifrado representa um acorde de setima na primeira inversao?',
    choices: [
      '6/5 (abreviatura de 6/5/3)',
      '7',
      '4/3',
      '4/2',
    ],
    hint: 'A primeira inversao coloca a 3.a do acorde no baixo. Os intervalos caracteristicos acima do baixo sao uma 6.a e uma 5.a, resultando no simbolo 6/5.',
  },
  l3u9m2e3: {
    prompt: 'Qual simbolo de baixo cifrado representa um acorde de setima na terceira inversao?',
    choices: [
      '4/2 (abreviatura de 6/4/2)',
      '6/5',
      '4/3',
      '7',
    ],
    hint: 'A terceira inversao coloca a 7.a do acorde no baixo. Os intervalos acima do baixo sao uma 2.a e uma 4.a, resultando no simbolo 4/2 (ou 2).',
  },

  // ---- l3u9m3: Acordes de Setima Diatonicos em Maior ----

  l3u9m3e1: {
    prompt:
      'Constroi um acorde de G7 (setima da dominante). Este e o V7 em Do maior. Seleciona as 4 notas.',
    hint: 'G7 = G, B, D, F. Uma triade maior (G-B-D) mais uma 7.a menor (F, 10 semitons acima de G). O tritono B-F impulsiona a resolucao para C.',
  },
  l3u9m3e2: {
    prompt:
      'Constroi um acorde de Am7. Este e o vi7 em Do maior. Seleciona as 4 notas.',
    hint: 'Am7 = A, C, E, G. Uma triade menor (A-C-E) mais uma 7.a menor (G, 10 semitons acima de A).',
  },
  l3u9m3e3: {
    prompt: 'O acorde V7 contem um tritono. Quais duas notas o formam na tonalidade de Do maior?',
    choices: [
      'B e F -- a sensivel e o 4.o grau da escala',
      'G e D -- a fundamental e a 5.a do acorde V',
      'C e F# -- a tonica e uma nota cromatica',
      'E e Bb -- a 3.a e um bemol emprestado',
    ],
    hint: 'Em G7 (G-B-D-F), o tritono esta entre B (a 3.a) e F (a 7.a), abrangendo 6 semitons. B resolve para cima, para C, enquanto F resolve para baixo, para E, criando a resolucao V7-I.',
  },

  // ---- l3u9m4: Acordes de Setima Diatonicos em Menor ----

  l3u9m4e1: {
    prompt:
      'Constroi um acorde de E7 (V7 em La menor, usando a menor harmonica). Seleciona as 4 notas.',
    hint: 'E7 = E, G#, B, D. O G# provem do 7.o grau elevado de La menor harmonica. Este acorde de setima da dominante fornece a sensivel (G#) que resolve para A.',
  },
  l3u9m4e2: {
    prompt:
      'Em La menor natural, o acorde construido sobre o 7.o grau (G) e uma triade maior. Porque muda isto na menor harmonica?',
    choices: [
      'Elevar o 7.o grau (G para G#) transforma VII em viio, uma triade diminuta',
      'O acorde do 7.o grau e sempre diminuto independentemente da forma da escala menor',
      'A menor harmonica baixa o 7.o grau, criando um acorde diminuto',
      'A qualidade do acorde nao muda entre menor natural e menor harmonica',
    ],
    hint: 'Em La menor natural, VII e G-B-D (maior). Elevar G para G# na menor harmonica da G#-B-D, que e diminuto (fundamental a 3.a = 3.am, fundamental a 5.a = 5.adim).',
  },
  l3u9m4e3: {
    prompt:
      'Qual e a qualidade do acorde de setima construido sobre o 2.o grau da menor harmonica (ii em La menor = B)?',
    choices: [
      'Setima meio-diminuta (m7b5)',
      'Setima menor',
      'Setima totalmente diminuta',
      'Setima da dominante',
    ],
    hint: 'Em La menor harmonica, o ii7 e B-D-F-A: uma triade diminuta (B-D-F) mais uma 7.a menor (A). Esta combinacao chama-se meio-diminuta, escrita Bm7b5 ou B\u00f8.',
  },

  // =========================================================================
  // Unidade 10: Conducao de Vozes e Escrita a Partes
  // =========================================================================

  // ---- l3u10m1: Nocoes Basicas de SATB ----

  l3u10m1e1: {
    prompt: 'Qual e a tessitura padrao para a voz de soprano na escrita SATB?',
    choices: [
      'C4 a G5 (Do central ate ao Sol uma oitava e uma quinta acima)',
      'C3 a G4',
      'G3 a D5',
      'C5 a C7',
    ],
    hint: 'O soprano e a voz mais aguda em SATB. A sua tessitura pratica vai aproximadamente de C4 (Do central) a G5. Ultrapassar esta tessitura torna a parte dificil de cantar.',
  },
  l3u10m1e2: {
    prompt: 'Na escrita SATB, qual tipo de movimento entre duas vozes e geralmente proibido?',
    choices: [
      'Movimento paralelo em 5.as ou 8.as perfeitas',
      'Movimento contrario em qualquer intervalo',
      'Movimento obliquo em que uma voz se mantem na mesma nota',
      'Movimento direto em 3.as',
    ],
    hint: 'As 5.as e 8.as perfeitas paralelas sao evitadas porque comprometem a independencia das vozes. Cada voz deve soar como a sua propria linha melodica, e paralelas perfeitas fazem as vozes fundirem-se.',
  },
  l3u10m1e3: {
    prompt: 'Em triades em estado fundamental, qual nota do acorde deve ser tipicamente dobrada?',
    choices: [
      'A fundamental do acorde',
      'A 3.a do acorde',
      'A 5.a do acorde',
      'Qualquer nota do acorde igualmente',
    ],
    hint: 'Dobrar a fundamental reforca a identidade do acorde e e a escolha mais segura. Evita dobrar a sensivel (7.o grau) ou outras notas com tendencia de resolucao, pois cria problemas na resolucao.',
  },

  // ---- l3u10m2: Quintas e Oitavas Paralelas Proibidas ----

  l3u10m2e1: {
    prompt: 'Porque sao as quintas perfeitas paralelas consideradas problematicas na conducao de vozes?',
    choices: [
      'Destroem a independencia das vozes ao fazer duas vozes soarem como uma so',
      'Criam dissonancia que o ouvido nao consegue resolver',
      'Sao fisicamente impossiveis de cantar',
      'Violam as regras do ritmo',
    ],
    hint: 'Os intervalos perfeitos (unissonos, 5.as, 8.as) tem forte fusao acustica. Quando duas vozes se movem em 5.as paralelas, perdem a sua identidade individual, reduzindo o numero de linhas independentes percecionadas.',
  },
  l3u10m2e2: {
    prompt: 'Quais sao os quatro tipos de movimento entre duas vozes?',
    choices: [
      'Paralelo, direto, obliquo e contrario',
      'Ascendente, descendente, estatico e misto',
      'Conjunto, disjunto, cromatico e diatonico',
      'Consonante, dissonante, resolvido e suspenso',
    ],
    hint: 'Paralelo = mesma direcao, mesmo intervalo. Direto = mesma direcao, intervalo diferente. Obliquo = uma voz move-se, a outra mantem-se. Contrario = direcoes opostas.',
  },
  l3u10m2e3: {
    prompt: 'Qual tipo de movimento de vozes e mais eficaz para criar linhas de vozes independentes?',
    choices: [
      'Movimento contrario -- as vozes movem-se em direcoes opostas',
      'Movimento paralelo -- as vozes movem-se na mesma direcao pelo mesmo intervalo',
      'Movimento direto -- as vozes movem-se na mesma direcao por intervalos diferentes',
      'Todos os tipos sao igualmente eficazes',
    ],
    hint: 'O movimento contrario maximiza a independencia das vozes porque as vozes viajam em direcoes opostas. Este e o tipo de movimento mais valorizado no contraponto e na escrita a partes.',
  },

  // ---- l3u10m3: Escrita a Partes em Estado Fundamental ----

  l3u10m3e1: {
    prompt:
      'Quando dois acordes em estado fundamental tem fundamentais a uma 5.a de distancia (ex.: I para V), qual tecnica de conducao de vozes e mais importante?',
    choices: [
      'Manter a nota comum na mesma voz e mover as outras por grau',
      'Mover as quatro vozes na mesma direcao',
      'Manter todas as vozes o mais juntas possivel independentemente de notas comuns',
      'Dobrar a 3.a do segundo acorde',
    ],
    hint: 'Quando as fundamentais se movem por 5.a (ou 4.a), os dois acordes partilham uma nota comum. Mante-la na mesma voz garante uma conducao de vozes suave enquanto as outras vozes se movem por grau.',
  },
  l3u10m3e2: {
    prompt:
      'Quando dois acordes em estado fundamental tem fundamentais a uma 2.a de distancia (ex.: IV para V), qual e a melhor abordagem de conducao de vozes?',
    choices: [
      'Mover as tres vozes superiores em movimento contrario ao baixo',
      'Mover todas as vozes em movimento paralelo com o baixo',
      'Manter uma voz como nota comum',
      'Saltar todas as vozes para a nota do acorde mais proxima',
    ],
    hint: 'Quando as fundamentais se movem por grau, nao ha notas comuns. Mover as vozes superiores em contrario ao baixo previne quintas e oitavas paralelas, mantendo o movimento de vozes suave.',
  },
  l3u10m3e3: {
    prompt: 'O que e a "lei do caminho mais curto" na conducao de vozes?',
    choices: [
      'Cada voz deve mover-se para a nota do acorde mais proxima, preferindo movimento por grau',
      'O baixo deve mover-se sempre a menor distancia',
      'Os acordes devem ser espacados o mais junto possivel',
      'A peca deve usar o menor numero possivel de acordes',
    ],
    hint: 'Uma conducao de vozes suave minimiza a distancia que cada voz percorre. Movimento por grau (ou manutencao da nota comum) e preferido em relacao a saltos, produzindo linhas mais cantaveis e ligadas.',
  },

  // ---- l3u10m4: Triades em Inversao ----

  l3u10m4e1: {
    prompt: 'Qual e o simbolo de baixo cifrado para uma triade na primeira inversao?',
    choices: [
      '6 (abreviatura de 6/3)',
      '5/3',
      '6/4',
      '7',
    ],
    hint: 'A primeira inversao coloca a 3.a do acorde no baixo. Os intervalos acima do baixo sao uma 3.a e uma 6.a. O 6/3 completo e abreviado para apenas 6.',
  },
  l3u10m4e2: {
    prompt: 'O acorde cadencial 6/4 ocorre em que parte da cadencia?',
    choices: [
      'Num tempo forte, imediatamente antes do acorde de dominante (V)',
      'Num tempo fraco, apos o acorde de tonica',
      'Logo no inicio de uma frase',
      'Apenas no final de uma peca, no acorde final',
    ],
    hint: 'O 6/4 cadencial (I6/4) funciona como uma decoracao da dominante. Aparece num tempo forte com o baixo no 5.o grau, e as vozes superiores resolvem por grau descendente para formar V.',
  },
  l3u10m4e3: {
    prompt: 'Porque e a segunda inversao (6/4) usada com mais cuidado do que a primeira inversao?',
    choices: [
      'A 4.a acima do baixo e uma dissonancia que requer resolucao especifica',
      'Os acordes na segunda inversao soam pior do que na primeira inversao',
      'A 5.a no baixo torna o acorde impossivel de identificar',
      'A segunda inversao e proibida em toda a musica classica',
    ],
    hint: 'A 4.a perfeita acima do baixo (na posicao 6/4) era tratada como dissonancia na harmonia de pratica comum. Aparece tipicamente em tres contextos especificos: 6/4 cadencial, de passagem e de pedal.',
  },

  // =========================================================================
  // Unidade 11: Cadencias, Frases, Ornamentacao
  // =========================================================================

  // ---- l3u11m1: Cadencias ----

  l3u11m1e1: {
    prompt: 'O que define uma Cadencia Autentica Perfeita (CAP)?',
    choices: [
      'V para I com ambos os acordes em estado fundamental e a tonica no soprano sobre o acorde I',
      'Qualquer progressao que termine no acorde I',
      'IV para I em estado fundamental',
      'V para I com a 3.a de I no soprano',
    ],
    hint: 'Uma CAP tem tres requisitos: (1) V vai para I, (2) ambos os acordes estao em estado fundamental, e (3) o soprano termina na nota tonica (1.o grau). E o tipo de cadencia mais forte.',
  },
  l3u11m1e2: {
    prompt: 'O que e uma cadencia suspensiva?',
    choices: [
      'Qualquer cadencia que termine no acorde de dominante (V)',
      'Uma cadencia que termina no acorde de tonica (I)',
      'Uma cadencia que usa apenas minimas',
      'Uma cadencia que modula para uma nova tonalidade',
    ],
    hint: 'Uma cadencia suspensiva termina em V, criando uma sensacao aberta e nao resolvida -- como uma virgula numa frase. O acorde que precede V pode ser I, ii, IV ou vi. Exige continuacao.',
  },
  l3u11m1e3: {
    prompt: 'Numa cadencia interrompida, o que acontece?',
    choices: [
      'V resolve para vi em vez do esperado I',
      'I resolve para V em vez do esperado IV',
      'IV resolve para ii em vez de V',
      'A cadencia e tocada mais piano do que o esperado',
    ],
    hint: 'A cadencia interrompida (V para vi) cria a expetativa de resolucao para I mas "engana" o ouvinte ao ir para vi. Vi partilha duas notas com I, tornando-a uma substituicao suave mas surpreendente.',
  },
  l3u11m1e4: {
    prompt: 'O que e uma cadencia plagal?',
    choices: [
      'IV para I -- a cadencia do "Amen"',
      'V para I -- a cadencia mais forte',
      'V para vi -- a cadencia interrompida',
      'ii para V -- uma progressao pre-dominante comum',
    ],
    hint: 'A cadencia plagal move-se de IV para I. E frequentemente chamada a cadencia do "Amen" porque e tradicionalmente usada no final de hinos. Tem uma qualidade mais suave e menos impulsionada do que V-I.',
  },

  // ---- l3u11m2: Frases e Periodos ----

  l3u11m2e1: {
    prompt: 'O que e um periodo antecedente-consequente?',
    choices: [
      'Duas frases em que a primeira termina com cadencia suspensiva e a segunda com cadencia autentica',
      'Uma unica frase repetida exatamente duas vezes',
      'Duas frases completamente sem relacao',
      'Uma frase que modula para a dominante e regressa',
    ],
    hint: 'Um periodo e um par de frases: o antecedente (pergunta) termina inconclusivamente com uma cadencia suspensiva, e o consequente (resposta) termina conclusivamente com uma CAP. Formam uma "frase" musical.',
  },
  l3u11m2e2: {
    prompt: 'O que torna um periodo paralelo diferente de um periodo contrastante?',
    choices: [
      'Um periodo paralelo comeca ambas as frases com material melodico semelhante',
      'Um periodo paralelo tem duas frases com a mesma duracao',
      'Um periodo paralelo usa a mesma cadencia no final de ambas as frases',
      'Um periodo paralelo tem vozes a mover-se em movimento paralelo',
    ],
    hint: 'Num periodo paralelo, a frase consequente comeca como o antecedente mas diverge para alcancar uma cadencia mais forte. Num periodo contrastante, as duas frases comecam com ideias melodicas diferentes.',
  },
  l3u11m2e3: {
    prompt: 'Na estrutura classica de "frase" (Satz), o que acontece apos a ideia inicial (apresentacao)?',
    choices: [
      'Uma continuacao que fragmenta e acelera em direcao a uma cadencia',
      'Uma repeticao exata da apresentacao',
      'Uma seccao contrastante numa nova tonalidade',
      'Um silencio seguido de um novo tema',
    ],
    hint: 'A frase classica tem duas partes: uma apresentacao (ideia basica + repeticao) e uma continuacao (fragmentacao + aceleracao em direcao a uma cadencia). A continuacao impulsiona a frase ate a sua conclusao.',
  },

  // ---- l3u11m3: Ritmo Harmonico ----

  l3u11m3e1: {
    prompt: 'O que e o ritmo harmonico?',
    choices: [
      'A velocidade a que os acordes mudam numa passagem',
      'O ritmo tocado pelos instrumentos harmonicos',
      'A velocidade da melodia',
      'A indicacao de compasso da peca',
    ],
    hint: 'O ritmo harmonico refere-se a frequencia com que a harmonia subjacente muda, independentemente da atividade ritmica de superficie. Uma passagem pode ter ritmo melodico rapido mas ritmo harmonico lento (um acorde por compasso).',
  },
  l3u11m3e2: {
    prompt: 'O que acontece tipicamente ao ritmo harmonico nos pontos cadenciais?',
    choices: [
      'Acelera -- os acordes mudam mais frequentemente a aproximar-se da cadencia',
      'Desacelera -- os acordes mudam menos frequentemente nas cadencias',
      'Mantem-se igual ao longo da frase',
      'Para completamente antes do acorde cadencial',
    ],
    hint: 'A aceleracao cadencial e uma tecnica comum: as mudancas de acorde aceleram perto das cadencias, criando uma sensacao de impulso e chegada. Por exemplo, os acordes podem mudar a cada compasso, depois a cada dois tempos, depois a cada tempo na cadencia.',
  },
  l3u11m3e3: {
    prompt: 'Como difere o efeito do ritmo harmonico lento do rapido?',
    choices: [
      'Lento cria estabilidade e repouso; rapido cria tensao e impulso',
      'Lento e sempre usado em tonalidades menores; rapido em tonalidades maiores',
      'Lento significa menos notas por compasso; rapido significa mais notas por compasso',
      'Nao ha diferenca percetivel para o ouvinte',
    ],
    hint: 'Ritmo harmonico lento (um acorde durante varios compassos) da uma sensacao de calma ou estase. Ritmo harmonico rapido (varias mudancas de acorde por compasso) cria urgencia, complexidade e impulso para a frente.',
  },

  // ---- l3u11m4: Notas Estranhas ao Acorde Parte 1 ----

  l3u11m4e1: {
    prompt: 'O que e uma nota de passagem?',
    choices: [
      'Uma nota estranha que se move por grau entre duas notas do acorde na mesma direcao',
      'Uma nota que e mantida do acorde anterior',
      'Uma nota estranha abordada por salto e resolvida por grau',
      'Um trilo ornamental sobre uma nota do acorde',
    ],
    hint: 'Uma nota de passagem preenche a lacuna entre duas notas do acorde a uma 3.a de distancia. E abordada por grau e resolvida por grau na mesma direcao. Exemplo: num acorde de C, D passa entre C e E.',
  },
  l3u11m4e2: {
    prompt: 'O que e uma bordadura?',
    choices: [
      'Uma nota estranha que se afasta por grau de uma nota do acorde e regressa a ela',
      'Uma nota estranha que se move por grau entre duas notas do acorde diferentes',
      'Uma nota do acorde que se repete no tempo seguinte',
      'Uma nota emprestada de uma tonalidade vizinha',
    ],
    hint: 'Uma bordadura (ou nota auxiliar) afasta-se de uma nota do acorde por grau (para cima ou para baixo) e regressa a mesma nota. Decora uma unica altura: nota do acorde -> grau para fora -> grau de volta.',
  },
  l3u11m4e3: {
    prompt: 'O que e uma antecipacao?',
    choices: [
      'Uma nota estranha que chega cedo -- soa uma nota do acorde seguinte antes de o acorde mudar',
      'Uma nota do acorde que e atrasada ate depois do tempo',
      'Uma nota que e mantida do acorde anterior',
      'Uma pausa que substitui uma nota esperada',
    ],
    hint: 'Uma antecipacao "antecipa" o acorde seguinte ao fazer soar uma das suas notas mais cedo, antes de a harmonia mudar. E tipicamente uma nota curta e nao acentuada que resolve mantendo-se na mesma altura.',
  },

  // ---- l3u11m5: Transposicao ----

  l3u11m5e1: {
    prompt: 'Transpoe C4 uma 2.a maior acima. Identifica o intervalo de 2 semitons ascendente a partir de C.',
    hint: 'Uma 2.a maior sao 2 semitons. C mais 2 semitons = D. Transpor uma 2.a maior acima move cada nota um tom acima.',
  },
  l3u11m5e2: {
    prompt: 'Transpoe C4 uma 5.a perfeita acima. Identifica o intervalo de 7 semitons ascendente a partir de C.',
    hint: 'Uma 5.a perfeita sao 7 semitons. C mais 7 semitons = G. Transpor uma 5.aP acima e uma das transposicoes mais comuns, passando de Do maior para Sol maior.',
  },
  l3u11m5e3: {
    prompt: 'Ao transpor uma melodia uma 3.a menor acima, o que acontece a armacao de clave?',
    choices: [
      'Muda para refletir a nova tonalidade (ex.: Do maior torna-se Mib maior, ganhando 3 bemois)',
      'Mantem-se igual; so as notas se movem',
      'Os sustenidos e bemois sao removidos',
      'Cada nota recebe um acidente',
    ],
    hint: 'A transposicao desloca tudo para uma nova tonalidade. Subir uma 3.a menor (3 semitons) a partir de Do maior chega a Mib maior. A nova armacao de clave (3 bemois) preserva todas as relacoes intervalares.',
  },
};

export default overlay;
