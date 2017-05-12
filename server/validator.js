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
        
        if(!obj.id)
            errors.push('No id supplied');

        return errors.length === 0 || errors;
    }
}