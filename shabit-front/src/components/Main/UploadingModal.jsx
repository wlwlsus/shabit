import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { changeImage } from '../../services/auth/put';
import { typedUseSelector } from '../../store';
import { theme } from '../../styles/GlobalStyles';
import Logo from '../common/Logo';

const UploadingModal = ({ isModalOpen }) => {
  const [hasPreview, setHasPreview] = useState(false);
  const [files, setFiles] = useState('');
  const email = typedUseSelector((state) => state.auth.user.email);
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
      imgRef.current.style.backgroundImage = `url(${reader.result})`;
    };
    reader.readAsDataURL(files[0]);
    return setHasPreview(!!files.length);
  };
  const onUpload = (e) => {
    const formdata = new FormData();
    if (!files.length) return;
    formdata.append('profile', files[0]);
    changeImage(email, formdata).then(() => {
      isModalOpen(false);
      hasPreview(false);
      setFiles('');
    });
  };

  return (
    <ModalWrapper>
      {/* <span>사진을 업로드하세요.</span> */}
      <ImgWrapper ref={imgRef}>
        {hasPreview ? (
          <div></div>
        ) : (
          <ImgWrapper>
            <Logo color={'pink'} />
          </ImgWrapper>
        )}
      </ImgWrapper>
      <InputLabel htmlFor="file">파일 선택하기</InputLabel>
      <Input type="file" onChange={onLoadFile} id="file"></Input>
      <ButtonGroup>
        {files.length ? <Button onClick={onUpload}>업로드 하기</Button> : ''}
        <Button
          onClick={() => {
            isModalOpen(false);
            hasPreview(false);
            setFiles('');
          }}
          style={{ backgroundColor: `${theme.color.grayColor}` }}
        >
          취소하기
        </Button>
      </ButtonGroup>
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
  background-size: cover;
  object-fit: cover;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  background-color: ${theme.color.primary};
  color: ${theme.color.whiteColor};
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  box-shadow: 0 0.1rem 0.5rem ${theme.color.lightGrayColor};
`;
const Input = styled.input`
  display: none;
`;
const InputLabel = styled.label`
  background-color: ${theme.color.secondary};
  color: ${theme.color.primary};
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  box-shadow: 0 0.1rem 0.5rem ${theme.color.lightGrayColor};
  cursor: pointer;
`;
const ButtonGroup = styled.div`
  display: flex;
`;
