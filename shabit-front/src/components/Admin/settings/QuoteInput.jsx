import React, { useState } from 'react';
import styled from 'styled-components';
import { postQuote } from '../../../services/admin/post';
import { theme } from '../../../styles/GlobalStyles';
import useDebounce from '../../../utils/useDebounce';
const QuoteInput = () => {
  const [quoteInput, setQuoteInput] = useState('');
  const debouncedInput = useDebounce(quoteInput, 200);
  const onChange = (e) => {
    setQuoteInput(e.target.value);
  };
  return (
    <QuoteInputWrapper>
      <StyledInputTag>
        <input
          type="text"
          name="quoteInput"
          value={quoteInput}
          placeholder="새로운 문구를 입력하세요"
          onChange={onChange}
        ></input>
      </StyledInputTag>

      <StyledButton
        onClick={async () => {
          await postQuote(quoteInput);
          await setQuoteInput('');
        }}
        style={
          debouncedInput && quoteInput
            ? { cursor: 'pointer' }
            : { backgroundColor: theme.color.whiteColor }
        }
      >
        문구 추가하기
      </StyledButton>
    </QuoteInputWrapper>
  );
};

export default QuoteInput;

const QuoteInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  /* box-shadow: 0 4px 4px 0px rgba(0, 0, 0, 0.1); */
`;

const StyledInputTag = styled.div`
  width: 52rem;
  /* height: 2rem; */

  input {
    display: block;
    width: 100%;
    /* margin: 10px 0; */
    padding: 1rem;
    padding-bottom: 1.01rem;
    border-radius: 1rem 0 0 1rem;
    /* border-radius: 2rem; */
    /* background-color: ${theme.color.lightGrayColor}; */
    border: 0.1rem solid ${theme.color.primary};
    border-right: none;
    /* border-left: none; */
    /* border: 0; */
    /* box-shadow: 0 0 4px rgba(0, 0, 0, 0.3); */
    transition: 0.3s box-shadow;
  }
  /* input:hover {
    background-color: #fbecec;
  } */
`;

const StyledButton = styled.button`
  /* margin-top: 0.5rem; */
  background-color: ${theme.color.primary};
  cursor: default;
  color: ${theme.color.whiteColor};
  width: 7rem;
  /* padding: 1rem; */
  border: 0.1rem solid ${theme.color.primary};
  border-left: none;
  border-radius: 0 1rem 1rem 0;
  /* border-radius: 4rem; */
  font-weight: bold;
`;
