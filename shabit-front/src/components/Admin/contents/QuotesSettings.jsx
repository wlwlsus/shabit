import React, { useEffect, useState } from 'react';
import { deletePhrase } from '../../../services/admin/delete';
import { retreivePhrases } from '../../../services/admin/get';
import { postQuote } from '../../../services/admin/post';
import { typedUseSelector } from '../../../store';

export default function QuotesSettings() {
  const [quoteInput, setQuoteInput] = useState('');
  const onChange = (e) => {
    setQuoteInput(e.target.value);
  };

  /*
    건강 문구 등록
    건강 문구 리스트 조회
    건강 문구 삭제
  */
  // postQuote,
  // deletePhrase,
  // retreivePhrases,
  useEffect(() => {
    retreivePhrases();
  }, []);
  const quetesList = typedUseSelector((state) => state.admin.quetesList);

  return (
    <div>
      <ul>
        {quetesList.map((element, idx) => {
          return (
            <div>
              <li key={String(idx) + Date().toString().slice(0, 3)}>
                {element}
              </li>
              <button
                onClick={() => {
                  deletePhrase(element);
                }}
              >
                삭제
              </button>
            </div>
          );
        })}
      </ul>
      <input
        type="text"
        name="quoteInput"
        value={quoteInput}
        placeholder="새로운 문구를 입력하세요"
        onChange={onChange}
      ></input>
      <button
        onClick={async () => {
          await postQuote(quoteInput);
          await setQuoteInput('');
        }}
      >
        문구 추가하기
      </button>
    </div>
  );
}
