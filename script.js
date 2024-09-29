let currentTheme = 'apex';
let apexImages = ['apex1.png', 'apex2.png', 'apex3.png', 'apex4.png', 'apex5.png', 'apex6.png', 'apex7.png', 'apex8.png'];
let nbaImages = ['NBA1.png', 'NBA2.png', 'NBA3.png', 'NBA4.png', 'NBA5.png', 'NBA6.png', 'NBA7.png', 'NBA8.png'];
let backImage = 'apex9.png'; // APEX背面
let nbaBackImage = 'NBA9.png'; // NBA背面
let cards = [];
let countdownTimer;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCards() {
    const container = document.querySelector('.card-container');
    container.innerHTML = ''; // 清空現有卡片

    const images = currentTheme === 'apex' 
        ? [...apexImages, ...apexImages] 
        : [...nbaImages, ...nbaImages];

    const shuffledImages = shuffle(images);

    shuffledImages.forEach((image) => {
        const card = document.createElement('div');
        card.className = `card ${getSizeClass()}`;
        card.onclick = () => flipCard(card);

        const front = document.createElement('div');
        front.className = 'card-face front';
        front.innerHTML = `<img src="${image}" alt="正面">`;

        const back = document.createElement('div');
        back.className = 'card-face back';
        back.innerHTML = `<img src="${currentTheme === 'apex' ? backImage : nbaBackImage}" alt="背面">`;

        card.appendChild(front);
        card.appendChild(back);
        container.appendChild(card);
    });
}

function flipCard(card) {
    card.classList.toggle('flipped'); // 切換翻轉效果
}


function startGame() {
    createCards();
    countdownTimer = 10;
    document.getElementById('countdown').innerText = `倒數計時: ${countdownTimer}`;
    
    const countdownInterval = setInterval(() => {
        countdownTimer--;
        document.getElementById('countdown').innerText = `倒數計時: ${countdownTimer}`;
        if (countdownTimer <= 0) {
            clearInterval(countdownInterval);
            showFront();
        }
    }, 1000);
}

function showFront() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.add('flipped');
    });
}

function showBack() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('flipped');
    });
}

function changeCardSize() {
    const size = document.getElementById('size').value;
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('small', 'medium', 'large');
        card.classList.add(size);
    });
}

function changeCardTheme() {
    currentTheme = document.getElementById('theme').value;
    createCards();
}

function getSizeClass() {
    return document.getElementById('size').value;
}






