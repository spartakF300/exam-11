import axiosApi from "../../axios-api";
import {push} from "connected-react-router";

export const FETCH_ITEM_DELETE_REQUEST = 'FETCH_ITEM_DELETE_REQUEST';
export const FETCH_ITEM_DELETE_FAILURE = 'FETCH_ITEM_DELETE_FAILURE';
export const FETCH_ITEM_DELETE_SUCCESS= 'FETCH_ITEM_DELETE_SUCCESS';


export const FETCH_ITEM_SUCCESS = 'FETCH_ITEM_SUCCESS';
export const FETCH_ITEM_ONE_SUCCESS = 'FETCH_ITEM_ONE_SUCCESS';

export const ADD_ITEM_REQUEST = 'ADD_ITEM_REQUEST';
export const ADD_ITEM_FAILURE = 'ADD_ITEM_FAILURE';
export const ADD_ITEM_SUCCESS = 'ADD_ITEM_SUCCESS';

export const fetchItemDeleteSuccess = () => ({type: FETCH_ITEM_DELETE_SUCCESS});
export const fetchItemDeleteRequest = () => ({type: FETCH_ITEM_DELETE_REQUEST});
export const fetchItemDeleteFailure = (error) => ({type: FETCH_ITEM_DELETE_FAILURE,error});

export const addItemRequest = () => ({type: ADD_ITEM_REQUEST});
export const createItemSuccess = () => ({type: ADD_ITEM_SUCCESS});
export const addItemFailure = error => ({type: ADD_ITEM_FAILURE, error});

export const fetchItemSuccess = data => ({type: FETCH_ITEM_SUCCESS, data});
export const fetchItemOneSuccess = data => ({type: FETCH_ITEM_ONE_SUCCESS, data});
export const addItem = itemData => {
    return async (dispatch, getState) => {
        const user = getState().users.user;
        dispatch(addItemRequest());
        try {
            await axiosApi.post('/items', itemData, {headers: {'Authorization': 'Token ' + user.token}});
            dispatch(createItemSuccess());

            dispatch(push('/'))
        } catch (e) {
            dispatch(addItemFailure(e));
        }
    }
};

export const getItem = (id) => {
    let url = '/items';
    if (id) url += `?category=${id}`;

    return async (dispatch) => {
        dispatch(addItemRequest());
        try {
            const response = await axiosApi.get(url);
            dispatch(fetchItemSuccess(response.data));
        } catch (e) {
            dispatch(addItemFailure(e.response.data));
        }
    }
};
export const getOneItem = (id) => {
    return async (dispatch) => {
        dispatch(addItemRequest());
        try {
            const response = await axiosApi.get('/items/' + id);
            dispatch(fetchItemOneSuccess(response.data));
        } catch (e) {
            dispatch(addItemFailure(e));
        }
    }
};
export const deleteItem = id => {
    return async (dispatch, getState) => {
        const user = getState().users.user;
        try {
            dispatch(fetchItemDeleteRequest());
            await axiosApi.delete('/items/' + id, {headers: {'Authorization': 'Token ' + user.token}});
            dispatch(fetchItemDeleteSuccess());
            dispatch(push('/'));
        } catch (e) {
            dispatch(fetchItemDeleteFailure(e));
        }

    }
};
