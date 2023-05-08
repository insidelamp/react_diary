export type Actions =
  | { type: "CREATE"; data: DateType }
  | { type: "UPDATE"; data: DateType }
  | { type: "DELETE"; data: DateType }
  | { type: "INIT"; data: DateType[] };

export interface DateType {
  id?: number | string | null | Element;
  date: number | string;
  content?: string;
  emotionId?: number;
  targetId?: number | string;
}

export function reducer(state: DateType[], action: Actions) {
  switch (action.type) {
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
    case "INIT": {
      return action.data;
    }
    default: {
      return state;
    }
  }
}
