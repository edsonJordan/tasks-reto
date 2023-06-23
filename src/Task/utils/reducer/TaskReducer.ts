import { getCountTask } from "Task/services/TaskLocalService";

interface TaskState {
  idCounter: number;
}

const initialState: TaskState = {
  idCounter: getCountTask()<= 1 ? 1: getCountTask(),
};


export const reducer = (state: TaskState = initialState, action: any) => {
  switch (action.type) {
    case 'INCREMENT_ID_COUNTER':
      return {
        ...state,
        idCounter: state.idCounter + 1,
      };
    default:
      return state;
  }
};
