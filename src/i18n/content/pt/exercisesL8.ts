import type { ExerciseLevelOverlay } from '../types';

// ---------------------------------------------------------------------------
// European Portuguese translations for Level 8 hand-authored exercises
// Note names (C, D, E, F#, Bb, etc.) kept in international notation.
// ---------------------------------------------------------------------------

const overlay: ExerciseLevelOverlay = {
  // =========================================================================
  // Unidade 25: Fuga e Formas Imitativas
  // =========================================================================

  // ---- l8u25m1: Exposicao da Fuga ----

  l8u25m1e1: {
    prompt:
      'Numa exposicao de fuga, qual e a diferenca entre o sujeito e a resposta?',
    choices: [
      'O sujeito e o tema principal apresentado primeiro; a resposta e a sua imitacao na tonalidade da dominante',
      'O sujeito e tocado pelas cordas; a resposta e tocada pelos sopros',
      'O sujeito esta em maior; a resposta esta em menor',
      'O sujeito e rapido; a resposta e lenta',
    ],
    hint: 'O sujeito entra primeiro na tonalidade da tonica. A resposta segue na dominante, imitando o sujeito uma quinta acima (ou quarta abaixo).',
  },
  l8u25m1e2: {
    prompt:
      'O que distingue uma "resposta real" de uma "resposta tonal" numa fuga?',
    choices: [
      'Uma resposta real transpoe o sujeito exatamente; uma resposta tonal ajusta intervalos para se manter na tonalidade da dominante',
      'Uma resposta real e mais forte; uma resposta tonal e mais suave',
      'Uma resposta real usa o mesmo ritmo; uma resposta tonal altera o ritmo',
      'Uma resposta real esta na mesma oitava; uma resposta tonal esta uma oitava acima',
    ],
    hint: 'Uma resposta real e uma transposicao exata para a dominante. Uma resposta tonal modifica certos intervalos (tipicamente os graus 1 e 5) para manter a coerencia tonal.',
  },
  l8u25m1e3: {
    prompt: 'O que acontece durante a exposicao de uma fuga?',
    choices: [
      'Cada voz entra sucessivamente com o sujeito ou a resposta ate todas as vozes terem apresentado o tema',
      'Todas as vozes tocam o sujeito simultaneamente em unissono',
      'O sujeito e desenvolvido atraves de fragmentacao e sequencia',
      'O sujeito e apresentado em aumentacao e diminuicao',
    ],
    hint: 'A exposicao e a seccao de abertura onde as vozes entram uma de cada vez, alternando entre sujeito (tonica) e resposta (dominante).',
  },

  // ---- l8u25m2: Episodios e Stretto ----

  l8u25m2e1: {
    prompt: 'Qual e a funcao principal de um episodio numa fuga?',
    choices: [
      'Modular entre tonalidades e proporcionar contraste usando fragmentos do sujeito',
      'Introduzir um tema completamente novo sem relacao com o sujeito',
      'Reapresentar o sujeito em todas as vozes simultaneamente',
      'Concluir a fuga com uma cadencia final',
    ],
    hint: 'Os episodios sao passagens entre entradas do sujeito que tipicamente usam sequencias construidas a partir de fragmentos do sujeito. Servem de pontes modulantes.',
  },
  l8u25m2e2: {
    prompt: 'O que e o "stretto" numa fuga?',
    choices: [
      'Entradas sobrepostas do sujeito onde uma nova voz comeca antes de a anterior terminar',
      'Um aumento gradual do andamento em direcao ao final da fuga',
      'A cadencia final onde todas as vozes resolvem juntas',
      'Uma seccao onde o sujeito e tocado de tras para a frente',
    ],
    hint: 'O stretto comprime as entradas do sujeito para que se sobreponham, criando contraponto intensificado. Aparece frequentemente perto do climax da fuga.',
  },
  l8u25m2e3: {
    prompt: 'Na tecnica de fuga, o que significa "aumentacao"?',
    choices: [
      'O sujeito e apresentado com valores de nota duplicados (proporcionalmente mais longos)',
      'O sujeito e apresentado com notas cromaticas adicionais',
      'O sujeito e tocado por mais instrumentos do que originalmente',
      'O sujeito e transposto para uma oitava mais aguda',
    ],
    hint: 'A aumentacao alonga o sujeito multiplicando as suas duracoes (tipicamente por dois). A diminuicao faz o oposto, reduzindo os valores a metade.',
  },

  // ---- l8u25m3: Canone ----

  l8u25m3e1: {
    prompt: 'O que e um canone?',
    choices: [
      'Uma composicao onde uma voz e imitada exatamente por outra voz que entra apos um atraso',
      'Uma composicao onde todas as vozes tocam melodias diferentes simultaneamente',
      'Uma composicao com uma linha de baixo repetida',
      'Uma composicao que modula por todas as doze tonalidades',
    ],
    hint: 'Um canone e imitacao estrita: uma voz (o lider ou dux) e seguida a um intervalo temporal fixo por uma ou mais vozes (o seguidor ou comes) que a copiam exatamente.',
  },
  l8u25m3e2: {
    prompt:
      'Num "canone a quinta", como se relaciona o seguidor com o lider?',
    choices: [
      'O seguidor imita o lider transposto uma quinta perfeita acima (ou abaixo)',
      'O seguidor entra cinco tempos apos o lider',
      'O seguidor toca apenas a quinta nota de cada frase',
      'O seguidor toca a melodia do lider cinco vezes',
    ],
    hint: 'O nome do intervalo refere-se a transposicao de altura, nao ao atraso temporal. Um canone a quinta transpoe a melodia uma P5.',
  },
  l8u25m3e3: {
    prompt:
      'Qual e a diferenca entre imitacao estrita e imitacao livre?',
    choices: [
      'A imitacao estrita copia os intervalos exatamente; a imitacao livre permite modificacoes por razoes harmonicas ou melodicas',
      'A imitacao estrita e mais rapida; a imitacao livre e mais lenta',
      'A imitacao estrita usa apenas consonancias; a imitacao livre usa apenas dissonancias',
      'A imitacao estrita e para musica vocal; a imitacao livre e para musica instrumental',
    ],
    hint: 'A imitacao estrita preserva cada intervalo com precisao. A imitacao livre permite alteracoes aos intervalos mantendo a forma geral e o ritmo do modelo.',
  },

  // =========================================================================
  // Unidade 26: Grande Forma e Orquestracao
  // =========================================================================

  // ---- l8u26m1: Forma-Sonata ----

  l8u26m1e1: {
    prompt:
      'Quais sao as duas areas tematicas principais apresentadas numa exposicao em forma-sonata?',
    choices: [
      'Um primeiro tema na tonica e um segundo tema numa tonalidade contrastante (geralmente a dominante)',
      'Um tema rapido e um tema lento ambos na tonica',
      'Um tema para cordas e um tema para sopros na mesma tonalidade',
      'Um tema maior e a sua variante em modo menor',
    ],
    hint: 'A exposicao estabelece o conflito tonal: o grupo tematico principal esta na tonica, o grupo tematico secundario move-se para a dominante (ou relativo maior em tonalidades menores).',
  },
  l8u26m1e2: {
    prompt:
      'Qual e o proposito principal da seccao de desenvolvimento na forma-sonata?',
    choices: [
      'Explorar, fragmentar e transformar material tematico atraves de modulacao e desenvolvimento motivico',
      'Introduzir temas inteiramente novos nao ouvidos na exposicao',
      'Repetir a exposicao exatamente numa tonalidade diferente',
      'Proporcionar um contraste lento e lirico a exposicao',
    ],
    hint: 'O desenvolvimento pega em ideias da exposicao e trabalha-as atraves de varias tonalidades, sequencias e tecnicas contrapontisticas, construindo tensao em direcao a reexposicao.',
  },
  l8u26m1e3: {
    prompt:
      'Na reexposicao de uma forma-sonata, em que tonalidade e apresentado o segundo tema?',
    choices: [
      'Na tonalidade da tonica, resolvendo o conflito tonal da exposicao',
      'Na tonalidade da dominante, exatamente como na exposicao',
      'Na tonalidade da subdominante como compromisso',
      'Numa tonalidade remota escolhida livremente pelo compositor',
    ],
    hint: 'A reexposicao resolve a tensao harmonica trazendo ambos os grupos tematicos na tonica. O segundo tema, originalmente na dominante, regressa agora na tonalidade-mae.',
  },

  // ---- l8u26m2: Variacao, Rondo e Ritornello ----

  l8u26m2e1: {
    prompt:
      'Numa forma de tema e variacoes, o que se mantem constante ao longo das variacoes?',
    choices: [
      'A estrutura harmonica subjacente e/ou o contorno melodico do tema',
      'A melodia e ritmo exatos sem qualquer alteracao',
      'Apenas o andamento e a dinamica',
      'Nada; cada variacao e completamente independente',
    ],
    hint: 'As variacoes tipicamente preservam a estrutura harmonica e fraseologica do tema enquanto alteram melodia, ritmo, textura ou modo.',
  },
  l8u26m2e2: {
    prompt: 'Qual padrao descreve melhor a forma de rondo?',
    choices: [
      'ABACA (ou ABACABA) — um estribilho recorrente alterna com episodios contrastantes',
      'AABB — duas seccoes cada uma repetida',
      'ABA — uma estrutura ternaria com um meio contrastante',
      'ABCD — quatro seccoes diferentes tocadas uma vez cada',
    ],
    hint: 'A forma de rondo apresenta um tema principal (A) que regressa continuamente entre diferentes seccoes contrastantes (B, C, etc.). O padrao minimo e ABACA.',
  },
  l8u26m2e3: {
    prompt: 'O que e uma chacona (ou passacaglia)?',
    choices: [
      'Um conjunto de variacoes continuas sobre uma linha de baixo repetida ou progressao harmonica',
      'Uma danca rapida em metro ternario sem repeticoes',
      'Uma forma vocal com versos e estribilhos alternados',
      'Uma fuga com um sujeito cromatico',
    ],
    hint: 'Uma chacona/passacaglia e uma forma de variacao construida sobre um padrao de baixo repetido (baixo ostinato). As vozes superiores mudam enquanto o baixo cicla continuamente.',
  },

  // ---- l8u26m3: Orquestracao ----

  l8u26m3e1: {
    prompt:
      'Quais sao as quatro familias padrao da orquestra moderna?',
    choices: [
      'Cordas, Madeiras, Metais, Percussao',
      'Cordas, Sopros, Teclados, Vozes',
      'Instrumentos agudos, Instrumentos graves, Ritmo, Melodia',
      'Violinos, Violoncelos, Trompetes, Tambores',
    ],
    hint: 'As seccoes orquestrais padrao sao: Cordas (violino, viola, violoncelo, contrabaixo), Madeiras (flauta, oboe, clarinete, fagote), Metais (trompa, trompete, trombone, tuba) e Percussao.',
  },
  l8u26m3e2: {
    prompt:
      'O que significa um instrumento ser um "instrumento transpositor"?',
    choices: [
      'A sua altura escrita difere da altura que realmente soa (altura de concerto)',
      'Consegue tocar em qualquer tonalidade sem dificuldade',
      'Consegue mudar a sua afinacao durante uma interpretacao',
      'Transpoe a musica automaticamente para o interprete',
    ],
    hint: 'Um instrumento transpositor produz uma altura diferente da que esta escrita. Isto simplifica as dedilhacoes entre familias de instrumentos de tamanhos diferentes.',
  },
  l8u26m3e3: {
    prompt:
      'Quando um clarinete em Bb toca um C escrito, que altura de concerto soa?',
    choices: [
      'Bb (uma 2.a maior abaixo do escrito)',
      'D (uma 2.a maior acima do escrito)',
      'C (igual ao escrito)',
      'Eb (uma 3.a menor acima do escrito)',
    ],
    hint: 'Um instrumento em Bb soa uma 2.a maior abaixo do escrito. Quando o interprete le C, o ouvinte ouve Bb. Para soar um C de concerto, o interprete tem de ler D.',
  },

  // =========================================================================
  // Unidade 27: Pos-Tonal e Contemporaneo
  // =========================================================================

  // ---- l8u27m1: Conjuntos de Classes de Altura ----

  l8u27m1e1: {
    prompt:
      'Na notacao por inteiros de classes de altura, que numero representa a nota C?',
    choices: ['0', '1', '12', '7'],
    hint: 'A notacao por inteiros de classes de altura atribui C = 0, C#/Db = 1, D = 2, e assim por diante ate B = 11. O sistema e modulo 12.',
  },
  l8u27m1e2: {
    prompt:
      'O que e a "forma normal" de um conjunto de classes de altura?',
    choices: [
      'O arranjo das classes de altura em ordem ascendente dentro da menor extensao intervalar possivel',
      'A ordem em que as notas aparecem na partitura',
      'O arranjo por frequencia do mais grave ao mais agudo',
      'Um arranjo alfabetico dos nomes das notas',
    ],
    hint: 'A forma normal e o arranjo ascendente mais compacto de um conjunto de classes de altura. Rodas por todas as ordenacoes e escolhes a que tem o menor intervalo exterior.',
  },
  l8u27m1e3: {
    prompt:
      'Qual e o proposito de reduzir um conjunto de classes de altura a sua "forma primaria"?',
    choices: [
      'Criar uma etiqueta padrao para que conjuntos relacionados por transposicao e inversao partilhem a mesma identidade',
      'Determinar em que tonalidade a musica esta',
      'Encontrar a fundamental de um acorde',
      'Converter o conjunto em notacao musical padrao',
    ],
    hint: 'A forma primaria e a versao mais reduzida de um conjunto, comecando em 0 e compactada o mais possivel a esquerda. Permite comparar conjuntos independentemente da transposicao ou inversao.',
  },

  // ---- l8u27m2: Tecnica dos Doze Sons ----

  l8u27m2e1: {
    prompt: 'O que e uma serie dodecafonica?',
    choices: [
      'Uma ordenacao de todas as 12 classes de altura, cada uma aparecendo exatamente uma vez, usada como base de uma composicao',
      'Uma escala cromatica tocada do grave ao agudo',
      'Uma serie de 12 acordes usados como progressao harmonica',
      'Doze compassos de musica que se repetem ao longo da peca',
    ],
    hint: 'Uma serie (ou serie dodecafonica) e uma ordenacao fixa das 12 classes de altura cromaticas. Nenhuma classe de altura se repete ate todas as 12 terem soado.',
  },
  l8u27m2e2: {
    prompt:
      'Quais sao as quatro formas basicas de uma serie dodecafonica?',
    choices: [
      'Original (P), Retrograda (R), Inversao (I), Retrograda-Inversao (RI)',
      'Maior, Menor, Aumentada, Diminuta',
      'Tonica, Dominante, Subdominante, Sensivel',
      'Original, Transposta, Modulada, Desenvolvida',
    ],
    hint: 'P e a serie original. R inverte-a. I inverte todos os intervalos. RI aplica retrogradacao e inversao. Cada uma pode tambem ser transposta para qualquer um dos 12 niveis.',
  },
  l8u27m2e3: {
    prompt: 'Qual e a funcao de uma matriz dos doze sons?',
    choices: [
      'Apresentar as 48 formas da serie (12 transposicoes de P, R, I, RI) numa unica grelha 12x12',
      'Mostrar que instrumentos tocam cada nota da serie',
      'Converter numeros de classes de altura em notacao padrao',
      'Calcular o ritmo harmonico de uma composicao serial',
    ],
    hint: 'A matriz (ou quadrado magico) e uma grelha 12x12. As linhas da esquerda para a direita dao as formas P, da direita para a esquerda as R, as colunas de cima para baixo as I e de baixo para cima as RI.',
  },

  // ---- l8u27m3: Tecnicas do Seculo XX ----

  l8u27m3e1: {
    prompt:
      'O que e o "planing" (tambem chamado paralelismo) na musica do inicio do seculo XX?',
    choices: [
      'Mover acordes ou intervalos em movimento paralelo, mantendo a mesma estrutura intervalica',
      'Aumentar gradualmente o andamento ao longo de uma passagem',
      'Alternar entre duas tonalidades diferentes a cada compasso',
      'Escrever apenas em movimento por grau conjunto (movimento conjunto)',
    ],
    hint: 'O planing move uma forma de acorde ou intervalo fixa para cima ou para baixo em paralelo. Debussy usou famosamente triades e acordes de nona paralelos, abandonando as regras tradicionais de conducao de vozes.',
  },
  l8u27m3e2: {
    prompt: 'O que e a politonalidade?',
    choices: [
      'O uso simultaneo de duas ou mais tonalidades diferentes',
      'Musica que muda frequentemente de tonalidade numa unica linha melodica',
      'O uso de todos os doze sons igualmente sem centro tonal',
      'Uma textura com multiplos padroes ritmicos independentes',
    ],
    hint: 'A politonalidade sobrepoe diferentes centros tonais ao mesmo tempo. A bitonalidade (duas tonalidades) e o tipo mais comum. Milhaud e Stravinsky usaram-na extensivamente.',
  },
  l8u27m3e3: {
    prompt: 'O que e o pandiatonicismo?',
    choices: [
      'O uso livre de todas as notas de uma escala diatonica sem harmonia funcional tradicional ou regras de conducao de vozes',
      'Musica que usa apenas escalas pentatonicas',
      'O uso de todos os doze sons cromaticos simultaneamente',
      'Uma melodia diatonica harmonizada exclusivamente com triades',
    ],
    hint: 'O pandiatonicismo usa material diatonico (p. ex., todas as teclas brancas) mas sem hierarquia tonal ou progressoes funcionais. Stravinsky e Copland empregaram-no livremente.',
  },

  // ---- l8u27m4: Minimalismo e Aleatoriedade ----

  l8u27m4e1: {
    prompt:
      'Qual das seguintes opcoes descreve melhor o minimalismo musical?',
    choices: [
      'Musica construida sobre repeticao extensiva de padroes curtos com mudancas graduais e subtis ao longo do tempo',
      'Musica que utiliza o menor numero possivel de instrumentos',
      'Musica que dura menos de um minuto',
      'Musica que evita toda a repeticao em favor de variacao constante',
    ],
    hint: 'O minimalismo (Riley, Reich, Glass, Adams) apresenta padroes repetitivos, pulsacao constante, harmonia consonante e processos lentos de transformacao gradual.',
  },
  l8u27m4e2: {
    prompt: 'O que e musica aleatoria?',
    choices: [
      'Musica em que algum elemento da composicao ou interpretacao e deixado ao acaso ou a escolha do interprete',
      'Musica composta inteiramente por um algoritmo de computador',
      'Musica que e sempre interpretada a um andamento muito rapido',
      'Musica que usa apenas instrumentos eletronicos',
    ],
    hint: 'Aleatorio vem do latim "alea" (dado). Cage, Lutoslawski e outros incorporaram aleatoriedade ou indeterminacao do interprete nas suas composicoes.',
  },
  l8u27m4e3: {
    prompt:
      'Qual das seguintes e um exemplo de uma "tecnica expandida"?',
    choices: [
      'Tocar dentro do piano beliscando ou abafando as cordas diretamente',
      'Tocar uma escala padrao a um andamento muito rapido',
      'Usar um metronomo durante a interpretacao',
      'Ler a primeira vista uma peca nova',
    ],
    hint: 'As tecnicas expandidas produzem sons nao padrao: piano preparado, col legno, multifonicos, frullato, arco atras do cavalete, e muitas mais.',
  },

  // ---- l8u27m5: Ritmo Avancado ----

  l8u27m5e1: {
    prompt: 'O que e uma polirritmia?',
    choices: [
      'Dois ou mais padroes ritmicos conflituantes executados simultaneamente',
      'Um unico ritmo tocado por multiplos instrumentos em unissono',
      'Um ritmo que acelera gradualmente',
      'Um ritmo escrito numa formula de compasso composta',
    ],
    hint: 'A polirritmia sobrepoe diferentes agrupamentos ritmicos ao mesmo tempo (p. ex., tercinas contra pares, ou 4 contra 3). Cada camada mantem a sua propria divisao do pulso.',
  },
  l8u27m5e2: {
    prompt: 'O que e uma hemiola?',
    choices: [
      'Um recurso ritmico que cria o efeito de 3 tempos contra 2 (ou 2 contra 3) dentro do mesmo periodo de tempo',
      'Uma pausa que dura exatamente metade de um tempo',
      'Uma tecnica em que o andamento duplica subitamente',
      'Um ritmo sincopado usado apenas no jazz',
    ],
    hint: 'A hemiola reagrupa os tempos de modo que o que se sentia em tres e temporariamente sentido em dois, ou vice-versa. Comum na musica barroca e nos ritmos latino-americanos.',
  },
  l8u27m5e3: {
    prompt: 'O que e a modulacao metrica?',
    choices: [
      'Uma mudanca de tempo conseguida reinterpretando um valor de nota do metro antigo como a unidade de tempo do novo metro',
      'Mudar de uma tonalidade maior para uma menor',
      'Tocar o mesmo ritmo numa oitava diferente',
      'Abrandar gradualmente no final de uma peca',
    ],
    hint: 'A modulacao metrica (termo associado a Elliott Carter) usa um valor ritmico comum como pivot entre dois tempos. Por exemplo, uma colcheia em tercina no tempo antigo torna-se a nova colcheia.',
  },
};

export default overlay;
