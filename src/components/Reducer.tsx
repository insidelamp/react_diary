export type Actions =
  | { type: "CREATE"; data: DateType }
  | { type: "UPDATE"; data: DateType }
  | { type: "DELETE"; data: DateType }
  | { type: "INIT"; data: DateType[] };

export type DateType = {
  id?: number | string;
  date: number | string;
  content?: string;
  emotionId?: number;
  targetId?: number | string;
};

export function reducer(state: DateType[], action: Actions) {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newState = [action.data, ...state];
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "UPDATE": {
      const newState = state.map((it: DateType) =>
        String(it.id) === String(action.data.id) ? { ...action.data } : it
      );
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "DELETE": {
      const newState = state.filter(
        (it: DateType) => String(it.id) !== String(action.data.targetId)
      );
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    default: {
      return state;
    }
  }
}
