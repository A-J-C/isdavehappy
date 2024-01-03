let seasonButtons = [];
let moodButtons = [];
let isAuthorized = false;

function enableButtons(enable) {
    const questions = document.querySelectorAll('.button-group');
    questions.forEach(div => {
        enable ? div.classList.remove('restricted') : div.classList.add('restricted');
    });
    const buttons = document.querySelectorAll('.button-group button');
    buttons.forEach(button => {
        button.disabled = !enable;
    });
}

function checkPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const password = passwordInput.value;

    passwordInput.classList.remove('unauthorised');
    fetch('/check_password', {
        method: 'POST',
        body: JSON.stringify({ password: btoa(password) }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        if (data.authorized) {
            isAuthorized = true;
            document.getElementById('passwordSection').classList.add('hidden');
            enableButtons(true);
        } else {
            passwordInput.classList.add('unauthorised');
        }
    });
}

function clearState(buttons) {
    buttons.forEach(e => { e.classList.remove('selected'); });
}

function setState(element, buttons, endpoint) {
    clearState(buttons);
    element.classList.add('selected');
    const password = document.getElementById('passwordInput').value;

    fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({ [endpoint.split('_')[1]]: element.id, password: btoa(password) }),
        headers: { 'Content-Type': 'application/json' }
    });
}

function setSeason(element) {
    setState(element, seasonButtons, '/set_season');
}

function setMood(element) {
    setState(element, moodButtons, '/set_mood');
}

function handleEnterKey(event) {
    if (event.key === 'Enter') {
        checkPassword();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    enableButtons(false); 
    seasonButtons = [...document.getElementById("seasonButtons").getElementsByTagName("button")];
    moodButtons = [...document.getElementById("moodButtons").getElementsByTagName("button")];

    fetch('/get_states')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            clearState(seasonButtons);
            clearState(moodButtons);

            document.getElementById(data.season).classList.add('selected');
            document.getElementById(data.mood).classList.add('selected');
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

    document.getElementById('passwordInput').addEventListener('keypress', handleEnterKey);
});
