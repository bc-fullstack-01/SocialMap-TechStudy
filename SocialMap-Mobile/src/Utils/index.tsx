function splitAbout(text: String, words: number = 12) {
    if (text.split(' ').length <= words) return text
    var newText = text.split(' ').slice(0, words)
    newText.push('...')
    return newText.join(' ')
}

function fistToUpperCase(text: String) {
    return text.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
}

function capitalizeFirstLetter(text: String) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - 1 - min + 1) + min)
}

function getFistsNames(names: string, qtd: number) {
    return names.split(" ").slice(0, qtd).map((names) => names[0]).join().replace(",", "");
}

const setMessagensContext = (dispatch: any, type: string, menssage: string, other: any = {}) => {
    dispatch({ ...other, type: type, payload: menssage })
    setTimeout(() => {
        dispatch({ type: type, payload: "" })
    }, 2500)
}

export default {
    splitAbout,
    fistToUpperCase,
    capitalizeFirstLetter,
    randomNumber,
    getFistsNames,
    setMessagensContext
}