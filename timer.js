class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        this.timeoutValue = 20;
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onPause = callbacks.onPause;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;

        }
        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }

    start = () => {
        if (!this.isStarted || this.isPaused) {
            this.tick();
            this.isStarted = true;
            this.timer = setInterval(this.tick, 20);
        }
        if (this.onStart) {
            this.onStart();
        }
        this.isPaused = false;
    }

    get timerDuration() {
        return parseFloat(this.durationInput.value);
    }

    set timerDuration(duration) {
        this.durationInput.value = duration.toFixed(2);
    }

    tick = () => {
        console.log('tik')
        if (this.timerDuration > 0) {
            this.timerDuration = this.timerDuration - 0.02;
            if (this.onTick) {
                this.onTick();
            }
            if (this.timerDuration === 0) {
                this.pause();
                if (this.onComplete) {
                    this.onComplete();
                }
            }
        }

    }

    pause = () => {
        if (!this.isPaused) {
            clearInterval(this.timer);
            this.isPaused = true;
        } else {
            this.isPaused = false;
            this.timer = setInterval(this.tick, 1000)
        }
        if (this.onPause) {
            this.onPause();
        }
    }
}