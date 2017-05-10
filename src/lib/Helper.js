import { T_STR, T_OBJ, T_FUNC } from './Constants'

const chars = window.chars ={
    numeric: Array.from(Array(10).keys()).map(e => e + ''),
    upperCase: Array.from(Array(26).keys()).map(e => String.fromCharCode(e + 65)),
    lowerCase: Array.from(Array(26).keys()).map(e => String.fromCharCode(e + 65).toLowerCase()),
}

const Helper = {
    bind(component, functionNames) {
        if(Helper.isNil(component))
            return;

        if(typeof functionNames === T_STR) 
            if(Helper.isNullOrWhitespace(functionNames))
                return;
            else
                functionNames = [ functionNames ];
        
        if(!Helper.isArray(functionNames))
            return;
        
        for(let functionName of functionNames)
            if(typeof component[functionName] === T_FUNC)
                component[functionName] = component[functionName].bind(component);
    },

    getRandomAlphanumeric: (length = 10) => {
        var str = '';
        for(var i = 0; i < length; i++) {
            let collRoll = Math.floor(Math.random() * 3);
            let col = collRoll == 0 ? 'numeric'
                : collRoll == 1 ? 'upperCase'
                : 'lowerCase';
            let idxRoll = Math.floor(Math.random() * chars[col].length);
            str += chars[col][idxRoll];
        }
        return str;
    },
    getSubstringUntilNth: (str, pattern, n) => str.split(pattern, n).join(pattern),

    isArray: obj => Array.isArray(obj) || obj instanceof Array,
    isNil: obj => obj === void 0 || obj === null,
    isNullOrWhitespace: obj => typeof obj !== T_STR || obj.replace(/ /g, '').length === 0,
    isObject: obj => typeof obj === T_OBJ && obj !== null
}

export default Helper;