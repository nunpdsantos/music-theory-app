import type { SongOverlay } from '../types';

// ---------------------------------------------------------------------------
// European Portuguese translations for song reference context strings (L1–L3)
// Only the `context` field is translated — song titles and artist names are
// kept in their original language.
// ---------------------------------------------------------------------------

const overlay: SongOverlay = {
  // =========================================================================
  // Nivel 1
  // =========================================================================

  // ---- L1U1: Notacao e Altura ----

  'l1u1m1': [
    'Escrita predominantemente na clave de sol, o que a torna numa peca classica de iniciacao a leitura na pauta.',
    'Utiliza movimento por graus conjuntos num registo estreito — ideal para praticar a leitura de notas na clave de sol.',
  ],
  'l1u1m2': [
    'A mao esquerda aventura-se frequentemente pelas linhas suplementares abaixo da clave de fa, demonstrando a extensao do registo na pauta dupla.',
    'Escrita em ambas as pautas do sistema de pautas, com figuras arpejadas que abrangem um registo amplo.',
  ],
  'l1u1m3': [
    'Construida inteiramente sobre meios-tons cromaticos, ilustrando sustenidos e bemois em sucessao rapida.',
    'O riff iconico utiliza notas de passagem cromaticas (meios-tons) entre graus diatonicos da escala.',
  ],
  'l1u1m4': [
    'Uma das primeiras obras-primas construida em torno de extensas passagens de escala cromatica.',
    'A melodia incorpora notas auxiliares cromaticas que colorem a tonalidade maior.',
  ],

  // ---- L1U2: Ritmo e Compasso ----

  'l1u2m1': [
    'Utiliza apenas seminimas e minimas em compasso 4/4 — o vocabulario ritmico mais simples.',
    'A linha de baixo demonstra um pulso constante de seminimas com subdivisoes em colcheias.',
  ],
  'l1u2m2': [
    'Alterna entre compasso 6/8 e 3/4, evidenciando como as indicacoes de compasso moldam a sensacao ritmica.',
    'Escrita em compasso 5/4, demonstrando como compassos irregulares criam um caracter ritmico distinto.',
  ],

  // ---- L1U3: Escalas, Intervalos e Primeiros Acordes ----

  'l1u3m1': [
    'A melodia sobe e desce literalmente a escala maior, ensinando cada grau pelo nome.',
    'A melodia inicial e uma escala maior descendente da tonica a tonica.',
  ],
  'l1u3m2': [
    'Composta em Lab maior (quatro bemois), demonstrando como soam e se sentem as armacoes de clave com bemois.',
    'Na tonalidade de Fa maior (um bemol), um bom ponto de partida para ler armacoes de clave alem de Do maior.',
  ],
  'l1u3m3': [
    'Abre com uma quarta perfeita — um dos intervalos mais reconheciveis na musica ocidental.',
    'O salto inicial e uma oitava, o maior intervalo basico. Uma referencia classica para o reconhecimento de intervalos.',
    'Abre com uma quinta perfeita, um intervalo fundamental para o treino auditivo.',
  ],
  'l1u3m4': [
    'Construida sobre uma progressao de quatro acordes (Do–Sol–Lam–Fa) em que todos os acordes maiores sao triades em posicao fundamental.',
    'Utiliza triades maiores simples (La, Re, Mi) num padrao repetitivo — a essencia da harmonia basica de acordes.',
  ],

  // =========================================================================
  // Nivel 2
  // =========================================================================

  // ---- L2U4: Todas as Tonalidades Maiores e Graus da Escala ----

  'l2u4m1': [
    'Em Do maior — demonstra como o ciclo de quintas coloca a tonalidade mais simples na posicao das 12 horas.',
    'Escrita em La maior (tres sustenidos), mostrando como os compositores trabalham confortavelmente em tonalidades com sustenidos.',
  ],
  'l2u4m2': [
    'A melodia segue o movimento 1–1–5–5–6–6–5, delineando claramente os graus de tonica, dominante e submediante.',
    'Contem movimentos proeminentes do 5.o grau (dominante) e do 1.o grau (tonica) — um exemplo natural de graus funcionais.',
  ],

  // ---- L2U5: Escalas Menores e Relacoes entre Tonalidades ----

  'l2u5m1': [
    'Construida sobre a escala menor natural (eolio) em La menor, com a caracteristica setima bemol.',
    'Uma melodia modal/menor natural que evita a setima elevada, acentuando a cor do modo eolio.',
  ],
  'l2u5m2': [
    'Utiliza a escala menor harmonica — a segunda aumentada entre o b6 e o #7 confere-lhe a sua sonoridade distintiva.',
    'A harmonia do verso sugere a menor melodica ascendente (6.o e 7.o graus elevados) sobre uma tonalidade de La menor.',
  ],
  'l2u5m3': [
    'Comeca em La menor (relativa menor de Do maior), modulando depois — uma relacao classica entre tonalidades relativas.',
    'Alterna entre tonalidades relativas maior e menor, demonstrando a relacao proxima entre ambas.',
  ],

  // ---- L2U6: Compasso Composto e Sincopa ----

  'l2u6m1': [
    'Escrita em compasso 6/8 com uma sensacao de balanco em compasso composto binario ao longo de toda a peca.',
    'O verso esta em 6/8 antes de o refrao mudar de sensacao — um contraste entre compasso composto e simples.',
  ],
  'l2u6m2': [
    'Um exemplo definidor de sincopa no ragtime — os acentos caem consistentemente entre os tempos.',
    'Sincopa intensa tanto no riff de clavinet como na linha vocal, com acentos no contratempo.',
  ],

  // ---- L2U7: Intervalos, Triades e Harmonia Diatonica ----

  'l2u7m1': [
    'Abre com um salto de quarta perfeita, e a melodia delineia intervalos maiores e menores ao longo da peca.',
    'A figura inicial de quatro notas delineia uma terca maior seguida de uma quarta perfeita.',
  ],
  'l2u7m2': [
    'Abre com uma quarta aumentada (tritono) — o "intervalo do diabo" utilizado para efeito dramatico.',
    'Contem intervalos compostos (nonas, decimas) na melodia, estendendo-se para alem da oitava.',
  ],
  'l2u7m3': [
    'Utiliza os quatro tipos de triades em contexto — acordes maiores, menores, aumentados (de passagem) e diminutos.',
    'A progressao I–III–IV–iv inclui triades maiores, aumentadas e menores em sucessao.',
  ],
  'l2u7m4': [
    'A linha de baixo move-se por triades em posicao fundamental e primeira inversao — um exemplo classico de conducao de vozes no baixo cifrado.',
    'Cada compasso arpeja um acorde, muitos em primeira ou segunda inversao, seguindo as convencoes do baixo cifrado.',
  ],
  'l2u7m5': [
    'A progressao I–V–vi–iii–IV–I–IV–V utiliza todas as triades diatonicas, identificadas em numerais romanos.',
    'Utiliza a progressao I–V–vi–IV — o padrao de numerais romanos diatonicos mais comum na musica pop.',
  ],

  // =========================================================================
  // Nivel 3
  // =========================================================================

  // ---- L3U9: Acordes de Setima e Harmonia Diatonica ----

  'l3u9m1': [
    'As mudancas de acorde percorrem acordes de setima maior, setima menor e setima da dominante — tres das cinco qualidades de acordes de setima num unico standard.',
    'Abre com um acorde de setima maior, estabelecendo a qualidade calorosa que define a harmonia da bossa nova.',
  ],
  'l3u9m2': [
    'Utiliza acordes de setima em varias inversoes para uma conducao de vozes suave entre acordes.',
    'O arranjo para piano apresenta acordes de setima em inversoes de posicao cerrada ao longo de toda a peca.',
  ],
  'l3u9m3': [
    'Percorre acordes de setima diatonicos em tonalidades maiores usando o movimento do ciclo de quintas (vi7–ii7–V7–Imaj7).',
    'A progressao de "rhythm changes" (Imaj7–vi7–ii7–V7) tornou-se um modelo para centenas de composicoes de jazz.',
  ],
  'l3u9m4': [
    'Abre em Do menor com uma progressao i7–iv7–V7, demonstrando acordes de setima diatonicos num contexto de tonalidade menor.',
    'A progressao de acordes de setima em tonalidade menor (i–iv7–V7) cria a sensacao languida da cancao.',
  ],

  // ---- L3U10: Conducao de Vozes e Escrita a Partes ----

  'l3u10m1': [
    'As seccoes corais sao um modelo de escrita SATB — cada voz move-se suavemente dentro do seu registo.',
    'A harmonizacao de Bach e um exemplo classico de escrita coral a quatro vozes (SATB).',
  ],
  'l3u10m2': [
    'Apesar de ser arpejada, a conducao de vozes subjacente evita quintas e oitavas paralelas ao longo de toda a peca.',
  ],
  'l3u10m3': [
    'As harmonizacoes de hinos padrao utilizam triades em posicao fundamental ligadas por uma conducao de vozes correta — um exercicio classico de escrita a partes.',
  ],
  'l3u10m4': [
    'O acompanhamento apresenta triades em inversao que se movem por grau conjunto, criando linhas de baixo suaves sob a melodia.',
  ],

  // ---- L3U11: Cadencias, Frases e Ornamentacao ----

  'l3u11m1': [
    'Cada verso termina com uma cadencia perfeita clara (V–I) na palavra "Hallelujah".',
    'Contem tanto meias-cadencias (repouso no V) como cadencias perfeitas dentro da sua estrutura fraseologica.',
  ],
  'l3u11m2': [
    'A melodia esta estruturada como um periodo paralelo — duas frases, a primeira terminando numa meia-cadencia, a segunda numa cadencia perfeita.',
    'Um exemplo classico de estrutura antecedente-consequente formando um periodo musical.',
  ],
  'l3u11m3': [
    'Utiliza um ritmo harmonico dramaticamente variado — desde acordes lentos de balada ate mudancas operaticas em cadencia rapida.',
    'Mantem um ritmo harmonico regular com um acorde por compasso, tornando o andamento harmonico facil de sentir e analisar.',
  ],
  'l3u11m4': [
    'O acompanhamento arpejado apresenta notas de passagem e notas auxiliares entre as notas do acorde.',
    'Rica em notas estranhas ao acorde — suspensoes, apogiaturas e notas de passagem criam a sua qualidade onirica.',
  ],
  'l3u11m5': [
    'A linha melodica ornamentada e construida sobre cadeias de suspensoes e notas de passagem sobre um baixo simples.',
    'A melodia ornamentada entrelaca notas de passagem cromaticas e notas auxiliares em torno das notas estruturais do acorde.',
  ],
};

export default overlay;
