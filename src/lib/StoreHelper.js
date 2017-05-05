import Helper   from './Helper';

const StoreHelper = {
    createAction(type, payload, error) {
        let action = { type };
        if(!Helper.isNil(payload))
            action.payload = payload;
        if(!Helper.isNil(error))
            action.payload = error;
        return action;
    }
}

export default StoreHelper;