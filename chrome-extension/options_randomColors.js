let page = document.getElementById('colored-buttons');

function randomNumber() {
    let number = Math.floor((Math.random() * 10));
    return number === 10 ? "9" : number.toString();
}

function randomLetter(rand) {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f'];
    return !!letters[rand] ? letters[rand] : letters[10 - rand];
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 *  
 * Modern version of the Fisher–Yates shuffle algorithm.
 * 
 */
function randomColor(a) {
    let j, x, i;

    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));

        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }

    return '#' + a.join('');
}

function colorOptions() {
    for (let i = 0; i < 5; i++) {

        let button = document.createElement('button');

        const number = randomNumber();
        const letter = randomLetter(number);

        let color = '';

        if (i % 2 === 0) {
            color = randomColor([number, letter, number]);
        }
        else {
            color = randomColor([letter, number, letter]);
        }

        button.style.backgroundColor = color;
        button.setAttribute('content', 'color: ' + color);
        button.innerHTML = color;

        button.addEventListener('click', function () {
            chrome.storage.sync.set({ color: color }, function () {
                console.log('color is: ', color)
            });
        });

        page.appendChild(button);
    }
}

colorOptions();