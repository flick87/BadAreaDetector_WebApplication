import {GET_POLICECALLS} from '../actions/actionTypes';

const initialState = {
    policeCall:[],
    loading: false,
}

const policeCallsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_POLICECALLS:
            return {...state, policeCall: action.payload, loading: false};
        default:
            return state;
    }
}

export default policeCallsReducer;