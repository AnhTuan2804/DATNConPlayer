const firebaseValidator = (str) => {
    const regexExp = /[ .#$\[\]]/;
    return regexExp.test(str)
}
const asciiCharacterValidator = (str) => {
    const accii = /[^\x20-\x7F]/;
    return accii.test(str)
}
module.exports = {
    firebaseValidator,
    asciiCharacterValidator
}
