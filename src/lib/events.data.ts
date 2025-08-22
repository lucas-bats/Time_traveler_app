// Imports the Event type to ensure data consistency.
import type { Event } from "./events";

/**
 * @fileOverview This file contains the raw data array for all historical events
 * available in the application. Each object represents an event and includes
 * its details, such as ID, name, description, participants, and image URL.
 */
export const eventsData: Event[] = [
  {
    "id": "french-revolution",
    "name": "French Revolution",
    "name_pt": "Revolução Francesa",
    "date": "1789-1799",
    "era": "Modern",
    "era_pt": "Moderna",
    "area": "Politics",
    "area_pt": "Política",
    "description": "A period of radical social and political upheaval in France that had a lasting impact on French history and modern history worldwide.",
    "description_pt": "Um período de radical agitação social e política na França que teve um impacto duradouro na história francesa e na história moderna em todo o mundo.",
    "participants": ["louis-xvi", "marie-antoinette", "robespierre", "napoleon-bonaparte"],
    "context": "The French Revolution was a complex event involving the overthrow of the monarchy, the establishment of a republic, and periods of violent political turmoil, finally culminating in a dictatorship under Napoleon.",
    "context_pt": "A Revolução Francesa foi um evento complexo que envolveu a derrubada da monarquia, o estabelecimento de uma república e períodos de violenta turbulência política, culminando finalmente em uma ditadura sob Napoleão.",
    "image": "https://firebasestorage.googleapis.com/v0/b/time-traveler-talks.firebasestorage.app/o/Eventos%2FFrench%20Revolutionaries%20Unite_simple_compose_01k391gnyff8yvv82p86xwbr1m.png?alt=media&token=bd8b3745-a2af-4901-a5b9-dbbcacfcc873"
  },
  {
    "id": "renaissance",
    "name": "The Renaissance",
    "name_pt": "O Renascimento",
    "date": "14th-17th Century",
    "era": "Renaissance",
    "era_pt": "Renascentista",
    "area": "Art & Science",
    "area_pt": "Arte & Ciência",
    "description": "A period in European history marking the transition from the Middle Ages to modernity and covering the 15th and 16th centuries, characterized by an effort to revive and surpass ideas and achievements of classical antiquity.",
    "description_pt": "Um período na história europeia que marca a transição da Idade Média para a modernidade, caracterizado por um esforço para reviver e superar ideias e realizações da antiguidade clássica.",
    "participants": ["leonardo-da-vinci", "michelangelo", "niccolo-machiavelli", "galileo-galilei"],
    "context": "The Renaissance was a fervent period of European cultural, artistic, political and economic “rebirth” following the Middle Ages. It saw a flourishing of literature, science, art, religion, and politics.",
    "context_pt": "O Renascimento foi um período fervoroso de “renascimento” cultural, artístico, político e econômico europeu após a Idade Média. Viu um florescimento da literatura, ciência, arte, religião e política.",
    "image": "https://firebasestorage.googleapis.com/v0/b/time-traveler-talks.firebasestorage.app/o/Eventos%2FRenaissance%20Scholars%20Gathering_simple_compose_01k391hgxqfnsbnms1bxnkpaxs.png?alt=media&token=1e79742b-83ba-442b-8eec-91bcc4f7650f"
  },
  {
    "id": "independencia_brasil",
    "name": "Independence of Brazil",
    "name_pt": "Independência do Brasil",
    "date": "1822-09-07",
    "era": "Modern",
    "era_pt": "Moderna",
    "area": "Politics",
    "area_pt": "Política",
    "description": "The process by which Brazil became independent from Portugal, culminating in the famous 'Cry of Ipiranga' by Dom Pedro I.",
    "description_pt": "O processo pelo qual o Brasil se tornou independente de Portugal, culminando no famoso 'Grito do Ipiranga' por Dom Pedro I.",
    "participants": [
      "dom_pedro_i",
      "jose_bonifacio",
      "maria_leopoldina",
      "joao_vi"
    ],
    "context": "In the early 19th century, tensions between the colony and the metropole grew. The movement culminated in 1822, when Dom Pedro I proclaimed independence, breaking with Portugal and consolidating Brazil as a sovereign nation.",
    "context_pt": "No início do século XIX, as tensões entre a colônia e a metrópole cresceram. O movimento culminou em 1822, quando Dom Pedro I proclamou a independência, rompendo com Portugal e consolidando o Brasil como uma nação soberana.",
    "image": "https://firebasestorage.googleapis.com/v0/b/time-traveler-talks.firebasestorage.app/o/Eventos%2FBrazil's%20Independence%202%201822_simple_compose_01k392chk7fxxadfvk16mqmgpe.PNG?alt=media&token=626ac21f-f4e2-4942-b79b-0d3ae4d7d0a7"
  },
  {
    "id": "primeira_guerra_mundial",
    "name": "World War I",
    "name_pt": "Primeira Guerra Mundial",
    "date": "1914-1918",
    "era": "Contemporary",
    "era_pt": "Contemporânea",
    "area": "Politics",
    "area_pt": "Política",
    "description": "A global conflict involving the major world powers, triggered by the assassination of Archduke Franz Ferdinand and marked by trench warfare and wars of attrition.",
    "description_pt": "Conflito global que envolveu as principais potências mundiais, desencadeado pelo assassinato do arquiduque Francisco Ferdinando e marcado por trincheiras e guerras de desgaste.",
    "participants": [
      "gavrilo-princip",
      "franz-ferdinand",
      "woodrow-wilson",
      "karl-marx",
      "otto-von-bismarck",
      "queen-victoria"
    ],
    "context": "With imperialist rivalries, military alliances, and nationalist tensions, World War I transformed world politics and led to the fall of empires such as the Austro-Hungarian, Ottoman, German, and Russian.",
    "context_pt": "Com rivalidades imperialistas, alianças militares e tensões nacionalistas, a Primeira Guerra Mundial transformou a política mundial e levou à queda de impérios como o Austro-Húngaro, Otomano, Alemão e Russo.",
    "image": "https://firebasestorage.googleapis.com/v0/b/time-traveler-talks.firebasestorage.app/o/Eventos%2FWWI%20Scene_simple_compose_01k392j3xnfktracf4g0rrngps.png?alt=media&token=2b99e404-27a0-401f-87e8-a669b902b810"
  },
  {
    "id": "segunda_guerra_mundial",
    "name": "World War II",
    "name_pt": "Segunda Guerra Mundial",
    "date": "1939-1945",
    "era": "Contemporary",
    "era_pt": "Contemporânea",
    "area": "Politics",
    "area_pt": "Política",
    "description": "The largest conflict in human history, initiated by the invasion of Poland by Nazi Germany, involving virtually every nation in the world.",
    "description_pt": "Maior conflito da história da humanidade, iniciado pela invasão da Polônia pela Alemanha Nazista, envolvendo praticamente todas as nações do mundo.",
    "participants": [
      "winston-churchill",
      "franklin-roosevelt",
      "joseph-stalin",
      "adolf_hitler",
      "benito_mussolini",
      "charles_de_gaulle",
      "hirohito"
    ],
    "context": "With roots in the Treaty of Versailles and the rise of totalitarian regimes, World War II resulted in millions of deaths, the Holocaust, the use of nuclear weapons, and the beginning of the Cold War.",
    "context_pt": "Com raízes no Tratado de Versalhes e na ascensão dos regimes totalitários, a Segunda Guerra Mundial resultou em milhões de mortes, o Holocausto, o uso de armas nucleares e o início da Guerra Fria.",
    "image": "https://firebasestorage.googleapis.com/v0/b/time-traveler-talks.firebasestorage.app/o/Eventos%2FWWII%20Guerra%20e%20Insensatez_remix_01k392vfr0e22a97q8yqrc2exf.png?alt=media&token=e9fb493f-8720-4d67-9aa7-7d3eaed46a63"
  }
]
