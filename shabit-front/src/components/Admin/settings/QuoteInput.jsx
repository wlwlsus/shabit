import React, { useState } from 'react';
import styled from 'styled-components';
import { postQuote } from '../../../services/admin/post';
import useDebounce from '../../../utils/useDebounce';
const QuoteInput = ({ setTriggered, setPage, setIsLastPage }) => {
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
          if (!debouncedInput || !quoteInput) return;
          await postQuote(quoteInput);
          await setQuoteInput('');
          setTriggered(true);
          setIsLastPage(false);
          setPage(0);
        }}
        className={debouncedInput && quoteInput && 'clickable'}
      >
        추가
      </StyledButton>
    </QuoteInputWrapper>
  );
};

export default QuoteInput;

const QuoteInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  .clickable {
    background-color: ${(props) => props.theme.color.primary};
    cursor: 'pointer';
  }
`;

const StyledInputTag = styled.div`
  width: 88%;

  input {
    display: block;
    width: 100%;
    padding: 1rem;
    padding-bottom: 1rem;
    border-radius: 1rem 0 0 1rem;
    border: 0.1rem solid ${(props) => props.theme.color.primary};
    border-right: none;
    transition: 0.3s box-shadow;
  }
`;

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.color.grayColor};
  cursor: default;
  color: ${(props) => props.theme.color.whiteColor};
  width: 7rem;
  border: 0.1rem solid ${(props) => props.theme.color.primary};
  border-left: none;
  border-radius: 0 1rem 1rem 0;
  font-weight: bold;
`;
