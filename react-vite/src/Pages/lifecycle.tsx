import { useEffect, useState } from "react";

export default function Lifecycle() {
  // 글자 자체를 저장하는 대신, 아스키 코드 숫자로 관리하면 계산이 아주 쉬워집니다.
  // 'A'의 아스키 코드는 65입니다.
  const [charCode, setCharCode] = useState<number>(65);

  useEffect(() => {
    console.log("Lifecycle is Ready");
  }, []);

useEffect(() => {
    console.log("새로 입력된 단어는:",String.fromCharCode(charCode));
  }, [charCode]);
  //alert("새로 입력된 단어는: " + String.fromCharCode(charCode));

  const handleUpdate = () => {
    console.log("Lifecycle is updated");
    
    setCharCode((prevCode) => {
      // 'Z'의 아스키 코드는 90입니다.
      if (prevCode >= 90) {
        return 65; // Z(90)를 넘어가면 다시 A(65)로 리셋!
      }
      return prevCode + 1; // 다음 알파벳 숫자로 1 증가
    });
  };

  return (
    <div>
      {/* String.fromCharCode(숫자)를 쓰면 65를 'A'로, 66을 'B'로 변환해줍니다. */}
      <h1>Lifecycle: {String.fromCharCode(charCode)}</h1>
      <button onClick={handleUpdate}>변경할게요.</button>
    </div>
  );
}