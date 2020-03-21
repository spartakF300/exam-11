import {
  ADD_ITEM_FAILURE,
  ADD_ITEM_REQUEST,
  ADD_ITEM_SUCCESS, FETCH_ITEM_DELETE_FAILURE, FETCH_ITEM_DELETE_REQUEST, FETCH_ITEM_DELETE_SUCCESS,
  FETCH_ITEM_ONE_SUCCESS,
  FETCH_ITEM_SUCCESS
} from "../actions/actionItems";

const initialState = {
  items: [],
  item: null,
  loading:false,
  error:null
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_REQUEST:
      return{...state,loading:true};
    case ADD_ITEM_SUCCESS:
      return {...state, loading: false};
    case ADD_ITEM_FAILURE:
      return {...state, error: action.error,loading:false};
    case FETCH_ITEM_SUCCESS:
      return{...state,loading: false, items:action.data};
    case FETCH_ITEM_ONE_SUCCESS:
      return{...state,item:action.data,loading: false};
    case FETCH_ITEM_DELETE_REQUEST:
      return {...state,loading:true};
    case FETCH_ITEM_DELETE_SUCCESS:
      return {...state,loading:false};
    case FETCH_ITEM_DELETE_FAILURE:
      return {...state, loading: false, error: action.error};
    default:
      return state;
  }
};

export default itemReducer;