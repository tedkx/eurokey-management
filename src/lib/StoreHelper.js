import Helper   from './Helper';

const StoreHelper = {
    createAction: (type, payload, error) => {
        let action = { type };
        if(!Helper.isNil(payload))
            action.payload = payload;
        if(!Helper.isNil(error))
            action.payload = error;
        return action;
    },
    errorFromSaga: (type, e) => ({ type, payload: e.response, error: e })
}

export default StoreHelper;