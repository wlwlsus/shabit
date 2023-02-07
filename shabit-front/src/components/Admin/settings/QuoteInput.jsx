import React, { useState } from 'react';
import { postQuote } from '../../../services/admin/post';

const QuoteInput = () => {
  const [quoteInput, setQuoteInput] = useState('');
  const onChange = (e) => {
    setQuoteInput(e.target.value);
  };
  return (
    <div>
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
};

export default QuoteInput;
