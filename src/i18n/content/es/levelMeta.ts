import type { LevelMetaOverlay } from '../types';

const levelMeta: Record<string, LevelMetaOverlay> = {
  l1: {
    title: 'Fundamentos de Lectura Musical',
    description: 'Notación en el pentagrama, fundamentos de altura, ritmo y compás, la escala mayor, intervalos básicos y tríadas mayores.',
    difficultyLabel: 'Principiante Absoluto',
  },
  l2: {
    title: 'Expansión de los Fundamentos',
    description: 'Todas las armaduras de clave, nombres de los grados de la escala, escalas menores, compás compuesto, síncopa, calidad de intervalos, todos los tipos de tríada, inversiones y armonía diatónica.',
    difficultyLabel: 'Principiante',
  },
  l3: {
    title: 'Fundamentos de Armonía',
    description: 'Acordes de séptima, conducción de voces, cadencias, estructura de frases y notas ajenas al acorde.',
    difficultyLabel: 'Principiante Avanzado',
  },
  l4: {
    title: 'Dominio Diatónico',
    description: 'Notas ajenas avanzadas, dominio del acorde de séptima de dominante, función armónica, secuencias y contrapunto.',
    difficultyLabel: 'Intermedio',
  },
  l5: {
    title: 'Cromatismo y Modulación',
    description: 'Dominantes secundarias, tonicización, modulación, mezcla modal y forma musical.',
    difficultyLabel: 'Intermedio Avanzado',
  },
  l6: {
    title: 'Armonía Cromática',
    description: 'Acorde napolitano, sextas aumentadas, modulación enarmónica y contrapunto avanzado.',
    difficultyLabel: 'Intermedio Superior',
  },
  l7: {
    title: 'Jazz, Pop y Armonía Modal',
    description: 'Cifrado de jazz, progresiones ii–V–I, armonía modal, análisis pop y taxonomía completa de escalas y acordes.',
    difficultyLabel: 'Avanzado',
  },
  l8: {
    title: 'Análisis, Contrapunto y Postonal',
    description: 'Análisis de fugas, gran forma, orquestación, teoría de conjuntos y técnicas del siglo XX.',
    difficultyLabel: 'Avanzado',
  },
  l9: {
    title: 'Entrenamiento Auditivo y Habilidades Aurales',
    description: 'Reconocimiento de intervalos, identificación de acordes, dictado melódico, lectura a primera vista y escucha contextual.',
    difficultyLabel: 'Todos los Niveles',
  },
};

export default levelMeta;
