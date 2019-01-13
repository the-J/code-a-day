/**
 * Created by Juliusz Jakubowski<the-j> @ 11/01/2019
 */

/**
 * QUICK KEYS
 * Letters will be moving from top to down. 
 * If letter is selected on the keyoard it should disapear.
 * You know the rulse...
 * 
 * Yeah, I don't care and bowse window should be at least 1000px
 */
const gameBoard = document.querySelector("#game-board");
// list of characters -> need to be automated
const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u'];
// list of horizontal positions of current characters on board
const takenPositions = [];

// set hoizontal position of a character
function setPosition() {

   // sight correction of position to match parent width
   const newPosition = Math.floor(1 + Math.random() * 99);

   // check if position is taken
   // "[...]No matter who you are, I'm gonna find you[...]"
   const taken = takenPositions.find(position => position === newPosition);

   // re-search if position if taken
   if (taken) return setPosition();
   else {
      // update list of taken positions and return new position
      takenPositions.push(newPosition);
      return newPosition;
   }
}

// create characters
for (let i = 0; i < 20; i++) {
   // create new HTML element for character
   const letter = document.createElement('div');

   // assign new id
   letter.setAttribute("id", `letter-${i}`);

   // position element
   letter.style.position = 'absolute';
   letter.style.top = '0%';
   letter.style.fontSize = '0.6em'
   letter.style.left = setPosition() + '%';

   // todo -> randomize new elements more
   letter.innerHTML = characters[i];

   // update gameBoard
   gameBoard.appendChild(letter);

   // moveDown.call(letter);
   letter.classList.add('move-down');
}
