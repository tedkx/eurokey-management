import axios, { CancelToken } 
                    from 'axios'
import { Observable }   from 'rxjs/Observable'

import Helper       from './Helper'
import Auth         from './AuthHelper'

export const REQ_GET = 'get';
export const REQ_PUT = 'put';
export const REQ_POST = 'post';
export const REQ_CANCEL = 'REQ_CANCEL';

// Default axios configuration
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.timeout = 15000;

//TODO: Maybe fetch url from server on initial request
const baseUrl = 'http://localhost:3000/'
const cth = 'content-type'
const jsonct = 'application/json'

const constructUrl = (resource) => `${baseUrl}api/${resource}`;

// Add authentication headers to the request
const configWithAuth = (configObj) => {
    let headerValue = 'Bearer ' + Auth.getAuthToken();

    if(Helper.isNil(configObj))
        configObj = {};

    configObj.headers = Object.assign(configObj.headers || {}, { Authorization: headerValue });
    return configObj;
}
// Set the cancellation token to the request config
const configWithCancellation = (configObj, cancellationToken) => Object.assign(configObj || {}, { cancelToken: cancellationToken })

const observableRequest = (type, resource, config, data, { anonymous, json }) => {
    let source = CancelToken.source(),
        formattedConfig = anonymous === true
            ? configWithCancellation(config, source.token)
            : configWithAuth(configWithCancellation(config, source.token)),
        request = type === REQ_POST ? axios.post(constructUrl(resource), data, formattedConfig)
            : type === REQ_PUT ? axios.put(constructUrl(resource), data, formattedConfig)
            : axios.get(constructUrl(resource), formattedConfig);

    if(json === true) {
        request = request.then((resp) => {
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
    }

    //request[REQ_CANCEL] = () => source.cancel();

    return Observable.fromPromise(request);
}

const RequestHelper = {
    anonymousPost: (resource, data, config) => observableRequest(REQ_POST, resource, config, data, { anonymous: true }),
    anonymousPostJson: (resource, data, config) => observableRequest(REQ_POST, resource, config, data, { anonymous: true, json: true}),
    constructUrl,
    get: (resource, config) => observableRequest(REQ_GET, resource, config),
    getJson: (resource, config) => observableRequest(REQ_GET, resource, config, null, { json: true }),
    post: (resource, data, config) => observableRequest(REQ_POST, resource, config, data),
    postJson: (resource, data, config) => observableRequest(REQ_POST, resource, config, data, { json: true }),
    put: (resource, data, config) => observableRequest(REQ_PUT, resource, config, data),
    putJson: (resource, data, config) => observableRequest(REQ_PUT, resource, config, data, { json: true })
}

export default RequestHelper

