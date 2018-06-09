if (document.readyState !== 'loading') {
    setCurrentTime();
} else {
    document.addEventListener('DOMContentLoaded', setCurrentTime);
}

function setCurrentTime() {

    const date = new Date();

    console.log('setting time to: ', new Date());
    
    const time = [
        {
            base: 6,
            id: document.getElementById('seconds'),
            angle: date.getSeconds()
        },
        {
            base: 6,
            id: document.getElementById('minutes'),
            angle: date.getMinutes()
        },
        {
            base: 12,
            id: document.getElementById('hours'),
            angle: date.getHours()
        }
    ]

    time.forEach(function(t) {
        t.id.style.webkitTransform = 'rotate(' + t.base * t.angle + 'deg)';
    })
}