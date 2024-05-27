body {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #f9f9f9;
    padding: 20px;
let checkupTimers = [];
let prescriptionTimers = [];

function addTime(type) {
    const timeInput = document.getElementById(`${type}-time`);
    let currentTime = parseInt(timeInput.value) || 0;
    timeInput.value = currentTime + 10;
}

function setCheckupTimer() {
    const name = document.getElementById('checkup-name').value;
    const time = parseInt(document.getElementById('checkup-time').value);
    if (name && time > 0) {
        const currentTime = new Date();
        const targetTime = new Date(currentTime.getTime() + time * 60000);
        checkupTimers.push({ name, targetTime });
        updateTimers('checkup');
    }
}

function setPrescriptionTimer() {
    const name = document.getElementById('prescription-name').value;
    const time = parseInt(document.getElementById('prescription-time').value);
    if (name && time > 0) {
        const currentTime = new Date();
        const targetTime = new Date(currentTime.getTime() + time * 60000);
        prescriptionTimers.push({ name, targetTime });
        updateTimers('prescription');
    }
}

function updateTimers(type) {
    const currentTimers = type === 'checkup' ? checkupTimers : prescriptionTimers;
    const containerId = type === 'checkup' ? 'checkup-schedule' : 'prescription-schedule';
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    currentTimers.forEach((timer, index) => {
        const timerElement = document.createElement('div');
        timerElement.classList.add('timer');

        const timerText = document.createElement('div');
        timerText.textContent = `${timer.name}님의 ${type === 'checkup' ? '진료' : '조제'} 예정 시간: ${timer.targetTime.toLocaleString()}`;
        
        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        progressBar.id = `${type}-progress-${index}`;
        
        timerElement.appendChild(timerText);
        timerElement.appendChild(progressBar);
        container.appendChild(timerElement);

        startTimer(timer.targetTime, progressBar, timerElement, type, index);
    });
}

function startTimer(targetDate, progressBar, timerElement, type, index) {
    const updateTimer = () => {
        const now = new Date();
        const timeDifference = targetDate - now;

        if (timeDifference <= 0) {
            timerElement.remove();
            if (type === 'checkup') {
                checkupTimers.splice(index, 1);
            } else {
                prescriptionTimers.splice(index, 1);
            }
            return;
        }

        const totalSeconds = (targetDate - now) / 1000;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);

        progressBar.style.width = `${(totalSeconds / (totalSeconds + minutes * 60 + seconds)) * 100}%`;
        progressBar.textContent = `${minutes}분 ${seconds}초 남음`;
    };

    updateTimer();
    setInterval(updateTimer, 1000);
}

function applySettings() {
    const fontSize = document.getElementById('font-size').value;
    const fontColor = document.getElementById('font-color').value;
    const graphColor = document.getElementById('graph-color').value;

    document.body.style.fontSize = `${fontSize}px`;
    document.body.style.color = fontColor;

    document.querySelectorAll('.progress-bar').forEach(bar => {
        bar.style.backgroundColor = graphColor;
    });
}
