module.exports = {
    validateForInsert: (obj) => {
        if(obj === void 0 || obj === null)
            return 'No data supplied';

        return true;
    },

    validateForUpdate: (obj) => {
        if(obj === void 0 || obj === null)
            return 'No data supplied';

        let errors = [];
        
        if(!obj.code)
            errors.push('No id supplied');

        return errors.length === 0 || errors;
    }
}