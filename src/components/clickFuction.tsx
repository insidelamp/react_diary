import { DateType, Actions } from "./Reducer";
import { useReducer, useRef } from "react";
import { reducer } from "./Reducer";

interface RefObject<T> {
  readonly current: T | null;
}

export const defaultData = (
  data: DateType[],
  dispatch: ({ type, data }: Actions) => void
) => {
  dispatch({
    type: "INIT",
    data: [...data],
  });
};

export const onCreate = (
  { date, content, emotionId }: DateType,
  idRef: any,
  dispatch: ({ type, data }: Actions) => void
) => {
  if (date !== undefined && idRef !== null) {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef?.current,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
    idRef.current += 1;
  }
};

export const onUpdate = (
  { targetId, date, content, emotionId }: DateType,
  idRef: any,
  dispatch: ({ type, data }: Actions) => void
) => {
  if (date !== undefined) {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
  }
};

export const onDelete = (
  { targetId, date }: DateType,
  idRef: any,
  dispatch: ({ type, data }: Actions) => void
) => {
  if (targetId !== undefined && date !== undefined) {
    dispatch({
      type: "DELETE",
      data: {
        targetId,
        date,
      },
    });
  }
};
