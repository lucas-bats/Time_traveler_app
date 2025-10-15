import { MetadataRoute } from 'next'
import { getCharacters } from '@/lib/characters';
import { getEvents } from '@/lib/events';
import { getReligions } from '@/lib/religions';
 
const URL = 'https://eternalminds.fun';

export default function sitemap(): MetadataRoute.Sitemap {

  const characters = getCharacters();
  const characterUrls = characters.map((character) => ({
    url: `${URL}/chat/${character.id}`,
    lastModified: new Date(),
  }));

  const events = getEvents();
  const eventUrls = events.map((event) => ({
    url: `${URL}/chat/event/${event.id}`,
    lastModified: new Date(),
  }));

  const religions = getReligions();
  const religionUrls = religions.map((religion) => ({
    url: `${URL}/religions/${religion.id}`,
    lastModified: new Date(),
  }));

  const staticUrls = [
    {
      url: URL,
      lastModified: new Date(),
    },
    {
      url: `${URL}/about`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/privacy`,
      lastModified: new Date(),
    },
    {
      url: `${URL}/terms`,
      lastModified: new Date(),
    },
     {
      url: `${URL}/religions`,
      lastModified: new Date(),
    },
  ];

  return [
    ...staticUrls,
    ...characterUrls,
    ...eventUrls,
    ...religionUrls,
  ];
}