interface Meaning {
  definitions: Definition[];
  partOfSpeech: string;
}

interface Definition {
  antonyms: string[];
  definition: string;
  example: string;
  synonyms: string[];
}

interface Phonetic {
  audio: string;
  license: License;
  sourceUrl: string;
  text: string;
}

interface License {
  name: string;
  url: string;
}

export interface ApiResponse {
  meanings: Meaning[];
  phonetics: Phonetic[];
  sourceUrls: string[];
  word: string;
}
