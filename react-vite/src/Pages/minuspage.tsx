import { useCounterStore } from "../store/counter";

export default function Minus() {
  // 스토어에서 count와 decrease 함수를 가져옵니다.
  const { count, decrease } = useCounterStore(); // 구조분해 할당 방식도 가능합니다!

  return (
    <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Minus (Zustand)</h2>
      <p>Count: <strong>{count}</strong></p>
      <button onClick={decrease}>-1</button>
    </div>
  );
}