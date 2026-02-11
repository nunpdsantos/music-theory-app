import type { ExerciseLevelOverlay } from '../types';

// ---------------------------------------------------------------------------
// European Portuguese translations for Level 5 hand-authored exercises
// Note names (C, D, F#, Bb, etc.) kept in international notation.
// ---------------------------------------------------------------------------

const overlay: ExerciseLevelOverlay = {
  // =========================================================================
  // Unidade 15: Dominantes Secundarias e Tonicizacao
  // =========================================================================

  // ---- l5u15m1: Dominantes Secundarias V/V ----

  l5u15m1e1: {
    prompt:
      'Constroi V/V em Do maior. A dominante secundaria de V e uma triade de D maior. Seleciona as 3 notas: D, F#, A.',
    hint: 'V/V em Do significa "o acorde V de Sol maior". A dominante de Sol e Re maior: D (2), F# (6), A (9). O F# e cromatico -- nao pertence a Do maior.',
  },
  l5u15m1e2: {
    prompt:
      'Constroi V7/V em Do maior. Este e um acorde de D dominante com setima: D, F#, A, C. Seleciona as 4 notas.',
    hint: 'V7/V em Do = D7: D (2), F# (6), A (9), C (0). A setima menor acrescentada (C) reforca a atracao para Sol. O F# e a alteracao cromatica.',
  },
  l5u15m1e3: {
    prompt: 'O que e V/V?',
    choices: [
      'Uma dominante secundaria que toniciza o acorde dominante da tonalidade',
      'O quinto acorde tocado duas vezes seguidas',
      'Um acorde diminuto construido sobre o segundo grau da escala',
      'O acorde dominante em segunda inversao',
    ],
    hint: 'V/V significa "a dominante da dominante". Em Do maior, V e Sol. A dominante de Sol e Re maior. Portanto V/V em Do = Re maior, um acorde cromatico que toniciza temporariamente Sol.',
  },

  // ---- l5u15m2: Dominantes Secundarias de ii, iii, IV, vi ----

  l5u15m2e1: {
    prompt: 'Em Do maior, que acorde funciona como V/ii?',
    choices: [
      'La maior (A, C#, E) -- a dominante de Re menor',
      'Sol maior (G, B, D) -- a dominante de Do',
      'Mi maior (E, G#, B) -- a dominante de La menor',
      'Fa maior (F, A, C) -- a subdominante',
    ],
    hint: 'Em Do maior, ii e Re menor. A dominante de Re menor e La maior (A, C#, E). O C# e a nota cromatica que cria a sensivel de Re.',
  },
  l5u15m2e2: {
    prompt: 'Em Do maior, que acorde funciona como V/IV?',
    choices: [
      'Do maior (C, E, G) -- a dominante de Fa',
      'Sol maior (G, B, D) -- a dominante de Do',
      'Sib maior (Bb, D, F) -- emprestado de Do menor',
      'Re maior (D, F#, A) -- a dominante de Sol',
    ],
    hint: 'V/IV significa a dominante de IV. Em Do maior, IV e Fa. A dominante de Fa e Do maior. Isto e invulgar porque Do maior ja e a tonica -- o contexto determina se funciona como I ou V/IV.',
  },
  l5u15m2e3: {
    prompt: 'O que define uma dominante aplicada (secundaria)?',
    choices: [
      'Uma triade maior ou acorde de setima dominante que resolve para um acorde diatonico diferente de I, funcionando como V desse acorde',
      'Qualquer acorde de setima dominante usado numa progressao',
      'Um acorde que modula permanentemente para uma nova tonalidade',
      'O acorde V a resolver de forma enganosa para vi',
    ],
    hint: 'Uma dominante aplicada funciona temporariamente como V (ou V7) de um acorde diatonico. Introduz notas cromaticas para criar uma resolucao de sensivel para o seu alvo, sem estabelecer uma nova tonalidade.',
  },

  // ---- l5u15m3: Acordes de Sensivel Secundaria ----

  l5u15m3e1: {
    prompt:
      'Qual e a funcao de um acorde de sensivel secundaria (p. ex., viio/V)?',
    choices: [
      'Funciona como um acorde diminuto que resolve meio-tom acima para o acorde tonicizado, tal como viio resolve para I',
      'Substitui inteiramente o acorde dominante nas cadencias',
      'Funciona como um acorde de passagem sem atracao harmonica',
      'E a sensivel da tonalidade tocada como nota isolada',
    ],
    hint: 'viio/V funciona da mesma forma que viio numa tonalidade: a fundamental esta meio-tom abaixo do acorde alvo, e a qualidade diminuta cria forte impulso de resolucao ascendente para o alvo.',
  },
  l5u15m3e2: {
    prompt:
      'Qual e a diferenca entre um acorde de setima meio-diminuta e um de setima totalmente diminuta no contexto de acordes de sensivel secundaria?',
    choices: [
      'O meio-diminuto tem uma setima menor acima da fundamental; o totalmente diminuto tem uma setima diminuta (um semitom mais baixo)',
      'O meio-diminuto resolve para cima; o totalmente diminuto resolve para baixo',
      'O meio-diminuto e usado apenas em tonalidades maiores; o totalmente diminuto apenas em menores',
      'Nao ha diferenca; sao o mesmo acorde',
    ],
    hint: 'Ambos tem uma triade diminuta (fundamental, 3.a menor, 5.a diminuta). A setima difere: meio-dim tem setima menor (10 semitons), totalmente dim tem setima diminuta (9 semitons). O totalmente diminuto e mais comum como acorde de sensivel secundaria.',
  },
  l5u15m3e3: {
    prompt:
      'Em Do maior, qual e o acorde alvo para o qual viio/V resolve?',
    choices: [
      'Sol maior (V) -- o viio/V resolve meio-tom acima para a dominante',
      'Do maior (I) -- resolve para a tonica',
      'Fa maior (IV) -- resolve para a subdominante',
      'Re menor (ii) -- resolve para a sobretonica',
    ],
    hint: 'O "/V" indica-te o alvo: V. Em Do maior, V e Sol. viio/V e Fa# diminuto (F#, A, C), e o F# resolve meio-tom acima para Sol, a fundamental do acorde alvo.',
  },

  // ---- l5u15m4: Tonicizacao vs. Modulacao ----

  l5u15m4e1: {
    prompt: 'O que e tonicizacao?',
    choices: [
      'Uma enfase breve e temporaria num acorde nao-tonica usando a sua propria dominante, sem sair da tonalidade original',
      'Uma mudanca permanente de centro tonal para uma nova tonica',
      'Tocar o acorde da tonica repetidamente para estabelecer a tonalidade',
      'Transpor uma melodia para uma nova tonalidade',
    ],
    hint: 'Tonicizacao e fugaz: uma dominante secundaria ou acorde de sensivel trata brevemente um acorde diatonico como tonica local, mas a tonalidade original mantem o controlo. Pensa nisto como um desvio momentaneo.',
  },
  l5u15m4e2: {
    prompt: 'Como se distingue modulacao de tonicizacao?',
    choices: [
      'A modulacao estabelece uma nova tonalidade atraves de cadencias e passagens extensas; a tonicizacao e breve e regressa a tonalidade original',
      'A modulacao usa sustenidos; a tonicizacao usa bemois',
      'A modulacao so ocorre no final de uma peca; a tonicizacao ocorre no meio',
      'Nao ha diferenca real; os termos sao intercambiaveis',
    ],
    hint: 'O teste chave: o novo centro tonal mantem-se com as suas proprias cadencias e passagens estaveis? Se sim, e modulacao. Se a tonalidade original se reafirma rapidamente, e apenas tonicizacao.',
  },
  l5u15m4e3: {
    prompt:
      'Quando uma tonicizacao se prolonga por varios compassos mas nao estabelece totalmente a nova tonalidade, como se chama?',
    choices: [
      'Uma tonicizacao prolongada -- mais longa do que um unico acorde mas sem confirmacao cadencial completa na nova tonalidade',
      'Uma modulacao por acorde pivot',
      'Uma cadencia enganosa',
      'Uma sequencia cromatica',
    ],
    hint: 'Tonicizacoes prolongadas ocupam uma zona cinzenta: duram mais do que um rapido V/x - x, mas a nova tonalidade nunca e confirmada com uma cadencia forte. A fronteira entre tonicizacao prolongada e modulacao e subjetiva.',
  },

  // ---- l5u15m5: Cadeias de Dominantes ----

  l5u15m5e1: {
    prompt: 'O que e uma cadeia de dominantes secundarias?',
    choices: [
      'Uma sequencia em que cada acorde funciona como V7 do seguinte, passando por multiplas tonicizacoes antes de resolver para a tonica',
      'Tocar o acorde V de cada tonalidade maior em sucessao',
      'Uma serie de acordes diminutos descendentes cromaticamente',
      'Alternar entre I e V repetidamente',
    ],
    hint: 'Uma cadeia de dominantes cria tensao em cascata: p. ex., V7/vi - V7/ii - V7/V - V7 - I. Cada acorde de setima dominante resolve para o elo seguinte, puxando a harmonia de volta a tonica atraves de um ciclo.',
  },
  l5u15m5e2: {
    prompt:
      'Numa cadeia de dominantes secundarias descendente por quintas (p. ex., V7/vi - V7/ii - V7/V - V - I em Do maior), que movimento de fundamentais liga cada acorde?',
    choices: [
      'Cada fundamental desce uma quinta perfeita (ou sobe uma quarta perfeita) para a seguinte',
      'Cada fundamental sobe um meio-tom cromaticamente',
      'Cada fundamental desce um tom',
      'As fundamentais alternam entre tercas ascendentes e descendentes',
    ],
    hint: 'As cadeias de dominantes exploram o movimento de fundamentais mais forte da musica tonal: quinta descendente. Cada V7 resolve uma quinta abaixo para o seu alvo, e esse alvo e reinterpretado como o proximo V7.',
  },
  l5u15m5e3: {
    prompt: 'O que e tonicizacao sequencial?',
    choices: [
      'Um padrao harmonico em que o mesmo gesto de tonicizacao (p. ex., V7 - alvo) e repetido em diferentes niveis de altura em sequencia',
      'Uma modulacao que passa por todas as tonalidades no circulo de quintas',
      'Tocar escalas em sequencia ascendente cromaticamente',
      'Uma serie de cadencias enganosas em diferentes tonalidades',
    ],
    hint: 'A tonicizacao sequencial aplica o mesmo padrao harmonico (frequentemente V7 - acorde) a graus da escala sucessivos, criando um movimento cromatico previsivel mas colorido. E comum na musica barroca e no jazz.',
  },

  // =========================================================================
  // Unidade 16: Modulacao e Mistura Modal
  // =========================================================================

  // ---- l5u16m1: Modulacao por Acorde Pivot ----

  l5u16m1e1: {
    prompt: 'O que e um acorde pivot na modulacao?',
    choices: [
      'Um acorde que pertence tanto a tonalidade antiga como a nova, servindo de dobradica entre elas',
      'O primeiro acorde da nova tonalidade que contem uma nota cromatica',
      'Um acorde diminuto que resolve a modulacao',
      'O acorde dominante da tonalidade original',
    ],
    hint: 'Um acorde pivot e diatonico em ambas as tonalidades. Por exemplo, ao modular de Do maior para Sol maior, o acorde Mi menor e tanto iii em Do como vi em Sol, criando uma ponte harmonica suave entre as duas tonalidades.',
  },
  l5u16m1e2: {
    prompt:
      'Ao modular de Do maior para Sol maior, que acorde poderia servir como pivot?',
    choices: [
      'Mi menor -- e iii em Do maior e vi em Sol maior',
      'Fa maior -- e IV em Do maior e nao e diatonico em Sol maior',
      'Sib maior -- e emprestado de Do menor',
      'Fa# diminuto -- sinaliza a nova tonalidade',
    ],
    hint: 'Encontra acordes comuns a ambas as tonalidades. Do maior: C Dm Em F G Am Bdim. Sol maior: G Am Bm C D Em F#dim. Acordes partilhados incluem C, Em, Am, G. Mi menor como iii/vi e uma escolha forte de pivot.',
  },
  l5u16m1e3: {
    prompt: 'Qual e o processo tipico de uma modulacao por acorde pivot?',
    choices: [
      'Estabelecer a tonalidade antiga, introduzir o acorde pivot e depois confirmar a nova tonalidade com uma cadencia',
      'Tocar uma escala cromatica entre as duas tonalidades',
      'Parar de tocar, mudar a armacao de clave e retomar',
      'Repetir a tonica da nova tonalidade ate o ouvinte se ajustar',
    ],
    hint: 'A modulacao por acorde pivot desenrola-se em tres fases: (1) a tonalidade antiga e claramente estabelecida, (2) um acorde diatonico e reinterpretado como pertencendo a nova tonalidade, (3) a nova tonalidade e confirmada com uma cadencia (tipicamente V-I).',
  },

  // ---- l5u16m2: Modulacao para Tonalidades Proximas ----

  l5u16m2e1: {
    prompt: 'Quantas tonalidades proximas tem uma tonalidade maior?',
    choices: [
      '5 -- as tonalidades cujas armacoes diferem no maximo em um sustenido ou bemol',
      '2 -- apenas a dominante e a subdominante',
      '12 -- todas as tonalidades sao proximas',
      '3 -- a relativa menor, a dominante e a subdominante',
    ],
    hint: 'Tonalidades proximas diferem no maximo em um acidente nas suas armacoes de clave. Para Do maior: Sol maior (+1#), Fa maior (+1b), La menor (relativa), Mi menor (rel. de Sol), Re menor (rel. de Fa). Isso da 5 tonalidades proximas.',
  },
  l5u16m2e2: {
    prompt:
      'Porque e que modular para a tonalidade da dominante (V) e considerada uma das modulacoes mais suaves?',
    choices: [
      'A tonalidade da dominante difere em apenas um acidente, e as duas tonalidades partilham a maioria dos seus acordes diatonicos',
      'A tonalidade da dominante tem a mesma nota tonica',
      'A tonalidade da dominante nao usa sustenidos nem bemois',
      'A dominante e sempre a tonalidade com som mais brilhante',
    ],
    hint: 'Do maior e Sol maior partilham 6 de 7 notas (so F vs F#). Esta sobreposicao significa que muitos acordes sao comuns a ambas as tonalidades, proporcionando abundantes opcoes de acorde pivot e uma transicao fluida.',
  },
  l5u16m2e3: {
    prompt: 'Quais das seguintes sao tonalidades proximas de Do maior?',
    choices: [
      'Sol maior, Fa maior, La menor, Mi menor, Re menor',
      'Reb maior, Lab maior, Mib maior, Sib maior, Fa menor',
      'Sol maior, Re maior, La maior, Mi maior, Si maior',
      'Do menor, Mib maior, Lab maior, Sib maior, Fa menor',
    ],
    hint: 'Tonalidades proximas partilham todos os acidentes menos um com Do maior (0 sustenidos/bemois). Sol maior tem 1#, Fa maior tem 1b, e as suas relativas menores (Mi menor, Re menor) mais a relativa menor de Do (La menor) completam o conjunto.',
  },

  // ---- l5u16m3: Modulacao Direta/Por Nota Comum/Cromatica ----

  l5u16m3e1: {
    prompt: 'O que e uma modulacao direta (ou de frase)?',
    choices: [
      'Uma modulacao que muda para a nova tonalidade abruptamente numa fronteira de frase, sem acorde pivot',
      'Uma modulacao que usa um acorde pivot partilhado entre as duas tonalidades',
      'Uma modulacao que se move por meio-tom usando conducao cromatica de vozes',
      'Uma modulacao que acontece gradualmente ao longo de muitos compassos',
    ],
    hint: 'A modulacao direta e o tipo mais abrupto: uma frase termina na tonalidade antiga e a frase seguinte simplesmente comeca na nova. Nenhum acorde pivot ou preparacao cromatica faz a ponte. Comum no pop e nos hinos.',
  },
  l5u16m3e2: {
    prompt: 'O que e uma modulacao por nota comum?',
    choices: [
      'Uma modulacao em que uma unica nota sustida serve de ponte entre duas tonalidades, reinterpretada no contexto da nova tonalidade',
      'Uma modulacao em que a nota do baixo se mantem na tonica ao longo de toda a passagem',
      'Uma modulacao que usa apenas notas comuns a ambas as escalas',
      'Uma modulacao que resolve para o acorde comum de duas tonalidades',
    ],
    hint: 'Na modulacao por nota comum, uma nota e mantida (ou repetida) enquanto a harmonia muda a sua volta. Essa nota ganha uma nova funcao na nova tonalidade. Esta tecnica funciona bem para modular para tonalidades distantes.',
  },
  l5u16m3e3: {
    prompt: 'O que e uma modulacao cromatica?',
    choices: [
      'Uma modulacao alcancada pela alteracao cromatica de uma ou mais notas num acorde para pivotar para a nova tonalidade',
      'Uma modulacao que usa apenas escalas cromaticas',
      'Uma modulacao para uma tonalidade com mais sustenidos ou bemois',
      'Uma modulacao que evita todos os acordes diatonicos',
    ],
    hint: 'A modulacao cromatica usa conducao de vozes por meio-tom para transformar um acorde da tonalidade antiga num acorde que pertence a nova. Uma ou mais notas movem-se por semitom, redirecionando suavemente a harmonia.',
  },

  // ---- l5u16m4: Mistura Modal — Acordes de Emprestimo ----

  l5u16m4e1: {
    prompt:
      'Constroi bVI em Do maior. Este acorde e emprestado de Do menor: Lab maior (Ab, C, Eb). Seleciona as 3 notas.',
    hint: 'bVI em Do maior = Lab maior: Ab (8), C (0), Eb (3). Este acorde e emprestado de Do menor natural, onde VI e Lab maior. O Ab e o Eb sao notas cromaticas em Do maior.',
  },
  l5u16m4e2: {
    prompt:
      'Constroi iv em Do maior. Este acorde e emprestado de Do menor: Fa menor (F, Ab, C). Seleciona as 3 notas.',
    hint: 'iv em Do maior = Fa menor: F (5), Ab (8), C (0). Em Do maior, IV e Fa maior (F, A, C). Emprestar de Do menor rebaixa o A para Ab, criando a subdominante menor mais escura.',
  },
  l5u16m4e3: {
    prompt:
      'O que e mistura modal (tambem chamada intercambio modal)?',
    choices: [
      'Emprestar acordes da tonalidade menor (ou maior) paralela para acrescentar cor cromatica sem sair da tonalidade de origem',
      'Misturar dois modos diferentes como Dorico e Mixolidio na mesma passagem',
      'Tocar um acorde maior e um menor ao mesmo tempo',
      'Alternar entre relativa maior e relativa menor',
    ],
    hint: 'Mistura modal empresta acordes da tonalidade paralela (mesma tonica, modo oposto). Em Do maior, emprestas de Do menor: bIII (Mib), iv (Fm), bVI (Lab), bVII (Sib). Acrescentam escuridao e riqueza cromatica.',
  },

  // ---- l5u16m5: Terca Picardia ----

  l5u16m5e1: {
    prompt: 'O que e uma terca picardia (tierce de Picardie)?',
    choices: [
      'Terminar uma peca em tonalidade menor com um acorde de tonica maior, elevando a terca do acorde final',
      'Uma progressao de acordes que usa apenas tercas',
      'Um intervalo de terca menor usado numa tonalidade maior',
      'Um ornamento frances em trilo sobre o terceiro grau',
    ],
    hint: 'A terca picardia e uma tecnica secular: uma peca em tonalidade menor termina com um acorde I maior (p. ex., peca em Do menor a terminar em Do maior). A terca elevada cria um final brilhante e resolvido apos a escuridao do modo menor.',
  },
  l5u16m5e2: {
    prompt:
      'Na mistura modal, o que significa emprestar do maior paralelo numa tonalidade menor?',
    choices: [
      'Usar acordes da tonalidade maior com a mesma tonica, como um IV maior ou um I maior, num contexto de tonalidade menor',
      'Modular permanentemente para a tonalidade maior',
      'Tocar a escala maior sobre acordes menores',
      'Usar os acordes da relativa maior',
    ],
    hint: 'A mistura modal funciona em ambas as direcoes. Uma tonalidade menor pode emprestar do seu maior paralelo: p. ex., em La menor, podes emprestar IV de La maior (Re maior em vez de Re menor) para iluminar temporariamente a harmonia.',
  },
  l5u16m5e3: {
    prompt:
      'Qual dos seguintes e um exemplo de mistura modal numa tonalidade menor?',
    choices: [
      'Usar um acorde IV maior numa tonalidade menor, emprestado do maior paralelo',
      'Usar o acorde V numa tonalidade menor (que requer o 7.o grau elevado da menor harmonica)',
      'Modular para a relativa maior',
      'Usar uma dominante secundaria para tonicizar a dominante',
    ],
    hint: 'O acorde V no modo menor vem da menor harmonica, nao da mistura modal. A mistura modal empresta especificamente acordes da tonalidade paralela. Um IV maior no modo menor (p. ex., Re maior em La menor em vez de Re menor) e mistura modal genuina.',
  },

  // =========================================================================
  // Unidade 17: Forma, Textura, Conducao de Vozes
  // =========================================================================

  // ---- l5u17m1: Forma Binaria e Ternaria ----

  l5u17m1e1: {
    prompt: 'O que e forma binaria?',
    choices: [
      'Uma estrutura em duas partes (A-B) em que cada seccao e geralmente repetida, e B frequentemente modula ou contrasta com A',
      'Uma peca com apenas dois acordes',
      'Uma composicao para dois instrumentos',
      'Uma forma com duas seccoes identicas tocadas duas vezes',
    ],
    hint: 'A forma binaria (AB) divide uma peca em duas seccoes complementares. A seccao A tipicamente termina longe da tonica (frequentemente em V), e a seccao B regressa a tonica. Ambas as seccoes sao geralmente repetidas (||: A :||: B :||).',
  },
  l5u17m1e2: {
    prompt:
      'O que distingue a forma binaria com retorno da forma binaria simples?',
    choices: [
      'Na binaria com retorno, o material de A regressa no final da seccao B, criando uma estrutura semelhante a ABA dentro do quadro binario',
      'A binaria com retorno tem finais de frase curvos em vez de cadencias retas',
      'A binaria com retorno repete cada seccao tres vezes em vez de duas',
      'A binaria com retorno esta sempre numa tonalidade menor',
    ],
    hint: 'A binaria com retorno (||: A :||: B A\' :||) traz de volta o material inicial de A no final da seccao B. A binaria simples nao regressa a A. Muitos minuetos e scherzos classicos usam forma binaria com retorno.',
  },
  l5u17m1e3: {
    prompt: 'O que e forma ternaria (ABA)?',
    choices: [
      'Uma estrutura em tres partes em que a primeira seccao regressa apos uma seccao central contrastante, sendo cada seccao autossuficiente',
      'Uma peca com tres melodias diferentes que nunca se repetem',
      'Uma forma em que o andamento muda tres vezes',
      'Uma peca escrita em compasso 3/4',
    ],
    hint: 'A forma ternaria tem tres seccoes distintas: A (exposicao), B (contraste), A (retorno). Ao contrario da binaria com retorno, cada seccao na forma ternaria e harmonicamente autossuficiente, terminando geralmente com uma cadencia na sua propria tonalidade.',
  },

  // ---- l5u17m2: Formas de Cancao ----

  l5u17m2e1: {
    prompt: 'O que e forma estrofe-refrao?',
    choices: [
      'Uma forma em que as estrofes tem a mesma musica mas letras diferentes, alternando com um refrao recorrente com letra e melodia fixas',
      'Uma forma em que a estrofe e o refrao sao identicos',
      'Uma forma com apenas uma seccao de estrofe e sem refrao',
      'Uma forma classica usada exclusivamente na opera',
    ],
    hint: 'Estrofe-refrao e a forma pop/rock mais comum. As estrofes avancam a historia com letras em mudanca sobre a mesma musica. O refrao proporciona o pico emocional com um gancho consistente e memoravel.',
  },
  l5u17m2e2: {
    prompt: 'O que e a forma AABA (tambem chamada forma de cancao de 32 compassos)?',
    choices: [
      'Uma forma com uma seccao A repetida, uma seccao B contrastante (ponte), e um retorno final de A, tipicamente 32 compassos no total',
      'Uma forma com quatro seccoes identicas de 8 compassos',
      'Uma forma com duas estrofes e dois refraos',
      'Uma estrutura de improvisacao jazz sem seccoes fixas',
    ],
    hint: 'AABA e a forma classica do Tin Pan Alley / Grande Cancioneiro Americano. Cada seccao tem tipicamente 8 compassos. A seccao B (ponte ou "middle eight") proporciona contraste antes do retorno final de A. Muitos standards de jazz usam esta forma.',
  },
  l5u17m2e3: {
    prompt: 'Quais sao as tres seccoes principais da forma sonata?',
    choices: [
      'Exposicao, desenvolvimento e recapitulacao',
      'Estrofe, refrao e ponte',
      'Introducao, tema e coda',
      'Preludio, fuga e posludio',
    ],
    hint: 'Forma sonata: a exposicao apresenta dois temas contrastantes em tonalidades diferentes, o desenvolvimento fragmenta-os e transforma-os por tonalidades distantes, e a recapitulacao reexpoe ambos os temas na tonalidade de origem.',
  },

  // ---- l5u17m3: Textura ----

  l5u17m3e1: {
    prompt: 'O que e textura monofonica?',
    choices: [
      'Uma unica linha melodica sem acompanhamento nem harmonia -- uma voz, uma altura de cada vez',
      'Uma melodia com acompanhamento de acordes por baixo',
      'Multiplas melodias independentes a soar em simultaneo',
      'Um instrumento solo a tocar acordes',
    ],
    hint: 'Monofonia e a textura mais simples: uma unica melodia sem acompanhamento. Mesmo que muitas pessoas cantem ou toquem a mesma melodia (em unissono ou oitavas), continua a ser monofonico porque ha apenas uma linha musical.',
  },
  l5u17m3e2: {
    prompt: 'O que e textura polifonica?',
    choices: [
      'Duas ou mais linhas melodicas independentes a soar em simultaneo, cada uma com o seu proprio ritmo e contorno',
      'Uma unica melodia tocada por muitos instrumentos em unissono',
      'Uma melodia apoiada por blocos de acordes',
      'Musica sem melodia discernivel',
    ],
    hint: 'A polifonia apresenta multiplas vozes independentes, cada uma com interesse melodico. Uma fuga de Bach e o exemplo classico: cada voz entra com o mesmo tema mas depois move-se independentemente, tecendo uma teia contrapontistica complexa.',
  },
  l5u17m3e3: {
    prompt: 'O que e textura homofonica?',
    choices: [
      'Uma melodia principal acompanhada por acordes ou suporte harmonico, em que todas as partes se movem no mesmo ritmo ou apoiam a melodia',
      'Todas as vozes a cantar a mesma melodia na mesma altura',
      'Duas melodias igualmente importantes entrecruzadas',
      'Musica sem qualquer melodia, consistindo apenas em padroes ritmicos',
    ],
    hint: 'Homofonia tem uma melodia dominante com acompanhamento harmonico. A maioria do pop, rock e musica classica do periodo Classico em diante e homofonica. Um cantor com acordes de guitarra e um exemplo claro.',
  },

  // ---- l5u17m4: Linhas de Notas-Guia ----

  l5u17m4e1: {
    prompt: 'O que sao notas-guia?',
    choices: [
      'A 3.a e a 7.a de cada acorde, que definem a sua qualidade e criam conducao de vozes suave entre acordes',
      'A fundamental e a 5.a de cada acorde',
      'As notas da melodia que caem nos tempos fortes',
      'Notas cromaticas de passagem entre notas do acorde',
    ],
    hint: 'As notas-guia (3.as e 7.as) sao as notas harmonicamente mais definidoras de um acorde. A fundamental e a 5.a sao estruturalmente importantes mas genericas; a 3.a determina maior/menor e a 7.a determina o tipo de acorde.',
  },
  l5u17m4e2: {
    prompt:
      'Numa progressao ii7-V7-I em Do maior (Dm7-G7-Cmaj7), como se movem as notas-guia?',
    choices: [
      'As notas-guia movem-se por grau ou mantêm-se como notas comuns: F-C em Dm7, F-B em G7, E-B em Cmaj7',
      'As notas-guia saltam por intervalos largos entre cada acorde',
      'As notas-guia mantêm-se nas mesmas notas ao longo dos três acordes',
      'As notas-guia seguem exatamente a linha do baixo',
    ],
    hint: 'Notas-guia de Dm7: F (3.a), C (7.a). G7: o C mantém-se como nota comum tornando-se a 7.a do acorde, enquanto F desce para B (3.a). Cmaj7: B mantém-se ou resolve para B (7.a), F resolve descendo para E (3.a). Movimento mínimo = condução de vozes suave.',
  },
  l5u17m4e3: {
    prompt:
      'Qual e o principio fundamental de conducao de vozes que as notas-guia ilustram?',
    choices: [
      'Mover cada voz para a nota do acorde mais proxima disponivel, preferindo movimento por grau e notas comuns a saltos',
      'Todas as vozes devem mover-se em movimento paralelo em todos os momentos',
      'Cada voz deve saltar para a nota do acorde mais distante para criar variedade',
      'A voz superior deve sempre subir enquanto a inferior desce',
    ],
    hint: 'Uma boa conducao de vozes minimiza o movimento: manter notas comuns, mover as outras vozes por grau. Isto cria progressoes harmonicas suaves e conectadas. As linhas de notas-guia demonstram este principio com apenas as duas notas mais essenciais por acorde.',
  },
};

export default overlay;
