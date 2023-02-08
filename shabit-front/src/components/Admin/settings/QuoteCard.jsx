import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';
import { deletePhrase } from '../../../services/admin/delete';
import { loadEffect } from '../../common/animation';

const QuoteCard = ({ quote }) => {
  const [isEditting, setIsEdditing] = useState(false);
  useEffect(() => {
    if (!isEditting) return;
    setIsEdditing(false);
  }, [quote]);
  return (
    <Wrapper onBlur={() => setIsEdditing(false)}>
      <InfoBox>
        <div>{quote}</div>
      </InfoBox>
      <Icon>
        {isEditting ? (
          <ButtonWrapper>
            <StyledButton
              onClick={() => {
                deletePhrase(quote).then(() => setIsEdditing(false));
              }}
            >
              삭제
            </StyledButton>
            <StyledButton
              onClick={() => {
                setIsEdditing(false);
              }}
            >
              취소
            </StyledButton>
          </ButtonWrapper>
        ) : (
          <AiOutlineClose
            onClick={() => {
              setIsEdditing(true);
            }}
          />
        )}
      </Icon>
    </Wrapper>
  );
};

export default QuoteCard;

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.color.whiteColor};
  border-radius: 1.5rem;
  border: 0.2rem solid ${(props) => props.theme.color.secondary};
  padding: 0.2rem 0;
  margin: 0.2rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  animation: 0.8s ease-in ${loadEffect.down};
`;

const Icon = styled.div`
  position: absolute;
  right: 0.8rem;
  color: ${(props) => props.theme.color.primary};
  font-size: 1rem;
  padding-top: 0.3rem;
  padding-right: 0.8rem;

  cursor: pointer;
`;
const InfoBox = styled.div`
  color: ${(props) => props.theme.color.primary};
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  padding-left: 1.5rem;

  & > div:last-child {
    width: 28rem;
    padding: 0.3rem 0;
    overflow: hidden;
    word-wrap: break-word;
  }
`;

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.color.grayColor};
  color: ${(props) => props.theme.color.whiteColor};
  padding: 0.1rem 0.4rem;
  margin-left: 0.4rem;
  margin-bottom: 0.4rem;
  border-radius: 0.3rem;
  font-size: small;
  font-weight: bold;
  box-shadow: 0 0.1rem 0.1rem ${(props) => props.theme.color.lightGrayColor};
  &:hover {
    background-color: ${(props) => props.theme.color.primary};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
`;
