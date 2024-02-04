document.addEventListener('DOMContentLoaded', () => {
    var imgUrl = 'https://source.unsplash.com/random/1920x1080/?pastel';
    document.getElementById('wallpaperImage').src = imgUrl;
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
        let sel = window.getSelection();
        range.selectNodeContents(editableName);
        sel.removeAllRanges();
        sel.addRange(range);
    });

    let isFirstClick = true;
    editableName.addEventListener("click", () => {
        if (isFirstClick) {
            editableName.textContent = '';
            isFirstClick = false;
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    fetchRandomQuote();
});

function fetchRandomQuote() {
    fetch('https://api.quotable.io/random')
        .then(response => response.json())
        .then(data => {
            displayQuote(data);
        })
        .catch(error => console.error('Error fetching quote:', error));
}

function displayQuote(data) {
    const quoteText = document.getElementById('quoteText');
    quoteText.textContent = `"${data.content}"`;
}

document.addEventListener('DOMContentLoaded', function() {
    let isRunning = false;
    let isFocusTime = true; 
    let focusDuration = 25 * 60;
    let breakDuration = 5 * 60;
    let currentDuration = focusDuration; 
    let timerId;

    const timeDisplay = document.getElementById('timeDisplay');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const focusInput = document.getElementById('focusDuration');
    const breakInput = document.getElementById('breakDuration');
    const modeDisplay = document.getElementById('mode');

    startBtn.addEventListener('click', function() {
        if (!isRunning) {
            updateDurations(); 
            startTimer();
        }
    });

    pauseBtn.addEventListener('click', pauseTimer);

    resetBtn.addEventListener('click', resetTimer);

    function startTimer() {
        isRunning = true;
        timerId = setInterval(function() {
            currentDuration--;
            updateDisplay(currentDuration);
            if (currentDuration <= 0) {
                clearInterval(timerId);
                isFocusTime = !isFocusTime; 
                setupNextInterval();
            }
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(timerId);
        isRunning = false;
    }

    function resetTimer() {
        clearInterval(timerId);
        isRunning = false;
        isFocusTime = true; 
        updateDurations(); 
        setupNextInterval(); 
    }

    function updateDurations() {
        focusDuration = parseInt(focusInput.value) * 60;
        breakDuration = parseInt(breakInput.value) * 60;
    }

    function setupNextInterval() {
        currentDuration = isFocusTime ? focusDuration : breakDuration;
        modeDisplay.textContent = isFocusTime ? "Focus" : "Break";
        updateDisplay(currentDuration);
        if (isRunning) {
            startTimer();
        }
    }

    function updateDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timeDisplay.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    updateDisplay(focusDuration);
});
