import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CounterState {
  count: number;
  increase: () => void;
  decrease: () => void;
}

export const useCounterStore = create<CounterState>()(
  persist(
    (set) => ({
      count: 0,
      increase: () => set((state) => ({ count: state.count + 1 })),
      decrease: () => set((state) => ({ count: state.count - 1 })),
    }),
    {
      name: "counter-storage", // LocalStorage에 저장될 키 이름
    }
  )
);

// 🔴 핵심: 다른 창(탭)에서 LocalStorage가 바뀌면 현재 창의 Zustand 상태도 업데이트합니다.
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === "counter-storage" && event.newValue) {
      try {
        const state = JSON.parse(event.newValue);
        // Zustand 스토어의 상태를 다른 창에서 넘어온 값으로 강제 동기화
        useCounterStore.setState(state.state);
      } catch (e) {
        console.error("동기화 실패:", e);
      }
    }
  });
}