import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';

import Input from '../common/Input';
import ArrowIcon from '../common/ArrowIcon';
import Auth from '../../services/auth';

const ConfirmForm = ({ onConfirmed }) => {
  const [code, setCode] = useState('');
  const [comfirmed, setConfirmed] = useState(false);
  const onChangeHandler = (e) => {
    setCode(e.target.value);
  };

  const onClick = (e) => {
    //수정할거: 이메일 인증 요청하기
    setConfirmed(true);
    setTimeout(onConfirmed, 2000);
  };
  // ###############################

  return (
    <FormWrapper>
      {comfirmed ? (
        <div>인증되었습니다.</div>
      ) : (
        <>
          <div>인증 번호를 입력하세요</div>
          <Input
            type="code"
            name="code"
            value={code}
            onChange={onChangeHandler}
            placeholder={'인증번호'}
            shadow={'shadow'}
          />

          <div onClick={onClick}>
            <ArrowIcon size={'lg'} color={'primary'} />
          </div>
        </>
      )}
    </FormWrapper>
  );
};

export default ConfirmForm;

const FormWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > div:first-child {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: ${theme.color.blueColor};
  }
`;

const Title = styled.div`
  width: 34%;
  color: ${theme.color.grayColor};
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;
