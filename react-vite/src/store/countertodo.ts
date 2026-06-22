import { create } from "zustand";
import axios from "axios";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TodoState {
  todoId: number;
  inputVal: string;
  data: Todo | null;
  loading: boolean;
  error: Error | null;
  todosCache: Record<number, Todo>; // 1. 이미 불러온 데이터를 저장할 캐시 가방
  
  setInputVal: (val: string) => void;
  fetchTodo: (id: number) => Promise<void>;
  handlePrev: () => void;
  handleNext: () => void;
  handleSearch: () => void;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todoId: 1,
  inputVal: "1",
  data: null,
  loading: true,
  error: null,
  todosCache: {}, // 초기에는 빈 가방

  setInputVal: (val) => set({ inputVal: val }),

  fetchTodo: async (id) => {
    const { todosCache } = get();

    // 2. 🔥 핵심: 만약 이미 가방(캐시)에 이 번호의 데이터가 있다면?
    if (todosCache[id]) {
      set({
        data: todosCache[id],
        todoId: id,
        inputVal: id.toString(),
        loading: false, // 로딩 창도 안 띄우고
        error: null     // 즉시 화면에 꽂아버립니다.
      });
      return; // API 요청 안 하고 여기서 함수 종료! (0초 소요)
    }

    // 3. 캐시에 없을 때만 기존처럼 인터넷에서 받아옵니다.
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      
      set((state) => ({ 
        data: response.data, 
        todoId: id, 
        inputVal: id.toString(),
        loading: false,
        todosCache: { ...state.todosCache, [id]: response.data } // 가방에 새로 챙겨두기
      }));
    } catch (err) {
      set({ error: err as Error, loading: false });
    }
  },

  handlePrev: () => {
    const { todoId, fetchTodo } = get();
    if (todoId > 1) fetchTodo(todoId - 1);
  },

  handleNext: () => {
    const { todoId, fetchTodo } = get();
    if (todoId < 200) fetchTodo(todoId + 1);
  },

  handleSearch: () => {
    const { inputVal, fetchTodo } = get();
    const num = parseInt(inputVal);
    if (!isNaN(num) && num > 0 && num <= 200) {
      fetchTodo(num);
    } else {
      alert("1부터 200 사이의 올바른 할 일 번호를 입력해주세요!");
    }
  },
}));