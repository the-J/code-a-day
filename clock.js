var date = new Date();

if (document.readyState !== 'loading') {
    readyState();
} else {
    document.addEventListener('DOMContentLoaded', readyState);
}

function readyState() {
    return console.log('document ready');
}