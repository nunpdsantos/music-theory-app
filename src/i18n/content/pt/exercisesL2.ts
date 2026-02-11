import type { ExerciseLevelOverlay } from '../types';

// ---------------------------------------------------------------------------
// European Portuguese translations for Level 2 hand-authored exercises
// Note names (C, D, E, F#, Bb, etc.) kept in international notation.
// ---------------------------------------------------------------------------

const overlay: ExerciseLevelOverlay = {
  // =========================================================================
  // Unidade 4: Todas as Tonalidades Maiores e Graus da Escala
  // =========================================================================

  // ---- l2u4m1: Todas as Tonalidades Maiores / Circulo de Quintas ----

  l2u4m1e1: {
    prompt: 'Qual e a ordem dos sustenidos tal como aparecem nas armacoes de clave?',
    choices: [
      'F C G D A E B',
      'B E A D G C F',
      'C G D A E B F',
      'F B E A D G C',
    ],
    hint: 'Lembra-te: os sustenidos acumulam-se nesta ordem fixa: F-C-G-D-A-E-B.',
  },
  l2u4m1e2: {
    prompt: 'Qual e a ordem dos bemois tal como aparecem nas armacoes de clave?',
    choices: [
      'B E A D G C F',
      'F C G D A E B',
      'C F B E A D G',
      'E B A D G C F',
    ],
    hint: 'A ordem dos bemois e o inverso dos sustenidos: B-E-A-D-G-C-F.',
  },
  l2u4m1e3: {
    prompt: 'Constroi a escala de D maior. Seleciona as 7 notas no instrumento. Lembra-te: D maior tem 2 sustenidos.',
    hint: 'D maior: D, E, F#, G, A, B, C#. Os dois sustenidos sao F# e C#, seguindo a ordem dos sustenidos.',
  },
  l2u4m1e4: {
    prompt: 'Quantos sustenidos tem a tonalidade de A maior?',
    choices: [
      '3 sustenidos (F#, C#, G#)',
      '2 sustenidos (F#, C#)',
      '4 sustenidos (F#, C#, G#, D#)',
      '1 sustenido (F#)',
    ],
    hint: 'A maior esta tres passos no sentido dos ponteiros do relogio no circulo de quintas a partir de C: G (1#), D (2#), A (3#). Os sustenidos sao F#, C#, G#.',
  },

  // ---- l2u4m2: Nomes dos Graus da Escala ----

  l2u4m2e1: {
    prompt: 'Qual e o nome do 5.o grau de qualquer escala maior?',
    choices: [
      'Dominante',
      'Subdominante',
      'Mediante',
      'Supertonica',
    ],
    hint: 'O 5.o grau chama-se dominante porque e a segunda nota mais importante apos a tonica, dominando a tonalidade.',
  },
  l2u4m2e2: {
    prompt: 'Como se chama o 7.o grau da escala maior?',
    choices: [
      'Sensivel',
      'Subtonica',
      'Dominante',
      'Supertonica',
    ],
    hint: 'Na escala maior, o 7.o grau esta a meio-tom abaixo da tonica. "Conduz" fortemente para cima, em direcao a tonica, dai chamar-se sensivel.',
  },
  l2u4m2e3: {
    prompt: 'Qual grau da escala se chama subdominante?',
    choices: [
      '4.o grau',
      '5.o grau',
      '2.o grau',
      '6.o grau',
    ],
    hint: 'A subdominante e o 4.o grau. Situa-se uma 5.a abaixo da tonica (sub = abaixo), tal como a dominante se situa uma 5.a acima.',
  },

  // =========================================================================
  // Unidade 5: Escalas Menores e Relacoes entre Tonalidades
  // =========================================================================

  // ---- l2u5m1: Menor Natural ----

  l2u5m1e1: {
    prompt: 'Constroi a escala de A menor natural. Seleciona as 7 notas. Esta escala usa apenas teclas brancas.',
    hint: 'A menor natural: A, B, C, D, E, F, G. O padrao de intervalos e T-mT-T-T-mT-T-T. Sem sustenidos nem bemois.',
  },
  l2u5m1e2: {
    prompt: 'Constroi a escala de E menor natural. Seleciona as 7 notas. Uma nota precisa de sustenido.',
    hint: 'E menor natural: E, F#, G, A, B, C, D. O F# e necessario para manter o padrao T-mT-T-T-mT-T-T.',
  },
  l2u5m1e3: {
    prompt: 'Qual e o padrao de intervalos da escala menor natural?',
    choices: [
      'T-mT-T-T-mT-T-T',
      'T-T-mT-T-T-T-mT',
      'T-mT-T-T-T-mT-T',
      'mT-T-T-mT-T-T-T',
    ],
    hint: 'A escala menor natural tem meios-tons entre os graus 2-3 e 5-6. Compara com a maior (T-T-mT-T-T-T-mT): o 3.o, 6.o e 7.o graus sao baixados.',
  },
  l2u5m1e4: {
    prompt: 'Quais graus da escala menor natural sao baixados em relacao a escala maior?',
    choices: [
      '3.o, 6.o e 7.o',
      '2.o, 3.o e 6.o',
      '3.o e 7.o apenas',
      '2.o, 5.o e 7.o',
    ],
    hint: 'Compara C maior (C D E F G A B) com C menor natural (C D Eb F G Ab Bb). O 3.o, 6.o e 7.o graus sao cada um baixados meio-tom.',
  },

  // ---- l2u5m2: Menor Harmonica/Melodica ----

  l2u5m2e1: {
    prompt: 'Constroi a escala de A menor harmonica. Seleciona as 7 notas. Em relacao a menor natural, uma nota e elevada.',
    hint: 'A menor harmonica: A, B, C, D, E, F, G#. O 7.o grau (G) e elevado a G# para criar uma sensivel de volta a A.',
  },
  l2u5m2e2: {
    prompt: 'Constroi a escala de A menor melodica (forma ascendente). Duas notas sao elevadas em relacao a menor natural.',
    hint: 'A menor melodica ascendente: A, B, C, D, E, F#, G#. Tanto o 6.o (F para F#) como o 7.o (G para G#) sao elevados para suavizar a 2.a aumentada.',
  },
  l2u5m2e3: {
    prompt: 'O que distingue a menor harmonica da escala menor natural?',
    choices: [
      'O 7.o grau e elevado meio-tom',
      'O 6.o grau e elevado meio-tom',
      'O 3.o grau e elevado meio-tom',
      'O 2.o grau e baixado meio-tom',
    ],
    hint: 'A menor harmonica eleva o 7.o grau para criar uma sensivel (meio-tom abaixo da tonica). Isto e essencial para formar o acorde de dominante (V) em tonalidades menores.',
  },
  l2u5m2e4: {
    prompt: 'Porque e que a escala menor melodica eleva tanto o 6.o como o 7.o grau na forma ascendente?',
    choices: [
      'Para eliminar a 2.a aumentada entre o 6.o e o 7.o grau elevado da menor harmonica',
      'Para igualar exatamente a escala maior',
      'Para facilitar a execucao no piano',
      'Para remover todos os meios-tons da escala',
    ],
    hint: 'A menor harmonica tem uma 2.a aumentada incomoda (3 meios-tons) entre o 6.o e o 7.o grau elevado. Elevar tambem o 6.o suaviza esta distancia para um tom.',
  },

  // ---- l2u5m3: Tonalidades Relativas/Paralelas ----

  l2u5m3e1: {
    prompt: 'Qual e a relativa menor de C maior?',
    choices: [
      'A menor',
      'C menor',
      'E menor',
      'D menor',
    ],
    hint: 'A relativa menor comeca no 6.o grau da escala maior. Em C maior, o 6.o grau e A. Tanto C maior como A menor partilham a mesma armacao de clave (sem sustenidos nem bemois).',
  },
  l2u5m3e2: {
    prompt: 'Qual e a relativa maior de D menor?',
    choices: [
      'F maior',
      'D maior',
      'Bb maior',
      'G maior',
    ],
    hint: 'A relativa maior comeca uma 3.a menor (3 meios-tons) acima da tonalidade menor. D mais 3 meios-tons = F. Tanto D menor como F maior partilham um bemol (Bb).',
  },
  l2u5m3e3: {
    prompt: 'Qual e a paralela menor de G maior?',
    choices: [
      'G menor',
      'E menor',
      'D menor',
      'B menor',
    ],
    hint: 'Tonalidades paralelas partilham a mesma fundamental mas diferem na qualidade. A paralela menor de G maior e G menor. Tem armacoes de clave diferentes.',
  },
  l2u5m3e4: {
    prompt: 'Qual e a diferenca entre tonalidades relativas e tonalidades paralelas?',
    choices: [
      'Relativas partilham a mesma armacao de clave; paralelas partilham a mesma tonica',
      'Relativas partilham a mesma tonica; paralelas partilham a mesma armacao de clave',
      'Relativas sao sempre maiores; paralelas sao sempre menores',
      'Nao ha diferenca; sao o mesmo conceito',
    ],
    hint: 'C maior e A menor sao relativas (mesma armacao de clave: sem sustenidos/bemois). C maior e C menor sao paralelas (mesma tonica: C).',
  },

  // =========================================================================
  // Unidade 6: Compasso Composto e Sincopa
  // =========================================================================

  // ---- l2u6m1: Compasso Composto ----

  l2u6m1e1: {
    prompt: 'No compasso 6/8, como se organizam os tempos?',
    choices: [
      '2 tempos principais, cada um dividido em 3 colcheias',
      '6 tempos iguais de colcheias',
      '3 tempos principais, cada um dividido em 2 colcheias',
      '8 tempos agrupados em seis',
    ],
    hint: '6/8 e compasso composto binario: 6 colcheias agrupam-se em 2 grupos de 3. Cada grupo de 3 forma um tempo principal, dando a sensacao UM-e-a DOIS-e-a.',
  },
  l2u6m1e2: {
    prompt: 'O que define o compasso composto?',
    choices: [
      'Cada tempo principal divide-se naturalmente em 3 partes iguais',
      'Cada tempo principal divide-se naturalmente em 2 partes iguais',
      'A indicacao de compasso tem um numero grande em cima',
      'O andamento e mais rapido que no compasso simples',
    ],
    hint: 'No compasso composto, a unidade de tempo e uma nota com ponto que se subdivide em tres. No compasso simples, os tempos subdividem-se em dois.',
  },
  l2u6m1e3: {
    prompt: 'Quantos tempos principais tem o compasso 9/8?',
    choices: [
      '3 tempos principais (cada um dividido em 3 colcheias)',
      '9 tempos',
      '4 tempos principais',
      '2 tempos principais',
    ],
    hint: '9/8 e compasso composto ternario: 9 colcheias formam 3 grupos de 3. Cada grupo de 3 e um tempo principal (uma seminima com ponto).',
  },

  // ---- l2u6m2: Sincopa ----

  l2u6m2e1: {
    prompt: 'O que e sincopa?',
    choices: [
      'Colocar acentos em tempos normalmente fracos ou contratempos',
      'Tocar todas as notas com o mesmo volume',
      'Acelerar gradualmente o andamento',
      'Tocar notas numa oitava diferente',
    ],
    hint: 'A sincopa perturba o padrao ritmico esperado ao acentuar tempos ou partes de tempos normalmente nao acentuados, criando tensao ritmica e energia.',
  },
  l2u6m2e2: {
    prompt: 'O que sao tercinas?',
    choices: [
      '3 notas tocadas no tempo normalmente ocupado por 2 notas do mesmo valor',
      '3 notas tocadas uma apos a outra',
      'Um acorde com 3 notas',
      '3 compassos agrupados',
    ],
    hint: 'As tercinas subdividem um tempo em 3 partes iguais em vez das habituais 2. Uma tercina de colcheias encaixa 3 colcheias no espaco de uma seminima.',
  },

  // =========================================================================
  // Unidade 7: Intervalos, Triades e Harmonia Diatonica
  // =========================================================================

  // ---- l2u7m1: Qualidade do Intervalo ----

  l2u7m1e1: {
    prompt: 'Identifica o intervalo de C ascendente ate G. Este e um dos intervalos mais consonantes da musica.',
    hint: 'De C a G sao 7 meios-tons. E uma 5.a perfeita -- o intervalo encontrado nos power chords e a base do circulo de quintas.',
  },
  l2u7m1e2: {
    prompt: 'Identifica o intervalo de C ascendente ate Eb. Este intervalo da aos acordes menores o seu som caracteristico.',
    hint: 'De C a Eb sao 3 meios-tons. E uma 3.a menor -- o intervalo que distingue os acordes menores dos maiores.',
  },
  l2u7m1e3: {
    prompt: 'Identifica o intervalo de D ascendente ate B. Conta tanto os nomes das notas como os meios-tons.',
    hint: 'De D a B abrange 6 nomes de notas (D-E-F-G-A-B) = uma 6.a. D a B sao 9 meios-tons, o que faz uma 6.a maior.',
  },
  l2u7m1e4: {
    prompt: 'O que torna um intervalo "perfeito"?',
    choices: [
      'Nao tem variantes maior/menor -- apenas perfeito, aumentado ou diminuto',
      'Soa perfeitamente afinado',
      'Usa apenas teclas brancas no piano',
      'E sempre consonante',
    ],
    hint: 'Unissonos, 4.as, 5.as e oitavas sao intervalos "perfeitos". Ao contrario das 2.as, 3.as, 6.as e 7.as que tem pares maior/menor, os intervalos perfeitos tem apenas uma forma basica.',
  },
  l2u7m1e_ear1: {
    prompt: 'Ouve este intervalo e identifica-o.',
    hint: 'Este e um dos intervalos mais consonantes. Abrange 7 meios-tons e e a base do circulo de quintas.',
  },
  l2u7m1e_ear2: {
    prompt: 'Ouve este intervalo e identifica-o.',
    hint: 'Este intervalo brilhante e quente abrange 4 meios-tons e define o caracter dos acordes maiores.',
  },
  l2u7m1e_ear3: {
    prompt: 'Ouve este intervalo e identifica-o.',
    hint: 'Este intervalo abrange 5 meios-tons. E a inversao da 5.a perfeita.',
  },
  l2u7m1e_ear4: {
    prompt: 'Ouve este intervalo e identifica-o.',
    hint: 'Este intervalo mais sombrio abrange 3 meios-tons e da aos acordes menores o seu som caracteristico.',
  },

  // ---- l2u7m2: Aumentados/Diminutos/Compostos ----

  l2u7m2e1: {
    prompt: 'Identifica o intervalo de C ascendente ate F#. Este intervalo divide a oitava exatamente ao meio.',
    hint: 'De C a F# (ou Gb) sao 6 meios-tons -- exatamente metade de 12. E o tritono, tambem chamado 4.a aumentada ou 5.a diminuta.',
  },
  l2u7m2e2: {
    prompt: 'Identifica o intervalo de C ascendente ate Db. Este e o menor intervalo com nome proprio.',
    hint: 'De C a Db e 1 meio-tom. E uma 2.a menor -- o menor intervalo na musica ocidental padrao, criando tensao maxima.',
  },
  l2u7m2e3: {
    prompt: 'Identifica o intervalo de C ascendente ate B. Este intervalo amplo esta a apenas meio-tom de uma oitava.',
    hint: 'De C a B sao 11 meios-tons. E uma 7.a maior -- um intervalo amplo e dissonante frequentemente usado em acordes de jazz.',
  },
  l2u7m2e4: {
    prompt: 'O que e um tritono?',
    choices: [
      'Um intervalo de 6 meios-tons que divide a oitava ao meio',
      'Um acorde construido a partir de 3 tons',
      'Um intervalo de 3 meios-tons',
      'Uma escala com 3 notas',
    ],
    hint: 'O tritono abrange 3 tons (6 meios-tons). Pode chamar-se 4.a aumentada ou 5.a diminuta. Na Idade Media era chamado "o diabo na musica" devido a sua dissonancia.',
  },

  // ---- l2u7m3: Os Quatro Tipos de Triades ----

  l2u7m3e1: {
    prompt: 'Constroi uma triade de D menor. Seleciona as 3 notas: fundamental, 3.a menor e 5.a perfeita.',
    hint: 'D menor = D, F, A. Fundamental (D) + 3.a menor (F, 3 meios-tons acima) + 5.a perfeita (A, 7 meios-tons acima da fundamental).',
  },
  l2u7m3e2: {
    prompt: 'Constroi uma triade de B diminuta. Seleciona as 3 notas: fundamental, 3.a menor e 5.a diminuta.',
    hint: 'B diminuta = B, D, F. Fundamental (B) + 3.a menor (D, 3 meios-tons acima) + 5.a diminuta (F, 6 meios-tons acima da fundamental). Ambos os intervalos sao 3.as menores empilhadas.',
  },
  l2u7m3e3: {
    prompt: 'Que notas compoem uma triade aumentada construida sobre C?',
    choices: [
      'C, E, G# -- fundamental, 3.a maior, 5.a aumentada',
      'C, Eb, G -- fundamental, 3.a menor, 5.a perfeita',
      'C, E, G -- fundamental, 3.a maior, 5.a perfeita',
      'C, Eb, Gb -- fundamental, 3.a menor, 5.a diminuta',
    ],
    hint: 'Uma triade aumentada empilha duas 3.as maiores: C a E (4 meios-tons) e E a G# (4 meios-tons). A 5.a e elevada (aumentada) em relacao a triade maior.',
  },
  l2u7m3e4: {
    prompt: 'Qual tipo de triade e considerado o mais instavel e dissonante?',
    choices: [
      'Diminuta -- duas 3.as menores com um tritono entre fundamental e 5.a',
      'Menor -- porque soa triste',
      'Maior -- porque e a mais comum',
      'Aumentada -- porque tem a 5.a elevada',
    ],
    hint: 'A triade diminuta contem um tritono (6 meios-tons) entre a fundamental e a 5.a. Isso torna-a o tipo de triade mais dissonante e instavel, com forte necessidade de resolver.',
  },

  // ---- l2u7m4: Inversoes/Baixo Cifrado ----

  l2u7m4e1: {
    prompt: 'Que numeros de baixo cifrado representam uma triade em estado fundamental?',
    choices: [
      '5/3 (frequentemente abreviado nao escrevendo nada)',
      '6/3',
      '6/4',
      '7/5/3',
    ],
    hint: 'No estado fundamental, os intervalos acima do baixo sao uma 3.a e uma 5.a. O baixo cifrado escreve-os como 5/3. Como o estado fundamental e a posicao por defeito, os numeros sao geralmente omitidos.',
  },
  l2u7m4e2: {
    prompt: 'Que numeros de baixo cifrado representam uma triade em 1.a inversao?',
    choices: [
      '6/3 (frequentemente abreviado para apenas 6)',
      '5/3',
      '6/4',
      '4/2',
    ],
    hint: 'Na 1.a inversao, a 3.a do acorde esta no baixo. Os intervalos acima do baixo sao uma 3.a e uma 6.a. O baixo cifrado abrevia 6/3 para apenas 6.',
  },
  l2u7m4e3: {
    prompt: 'O que e uma inversao de triade?',
    choices: [
      'Reorganizar o acorde para que uma nota diferente da fundamental fique no baixo',
      'Virar o acorde ao contrario para que a nota de cima fique em baixo',
      'Mudar o acorde de maior para menor',
      'Tocar o acorde numa tonalidade diferente',
    ],
    hint: 'As inversoes mudam qual nota do acorde esta no baixo. Estado fundamental tem a fundamental no baixo, 1.a inversao tem a 3.a, 2.a inversao tem a 5.a. A identidade do acorde mantem-se.',
  },

  // ---- l2u7m5: Triades Diatonicas/Numeracao Romana ----

  l2u7m5e1: {
    prompt: 'Numa tonalidade maior, qual e a qualidade do acorde iii (construido sobre o 3.o grau)?',
    choices: [
      'Menor',
      'Maior',
      'Diminuta',
      'Aumentada',
    ],
    hint: 'As triades diatonicas na escala maior sao: I(M) ii(m) iii(m) IV(M) V(M) vi(m) vii\u00b0(dim). Algarismos romanos minusculos indicam qualidade menor. O acorde iii e menor.',
  },
  l2u7m5e2: {
    prompt: 'Numa tonalidade maior, qual e a qualidade do acorde vii\u00b0 (construido sobre o 7.o grau)?',
    choices: [
      'Diminuta',
      'Menor',
      'Maior',
      'Aumentada',
    ],
    hint: 'O acorde construido sobre o 7.o grau da escala maior (ex: B-D-F em C maior) contem um tritono entre a fundamental e a 5.a, tornando-o diminuto. Nota-se viio.',
  },
  l2u7m5e3: {
    prompt: 'Constroi uma triade de F maior. Este e o acorde IV na tonalidade de C maior.',
    hint: 'F maior = F, A, C. Fundamental (F) + 3.a maior (A, 4 meios-tons acima) + 5.a perfeita (C, 7 meios-tons acima da fundamental).',
  },
  l2u7m5e4: {
    prompt: 'Constroi uma triade de A menor. Este e o acorde vi na tonalidade de C maior.',
    hint: 'A menor = A, C, E. Fundamental (A) + 3.a menor (C, 3 meios-tons acima) + 5.a perfeita (E, 7 meios-tons acima da fundamental).',
  },
};

export default overlay;
