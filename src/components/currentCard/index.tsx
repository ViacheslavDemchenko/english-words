import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { confirmWord, resetWords, getNextWord } from '../../redux/slices/wordsSlice';

import style from './currentCard.module.scss';

import { Word } from '../../types';


const CurrentCard: React.FC = () => {
  const [currentWord, setCurrentWord] = useState<Word>({} as Word);
  const [currentWordText, setCurrentWordText] = useState<string>('');

  let words = useSelector((state: RootState) => state.words.words);
  let nextWord = useSelector((state: RootState) => state.words.nextWord);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('words') as string)) { 
      words = JSON.parse(localStorage.getItem('words') as string);
    }

    nextWordShow(words);
  }, []);

  useEffect(() => {
    localStorage.setItem('words', JSON.stringify(words));
  }, [words]);

  const nextWordShow = (arr: Word[]): void => { // !!!

    dispatch(getNextWord(arr));

    if (nextWord) {
      setCurrentWord(nextWord);
      setCurrentWordText(nextWord.en);
    }
  };

  const confirm = (): void => { // !!!
    if (currentWord) {
      dispatch(confirmWord(currentWord.id));
      nextWordShow(words);
      localStorage.setItem('words', JSON.stringify(words));
    }

  };

  const reject = (): void => { // !!!
    if (currentWord) {
      setCurrentWordText(currentWord.ru);
      localStorage.setItem('words', JSON.stringify(words));
    }

    setTimeout(() => {
      nextWordShow(words);
    }, 3000);
  };

  const reset = (): void => { // !!!
    dispatch(resetWords(words));
    localStorage.setItem('words', JSON.stringify(words));
  };
 

  return (
    <div className={style.currentCardWrap}>
      <div className="container">
        <h1 className={style.currentCardWrapTitle}>Текущая карточка</h1>
        <button className={style.currentCardReset} onClick={reset}>
          Обнулить изученные слова
        </button>
        <div className={style.currentCard}>
          <p className={style.currentCardWord}>{currentWordText}</p>
          <div className={style.currentCardBtnsWrap}>
            <button className={style.currentCardButtonYes} onClick={confirm}>
              Знаю
            </button>
            <button className={style.currentCardButtonNo} onClick={reject}>
              Не знаю
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentCard;