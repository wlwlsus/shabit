import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/GlobalStyles';
import Logo from '../common/Logo';

const UploadingModal = ({ toggleModal }) => {
  const [hasPreview, setHasPreview] = useState(false);
  const [files, setFiles] = useState('');
  const imgRef = useRef();
  useEffect(() => {
    //https://velog.io/@gay0ung/리액트로-이미지-업로드-미리보기
    preview();
    return () => preview();
  });
  const onLoadFile = (e) => {
    const file = e.target.files;
    setFiles(file);
  };
  const preview = () => {
    if (!files.length) {
      return setHasPreview(!!files.length);
    }
    const reader = new FileReader();
    reader.onload = () => {
      imgRef.current.style.background = `url(${reader.result})`;
    };
    reader.readAsDataURL(files[0]);
    return setHasPreview(!!files.length);
  };

  return (
    <ModalWrapper>
      <span>사진을 업로드하세요.</span>
      <ImgWrapper ref={imgRef}>
        {hasPreview ? (
          <div></div>
        ) : (
          <ImgWrapper>
            <Logo color={'pink'} />
          </ImgWrapper>
        )}
      </ImgWrapper>
      <input type="file" onChange={onLoadFile}></input>
      <div
        onClick={() => {
          toggleModal();
        }}
      >
        끄기
      </div>
    </ModalWrapper>
  );
};

export default UploadingModal;
const ModalWrapper = styled.div`
  background-color: white;
  top: 1.5rem;
  height: 45%;
  width: 38%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 0.2rem 0.5rem ${theme.color.grayColor};
  & > span {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: ${theme.color.blueColor};
  }
`;

const ImgWrapper = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 50%;
  background-color: ${theme.color.secondary};

  display: flex;
  align-items: center;
  justify-content: center;
`;

// import React, { useState } from 'react';

// import Input from '../common/Input';
// import ArrowIcon from '../common/ArrowIcon';

// const ConfirmForm = ({ onConfirmed, confirmCode }) => {
//   const [code, setCode] = useState('');
//   const [comfirmed, setConfirmed] = useState(false);
//   const [message, setMessage] = useState('인증 번호를 입력하세요');
//   const onChangeHandler = (e) => {
//     setCode(e.target.value);
//   };

//   const onClick = (e) => {
//     //수정할거: 이메일 인증 요청하기
//     if (confirmCode !== code)
//       return setMessage('인증번호가 일치하지 않습니다.');
//     setConfirmed(true);
//     setTimeout(onConfirmed, 2000);
//   };
//   // ###############################

//   return (
//     <FormWrapper>
//       {comfirmed ? (
//         <div>인증되었습니다.</div>
//       ) : (
//         <>
//           <div>{message}</div>
//           <div>
//             인증번호를 발송하였습니다. <br /> 메일함을 확인해주세요.
//           </div>
//           <Input
//             type="code"
//             name="code"
//             value={code}
//             onChange={onChangeHandler}
//             placeholder={'인증번호'}
//             shadow={'shadow'}
//           />
//           <div onClick={onClick}>
//             <ArrowIcon size={'lg'} color={'primary'} />
//           </div>
//         </>
//       )}
//     </FormWrapper>
//   );
// };

// export default ConfirmForm;
