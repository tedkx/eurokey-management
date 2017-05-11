import axios, { CancelToken } 
                    from 'axios'
import { CANCEL }   from 'redux-saga'

import { REQ_GET, REQ_PUT, REQ_POST }       
                    from './Constants'
import Helper       from './Helper'
import Auth         from './AuthHelper'
import config       from '../config.json'

// Default axios configuration
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.timeout = 15000;

const cth = 'content-type'
const jsonct = 'application/json'

// Add authentication headers to the request
const configWithAuth = (configObj) => {
    let headerValue = 'Bearer ' + Auth.getAuthToken();

    if(Helper.isNil(configObj))
        configObj = {};

    configObj.headers = Object.assign(configObj.headers || {}, { Authorization: headerValue });
    return configObj;
}
// Set the cancellation token to the request config
const configWithCancellation = (configObj, cancellationToken) => Object.assign(config || {}, { cancelToken: cancellationToken })

// Attach a cancellation token to the request for Redux Saga to use
const requestWithCancellation = (type, resource, config, data, anonymous) => {
    try{ 
        let source = CancelToken.source(),
            formattedConfig = anonymous === true
                ? configWithCancellation(config, source.token)
                : configWithAuth(configWithCancellation(config, source.token)),
            request = type === REQ_POST ? axios.post(constructUrl(resource), data, formattedConfig)
                : type === REQ_PUT ? axios.put(constructUrl(resource), data, formattedConfig)
                : axios.get(constructUrl(resource), formattedConfig);
        request[CANCEL] = () => source.cancel()
        return request
    }
    catch(ex) {
        console.log("ERROR", ex);
        return null;
    }
}

// Check if response has JSON content type
const withJsonResponse = (requestPromise) => requestPromise.then((resp) => {
        if(resp.headers && resp.headers[cth] && resp.headers[cth] && resp.headers[cth].match(jsonct)) {
            if(resp.data && resp.data.success === true) {
                return resp.data.content;
            }

            throw { 
                message: (resp.data && resp.data.messages) || 'Empty response',
                response: resp
            };
        }
        
        throw { 
            message: 'Invalid response format',
            response: resp
        };
    });

const constructUrl = (resource) => `${config.baseUrl}api/${resource}`;

const RequestHelper = {
    anonymousPost: (resource, data, config) => requestWithCancellation(REQ_POST, resource, config, data, true),
    anonymousPostJson: (resource, data, config) => withJsonResponse(requestWithCancellation(REQ_POST, resource, config, data, true)),
    constructUrl,
    get: (resource, config) => requestWithCancellation(REQ_GET, resource, config),
    getJson: (resource, config) => withJsonResponse(requestWithCancellation(REQ_GET, resource, config)),
    post: (resource, data, config) => requestWithCancellation(REQ_POST, resource, config, data),
    postJson: (resource, data, config) => withJsonResponse(requestWithCancellation(REQ_POST, resource, config, data)),
    put: (resource, data, config) => requestWithCancellation(REQ_PUT, resource, config, data),
    putJson: (resource, data, config) => withJsonResponse(requestWithCancellation(REQ_PUT, resource, config, data))
}

export default RequestHelper