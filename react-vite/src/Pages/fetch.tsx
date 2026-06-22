import { useEffect } from "react";
import { useTodoStore } from "../store/countertodo"; // 스토어 가져오기

export default function Fetch() {
  // 스토어에서 상태와 액션들을 일개별적으로 구독합니다. (리렌더링 최적화)
  const todoId = useTodoStore((state) => state.todoId);
  const inputVal = useTodoStore((state) => state.inputVal);
  const data = useTodoStore((state) => state.data);
  const loading = useTodoStore((state) => state.loading);
  const error = useTodoStore((state) => state.error);

  const setInputVal = useTodoStore((state) => state.setInputVal);
  const fetchTodo = useTodoStore((state) => state.fetchTodo);
  const handlePrev = useTodoStore((state) => state.handlePrev);
  const handleNext = useTodoStore((state) => state.handleNext);
  const handleSearch = useTodoStore((state) => state.handleSearch);

  // 컴포넌트가 처음 켜질(마운트) 때 1번 Todo 데이터를 가져옵니다.
  useEffect(() => {
    fetchTodo(todoId);
  }, []);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>할 일(Todo) 실시간 조회 (Zustand)</h1>

      {/* 컨트롤러 영역 */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px" }}>
        <button onClick={handlePrev} disabled={todoId <= 1} className="btn btn--outline">
          이전
        </button>

        <form onSubmit={onSearchSubmit} style={{ display: "flex", gap: "5px" }}>
          <input
            type="number"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            style={{ width: "60px", textAlign: "center", padding: "5px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <button type="submit" className="btn btn--secondary" style={{ padding: "5px 10px" }}>
            조회
          </button>
        </form>

        <button onClick={handleNext} disabled={todoId >= 200} className="btn btn--outline">
          다음
        </button>
      </div>

      <hr />

      {/* 데이터 출력 영역 */}
      {loading && <div style={{ marginTop: "20px" }}>데이터를 불러오는 중...</div>}
      {error && <div style={{ marginTop: "20px", color: "red" }}>존재하지 않거나 에러가 발생했습니다.</div>}

      {!loading && !error && data && (
        <div className="auth-card" style={{ marginTop: "20px", textAlign: "left", border: "1px solid #ddd", padding: "15px", borderRadius: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#888", fontSize: "13px", marginBottom: "10px" }}>
            <span>👤 작성자 ID: {data.userId}</span>
            <span>🔢 할 일 번호: <strong>{data.id}</strong></span>
          </div>
          <h3 style={{ margin: "5px 0 10px 0", color: "#333" }}>📌 {data.title}</h3>
          
          <div style={{ marginTop: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span>상태: </span>
            <span style={{
              padding: "3px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "bold",
              backgroundColor: data.completed ? "#e6f4ea" : "#feeedb",
              color: data.completed ? "#137333" : "#b06000"
            }}>
              {data.completed ? "✅ 완료됨" : "⏳ 진행 중"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}