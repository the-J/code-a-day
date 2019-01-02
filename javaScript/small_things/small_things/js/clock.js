if (document.readyState !== 'loading') {
    setCurrentTime();
} else {
    document.addEventListener('DOMContentLoaded', setCurrentTime);
}

function setCurrentTime() {

    const date = new Date();

    const seconds = date.getSeconds();    
    let minutes = date.getMinutes();
    let hours = date.getHours();

    let minutesDiff = 0;
    let hoursDiff = 0;

    if (seconds !== 0) {
        minutesDiff = Number((seconds / 10).toFixed(2));
    }

    if (minutes !== 0) {
        hoursDiff = Number((minutes / 60).toFixed(2))
    }
    
    const hands = [
        {
            id: document.getElementById('seconds'),
            angle: 6 * seconds
        },
        {
            id: document.getElementById('minutes'),
            angle: 6 * minutes + minutesDiff
        },
        {
            id: document.getElementById('hours'),
            angle: 30 * hours + 30 * hoursDiff
        }
    ]

    hands.forEach(function (hand, i) {
        hand.id.style.transform = 'rotate(' + hand.angle + 'deg)';
        hand.id.style.webkitTransform = 'rotate(' + hand.angle + 'deg)';
    })
}