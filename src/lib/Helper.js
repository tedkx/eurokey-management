const Helper = {
    isArray: obj => Array.isArray(obj) || obj instanceof Array,
    isNil: obj => obj === void 0 || obj === null,
    isNullOrWhitespace: obj => typeof obj !== 'string' || obj.replace(/ /g, '').length === 0
}

export default Helper;