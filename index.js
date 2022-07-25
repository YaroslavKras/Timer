const duration = document.querySelector('#duration');
const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const circle = document.querySelector('#circle');
const perimeter = calculatePerimeter();
circle.setAttribute('stroke-dasharray', perimeter);

let tickSize;
duration.addEventListener('blur', ()=>{
    tickSize = calculateTickSize(duration.value);
});
const timer = new Timer(duration, startBtn, pauseBtn, {
    onStart() {
        console.log("started");
    },
    onPause() {
        console.log("paused");
    },
    onTick() {
        circle.setAttribute('stroke-dashoffset', circle.getAttribute('stroke-dashoffset') - tickSize);
        console.log(circle.getAttribute('stroke-dashoffset'))
    },
    onComplete() {
        console.log("completed")
    }
});

function calculateTickSize(timerLength){
    return perimeter/timerLength * 0.02;
}

function calculatePerimeter(){
    return 2 * Math.PI * circle.getAttribute('r');
}


