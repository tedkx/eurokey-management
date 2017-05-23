import Helper   from './Helper';

const locale = 'el-GR';

const d2 = '2-digit';
const fullOptions = { year: d2, month: d2, day: d2, hour: d2, minute: d2, second: d2, hour12: false };
const dateOptions = { year: d2, month: d2, day: d2 };
const timeOptions = { hour: d2, minute: d2, second: d2, hour12: false };

const DateHelper = {
    parse(obj) {
        //TODO:
        if(typeof obj === 'string')
            return new Date(obj.replace('T', ' ').replace('Z', '').trim());
        return new Date(obj);
    },

    _handleDefault(dt, func, ...args) {
        if(typeof dt === 'string')
            dt = new Date(dt);
        if(Helper.isNil(dt) || !(dt instanceof Date) || dt.toString() == 'Invalid Date')
            return '';
        
        try {
            return func.apply(dt, [locale, ...args]);
        } catch(ex) {
            Helper.error('date helper ex', ex);
            return '';
        }
    },

    toString(dt) {
        return DateHelper._handleDefault(dt, Date.prototype.toLocaleString, fullOptions).replace(/,/g, '');
    },

    toDateString(dt) {
        return DateHelper._handleDefault(dt, Date.prototype.toLocaleDateString, dateOptions).replace(/,/g, '');
    }
};

export default DateHelper;