<<<<<<< HEAD
import { GET_POLICECALLS, TOGGLE_LIVE, UPDATE_REFRESH, FILTERED_DATA} from './actionTypes';
=======
import { GET_POLICECALLS, TOGGLE_LIVE, UPDATE_REFRESH, SET_DATE} from './actionTypes';
>>>>>>> dev


export const getPoliceCalls = () => dispatch =>{
    // Dispatch to store and make aware that data is being fetched
    // fetch data
    // when data reutrns dispatch to store you have received data and send it as payloadd
    // switch to '/api/policecalls' to receive actual police call data
    fetch('/api/policecalls/dev', {
        credentials: 'include',
<<<<<<< HEAD
      }) // '/api/policecalls/dev'
        .then(data => data.json())
        .then(json => {

            //Uncomment for sorted policeCalls data
            //json.sort(function (a, b) {
            //    return new Date(a.B) - new Date(b.B);
            //});

=======
      })
        .then(data => data.json())
        .then(json => {
>>>>>>> dev
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

<<<<<<< HEAD
export const filteredData = (value) => dispatch => {
    dispatch({ type: FILTERED_DATA, payload: value});
}
=======
export const setDate = (date) => dispatch => {
  dispatch({type: SET_DATE, payload: date});
}


>>>>>>> dev
