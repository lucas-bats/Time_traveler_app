
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export interface Character {
  id: string;
  name: string;
  description: string;
  description_pt: string;
  image: string;
  aiHint: string;
  era: string;
  era_pt: string;
  field: string;
  field_pt: string;
  country: string;
}

// This function now fetches characters from Firestore
export async function getCharacters(): Promise<Character[]> {
  try {
    const charactersCol = collection(db, "characters");
    const characterSnapshot = await getDocs(charactersCol);
    const characterList = characterSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Character));
    return characterList.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Error fetching characters:", error);
    // Returning an empty array in case of an error
    // In a real-world app, you might want to handle this more gracefully
    return [];
  }
}

// This function now fetches a single character from Firestore by ID
export async function getCharacterById(id: string): Promise<Character | undefined> {
  try {
    const characterDocRef = doc(db, "characters", id);
    const characterDoc = await getDoc(characterDocRef);
    if (characterDoc.exists()) {
      return { id: characterDoc.id, ...characterDoc.data() } as Character;
    }
    return undefined;
  } catch (error) {
    console.error(`Error fetching character with id ${id}:`, error);
    return undefined;
  }
}
