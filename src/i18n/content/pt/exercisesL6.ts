import type { ExerciseLevelOverlay } from '../types';

// ---------------------------------------------------------------------------
// European Portuguese translations for Level 6 hand-authored exercises
// Note names (C, D, E, F#, Bb, etc.) kept in international notation.
// ---------------------------------------------------------------------------

const overlay: ExerciseLevelOverlay = {
  // =========================================================================
  // Unidade 18: Acordes Cromaticos
  // =========================================================================

  // ---- l6u18m1: Acorde Napolitano bII ----

  l6u18m1e1: {
    prompt:
      'Constroi o acorde napolitano (bII) em Do menor. E uma triade de Db maior: seleciona Db, F e Ab.',
    hint: 'O acorde napolitano e uma triade maior construida sobre o 2.o grau rebaixado. Em Do menor, bII = Db maior = Db, F, Ab (classes de altura 1, 5, 8).',
  },
  l6u18m1e2: {
    prompt: 'Qual e a funcao harmonica do acorde napolitano (bII)?',
    choices: [
      'Pre-dominante -- substitui ii ou iv e move-se para V',
      'Dominante -- resolve diretamente para a tonica',
      'Tonica -- funciona como substituto de I',
      'Acorde de passagem -- nao tem funcao estrutural',
    ],
    hint: 'O napolitano funciona como acorde pre-dominante, movendo-se tipicamente para V (frequentemente atraves de um 6/4 cadencial). Intensifica a abordagem a dominante com a sua fundamental cromatica.',
  },
  l6u18m1e3: {
    prompt: 'Em que inversao se encontra mais tipicamente o acorde napolitano?',
    choices: [
      'Primeira inversao (bII6) com a 3.a no baixo',
      'Posicao fundamental com o 2.o grau rebaixado no baixo',
      'Segunda inversao (bII6/4) com a 5.a no baixo',
      'Aparece igualmente em todas as inversoes',
    ],
    hint: 'O napolitano encontra-se quase sempre na primeira inversao (bII6), colocando o 4.o grau no baixo. Isto proporciona uma conducao de vozes mais suave para V.',
  },

  // ---- l6u18m2: Sexta Italiana/Francesa ----

  l6u18m2e1: {
    prompt: 'Quantos semitons abrange o intervalo de sexta aumentada?',
    choices: [
      '10 semitons -- enarmonicamente equivalente a uma setima menor',
      '9 semitons -- o mesmo que uma sexta maior',
      '8 semitons -- o mesmo que uma sexta menor',
      '11 semitons -- o mesmo que uma setima maior',
    ],
    hint: 'Uma sexta aumentada e meio-tom maior que uma sexta maior (9 semitons). Abrange 10 semitons e e enarmonicamente do mesmo tamanho que uma setima menor, mas as duas notas resolvem divergentemente para uma oitava.',
  },
  l6u18m2e2: {
    prompt: 'O que distingue a sexta italiana (It+6) da sexta francesa (Fr+6)?',
    choices: [
      'A francesa acrescenta uma quarta aumentada acima do baixo; a italiana tem apenas tres notas',
      'A italiana tem quatro notas; a francesa tem apenas tres',
      'A francesa resolve para a tonica; a italiana resolve para a dominante',
      'Sao o mesmo acorde com nomes diferentes baseados na epoca de utilizacao',
    ],
    hint: 'A It+6 e a mais simples: b6, 1, #4 (tres notas). A Fr+6 acrescenta o 2.o grau (b6, 1, 2, #4), criando um subconjunto caracteristico de tons inteiros com uma quarta aumentada acima do baixo.',
  },
  l6u18m2e3: {
    prompt: 'Qual e a funcao harmonica dos acordes de sexta aumentada?',
    choices: [
      'Pre-dominante -- intensificam o movimento para a dominante',
      'Dominante -- resolvem diretamente para a tonica',
      'Prolongamento da tonica -- decoram a harmonia de tonica',
      'Funcao de mediante -- substituem iii ou VI',
    ],
    hint: 'Todos os acordes de sexta aumentada funcionam como pre-dominantes cromaticos. O intervalo de sexta aumentada (b6 e #4) resolve divergentemente por meio-tom em ambas as vozes para a nota da dominante, criando uma abordagem intensamente direcionada para V.',
  },

  // ---- l6u18m3: Sexta Alema ----

  l6u18m3e1: {
    prompt: 'O acorde de sexta alema (Gr+6) e enarmonicamente equivalente a que acorde comum?',
    choices: [
      'Um acorde de setima da dominante (V7) -- mesmas alturas, grafia e resolucao diferentes',
      'Um acorde de setima diminuta -- mesma estrutura intervalar',
      'Um acorde de setima semi-diminuta -- mesmo som, contexto diferente',
      'Um acorde de setima maior -- identico em posicao cerrada',
    ],
    hint: 'A Gr+6 tem as mesmas classes de altura que um acorde de setima da dominante. Por exemplo, em Do menor a Gr+6 (Ab, C, Eb, F#) soa identica a Ab7 (Ab, C, Eb, Gb). A grafia diferente reflete destinos de conducao de vozes diferentes.',
  },
  l6u18m3e2: {
    prompt: 'Como se cifra o acorde de sexta alema numa tonalidade menor (por ex. Do menor)?',
    choices: [
      'Ab, C, Eb, F# -- b6, 1, b3, #4',
      'Ab, C, E, F# -- b6, 1, 3, #4',
      'Ab, Cb, Eb, F# -- b6, b1, b3, #4',
      'Ab, C, Eb, Gb -- b6, 1, b3, b5',
    ],
    hint: 'Em Do menor, a Gr+6 contem b6 (Ab), 1 (C), b3 (Eb) e #4 (F#). O intervalo crucial de sexta aumentada esta entre Ab e F#, que resolve divergentemente para Sol-Sol (oitava sobre a dominante).',
  },
  l6u18m3e3: {
    prompt: 'O acorde de sexta alema resolve tipicamente para que acorde?',
    choices: [
      'A dominante (V) ou 6/4 cadencial, com b6 e #4 a resolverem divergentemente para o 5.o grau',
      'A tonica (I) diretamente em posicao fundamental',
      'A subdominante (IV) como parte de uma cadencia plagal',
      'A sobretonica (ii) para iniciar uma cadeia pre-dominante',
    ],
    hint: 'Como todos os acordes de sexta aumentada, a Gr+6 resolve para V. As vozes extremas (b6 e #4) convergem na nota da dominante por meio-tom. Um 6/4 cadencial intervem frequentemente para evitar quintas paralelas.',
  },

  // ---- l6u18m4: Modulacao Enarminica Gr+6 <-> V7 ----

  l6u18m4e1: {
    prompt: 'Qual e o principio fundamental por detras da modulacao enarminica usando Gr+6 e V7?',
    choices: [
      'Um acorde que funciona como Gr+6 numa tonalidade pode ser reescrito como V7 numa tonalidade distante, ou vice-versa',
      'Qualquer acorde de setima da dominante pode substituir qualquer acorde de sexta aumentada em qualquer tonalidade',
      'A modulacao requer conducao cromatica de vozes nas quatro vozes simultaneamente',
      'Os dois acordes partilham a mesma resolucao independentemente da sua grafia',
    ],
    hint: 'Uma vez que Gr+6 e V7 sao enarmonicamente identicos, uma unica sonoridade pode pivotar entre duas tonalidades distantes. A reescrita muda qual voz conduz para onde, redirecionando a trajetoria harmonica.',
  },
  l6u18m4e2: {
    prompt: 'A modulacao enarminica via Gr+6/V7 permite modulacao direta para tonalidades a que distancia?',
    choices: [
      'Tonalidades distantes -- ate um tritono ou mais, muito alem do alcance de pivot diatonico',
      'Apenas tonalidades proximas com uma diferenca de um acidente',
      'Apenas entre tonalidades paralelas maior e menor',
      'Exatamente meio-tom de distancia e nao mais',
    ],
    hint: 'Os acordes pivot diatonicos ligam apenas tonalidades proximas. A reinterpretacao enarminica de Gr+6 como V7 (ou vice-versa) pode ligar tonalidades a um tritono ou mais de distancia -- a tecnica-assinatura dos compositores do periodo romantico.',
  },
  l6u18m4e3: {
    prompt: 'Se uma Gr+6 em Do menor (Ab, C, Eb, F#) for reinterpretada como V7, que tonalidade toniciza agora?',
    choices: [
      'Db maior/menor -- reescrita como Ab, C, Eb, Gb = Ab7 = V7/Db',
      'Sol maior -- porque F# resolve subindo para Sol',
      'Fa maior -- o acorde torna-se V7/Fa',
      'Mib maior -- porque Eb e a nota do meio',
    ],
    hint: 'Reescrever F# como Gb transforma o acorde em Ab, C, Eb, Gb = Lab setima da dominante. Ab7 e V7 de Db, portanto a musica pode pivotar suavemente de Do menor para Reb maior -- uma deslocacao de meio-tom, ligando territorio tonal muito distante.',
  },

  // =========================================================================
  // Unidade 19: Tecnicas Cromaticas Avancadas
  // =========================================================================

  // ---- l6u19m1: Modulacao Enarminica via dim7 ----

  l6u19m1e1: {
    prompt:
      'Constroi um acorde de setima diminuta sobre C. Seleciona 4 notas: C, Eb, Gb e Bbb (enarmonico de A).',
    hint: 'Um acorde de setima diminuta empilha tres tercas menores: C (0), Eb (3), Gb (6), Bbb (9). Estas quatro classes de altura dividem a oitava em partes iguais. Bbb e enarmonicamente A.',
  },
  l6u19m1e2: {
    prompt: 'Porque e que o acorde de setima diminuta e simetrico?',
    choices: [
      'Divide a oitava de 12 semitons em quatro tercas menores iguais (0, 3, 6, 9)',
      'Contem apenas notas naturais sem sustenidos ou bemois',
      'As suas inversoes produzem conteudo intervalar diferente de cada vez',
      'Tem o mesmo numero de intervalos maiores e menores',
    ],
    hint: 'O acorde dim7 e construido inteiramente com tercas menores (3 semitons cada). Como 3 x 4 = 12, as quatro notas dividem a oitava uniformemente. Isto significa que cada inversao do acorde soa identica na sua estrutura intervalar.',
  },
  l6u19m1e3: {
    prompt: 'Para quantas tonalidades diferentes pode resolver um unico acorde de setima diminuta como acorde de sensivel (viio7)?',
    choices: [
      'Quatro tonalidades -- qualquer das suas quatro notas pode ser tratada como sensivel',
      'Duas tonalidades -- uma maior e uma menor',
      'Doze tonalidades -- uma para cada semitom',
      'Uma tonalidade -- determinada pela sua fundamental',
    ],
    hint: 'Devido a sua simetria, cada nota do acorde dim7 pode ser reescrita como sensivel resolvendo ascendentemente por meio-tom para uma tonica diferente. C-Eb-Gb-Bbb pode ser viio7 de Db, E, G ou Bb.',
  },

  // ---- l6u19m2: Setima Diminuta com Nota Comum ----

  l6u19m2e1: {
    prompt: 'O que define um acorde de setima diminuta com nota comum (CTo7)?',
    choices: [
      'Um acorde de setima diminuta que partilha uma nota com o acorde que embeleza',
      'Um acorde de setima diminuta que resolve para a dominante',
      'Qualquer acorde de setima diminuta usado numa tonalidade menor',
      'Um acorde de setima diminuta que partilha todas as notas com o acorde seguinte',
    ],
    hint: 'A setima diminuta com nota comum mantem uma nota (a nota comum) do acorde que decora. As outras tres vozes movem-se por grau conjunto, criando um embelezamento cromatico por notas vizinhas.',
  },
  l6u19m2e2: {
    prompt: 'Num CTo7 que embeleza um acorde de Do maior, qual e tipicamente a nota comum?',
    choices: [
      'A fundamental do acorde embelezado (C)',
      'A 3.a do acorde embelezado (E)',
      'A 5.a do acorde embelezado (G)',
      'A 7.a do acorde embelezado (B)',
    ],
    hint: 'A forma mais comum mantem a fundamental do acorde-alvo. Para um CTo7 que embeleza Do maior, C e mantido enquanto as outras vozes (D#, F#, A) se movem por grau conjunto de volta para as notas do acorde de Do maior.',
  },
  l6u19m2e3: {
    prompt: 'Qual e a funcao principal de um acorde de setima diminuta com nota comum?',
    choices: [
      'Embelezamento -- prolonga ou decora um acorde em vez de impulsionar a progressao harmonica',
      'Pre-dominante -- prepara a dominante como os acordes de sexta aumentada',
      'Dominante -- resolve para a tonica com movimento de sensivel',
      'Modulatoria -- inicia sempre uma mudanca de tonalidade',
    ],
    hint: 'Ao contrario do viio7 (que tem funcao dominante), o CTo7 e puramente decorativo. Embeleza um acorde atraves de movimento cromatico por notas vizinhas, acrescentando cor sem mudar a direcao harmonica.',
  },

  // ---- l6u19m3: Mediantes Cromaticas ----

  l6u19m3e1: {
    prompt: 'O que define uma relacao de mediante cromatica entre dois acordes?',
    choices: [
      'Dois acordes cujas fundamentais distam uma 3.a com uma alteracao cromatica que muda a qualidade esperada',
      'Dois acordes cujas fundamentais distam uma 2.a ligados por notas de passagem cromaticas',
      'Qualquer progressao de acordes que usa conducao cromatica de vozes',
      'Dois acordes que partilham as tres notas mas em inversoes diferentes',
    ],
    hint: 'As mediantes diatonicas (I-iii, I-vi) partilham duas notas comuns. As mediantes cromaticas (ex. Do maior para Mi maior, ou Do maior para Lab maior) tem fundamentais a uma 3.a de distancia mas com qualidade alterada, partilhando apenas uma ou zero notas comuns.',
  },
  l6u19m3e2: {
    prompt: 'Quantos tipos de relacoes de terca cromatica existem entre triades maiores?',
    choices: [
      'Quatro -- 3.a maior/menor ascendente e 3.a maior/menor descendente (ex. C-E, C-Ab, C-Eb, C-A)',
      'Dois -- uma ascendente e uma descendente',
      'Seis -- uma para cada classe de intervalo',
      'Tres -- relacoes de terca maior, menor e diminuta',
    ],
    hint: 'A partir de qualquer triade maior, podes mover-te para outra triade maior a uma 3.a maior ou menor acima ou abaixo: C para E, C para Eb, C para A, C para Ab. Cada uma produz uma cor diferente, e as quatro sao mediantes cromaticas.',
  },
  l6u19m3e3: {
    prompt: 'Qual e a caracteristica de conducao de vozes das progressoes por mediante cromatica?',
    choices: [
      'Uma ou zero notas comuns com movimento cromatico (meio-tom) nas vozes que se movem',
      'Todas as vozes movem-se por grau conjunto na mesma direcao',
      'Duas notas comuns com uma voz a mover-se por tom',
      'Movimento da fundamental por quinta com notas do acorde alteradas',
    ],
    hint: 'As mediantes cromaticas partilham frequentemente uma nota comum enquanto as outras vozes se deslocam por meio-tom. Em alguns casos (mediantes duplamente cromaticas como Do maior para Reb menor) nao ha notas comuns, com deslocacoes cromaticas dramaticas em todas as vozes.',
  },

  // ---- l6u19m4: Tecnicas Tardo-Romanticas ----

  l6u19m4e1: {
    prompt: 'O que caracteriza a "harmonia nao funcional" na musica tardo-romantica?',
    choices: [
      'Os acordes ligam-se por conducao de vozes ou cor em vez de funcao tonica-dominante',
      'A musica evita completamente o uso de triades ou acordes de setima',
      'Todos os acordes sao diminutos ou aumentados sem triades maiores ou menores',
      'A harmonia usa apenas dois acordes ao longo de uma peca inteira',
    ],
    hint: 'Na harmonia nao funcional, as progressoes de acordes sao impulsionadas pela conducao suave de vozes, notas comuns partilhadas ou efeito coloristico em vez do ciclo funcional tradicional T-PD-D-T. Wagner, Liszt e o Chopin tardio foram pioneiros desta abordagem.',
  },
  l6u19m4e2: {
    prompt: 'O que e planing cromatico (harmonia paralela)?',
    choices: [
      'Mover uma forma fixa de acorde em movimento paralelo por meios-tons ou tons',
      'Alternar entre dois acordes repetidamente',
      'Resolver cada acorde cromaticamente para o seguinte por meio-tom no baixo',
      'Tocar as doze alturas cromaticas simultaneamente',
    ],
    hint: 'O planing move uma estrutura inteira de acorde (ex. uma triade maior ou acorde de setima da dominante) para cima ou para baixo cromaticamente ou por tons inteiros, mantendo a mesma disposicao. Debussy usou esta tecnica extensamente.',
  },
  l6u19m4e3: {
    prompt: 'A que se refere a "dissolucao da tonalidade" na musica do final do seculo XIX?',
    choices: [
      'O enfraquecimento de um centro tonal claro atraves de cromatismo generalizado e modulacoes remotas',
      'O uso deliberado de apenas uma tonalidade ao longo de uma composicao inteira',
      'A eliminacao do ritmo e metro da estrutura musical',
      'A substituicao de toda a harmonia por melodias em unissono',
    ],
    hint: 'Compositores como Wagner (Tristan und Isolde) usaram cromatismo continuo, resolucoes deceptivas e ambiguidade enarminica tao extensamente que a sensacao de uma tonalidade "casa" tornou-se elusiva -- abrindo caminho para a atonalidade no seculo XX.',
  },

  // =========================================================================
  // Unidade 20: Contraponto e Escrita a Partes
  // =========================================================================

  // ---- l6u20m1: Contraponto de Especies 1-3 ----

  l6u20m1e1: {
    prompt: 'No contraponto de primeira especie (nota contra nota), que intervalos sao considerados consonantes acima do cantus firmus?',
    choices: [
      'Unissonos, tercas, quintas, sextas e oitavas',
      'Apenas consonancias perfeitas: unissonos, quintas e oitavas',
      'Todos os intervalos exceto o tritono',
      'Segundas, quartas e setimas alem de tercas e sextas',
    ],
    hint: 'A primeira especie permite apenas consonancias: consonancias perfeitas (P1, P5, P8) e consonancias imperfeitas (tercas e sextas). Dissonancias (segundas, quartas, setimas, tritonos) sao proibidas na primeira especie.',
  },
  l6u20m1e2: {
    prompt: 'No contraponto de segunda especie (duas notas contra uma), como sao tratadas as dissonancias?',
    choices: [
      'As dissonancias podem aparecer apenas em tempos fracos como notas de passagem abordadas e deixadas por grau conjunto',
      'As dissonancias sao completamente proibidas como na primeira especie',
      'As dissonancias podem aparecer em qualquer tempo desde que resolvam por grau conjunto',
      'As dissonancias sao permitidas livremente em tempos fortes e fracos',
    ],
    hint: 'A segunda especie introduz a nota de passagem: uma dissonancia num tempo fraco que preenche o espaco entre duas consonancias por movimento por grau conjunto. Os tempos fortes devem continuar consonantes.',
  },
  l6u20m1e3: {
    prompt: 'Que relacao ritmica define o contraponto de terceira especie?',
    choices: [
      'Quatro notas no contraponto contra cada nota do cantus firmus',
      'Tres notas contra cada nota do cantus firmus',
      'Duas notas contra cada nota do cantus firmus',
      'Ritmo livre sem proporcao fixa',
    ],
    hint: 'A terceira especie coloca quatro seminimas contra cada semibreve do cantus firmus. Isto introduz bordaduras e notas de passagem duplas alem das notas de passagem da segunda especie.',
  },

  // ---- l6u20m2: Contraponto de Especies 4-5 ----

  l6u20m2e1: {
    prompt: 'O contraponto de quarta especie e definido principalmente por que dispositivo ritmico?',
    choices: [
      'Sincopa atraves de suspensoes -- notas ligadas criam dissonancia em tempos fortes',
      'Ritmos pontuados alternando entre notas longas e curtas',
      'Figuras de tercinas contra metro binario',
      'Valores de notas livremente misturados sem padrao especifico',
    ],
    hint: 'A quarta especie introduz a suspensao: uma consonancia num tempo fraco e ligada ao tempo forte seguinte onde se torna dissonancia, depois resolve descendentemente por grau conjunto. Isto cria a textura sincopada caracteristica.',
  },
  l6u20m2e2: {
    prompt: 'O que define o contraponto de quinta especie (contraponto florido)?',
    choices: [
      'Uma combinacao livre de todas as especies anteriores -- valores de notas misturados, notas de passagem e suspensoes',
      'Cinco notas contra cada nota do cantus firmus',
      'Contraponto escrito para cinco vozes simultaneamente',
      'Imitacao estrita ao intervalo de quinta ao longo de toda a peca',
    ],
    hint: 'A quinta especie (florida) combina tecnicas de todas as quatro especies anteriores numa linha melodica fluente. Usa semibreves, minimas, seminimas, suspensoes e notas de passagem de forma musicalmente satisfatoria.',
  },
  l6u20m2e3: {
    prompt: 'Quais sao as tres fases de uma suspensao corretamente executada?',
    choices: [
      'Preparacao (consonancia), suspensao (dissonancia no tempo forte), resolucao (grau conjunto descendente)',
      'Ataque (dissonancia), sustentacao (nota mantida), libertacao (salto)',
      'Abordagem por salto, manutencao, resolucao por salto',
      'Consonancia, consonancia, dissonancia',
    ],
    hint: 'Uma suspensao requer: (1) Preparacao -- a nota e introduzida como consonancia; (2) Suspensao -- a nota e mantida (ligada) num tempo forte onde se torna dissonante; (3) Resolucao -- a nota resolve descendentemente por grau conjunto para uma consonancia.',
  },

  // ---- l6u20m3: Contraponto a Tres Partes/Invertivel ----

  l6u20m3e1: {
    prompt: 'O que significa "contraponto invertivel a oitava"?',
    choices: [
      'Duas vozes podem trocar de posicao (a superior torna-se inferior) e continuar a produzir contraponto correto',
      'A melodia e tocada ao contrario (retrogrado) a oitava',
      'Ambas as vozes sao transpostas uma oitava acima simultaneamente',
      'Os intervalos entre vozes sao invertidos (tercas tornam-se sextas) mas as vozes ficam no lugar',
    ],
    hint: 'No contraponto invertivel a oitava, a voz A acima da voz B soa correta, E a voz B acima da voz A tambem soa correta. Quando as vozes trocam, os intervalos invertem-se: tercas tornam-se sextas, quintas tornam-se quartas, etc.',
  },
  l6u20m3e2: {
    prompt: 'O que e contraponto triplo?',
    choices: [
      'Tres vozes escritas de modo a que qualquer das seis ordenacoes verticais possiveis produza contraponto valido',
      'Contraponto em metro ternario (3/4 ou 3/8)',
      'Tres repeticoes do mesmo contraponto em niveis de altura diferentes',
      'Uma fuga com exatamente tres sujeitos',
    ],
    hint: 'Contraponto triplo significa que tres vozes (A, B, C) podem ser reorganizadas em qualquer ordem -- ABC, ACB, BAC, BCA, CAB, CBA -- e todas as seis permutacoes produzem contraponto correto. Bach dominou esta tecnica.',
  },
  l6u20m3e3: {
    prompt: 'Porque devem as quintas perfeitas ser evitadas ou tratadas cuidadosamente no contraponto invertivel a oitava?',
    choices: [
      'Uma quinta inverte-se numa quarta, que e tratada como dissonancia acima do baixo no contraponto estrito',
      'As quintas perfeitas sao sempre proibidas em todos os tipos de contraponto',
      'Uma quinta inverte-se num tritono, criando um intervalo inutilizavel',
      'As quintas perfeitas nao podem ser invertidas de todo',
    ],
    hint: 'Quando as vozes se invertem a oitava, uma P5 torna-se uma P4. No contraponto a duas vozes, quartas acima do baixo sao dissonantes. Portanto, qualquer P5 no original torna-se um problema quando as vozes trocam de posicao.',
  },

  // ---- l6u20m4: Escrita a Partes Avancada ----

  l6u20m4e1: {
    prompt: 'Quais sao as quatro vozes na escrita a partes SATB (estilo coral), da mais aguda para a mais grave?',
    choices: [
      'Soprano, Contralto, Tenor, Baixo',
      'Soprano, Contralto, Agudo, Baixo',
      'Soprano, Baritono, Tenor, Baixo',
      'Soprano, Contralto, Tenor, Baritono',
    ],
    hint: 'SATB significa Soprano (mais aguda), Contralto, Tenor e Baixo (mais grave). Soprano e Contralto partilham a pauta de clave de sol; Tenor e Baixo partilham a pauta de clave de fa na notacao coral padrao.',
  },
  l6u20m4e2: {
    prompt: 'O que requer a realizacao de baixo cifrado que um interprete faca?',
    choices: [
      'Ler uma linha de baixo com numeros e improvisar as vozes superiores para formar os acordes indicados',
      'Tocar apenas as notas do baixo exatamente como escritas sem acrescentos',
      'Transpor a linha de baixo para corresponder aos numeros cifrados',
      'Duplicar cada nota do baixo a oitava em ambas as maos',
    ],
    hint: 'O baixo cifrado era a taquigrafia barroca para a harmonia. O interprete le a nota do baixo escrita e as cifras (numeros) abaixo dela, depois preenche as vozes superiores para criar acordes completos seguindo regras de conducao de vozes.',
  },
  l6u20m4e3: {
    prompt: 'Ao ler uma partitura de instrumento transpositor (ex. clarinete em Bb), o que deves fazer para encontrar a altura real?',
    choices: [
      'Transpor a altura escrita pelo intervalo de transposicao do instrumento para encontrar a altura de concerto',
      'Tocar a altura escrita exatamente como notada -- instrumentos transpositores soam como escritos',
      'Mover cada nota uma oitava acima da altura escrita',
      'Ler a parte noutra clave para encontrar a altura correta',
    ],
    hint: 'Um clarinete em Bb soa uma segunda maior abaixo do escrito. Quando a parte indica C, o instrumento soa Bb. A leitura de partitura exige conhecer a transposicao de cada instrumento para ouvir as alturas reais (de concerto).',
  },
};

export default overlay;
