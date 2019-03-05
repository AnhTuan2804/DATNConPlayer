const round = (value, r) => {
    const n = parseFloat(value || 0);
    return Math.round(n * Math.pow(10, r)) / (Math.pow(10, r))
}
module.exports = {
    round
}
