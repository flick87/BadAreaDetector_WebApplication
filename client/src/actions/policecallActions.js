import { GET_POLICECALLS, TOGGLE_LIVE, UPDATE_REFRESH, SET_DATE} from './actionTypes';


export const getPoliceCalls = () => dispatch =>{
    // Dispatch to store and make aware that data is being fetched
    // fetch data
    // when data reutrns dispatch to store you have received data and send it as payloadd
    // switch to '/api/policecalls' to receive actual police call data
    fetch('/api/policecalls/?count=5000', {
        credentials: 'include',
      })
        .then(data => data.json())
        .then(json => {
            console.log(json)
            dispatch({type: GET_POLICECALLS, payload: json});
        })
        .catch(err => console.log(err));
};

export const toggleLive = (toggled) => dispatch =>{
  dispatch({type: TOGGLE_LIVE, payload: toggled});
}

export const updateRefresh = (value) => dispatch => {
  dispatch({type: UPDATE_REFRESH, payload: value});
}

export const setDate = (date) => dispatch => {
  dispatch({type: SET_DATE, payload: date});
}


