import { SET_USER ,SET_passTypeUser, SET_SELECTED_USER} from "./action";
import { produce } from "immer";

const initialState = {
  profile: null,
  typeUser:null,
  selectedUser:null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return produce(state, (draft) => {
        draft.profile = action.payload;
      });
    case SET_passTypeUser:
      return produce(state, (draft) => {
        draft.typeUser = action.payload;
      });
    case SET_SELECTED_USER:
      return produce(state, (draft) => {
        draft.selectedUser = action.payload;
      });

    default:
      return state;
  }
};

export default reducer;
