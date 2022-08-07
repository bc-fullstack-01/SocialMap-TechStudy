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



export default {
    splitAbout,
    fistToUpperCase,
    capitalizeFirstLetter,
    randomNumber
}