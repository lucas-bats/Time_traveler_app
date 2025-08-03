
export interface Character {
  id: string;
  name: string;
  description: string;
  description_pt: string;
  image: string;
  aiHint: string;
  era: string;
  field: string;
  country: string;
}

const characters: Character[] = [
  {
    id: "cleopatra",
    name: "Cleopatra",
    description: "The last active ruler of the Ptolemaic Kingdom of Egypt. A diplomat, naval commander, linguist, and medical author.",
    description_pt: "A última governante ativa do Reino Ptolomaico do Egito. Uma diplomata, comandante naval, linguista e autora de textos médicos.",
    image: "https://videos.openai.com/vg-assets/assets%2Ftask_01k1rfx2vzfhsaxjevq388rwrq%2F1754242504_img_0.webp?st=2025-08-03T17%3A15%3A51Z&se=2025-08-09T18%3A15%3A51Z&sks=b&skt=2025-08-03T17%3A15%3A51Z&ske=2025-08-09T18%3A15%3A51Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=aa5ddad1-c91a-4f0a-9aca-e20682cc8969&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=h1FoJ%2FU08otcSXSUkEFDhy1sn7FVdD%2BhqmJ8EVGD%2Bps%3D&az=oaivgprodscus",
    aiHint: "egyptian queen",
    era: "Ancient",
    field: "Politics",
    country: "Egypt",
  },
  {
    id: "leonardo-da-vinci",
    name: "Leonardo da Vinci",
    description: "An Italian polymath of the High Renaissance who was active as a painter, draughtsman, engineer, scientist, theorist, sculptor, and architect.",
    description_pt: "Um polímata italiano da Alta Renascença que atuou como pintor, desenhista, engenheiro, cientista, teórico, escultor e arquiteto.",
    image: "https://placehold.co/400x400.png",
    aiHint: "renaissance artist",
    era: "Renaissance",
    field: "Art & Science",
    country: "Italy",
  },
  {
    id: "charles-darwin",
    name: "Charles Darwin",
    description: "An English naturalist, geologist and biologist, widely known for his contributions to the science of evolution.",
    description_pt: "Um naturalista, geólogo e biólogo inglês, amplamente conhecido por suas contribuições para a ciência da evolução.",
    image: "https://placehold.co/400x400.png",
    aiHint: "scientist portrait",
    era: "Victorian",
    field: "Science",
    country: "United Kingdom",
  },
  {
    id: "confucius",
    name: "Confucius",
    description: "A Chinese philosopher and politician of the Spring and Autumn period who is traditionally considered the paragon of Chinese sages.",
    description_pt: "Um filósofo e político chinês do período das Primaveras e Outonos, tradicionalmente considerado o paradigma dos sábios chineses.",
    image: "https://placehold.co/400x400.png",
    aiHint: "chinese philosopher",
    era: "Ancient",
    field: "Philosophy",
    country: "China",
  },
  {
    id: "marie-curie",
    name: "Marie Curie",
    description: "A Polish and naturalized-French physicist and chemist who conducted pioneering research on radioactivity. The first woman to win a Nobel Prize.",
    description_pt: "Uma física e química polonesa e naturalizada francesa que conduziu pesquisas pioneiras sobre radioatividade. A primeira mulher a ganhar um Prêmio Nobel.",
    image: "https://placehold.co/400x400.png",
    aiHint: "female scientist",
    era: "Modern",
    field: "Science",
    country: "Poland/France",
  },
  {
    id: "william-shakespeare",
    name: "William Shakespeare",
    description: "An English playwright, poet and actor, widely regarded as the greatest writer in the English language and the world's pre-eminent dramatist.",
    description_pt: "Um dramaturgo, poeta e ator inglês, amplamente considerado o maior escritor da língua inglesa e o mais proeminente dramaturgo do mundo.",
    image: "https://placehold.co/400x400.png",
    aiHint: "playwright portrait",
    era: "Renaissance",
    field: "Literature",
    country: "United Kingdom",
  },
  {
    id: "albert-einstein",
    name: "Albert Einstein",
    description: "A German-born theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics.",
    description_pt: "Um físico teórico nascido na Alemanha que desenvolveu a teoria da relatividade, um dos dois pilares da física moderna.",
    image: "https://placehold.co/400x400.png",
    aiHint: "genius scientist",
    era: "Modern",
    field: "Science",
    country: "Germany/USA",
  },
  {
    id: "joan-of-arc",
    name: "Joan of Arc",
    description: "A peasant girl who, believing she was acting under divine guidance, led the French army in a momentous victory at Orléans that repulsed an English attempt to conquer France during the Hundred Years' War.",
    description_pt: "Uma camponesa que, acreditando estar agindo sob orientação divina, liderou o exército francês em uma vitória memorável em Orléans, que repeliu uma tentativa inglesa de conquistar a França durante a Guerra dos Cem Anos.",
    image: "https://placehold.co/400x400.png",
    aiHint: "female warrior",
    era: "Medieval",
    field: "History",
    country: "France",
  },
];

export function getCharacters(): Character[] {
  return characters;
}

export function getCharacterById(id: string): Character | undefined {
  return characters.find((character) => character.id === id);
}
