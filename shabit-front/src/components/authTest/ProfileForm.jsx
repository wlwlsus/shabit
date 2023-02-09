import React from 'react';
import { useEffect, useState } from 'react';
import Services from '../../services';

const ProfileForm = () => {
  const api = {
    post() {
      return Promise.resolve({ msg: '가짜api 성공' });
    },
    get() {
      return Promise.resolve({
        msg: '가짜api 성공',
        data: { result: { code: '1234' } },
      });
    },
    patch() {
      return Promise.resolve({ msg: '가짜API 성공' });
    },
    put() {
      return Promise.resolve({ msg: '가짜api 성공' });
    },
    delete() {
      return Promise.resolve({ msg: '가짜api성공' });
    },
  };
  //feat/#64 회원 정보 가져오기
  const [user, setUser] = useState({});
  //최초 실행시에 회원정보가 있는지를 확인하고, 없으면 로그인 페이지로 이동시킵니다. (로그인 할 때에 로컬 스토리지에 프로파일 저장됨.)
  //현재는 로컬 스토리지에 있지만, 상태관리툴을 도입시에는 상태관리 툴에서 받아옵니다.
  useEffect(() => {
    const currentUser = {
      email: 'ssafy@ssafy.com',
      nickname: 'ssafy',
      color: 'default',
      image: 'default',
    };
    sessionStorage.setItem('user', JSON.stringify(currentUser));
    if (!currentUser) {
      //대충 로그인 창으로 보내는 로직
      // const navigate = useNavigate();
      // navigate('/login');
      //https://velog.io/@ksmfou98/React-Router-v6-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8-%EC%A0%95%EB%A6%AC
      // 로컬스토리지 없는거 같아서 일단 아래처럼 함
    } else {
      setUser(currentUser);
    }
    setUser(currentUser);
  }, []);

  const { email, nickname, theme, image } = user;

  //feat/#25 프로필 사진 변경하기
  let formData = new FormData();

  const onImgChagne = async (e) => {
    // 선택된 파일이 없는 경우에 초기화
    if (!e.target.files.length) {
      formData.delete('file');
      return;
    }
    formData.append('file', e.target.files[0]);
    formData.get('file');
  };

  // feat/#25: 프로필 사진 업로드 및 변경하기
  const [isUploading, setIsUploading] = useState(false);
  const onUpload = async (e) => {
    e.preventDefault();
    await setIsUploading(true);
    await Services.Auth.changeImage(email, formData);
    await Services.Auth.fetchProfile(email).then((data) => setUser(data));
    await setIsUploading(false);
  };

  //feat/#108 프로필 사진 삭제 요청하기
  const onDeleteProfile = async () => {
    await setIsUploading(true);
    await Services.Auth.deleteImage(email);
    await Services.Auth.fetchProfile(email).then((data) => setUser(data));
    await setIsUploading(false);
  };

  return (
    <div>
      <div>{nickname}</div>
      <div>{theme}</div>
      <div>{image}</div>
      <img src={image} alt={image} />

      {!isUploading ? (
        <p
          onClick={() => {
            setIsUploading(!isUploading);
          }}
        >
          이미지 변경하기
        </p>
      ) : (
        <form>
          {/* https://velog.io/@edie_ko/React-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C%ED%95%98%EA%B8%B0-with-Axios */}
          <input
            type="file"
            id="profileImg"
            accept="image/*"
            name="file"
            onChange={onImgChagne}
          />
          <button type="submit" onClick={onUpload}>
            업로드 완료하기
          </button>
          <button type="button" onClick={() => setIsUploading(!isUploading)}>
            업로드 취소하기
          </button>
          <button type="button" onClick={onDeleteProfile}>
            프로필 사진 삭제하기
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfileForm;
