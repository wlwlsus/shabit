import { useEffect, useState } from 'react';

function useDebounce(value, delay) {
  //delay 안에 키보드를 치는 경우 return하지 않고 delay를 초기화함.
  //delay가 지나면 timeout이 되어 setValue가 실행 됨.
  //(의존자에 delay값이 있어서 해당 delay값이 초기화될 때에 함수가 다시 호출되는 것)
  //자바스크립트의 내장함수인 setTimeout과 clearTimeout을 사용함
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debounceValue;
}

export default useDebounce;
