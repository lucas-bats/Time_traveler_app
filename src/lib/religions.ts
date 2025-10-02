import { religionsData } from "@/lib/religions.data";

export interface Religion {
  id: string;
  name: string;
  name_pt: string;
  origin: string;
  origin_pt: string;
  region: string;
  region_pt: string;
  description: string;
  description_pt: string;
  characters: string[];
  image: string;
}

export function getReligions(): Religion[] {
  return religionsData.sort((a, b) => a.name.localeCompare(b.name));
}

export function getReligionById(id: string): Religion | undefined {
  return religionsData.find((religion) => religion.id === id);
}
