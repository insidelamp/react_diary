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
  console.log(state, action);
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      return [action.data, ...state];
    }
    case "UPDATE": {
      return state.map((it: DateType) =>
        String(it.id) === String(action.data.id) ? { ...action.data } : it
      );
    }
    case "DELETE": {
      return state.filter(
        (it: DateType) => String(it.id) !== String(action.data.targetId)
      );
    }
    default: {
      return state;
    }
  }
}
