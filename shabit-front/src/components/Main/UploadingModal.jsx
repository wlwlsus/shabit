import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { changeImage } from '../../services/auth/put';
import { typedUseSelector } from '../../store';
import { BiUserCircle } from 'react-icons/bi';

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
      if (!imgRef.current) return;
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
      setHasPreview(false);
      setFiles('');
    });
  };

  return (
    <ModalWrapper>
      <ImgWrapper ref={imgRef}>
        {hasPreview ? (
          <></>
        ) : (
          <ImgWrapper>
            <BiUserCircle />
          </ImgWrapper>
        )}
      </ImgWrapper>
      <InputLabel htmlFor="file">파일 선택</InputLabel>
      <Input type="file" onChange={onLoadFile} id="file"></Input>
      <ButtonWrapper>
        <Button
          onClick={() => {
            isModalOpen(false);
            setHasPreview(false);
            setFiles('');
          }}
          style={{
            backgroundColor: `${(props) => props.theme.color.grayColor}`,
          }}
        >
          취소
        </Button>
        {files.length ? <Button onClick={onUpload}>확인</Button> : ''}
      </ButtonWrapper>
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
  box-shadow: 0 0.2rem 0.5rem ${(props) => props.theme.color.grayColor};
  border-radius: 1.5rem;
  border: 0.2rem solid ${(props) => props.theme.color.secondary};

  & > span {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.color.blueColor};
  }
`;

const ImgWrapper = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.secondary};
  background-size: cover;
  object-fit: cover;

  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    color: ${(props) => props.theme.color.primary};
    font-size: 8rem;
  }
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.whiteColor};
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
`;
const Input = styled.input`
  display: none;
`;
const InputLabel = styled.label`
  background-color: ${(props) => props.theme.color.secondary};
  color: ${(props) => props.theme.color.primary};
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
  cursor: pointer;
`;
const ButtonWrapper = styled.div`
  display: flex;
`;
