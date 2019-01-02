if (document.readyState !== 'loading') {
    document.getElementById('calculator').style = {display: vsible};
} else {
    document.addEventListener('DOMContentLoaded', lunchCalculator);
}

function setDisplay(anw) {
    document.getElementById('display').value = anw;
}

function add() {
    var input = document.getElementById('display').value;
}

function substract() {
    var input = document.getElementById('display').value;

}

function multiply() {
    var input = document.getElementById('display').value;

}

function divide() {
    var input = document.getElementById('display').value;

}