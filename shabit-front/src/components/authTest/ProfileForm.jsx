import React from 'react';
import { useEffect } from 'react';

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

  const [user, setUser] = useState({});
  //최초 실행시에 회원정보가 있는지를 확인하고, 없으면 로그인 페이지로 이동시킵니다. (로그인 할 때에 로컬 스토리지에 프로파일 저장됨.)
  //현재는 로컬 스토리지에 있지만, 상태관리툴을 도입시에는 상태관리 툴에서 받아옵니다.
  useEffect(() => {
    let currentUser = localStorage.getItem('user');
    if (!currentUser) {
      //대충 로그인 창으로 보내는 로직
    } else {
      setUser(currentUser);
    }
  }, []);

  {
    nickname, theme, image;
  }

  return (
    <div>
      <div>{nickname}</div>
      <div>{theme}</div>
      <div>{image}</div>
      <img src={image} alt={image} />
      <p>이미지 변경하기</p>
    </div>
  );
};

export default ProfileForm;
