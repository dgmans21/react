import { useCounterStore } from "../store/counter";

export default function Pluspage() {
  // 스토어에서 count와 increase 함수를 가져옵니다.
  const count = useCounterStore((state) => state.count);
  const increase = useCounterStore((state) => state.increase);

  return (
    <div style={{ padding: "10px", border: "1px solid #ccc", marginBottom: "10px", borderRadius: "8px" }}>
      <h2>Pluspage (Zustand)</h2>
      <p>Count: <strong>{count}</strong></p>
      <button onClick={increase}>+1</button>
    </div>
  );
}