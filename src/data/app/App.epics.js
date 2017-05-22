import { Observable }   from 'rxjs'
import { combineEpics } from 'redux-observable';

import Api              from '../../lib/Api'
import StoreHelper      from '../../lib/StoreHelper'
import { APP_ACTION_TYPES as AT }    
                        from './App.actions'

export const loginEpic = (action$, store) => action$
    .ofType(AT.LOGIN)
    .mergeMap(action => Api.login(action.payload)
        .map(content => StoreHelper.createAction(AT.LOGIN_SUCCESS, content))
        .catch(e => Observable.of(StoreHelper.createAction(AT.LOGIN_FAIL, null, e)))
    )

export default combineEpics(
    loginEpic
)