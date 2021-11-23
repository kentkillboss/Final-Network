import { DeleteData, EditData } from 'Redux/Action/globalTypes';
import { NOTE_TYPES } from 'Redux/Action/noteAction';

const initialState = {
  loading: false,
  notes: [],
  result: 0,
  page: 2,
  noteId: [],
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTE_TYPES.CREATE_NOTE:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    case NOTE_TYPES.GET_NOTES:
      return {
        ...state,
        notes: action.payload.notes,
        result: action.payload.result,
        page: action.payload.page,
      };
    case NOTE_TYPES.GET_NOTE_ID:
      return {
        ...state,
        noteId: action.payload,
      };
    case NOTE_TYPES.UPDATE_NOTE:
      return {
        ...state,
        notes: EditData(state.notes, action.payload._id, action.payload),
      };
    case NOTE_TYPES.DELETE_NOTE:
      return {
        ...state,
        notes: DeleteData(state.notes, action.payload),
      };

    default:
      return state;
  }
};

export default noteReducer;
