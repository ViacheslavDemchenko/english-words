import { WordsList } from './types';

const getData = async (): Promise<WordsList> => {
  const words: WordsList = await import('./assets/words.json');
  return words;
};

const randomIntFromInterval = (min: number, max: number) => { 
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export { randomIntFromInterval, getData };