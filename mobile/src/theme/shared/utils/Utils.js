export default class Utils {
    static round(value, length) {
        let n = parseFloat(value);
        return Math.round(n * Math.pow(10, length)) / (Math.pow(10, length));
    }

    static resetState(state) {
        let keys = Object.keys(state);
        for (let i = 0; i < keys.length; i++) {
            state[keys[i]] = {};
        }
    }

    static toCommas(value) {
        var parts = value.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
}