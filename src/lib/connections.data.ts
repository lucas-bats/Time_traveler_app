// Imports the Connection type to ensure data consistency.
import type { Connection } from "./connections";

/**
 * @fileOverview This file contains the raw data array for all
 * historical connections between figures in the application.
 */
export const connectionsData: Connection[] = [
  // Antiquity
  {
    "sourceId": "socrates",
    "targetId": "plato",
    "description": "Plato was Socrates' most famous student. He wrote extensively about Socrates' philosophical methods and ideas, making him the primary source for Socratic thought.",
    "description_pt": "Platão foi o aluno mais famoso de Sócrates. Ele escreveu extensivamente sobre os métodos e ideias filosóficas de Sócrates, tornando-se a principal fonte do pensamento socrático."
  },
  {
    "sourceId": "plato",
    "targetId": "aristotle",
    "description": "Aristotle studied at Plato's Academy for nearly 20 years. While he deeply respected Plato, he ultimately diverged on key philosophical points, famously stating 'Plato is dear to me, but dearer still is truth.'",
    "description_pt": "Aristóteles estudou na Academia de Platão por quase 20 anos. Embora respeitasse profundamente Platão, ele acabou divergindo em pontos filosóficos cruciais, afirmando a famosa frase 'Platão me é caro, mas a verdade me é mais cara ainda.'"
  },
  // Medieval
  {
    "sourceId": "aristotle",
    "targetId": "thomas-aquinas",
    "description": "Thomas Aquinas integrated Aristotelian philosophy with Christian theology, using Aristotle's concepts of logic, metaphysics, and ethics as a framework for his 'Summa Theologica'.",
    "description_pt": "Tomás de Aquino integrou a filosofia aristotélica com a teologia cristã, usando os conceitos de lógica, metafísica e ética de Aristóteles como estrutura para sua 'Suma Teológica'."
  },
  {
    "sourceId": "aristotle",
    "targetId": "avicenna",
    "description": "Avicenna (Ibn Sina) was a key figure in the Islamic Golden Age who studied and expanded upon Aristotle's works, particularly in medicine and philosophy, influencing later European scholasticism.",
    "description_pt": "Avicena (Ibn Sina) foi uma figura chave na Idade de Ouro Islâmica que estudou e expandiu as obras de Aristóteles, particularmente em medicina e filosofia, influenciando a escolástica europeia posterior."
  },
  {
    "sourceId": "plato",
    "targetId": "maimonides",
    "description": "Maimonides was influenced by Platonic and Aristotelian thought, seeking to reconcile rational philosophy with Jewish theology, particularly in his work 'The Guide for the Perplexed'.",
    "description_pt": "Maimônides foi influenciado pelo pensamento platônico e aristotélico, buscando reconciliar a filosofia racional com a teologia judaica, particularmente em sua obra 'O Guia dos Perplexos'."
  },
  // Renaissance
  {
    "sourceId": "plato",
    "targetId": "niccolo-machiavelli",
    "description": "Machiavelli engaged critically with Plato's 'The Republic', contrasting its idealistic vision of a state with his own pragmatic and often ruthless approach to political power in 'The Prince'.",
    "description_pt": "Maquiavel dialogou criticamente com 'A República' de Platão, contrastando sua visão idealista de um estado com sua própria abordagem pragmática e muitas vezes implacável ao poder político em 'O Príncipe'."
  },
  // Modern
  {
    "sourceId": "isaac-newton",
    "targetId": "james-clerk-maxwell",
    "description": "Maxwell's work on electromagnetism was built upon the foundations of classical mechanics established by Newton. He unified electricity, magnetism, and light, often seen as the second great unification in physics after Newton's.",
    "description_pt": "O trabalho de Maxwell sobre o eletromagnetismo foi construído sobre as fundações da mecânica clássica estabelecidas por Newton. Ele unificou a eletricidade, o magnetismo e a luz, o que é frequentemente visto como a segunda grande unificação na física depois da de Newton."
  },
  {
    "sourceId": "niccolo-machiavelli",
    "targetId": "otto-von-bismarck",
    "description": "Bismarck's 'Realpolitik'—a political philosophy focused on practical objectives rather than ideology—is often seen as a 19th-century application of the pragmatic principles of power outlined by Machiavelli.",
    "description_pt": "A 'Realpolitik' de Bismarck — uma filosofia política focada em objetivos práticos em vez de ideologia — é frequentemente vista como uma aplicação do século XIX dos princípios pragmáticos de poder delineados por Maquiavel."
  },
  {
    "sourceId": "john-stuart-mill",
    "targetId": "mary-wollstonecraft",
    "description": "While Wollstonecraft predates Mill, her work 'A Vindication of the Rights of Woman' laid the philosophical groundwork for later liberal feminists and significantly influenced Mill's own arguments in 'The Subjection of Women'.",
    "description_pt": "Embora Wollstonecraft seja anterior a Mill, sua obra 'Uma Reivindicação dos Direitos da Mulher' estabeleceu as bases filosóficas para feministas liberais posteriores e influenciou significativamente os próprios argumentos de Mill em 'A Sujeição das Mulheres'."
  },
  // Contemporary
  {
    "sourceId": "mary-wollstonecraft",
    "targetId": "toni-morrison",
    "description": "As a foundational feminist thinker, Wollstonecraft's arguments for women's intellectual and social equality resonate in the works of modern writers like Toni Morrison, whose novels explore themes of identity, race, and gender.",
    "description_pt": "Como pensadora feminista fundamental, os argumentos de Wollstonecraft pela igualdade intelectual e social das mulheres ressoam nas obras de escritoras modernas como Toni Morrison, cujos romances exploram temas de identidade, raça e gênero."
  },
  {
    "sourceId": "karl-marx",
    "targetId": "eric-hobsbawm",
    "description": "Hobsbawm was a prominent British Marxist historian whose analyses of the 19th and 20th centuries were profoundly shaped by Marx's theories of class struggle, capitalism, and historical materialism.",
    "description_pt": "Hobsbawm foi um proeminente historiador marxista britânico cujas análises dos séculos XIX e XX foram profundamente moldadas pelas teorias de Marx sobre luta de classes, capitalismo e materialismo histórico."
  }
];
