import { GET_CONFS } from '../actions/types';

const initialState = {
    removeme: 'text',
    changename: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CONFS:
            return {
                ...state,
                changename: action.payload
            }
        default:
            return state;
    }
}