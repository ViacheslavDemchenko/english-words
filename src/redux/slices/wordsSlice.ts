import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { randomIntFromInterval, getData } from '../../utils';
import { Word } from '../../types';
import data from './../../assets/words.json'; // Абсолютный путь от корня сайта

let dataLS;

if (JSON.parse(localStorage.getItem('words') as string)) { 
  dataLS = JSON.parse(localStorage.getItem('words') as string);
}

const initialState = {
  words: dataLS || data,
  currentWord: {} as Word,
  filteredWords: [] as Word[],
  nextWord: {} as Word,
}

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    confirmWord(state, action: PayloadAction<number>) {
      const newWords = state.words.map((word: Word) => {
        if (word.id === action.payload) {
          return {
            ...word,
            learned: true
          }
        } else {
          return word;
        }
      });

      state.words = newWords;
    },
    resetWords(state, action: PayloadAction<Word[]>) {
      const newWords: Word[] = action.payload.map((word: Word) => {
        if (word.learned) {
          return {
            ...word,
            learned: false
          }
        } else {
          return word;
        }
      });

      state.words = newWords;
    },
    getLearnedWords(state, action: PayloadAction<Word[]>) {
      const learnedWords: Word[] = action.payload.filter((word: Word) => word.learned);

      state.filteredWords = learnedWords;
    },
    getUnlearnedWords(state, action: PayloadAction<Word[]>) {
      const unLearnedWords: Word[] = action.payload.filter((word: Word) => !word.learned);

      state.filteredWords = unLearnedWords;
    },
    getNextWord(state, action: PayloadAction<Word[]>) {
      const unlearnedWords: Word[] = action.payload.filter((word: Word) => !word.learned);
      const unlearnedWord: Word = unlearnedWords[Math.floor(Math.random() * unlearnedWords.length)];

      state.nextWord = unlearnedWord;
    }
  }
});

export const { confirmWord, resetWords, getLearnedWords, getUnlearnedWords, getNextWord } = wordsSlice.actions;

export default wordsSlice.reducer;