import {GET_POLICECALLS} from '../actions/actionTypes';

const initialState = {
    policeCalls = [],
    loading = false,
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_POLICECALLS:
            return {...state, policeCalls: action.payload, loading: false};
        default:
            return state;
    }
}