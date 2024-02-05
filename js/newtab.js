document.addEventListener('DOMContentLoaded', () => {
    let imageUrl = 'https://source.unsplash.com/random/1920x1080/?pastel';
    document.getElementById('wallpaperImage').src = imageUrl;
});

document.addEventListener('DOMContentLoaded', () => {
    function time() {
        const now = new Date();
        let hours = now.getHours().toString().padStart(2, '0');
        let mins = now.getMinutes().toString().padStart(2, '0');
        let secs = now.getSeconds().toString().padStart(2, '0');
        let timeDisplay = hours + ' : ' + mins;

        if (document.getElementById('time').matches(':hover')) {
            timeDisplay = timeDisplay + ' : ' + secs;
        }

        document.getElementById('time').textContent = timeDisplay;
    }

    setInterval(time, 1000);
    time(); 
});

document.addEventListener('DOMContentLoaded', () => {
    let editableName = document.getElementById("name");

    editableName.addEventListener("click", () => {
        let range = document.createRange();
        let selection = window.getSelection();
        range.selectNodeContents(editableName);
        selection.removeAllRanges();
        selection.addRange(range);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            displayQuote(data);
        })
        .catch((error) => {
            console.log(error);
        });
});

function displayQuote(data) {
    const quoteText = document.getElementById('quoteText');
    quoteText.textContent = `"${data.content}"`;
}

document.addEventListener('DOMContentLoaded', () => {
    let isRunning = false;
    let isFocusTime = true; 
    let focusDuration = 25 * 60;
    let breakDuration = 5 * 60;
    let currentDuration = focusDuration; 
    let timerId;

    const timeComponents = {
        timeDisplay: document.getElementById('timeDisplay'),
        startBtn: document.getElementById('startBtn'),
        pauseBtn: document.getElementById('pauseBtn'),
        resetBtn: document.getElementById('resetBtn'),
        focusInput: document.getElementById('focusDuration'),
        breakInput: document.getElementById('breakDuration'),
        modeDisplay: document.getElementById('mode')
    };

    timeComponents.startBtn.addEventListener('click', () => {
        if (!isRunning) {
            updateDurations(); 
            startTimer();
        }
    });

    timeComponents.pauseBtn.addEventListener('click', () => {
        clearInterval(timerId);
        isRunning = false;
    });
    timeComponents.resetBtn.addEventListener('click', () => {
        clearInterval(timerId);
        isRunning = false;
        isFocusTime = true; 
        updateDurations(); 
        setupNextInterval(); 
    });

    function startTimer() {
        isRunning = true;
        timerId = setInterval(() => {
            currentDuration--;
            updateDisplay(currentDuration);
            if (currentDuration <= 0) {
                clearInterval(timerId);
                isFocusTime = !isFocusTime; 
                setupNextInterval();
            }
        }, 1000);
    }

    function updateDurations() {
        focusDuration = parseInt(timeComponents.focusInput.value);
        focusDuration = focusDuration * 60;
        breakDuration = parseInt(timeComponents.breakInput.value);
        breakDuration = breakDuration * 60;
    }

    function setupNextInterval() {
        if(isFocusTime) {
            currentDuration = focusDuration;
            timeComponents.modeDisplay.textContent = "Focus";
        } else {
            currentDuration = breakDuration;
            timeComponents.modeDisplay.textContent = "Break";
        }

        updateDisplay(currentDuration);
        if (isRunning) {
            startTimer();
        }
    }

    function updateDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        if (remainingSeconds < 10) {
            timeDisplay.textContent = `${minutes}:0${remainingSeconds}`;
        } else {
            timeDisplay.textContent = `${minutes}:${remainingSeconds}`;
        }        
    }

    updateDisplay(focusDuration);
});
