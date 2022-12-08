import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { getLearnedWords, getUnlearnedWords } from '../../redux/slices/wordsSlice';

import { Word } from '../../types';
import style from './wordsTable.module.scss';

const WordsTable: React.FC = () => {
  const wordsArr = useSelector((state: RootState) => state.words.words);
  let filteredWordsList = useSelector((state: RootState) => state.words.filteredWords);
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('words') as string)) { 
      filteredWordsList = JSON.parse(localStorage.getItem('words') as string);
    }

    setFilteredWords(filteredWordsList);
  }, []);

  const showLearnedWords = (): void => {
    dispatch(getLearnedWords(wordsArr));
    setFilteredWords(filteredWordsList);
  };

  const showUnlearnedWords = (): void => {
    dispatch(getUnlearnedWords(wordsArr));
    setFilteredWords(filteredWordsList);
  };

  return(
    <div className={style.wordsListTableList}>
      <div className="container">
        <h1 className={style.wordsListTabletTitle}>Список всех слов</h1>
        <div className={style.wordsListTabletBtnsWrap}>
          <button className={style.wordsListTableBtnLearnedWords} onClick={showLearnedWords}>Изученные слова</button>
          <button className={style.wordsListTableBtnUnlearnedWords} onClick={showUnlearnedWords}>Неизученные слова</button>
        </div>
        <div className={style.wordsListTableContent}>
          {filteredWords.map((word: Word) => (
            <div className={style.wordsListTableItem} key={word.id}>{word.en}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { WordsTable };