import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';
import { deletePhrase } from '../../../services/admin/delete';
import { theme } from '../../../styles/GlobalStyles';
import { loadEffect } from '../../common/animation';

const QuoteCard = ({ quote }) => {
  const [isEditting, setIsEdditing] = useState(false);
  return (
    <Wrapper>
      <InfoBox>
        <div>{quote}</div>
        {/* <div> */}

        {/* </div> */}
      </InfoBox>
      <Icon>
        {isEditting ? (
          <buttonWrapper>
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
          </buttonWrapper>
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
  background-color: ${theme.color.whiteColor};
  border-radius: 1.5rem;
  /* box-shadow: 0 0.1rem 0.5rem ${theme.color.grayColor}; */
  border: 0.2rem solid ${theme.color.secondary};
  padding: 0.2rem 0;
  margin: 0.2rem;
  display: flex;
  width: 100%;
  /* justify-content: space-between; */

  justify-content: space-between;
  align-items: center;
  animation: 0.8s ease-in ${loadEffect.down};
`;

const Icon = styled.div`
  position: absolute;
  right: 0.8rem;
  /* position: absolute;
  left:0; */
  color: ${theme.color.primary};
  font-size: 1rem;
  /* font-weight: 600; */
  padding-top: 0.3rem;
  padding-right: 0.8rem;

  cursor: pointer;
`;
const InfoBox = styled.div`
  /* width: 100%; */
  color: ${theme.color.primary};
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

// const InfoTitle = styled.div`
//   width: fit-content;
//   margin-bottom: 1rem;
//   font-size: 0.8rem;
//   padding: 0.3rem 0.5rem;
//   background-color: ${theme.color.secondary};
//   border-radius: 1.5rem;
//   border: 0.1rem solid ${theme.color.primary};
//   box-shadow: 0 0.1rem 0.5rem ${theme.color.grayColor};

//   display: flex;
//   align-items: center;
// `;

const StyledButton = styled.button`
  /* margin-top: 0.5rem; */

  background-color: ${theme.color.grayColor};
  color: ${theme.color.whiteColor};
  padding: 0.1rem 0.4rem;
  margin-left: 0.4rem;
  margin-bottom: 0.4rem;
  /* margin-bottom: 0.1rem; */
  border-radius: 0.3rem;
  font-size: small;
  font-weight: bold;
  box-shadow: 0 0.1rem 0.1rem ${theme.color.lightGrayColor};
  &:hover {
    background-color: ${theme.color.primary};
    /* box-shadow: 0 0 1rem ${theme.color.lightGrayColor}; */
  }
`;

const buttonWrapper = styled.div`
  display: flex;
`;
