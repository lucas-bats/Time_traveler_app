export interface Character {
  id: string;
  name: string;
  description: string;
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
    image: "https://placehold.co/400x400.png",
    aiHint: "egyptian queen",
    era: "Ancient",
    field: "Politics",
    country: "Egypt",
  },
  {
    id: "leonardo-da-vinci",
    name: "Leonardo da Vinci",
    description: "An Italian polymath of the High Renaissance who was active as a painter, draughtsman, engineer, scientist, theorist, sculptor, and architect.",
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
