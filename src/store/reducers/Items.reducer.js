import { ITEMS_ACTION_TYPES } from '../actions/Items.actions';
import Api from '../../lib/Api';

export const defaultState = {
    fetching: false,
    myItems: null,
    items: null
}

const itemsReducer = (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default itemsReducer;