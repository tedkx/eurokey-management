import axios, { CancelToken } 
                    from 'axios'
import { CANCEL }   from 'redux-saga'

import Helper       from './Helper'
import Auth         from './AuthHelper'
import config       from '../config.json'

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.timeout = 15000;

const cth = 'content-type'
const jsonct = 'application/json'

const configWithAuth = (configObj) => {
    let headerValue = 'Bearer' + Auth.getAuthToken();
    if(Helper.isNil(configObj))
        configObj = {};
    if(Helper.isNil(configObj.headers))
        configObj.headers = { Authorization: headerValue };
    else if (typeof configObj.headers.Authorization !== 'string')
        configObj.headers.Authorization = headerValue;
    
    return configObj;
}

const constructUrl = (resource) => `${config.baseUrl}api/${resource}`;

const RequestHelper = {
    anonymousPost: (resource, data, config) => axios.post(constructUrl(resource), data, config || {}),
    constructUrl,
    get: (resource, config) => axios.get(constructUrl(resource), configWithAuth(config)),
    getJson: (resource, config) => {
        return RequestHelper.get(resource, config)
            .then((resp) => {
                if(resp.headers && resp.headers[cth] && resp.headers[cth] && resp.headers[cth].match(jsonct))
                    return resp;
                throw { 
                    message: 'Invalid response',
                    response: resp
                };
            });
    },
    post: (resource, data, config) => axios.post(constructUrl(resource), data, configWithAuth(config)),
}

export default RequestHelper