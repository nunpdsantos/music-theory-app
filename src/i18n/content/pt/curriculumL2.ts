import type { CurriculumLevelOverlay } from '../types';

const curriculumL2: CurriculumLevelOverlay = {
  // ─── Units ──────────────────────────────────────────────────────────────────
  units: {
    u4: {
      title: 'Todas as Tonalidades Maiores e Graus da Escala',
      description:
        'As 15 armacoes de clave maiores, o Circulo de Quintas e os nomes e funcoes dos graus da escala',
    },
    u5: {
      title: 'Escalas Menores e Relacoes entre Tonalidades',
      description:
        'Escalas menor natural, harmonica e melodica, alem das relacoes entre tonalidades relativas e paralelas',
    },
    u6: {
      title: 'Compasso Composto e Sincopa',
      description:
        'Indicacoes de compasso composto, sincopa, tercinas e conceitos ritmicos avancados',
    },
    u7: {
      title: 'Intervalos, Triades e Harmonia Diatonica',
      description:
        'O sistema completo de qualidade de intervalos, os quatro tipos de triades, inversoes com baixo cifrado e triades diatonicas com numeracao romana',
    },
  },

  // ─── Modules ────────────────────────────────────────────────────────────────
  modules: {
    // ── U4 M1: All Major Keys and the Circle of Fifths ────────────────────
    l2u4m1: {
      title: 'Todas as Tonalidades Maiores e o Circulo de Quintas',
      subtitle: 'O conjunto completo de 15 armacoes de clave maiores e como se ligam entre si',
      objectives: [
        'Identificar as 15 armacoes de clave maiores, incluindo os pares enarmonicos',
        'Aplicar a ordem dos sustenidos (F-C-G-D-A-E-B) e dos bemois (B-E-A-D-G-C-F)',
        'Determinar a tonalidade a partir da armacao de clave e vice-versa',
        'Usar o Circulo de Quintas como mapa de todas as tonalidades',
      ],
      concepts: [
        {
          title: 'O Conjunto Completo de Tonalidades Maiores',
          explanation:
            'Existem 15 armacoes de clave maiores, mas apenas 12 tonalidades distintas. Tres pares sao enarmonicos -- soam de forma identica mas escrevem-se de maneira diferente: B/Cb, F#/Gb e C#/Db. As tonalidades com sustenidos vao de C (0 sustenidos) ate C# (7 sustenidos). As tonalidades com bemois vao de C ate Cb (7 bemois).',
          tryThisLabel: 'Ve B maior -- 5 sustenidos',
        },
        {
          title: 'Ordem dos Sustenidos e Bemois',
          explanation:
            'Os sustenidos aparecem sempre na mesma ordem: F-C-G-D-A-E-B. Cada nova tonalidade com sustenidos acrescenta o proximo da sequencia. G maior tem F#. D maior tem F# e C#. Os bemois seguem a ordem inversa: B-E-A-D-G-C-F. F maior tem Bb. Bb maior tem Bb e Eb. Esta ordem nunca muda.',
          tryThisLabel: 'Ve A maior -- 3 sustenidos',
        },
        {
          title: 'Truques de Identificacao Rapida',
          explanation:
            'Para tonalidades com sustenidos: o ultimo sustenido e sempre o 7.o grau da escala -- sobe meio-tom e encontras o nome da tonalidade. Se o ultimo sustenido e F#, a tonalidade e G. Para tonalidades com bemois: o penultimo bemol E a tonalidade. Se tens Bb e Eb, a tonalidade e Bb. A excecao: um unico bemol significa sempre F maior.',
          tryThisLabel: 'Ve Db maior -- 5 bemois',
        },
      ],
      tasks: [
        {
          instruction:
            'Abre o Circulo de Quintas e nomeia todas as tonalidades com sustenidos no sentido dos ponteiros do relogio a partir de C',
        },
        {
          instruction:
            'Escreve "Ab major scale" -- quantos bemois precisa? Consegues nomea-los por ordem?',
        },
        {
          instruction:
            'Escreve "E major scale" -- o ultimo sustenido e D#. Sobe meio-tom: E. O truque funciona!',
        },
      ],
    },

    // ── U4 M2: Scale Degree Names and Functions ───────────────────────────
    l2u4m2: {
      title: 'Nomes e Funcoes dos Graus da Escala',
      subtitle: 'Os sete nomes funcionais que todo o musico deve conhecer',
      objectives: [
        'Nomear os sete graus da escala: tonica, supertonica, mediante, subdominante, dominante, submediante, sensivel',
        'Compreender o significado funcional de cada nome de grau',
        'Distinguir a sensivel da subtonica',
      ],
      concepts: [
        {
          title: 'Os Sete Nomes dos Graus da Escala',
          explanation:
            'Cada grau da escala tem um nome funcional: 1=Tonica (repouso), 2=Supertonica (acima da tonica), 3=Mediante (ponto medio entre tonica e dominante), 4=Subdominante (abaixo da dominante), 5=Dominante (cria tensao em direcao a tonica), 6=Submediante (abaixo da mediante, contando para baixo), 7=Sensivel (meio-tom abaixo da tonica, a atracao mais forte para casa).',
          tryThisLabel: 'Ve os sete graus de C maior',
        },
        {
          title: 'Sensivel vs. Subtonica',
          explanation:
            'Quando o 7.o grau esta a meio-tom abaixo da tonica (como na escala maior e menor harmonica), chama-se sensivel -- puxa fortemente para cima, em direcao a resolucao. Quando o 7.o grau esta a um tom abaixo da tonica (como na menor natural), chama-se subtonica -- a atracao e mais fraca. Esta distincao explica por que existe a menor harmonica: os compositores elevaram o 7.o grau para criar uma sensivel.',
          tryThisLabel: 'Ouve a subtonica na menor natural',
        },
        {
          title: 'Porque Importam Estes Nomes',
          explanation:
            'Os nomes nao sao rotulos arbitrarios -- descrevem funcao harmonica. A dominante (5) e a sensivel (7) criam tensao. A tonica (1) proporciona resolucao. A subdominante (4) e a supertonica (2) criam movimento em direcao a dominante. Compreender a funcao e a chave para compreender a harmonia. O sistema de cores desta app codifica estas funcoes: azul=tonica, ambra=dominante, vermelho=sensivel.',
          tryThisLabel: 'Ve as cores dos graus em G maior',
        },
      ],
      tasks: [
        {
          instruction:
            'Abre "key of C" e nomeia cada grau da escala pelo seu nome funcional, da tonica a sensivel',
        },
        {
          instruction:
            'Olha para as cores dos graus -- qual e azul (tonica)? Qual e ambra (dominante)? Qual e vermelho (sensivel)?',
        },
        {
          instruction:
            'Escreve "A natural minor scale" e depois "A harmonic minor scale" -- qual delas eleva o 7.o grau para criar uma sensivel?',
        },
      ],
    },

    // ── U5 M1: Natural Minor Scale ────────────────────────────────────────
    l2u5m1: {
      title: 'Escala Menor Natural',
      subtitle: 'O padrao T-mT-T-T-mT-T-T e o lado mais sombrio da tonalidade',
      objectives: [
        'Construir a escala menor natural a partir de qualquer nota usando T-mT-T-T-mT-T-T',
        'Ouvir o caracter contrastante das escalas maior e menor',
        'Compreender que cada tonalidade menor partilha a armacao de clave com uma relativa maior',
      ],
      concepts: [
        {
          title: 'O Padrao da Menor Natural',
          explanation:
            'A escala menor natural segue T-mT-T-T-mT-T-T -- compara com o padrao da maior: T-T-mT-T-T-T-mT. Os meios-tons caem em posicoes diferentes, e isso muda tudo. A menor natural mais facil de ver e A menor natural: usa apenas teclas brancas, de A a G e de volta a A.',
          tryThisLabel: 'Ouve A menor natural -- so teclas brancas',
        },
        {
          title: 'Caracter Maior vs. Menor',
          explanation:
            'Toca a escala de C maior e depois a escala de C menor. A menor soa mais sombria, mais emocional -- ouves a diferenca instantaneamente. A diferenca vem de tres graus baixados: o 3.o, 6.o e 7.o estao cada um meio-tom mais baixo do que na escala maior. Estas tres alteracoes transformam brilhante e resolvido em sombrio e introspetivo.',
          tryThisLabel: 'Compara C menor com C maior',
        },
      ],
      tasks: [
        {
          instruction:
            'Toca "A natural minor scale" e depois "C major scale" -- usam as mesmas notas mas comecam em notas diferentes. Ouve como o caracter muda completamente',
        },
        {
          instruction:
            'Escreve "D minor scale" -- que nota precisa de um bemol para manter o padrao T-mT-T-T-mT-T-T?',
        },
        {
          instruction:
            'Escreve "E minor scale" -- quantos sustenidos precisa? Compara com G maior (a sua relativa maior)',
        },
      ],
    },

    // ── U5 M2: Harmonic and Melodic Minor ─────────────────────────────────
    l2u5m2: {
      title: 'Menor Harmonica e Melodica',
      subtitle: 'Porque existem tres formas de menor -- e o que cada uma resolve',
      objectives: [
        'Construir a menor harmonica elevando o 7.o grau da menor natural',
        'Construir a menor melodica elevando o 6.o e 7.o graus na forma ascendente',
        'Compreender porque existem tres formas: natural para pureza, harmonica para cadencias, melodica para melodia fluida',
      ],
      concepts: [
        {
          title: 'Menor Harmonica',
          explanation:
            'A menor harmonica eleva o 7.o grau meio-tom, criando uma sensivel. A menor harmonica: A-B-C-D-E-F-G#. Agora o acorde V e maior, dando a tonalidade uma forte atracao dominante-tonica. A contrapartida: surge uma 2.a aumentada (3 meios-tons) entre o 6.o e 7.o graus, dando a menor harmonica o seu som exotico distintivo.',
          tryThisLabel: 'Ouve o 7.o grau elevado',
        },
        {
          title: 'Menor Melodica',
          explanation:
            'A menor melodica corrige a 2.a aumentada elevando tambem o 6.o grau -- mas tradicionalmente so na forma ascendente. Ascendente: T-mT-T-T-T-T-mT. Descendente: menor natural. A melodica ascendente de A: A-B-C-D-E-F#-G#. No jazz, a forma ascendente usa-se em ambas as direcoes e chama-se escala "menor jazz".',
          tryThisLabel: 'Ouve a menor melodica',
        },
        {
          title: 'Tres Formas, Tres Propositos',
          explanation:
            'A menor natural e pura e folclorica, mas o seu acorde v menor carece de poder de resolucao. A menor harmonica da-te um acorde V maior com sensivel -- essencial para cadencias fortes. A menor melodica suaviza a 2.a aumentada incomoda para melodias vocais e instrumentais. Os compositores escolhem entre as formas conforme o que a musica precisa em cada momento.',
          tryThisLabel: 'Constroi E menor natural',
        },
      ],
      tasks: [
        {
          instruction:
            'Toca "A natural minor", "A harmonic minor" e "A melodic minor" em sequencia -- ouve como cada forma soa diferente',
        },
        {
          instruction:
            'Escreve "D harmonic minor scale" -- que nota e elevada em relacao a D menor natural?',
        },
        {
          instruction:
            'Escreve "E melodic minor scale" -- identifica as duas notas elevadas em relacao a menor natural',
        },
      ],
    },

    // ── U5 M3: Relative and Parallel Keys ─────────────────────────────────
    l2u5m3: {
      title: 'Tonalidades Relativas e Paralelas',
      subtitle: 'Duas formas de ligar maior e menor',
      objectives: [
        'Encontrar pares de relativa maior/menor usando a regra do 6.o grau / 3.o grau',
        'Compreender tonalidades paralelas como mesma fundamental, qualidade diferente',
        'Ver como estas relacoes aparecem no Circulo de Quintas',
      ],
      concepts: [
        {
          title: 'Tonalidades Relativas',
          explanation:
            'Tonalidades relativas partilham a mesma armacao de clave mas tem tonicas diferentes. Para encontrar a relativa menor de uma tonalidade maior, vai ao 6.o grau. C maior -> A menor. G maior -> E menor. Para encontrar a relativa maior, vai ao 3.o grau da escala menor. A menor -> C maior. O Circulo de Quintas mostra ambas: tonalidades maiores no anel exterior, as suas relativas menores no anel interior.',
          tryThisLabel: 'Ve as tonalidades relativas no Circulo',
        },
        {
          title: 'Tonalidades Paralelas',
          explanation:
            'Tonalidades paralelas partilham a mesma fundamental mas tem qualidades diferentes. C maior e C menor sao paralelas. Partilham a nota tonica mas diferem no 3.o, 6.o e 7.o graus. A relacao paralela torna-se critica mais tarde na mistura modal -- emprestar acordes da tonalidade paralela para acrescentar cor.',
          tryThisLabel: 'Compara C menor com C maior',
        },
      ],
      tasks: [
        {
          instruction:
            'Escreve "Eb major scale" -- qual e o 6.o grau? Essa e a relativa menor. Verifica com o Circulo de Quintas',
        },
        {
          instruction:
            'Escreve "C major scale" e depois "C minor scale" -- quais tres notas mudam? (3.a, 6.a, 7.a). Estas sao tonalidades paralelas',
        },
        {
          instruction:
            'No Circulo de Quintas, encontra D maior no anel exterior. Que tonalidade menor esta no interior? Verifica com "B minor scale"',
        },
      ],
    },

    // ── U6 M1: Compound Meter: 6/8, 9/8, 12/8 ───────────────────────────
    l2u6m1: {
      title: 'Compasso Composto: 6/8, 9/8, 12/8',
      subtitle: 'Quando os tempos se dividem em tres -- a cadencia ondulante do compasso composto',
      objectives: [
        'Distinguir compasso simples (tempos dividem-se por 2) de compasso composto (tempos dividem-se por 3)',
        'Ler indicacoes de compasso composto: 6/8, 9/8, 12/8',
        'Sentir a diferenca entre 3/4 (tres tempos binarios) e 6/8 (dois tempos ternarios)',
      ],
      concepts: [
        {
          title: 'Simples vs. Composto',
          explanation:
            'No compasso simples, cada tempo divide-se naturalmente em duas partes iguais (uma seminima divide-se em duas colcheias). No compasso composto, cada tempo divide-se em tres (uma seminima com ponto divide-se em tres colcheias). O numero de cima nas indicacoes compostas e 6, 9 ou 12 -- divide por 3 para encontrar o numero de tempos: 6/8 tem 2 tempos, 9/8 tem 3, 12/8 tem 4.',
          tryThisLabel: 'Sente uma pulsacao ondulante -- UM-e-a DOIS-e-a',
        },
        {
          title: '3/4 vs. 6/8',
          explanation:
            '3/4 tem tres tempos, cada um dividido em dois: UM-e DOIS-e TRES-e. 6/8 tem dois tempos, cada um dividido em tres: UM-e-a DOIS-e-a. O mesmo numero total de colcheias por compasso (seis), mas agrupamento diferente. 3/4 soa como uma valsa; 6/8 soa como uma jiga. A distincao e sobre a sensacao, nao sobre a matematica.',
          tryThisLabel: 'Experimenta contar em grupos de 3 vs. grupos de 2',
        },
      ],
      tasks: [
        {
          instruction:
            'Bate uma pulsacao regular e agrupa colcheias em tres: UM-e-a DOIS-e-a. Esta e a sensacao de 6/8 -- dois tempos grandes, cada um com tres subdivisoes',
        },
        {
          instruction:
            'Agora bate em 3/4: UM-e DOIS-e TRES-e. O mesmo numero de colcheias, mas o padrao de acentuacao e completamente diferente. Sente a distincao entre valsa e jiga',
        },
      ],
    },

    // ── U6 M2: Syncopation and Triplets ───────────────────────────────────
    l2u6m2: {
      title: 'Sincopa e Tercinas',
      subtitle: 'Ritmos que empurram contra o tempo -- acentos em tempos fracos e divisoes emprestadas',
      objectives: [
        'Definir sincopa como a acentuacao de tempos ou partes de tempos normalmente fracos',
        'Compreender tercinas como agrupamentos emprestados de tres num contexto binario',
        'Ouvir como a sincopa cria energia e impulso para a frente',
      ],
      concepts: [
        {
          title: 'Sincopa',
          explanation:
            'A sincopa coloca acentos onde o ouvido nao os espera -- em tempos fracos ou entre tempos. Em vez de UM-dois-TRES-quatro, um ritmo sincopado pode acentuar o "e" do tempo 2: um-dois-E-tres-quatro. Este deslocamento cria tensao ritmica e energia. A sincopa e a forca motriz do jazz, funk, musica latina e praticamente toda a musica popular. Sem ela, o ritmo e previsivel; com ela, o ritmo ganha vida.',
          tryThisLabel: 'Toca um acorde -- agora imagina toca-lo no "e" do 2',
        },
        {
          title: 'Tercinas e Duinas',
          explanation:
            'Uma tercina divide um tempo que normalmente tem duas subdivisoes em tres partes iguais. Em 4/4, uma tercina de colcheias encaixa tres notas no espaco de duas -- cria uma breve sensacao composta dentro do compasso simples. O inverso tambem existe: uma duina divide um tempo composto em dois em vez de tres. Estas divisoes emprestadas acrescentam variedade ritmica e efeitos de ritmo cruzado.',
          tryThisLabel: 'Ouve um acorde -- imagina tres pulsacoes num so tempo',
        },
      ],
      tasks: [
        {
          instruction:
            'Bate palmas em seminimas regulares, depois desloca a palma para o "e" entre tempos. Essa enfase no contratempo e sincopa',
        },
        {
          instruction:
            'Bate dois tempos iguais, depois tenta bater tres uniformemente no mesmo intervalo. Essa sensacao de 3 contra 2 e a essencia de uma tercina',
        },
      ],
    },

    // ── U7 M1: Interval Quality: Perfect, Major, Minor ───────────────────
    l2u7m1: {
      title: 'Qualidade do Intervalo: Perfeito, Maior, Menor',
      subtitle: 'Classificar intervalos pelo numero e pela qualidade',
      objectives: [
        'Compreender que os intervalos tem um numero (distancia) e uma qualidade (caracter)',
        'Classificar intervalos perfeitos: unissono, 4.a, 5.a, oitava',
        'Classificar intervalos maiores e menores: 2.a, 3.a, 6.a, 7.a',
      ],
      concepts: [
        {
          title: 'O Sistema de Qualidades',
          explanation:
            'No Nivel 1, mediste intervalos por numero: uma 3.a, uma 5.a. Agora acrescenta a qualidade -- que refina o numero com um caracter preciso. Os intervalos perfeitos (unissono, 4.a, 5.a, oitava) ocorrem naturalmente entre a tonica e os 4.o/5.o graus. Os intervalos maiores (2.a, 3.a, 6.a, 7.a) ocorrem entre a tonica e os graus superiores numa escala maior. Os intervalos menores sao meio-tom mais pequenos que os maiores.',
          tryThisLabel: 'Ve todos os intervalos da escala maior a partir de C',
        },
        {
          title: 'Como Determinar a Qualidade',
          explanation:
            'Metodo: (1) Conta os nomes das notas para obter o numero do intervalo. (2) Conta os meios-tons. (3) Compara com a escala maior: se a nota superior pertence a escala maior da nota inferior, e maior (para 2, 3, 6, 7) ou perfeito (para 1, 4, 5, 8). (4) Meio-tom mais pequeno que maior = menor.',
          tryThisLabel: 'Ouve uma 3.a menor em C menor',
        },
        {
          title: 'Ouvir a Diferenca',
          explanation:
            'Os intervalos perfeitos soam "abertos" e "ocos" -- estaveis e fortes. Os intervalos maiores soam brilhantes e amplos. Os intervalos menores sao meio-tom mais estreitos e soam mais sombrios, mais emocionais. Toca C a E (3.a maior) e depois C a Eb (3.a menor) -- a diferenca de meio-tom cria um caracter completamente diferente.',
          tryThisLabel: 'Ouve a 3.a maior num acorde',
        },
      ],
      tasks: [
        {
          instruction:
            'Escreve "C major chord" e depois "Cm" -- a unica diferenca e E vs. Eb. 3.a maior (4 meios-tons) vs. 3.a menor (3 meios-tons). Um meio-tom muda tudo',
        },
        {
          instruction:
            'Escreve "C major scale" -- cada intervalo de C a cada nota superior e perfeito (4.a, 5.a, oitava) ou maior (2.a, 3.a, 6.a, 7.a). Este e o conjunto de referencia',
        },
        {
          instruction:
            'Qual e a qualidade do intervalo de C a F? Conta: C-D-E-F = 4.a. F pertence a escala de C maior, portanto e uma 4.a perfeita',
        },
      ],
    },

    // ── U7 M2: Augmented, Diminished, and Compound Intervals ──────────────
    l2u7m2: {
      title: 'Intervalos Aumentados, Diminutos e Compostos',
      subtitle: 'Os extremos da qualidade de intervalos e intervalos alem da oitava',
      objectives: [
        'Compreender aumentado como meio-tom maior que perfeito ou maior',
        'Compreender diminuto como meio-tom menor que perfeito ou menor',
        'Identificar intervalos compostos (9.a, 10.a, 11.a, 13.a) e o tritono',
      ],
      concepts: [
        {
          title: 'Aumentado e Diminuto',
          explanation:
            'Aumentado significa meio-tom maior que perfeito ou maior. Diminuto significa meio-tom menor que perfeito ou menor. Uma 5.a perfeita (7 meios-tons) torna-se aumentada com 8 meios-tons ou diminuta com 6. O intervalo de 6 meios-tons -- o tritono -- tem dois nomes: 4.a aumentada ou 5.a diminuta. O mesmo som, grafia diferente.',
          tryThisLabel: 'Ouve o tritono dentro de C7',
        },
        {
          title: 'O Tritono',
          explanation:
            'O tritono divide a oitava exatamente ao meio e e o intervalo mais instavel na musica tonal. Desempenha um papel critico nos acordes de dominante com 7.a, onde cria a tensao que impulsiona a resolucao. Dentro de C7, o tritono situa-se entre E e Bb -- ambas as notas exigem resolucao.',
          tryThisLabel: 'Ouve a 5.a diminuta em Cdim',
        },
        {
          title: 'Intervalos Compostos',
          explanation:
            'Intervalos maiores que uma oitava sao intervalos compostos. Uma 9.a = oitava + 2.a. Uma 10.a = oitava + 3.a. Uma 11.a = oitava + 4.a. Uma 13.a = oitava + 6.a. As regras de qualidade mantem-se: uma 9.a maior tem a mesma qualidade que uma 2.a maior. Estes intervalos tornam-se importantes nos acordes com extensoes.',
          tryThisLabel: 'A 9.a e uma 2.a composta',
        },
      ],
      tasks: [
        {
          instruction:
            'Qual e o intervalo de C a F#? Conta as letras (C-D-E-F = 4.a). F pertence a C maior mas F# esta meio-tom acima, portanto e uma 4.a aumentada -- um tritono',
        },
        {
          instruction:
            'Escreve "C7" e ouve -- o tritono entre E e Bb e o que da ao acorde de dominante com 7.a a sua tensao e necessidade de resolver',
        },
        {
          instruction:
            'Escreve "Cmaj9" -- a 9.a (D) e o 2.o grau uma oitava acima. Qual e a qualidade de C a D? 2.a maior, portanto 9.a maior',
        },
      ],
    },

    // ── U7 M3: The Four Triad Types ───────────────────────────────────────
    l2u7m3: {
      title: 'Os Quatro Tipos de Triades',
      subtitle: 'Maior, menor, diminuta, aumentada -- construir e identificar os quatro',
      objectives: [
        'Construir os quatro tipos de triades a partir de qualquer fundamental usando tercas empilhadas',
        'Compreender a distincao de estabilidade: 5.a perfeita vs. 5.a alterada',
        'Ouvir o som caracteristico de cada qualidade',
      ],
      concepts: [
        {
          title: 'Quatro Qualidades de Triades',
          explanation:
            'Toda a triade empilha duas tercas. Maior = 3.a maior + 3.a menor (3.aM+3.am), da fundamental a 5.a e uma 5.a perfeita. Menor = 3.a menor + 3.a maior (3.am+3.aM), da fundamental a 5.a continua a ser uma 5.a perfeita. Diminuta = 3.a menor + 3.a menor (3.am+3.am), da fundamental a 5.a e uma 5.a diminuta. Aumentada = 3.a maior + 3.a maior (3.aM+3.aM), da fundamental a 5.a e uma 5.a aumentada.',
          tryThisLabel: 'Ouve a triade maior estavel',
        },
        {
          title: 'Estavel vs. Instavel',
          explanation:
            'Maior e menor sao estaveis -- ambas tem uma 5.a perfeita, que proporciona uma base solida. Diminuta soa tensa e comprimida -- a sua 5.a diminuta comprime o acorde. Aumentada soa estranha e sem resolucao -- a sua 5.a aumentada expande o acorde. Estabilidade vs. instabilidade e determinada pelo facto de a 5.a ser perfeita ou alterada.',
          tryThisLabel: 'Ouve diminuta -- tensa e comprimida',
        },
        {
          title: 'Ler Cifras de Acordes',
          explanation:
            'Letra sozinha = maior (C). Letra minuscula "m" = menor (Cm). "dim" ou "o" = diminuta (Cdim). "aug" ou "+" = aumentada (Caug). Estas cifras indicam-te a fundamental e a qualidade de relance.',
          tryThisLabel: 'Ouve aumentada -- flutuante e sem resolucao',
        },
      ],
      tasks: [
        {
          instruction:
            'Constroi as quatro triades de C: "C major chord", "Cm", "Cdim", "Caug" -- quais duas soam estaveis? Quais duas soam instaveis?',
        },
        {
          instruction:
            'Escreve "Fdim" e conta: da fundamental a 3.a sao 3 meios-tons (3.am), da 3.a a 5.a sao 3 meios-tons (3.am). Ambas as tercas sao menores -- e o que a torna diminuta',
        },
        {
          instruction:
            'Escreve "Caug" e conta: da fundamental a 3.a sao 4 meios-tons (3.aM), da 3.a a 5.a sao 4 meios-tons (3.aM). Ambas as tercas sao maiores -- aumentada',
        },
      ],
    },

    // ── U7 M4: Triad Inversions and Figured Bass ──────────────────────────
    l2u7m4: {
      title: 'Inversoes de Triades e Baixo Cifrado',
      subtitle: 'As mesmas notas, baixo diferente -- estado fundamental, 1.a inversao, 2.a inversao',
      objectives: [
        'Compreender estado fundamental, 1.a inversao e 2.a inversao de triades',
        'Ler cifras de baixo cifrado: 5/3, 6/3 (ou apenas 6) e 6/4',
        'Usar notacao de barra para inversoes: C/E = 1.a inversao, C/G = 2.a inversao',
      ],
      concepts: [
        {
          title: 'Tres Posicoes',
          explanation:
            'Uma triade tem tres notas, portanto tem tres notas de baixo possiveis. O estado fundamental coloca a fundamental no baixo -- a disposicao mais solida. A 1.a inversao coloca a 3.a no baixo -- mais leve e melodica. A 2.a inversao coloca a 5.a no baixo -- instavel, com a 4.a acima do baixo historicamente tratada como dissonancia que requer resolucao.',
          tryThisLabel: 'Ouve estado fundamental -- C no baixo',
        },
        {
          title: 'Baixo Cifrado',
          explanation:
            'Os numeros do baixo cifrado descrevem intervalos acima da nota do baixo. Estado fundamental = 5/3 (uma 5.a e uma 3.a acima do baixo). 1.a inversao = 6/3 (abreviado para apenas 6). 2.a inversao = 6/4. Esta era a notacao padrao na era barroca e continua a ser central na analise de teoria musical.',
          tryThisLabel: '1.a inversao = posicao 6',
        },
        {
          title: 'Porque Importam as Inversoes',
          explanation:
            'As inversoes permitem que os acordes se liguem suavemente. Em vez de saltar entre acordes no estado fundamental, as inversoes criam linhas de baixo por grau conjunto -- o ingrediente mais importante de uma conducao de vozes elegante. Uma linha de baixo que se move por grau conjunto soa mais polida do que uma que salta constantemente.',
          tryThisLabel: '2.a inversao = posicao 6/4',
        },
      ],
      tasks: [
        {
          instruction:
            'Escreve "C major chord", "C/E" e "C/G" em sequencia -- as mesmas tres notas, mas ouve como o caracter muda com cada nota no baixo',
        },
        {
          instruction:
            'Escreve "C/E" -- E esta no baixo. Os intervalos acima sao uma 3.a (E a G) e uma 6.a (E a C). E por isso que se chama posicao 6',
        },
        {
          instruction:
            'Escreve "Am/C" -- A menor com C no baixo. C e a 3.a de Am, portanto e 1.a inversao. Ouve como soa mais leve do que Am no estado fundamental',
        },
      ],
    },

    // ── U7 M5: Diatonic Triads and Roman Numerals ─────────────────────────
    l2u7m5: {
      title: 'Triades Diatonicas e Numeracao Romana',
      subtitle: 'Os sete acordes que pertencem a cada tonalidade maior -- e como os nomear',
      objectives: [
        'Construir uma triade em cada grau da escala maior usando apenas notas dessa escala',
        'Conhecer o padrao de qualidades: I-ii-iii-IV-V-vi-viio',
        'Ler numeracao romana: maiuscula = maior, minuscula = menor, o = diminuta',
      ],
      concepts: [
        {
          title: 'Construir Triades Diatonicas',
          explanation:
            'Constroi uma triade em cada grau da escala maior usando apenas notas dessa escala. Em C maior: C-E-G (maior), D-F-A (menor), E-G-B (menor), F-A-C (maior), G-B-D (maior), A-C-E (menor), B-D-F (diminuta). O padrao de qualidades e sempre I-ii-iii-IV-V-vi-viio -- em todas as tonalidades maiores. So os nomes das notas mudam.',
          tryThisLabel: 'Ve todas as triades diatonicas em C',
        },
        {
          title: 'Convencoes de Numeracao Romana',
          explanation:
            'Algarismos romanos maiusculos indicam triades maiores (I, IV, V). Minusculos indicam triades menores (ii, iii, vi). O simbolo de grau (o) indica diminuta (viio). Esta notacao e universal -- funciona em qualquer tonalidade. Quando ves I-IV-V, sabes as funcoes dos acordes independentemente das notas especificas usadas.',
          tryThisLabel: 'Ve o mesmo padrao em G maior',
        },
        {
          title: 'Porque o Padrao e Fixo',
          explanation:
            'O padrao de intervalos T-T-mT-T-T-T-mT da escala maior forca combinacoes especificas de intervalos em cada grau. Os meios-tons entre os graus 3-4 e 7-1 criam a triade diminuta no viio e determinam quais triades sao maiores ou menores. Muda a escala e mudas o padrao -- que e exatamente o que acontece nas tonalidades menores.',
          tryThisLabel: 'Verifica o padrao em D maior',
        },
      ],
      tasks: [
        {
          instruction:
            'Abre "key of C" -- toca cada acorde diatonico. Antes de tocar, preve se vai soar maior ou menor com base no algarismo romano',
        },
        {
          instruction:
            'Abre "key of G" -- verifica o mesmo padrao I-ii-iii-IV-V-vi-viio com nomes de notas diferentes',
        },
        {
          instruction:
            'Abre "key of Eb" -- nomeia as sete triades diatonicas. Que notas compoem o acorde ii?',
        },
      ],
    },
  },
};

export default curriculumL2;
