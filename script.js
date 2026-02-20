const GAMES = [
    {
        id: 'snake',
        title: 'Retro Snake',
        description: 'The classic snake game. Eat the pixels, grow longer, don\'t hit the walls!',
        thumbnail: 'https://picsum.photos/seed/snake/400/300',
        category: 'Arcade'
    },
    {
        id: 'breakout',
        title: 'Brick Breaker',
        description: 'Destroy all the bricks with your paddle and ball. Classic arcade fun.',
        thumbnail: 'https://picsum.photos/seed/breakout/400/300',
        category: 'Arcade'
    },
    {
        id: 'clicker',
        title: 'Pixel Clicker',
        description: 'Click the pixel to earn points. How fast can you click?',
        thumbnail: 'https://picsum.photos/seed/clicker/400/300',
        category: 'Action'
    }
];

let currentGameId = null;
let gameInterval = null;

// UI Elements
const homeView = document.getElementById('homeView');
const gameView = document.getElementById('gameView');
const canvasContainer = document.getElementById('canvasContainer');

function init() {
    renderGames(GAMES);
}

function renderGames(gamesList) {
    homeView.innerHTML = gamesList.map(game => `
        <div class="game-card brutal-border" onclick="loadGame('${game.id}')">
            <div class="card-thumb">
                <div class="badge">${game.category}</div>
                <img src="${game.thumbnail}" alt="${game.title}">
            </div>
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            <button class="brutal-btn">
                <i data-lucide="play"></i> PLAY NOW
            </button>
        </div>
    `).join('');
    lucide.createIcons();
}

function filterGames() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = GAMES.filter(g => 
        g.title.toLowerCase().includes(query) || 
        g.category.toLowerCase().includes(query)
    );
    renderGames(filtered);
}

function showHome() {
    stopCurrentGame();
    homeView.classList.remove('hidden');
    gameView.classList.add('hidden');
}

function loadGame(id) {
    const game = GAMES.find(g => g.id === id);
    if (!game) return;

    currentGameId = id;
    homeView.classList.add('hidden');
    gameView.classList.remove('hidden');

    document.getElementById('gameTitle').innerText = game.title;
    document.getElementById('gameCategory').innerText = game.category;
    document.getElementById('gameDescription').innerText = game.description;

    startSelectedGame(id);
}

function stopCurrentGame() {
    if (gameInterval) clearInterval(gameInterval);
    canvasContainer.innerHTML = '';
}

function startSelectedGame(id) {
    stopCurrentGame();
    
    if (id === 'snake') startSnake();
    else if (id === 'breakout') startBreakout();
    else if (id === 'clicker') startClicker();
}

// --- SNAKE GAME ---
function startSnake() {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    canvas.className = 'brutal-border';
    canvasContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let snake = [{x: 10, y: 10}];
    let food = {x: 15, y: 10};
    let dx = 1, dy = 0;
    let score = 0;

    const handleKey = (e) => {
        if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -1; }
        if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = 1; }
        if (e.key === 'ArrowLeft' && dx === 0) { dx = -1; dy = 0; }
        if (e.key === 'ArrowRight' && dx === 0) { dx = 1; dy = 0; }
    };
    window.addEventListener('keydown', handleKey);

    gameInterval = setInterval(() => {
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || 
            snake.some(s => s.x === head.x && s.y === head.y)) {
            alert('GAME OVER! Score: ' + score);
            startSnake();
            return;
        }

        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            food = {x: Math.floor(Math.random()*20), y: Math.floor(Math.random()*20)};
        } else {
            snake.pop();
        }

        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,400,400);
        ctx.fillStyle = 'black';
        snake.forEach(s => ctx.fillRect(s.x*20, s.y*20, 18, 18));
        ctx.fillStyle = '#00FF00';
        ctx.fillRect(food.x*20, food.y*20, 18, 18);
    }, 150);
}

// --- BREAKOUT GAME ---
function startBreakout() {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    canvas.className = 'brutal-border';
    canvasContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let x = 200, y = 350, dx = 2, dy = -2;
    let paddleX = 160, paddleW = 80;
    let bricks = [];
    for(let i=0; i<5; i++) {
        bricks[i] = [];
        for(let j=0; j<3; j++) bricks[i][j] = {x:0, y:0, status:1};
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && paddleX > 0) paddleX -= 20;
        if (e.key === 'ArrowRight' && paddleX < 320) paddleX += 20;
    });

    function draw() {
        ctx.clearRect(0,0,400,400);
        // Ball
        ctx.beginPath(); ctx.arc(x,y,10,0,Math.PI*2); ctx.fillStyle='black'; ctx.fill(); ctx.closePath();
        // Paddle
        ctx.fillStyle='#00FF00'; ctx.fillRect(paddleX, 390, paddleW, 10);
        // Bricks
        bricks.forEach((col, i) => col.forEach((b, j) => {
            if(b.status) {
                let bx = i*80+5, by = j*30+30;
                b.x = bx; b.y = by;
                ctx.fillStyle='black'; ctx.fillRect(bx, by, 70, 20);
                if(x > bx && x < bx+70 && y > by && y < by+20) { dy = -dy; b.status=0; }
            }
        }));

        if(x + dx > 390 || x + dx < 10) dx = -dx;
        if(y + dy < 10) dy = -dy;
        else if(y + dy > 380) {
            if(x > paddleX && x < paddleX + paddleW) dy = -dy;
            else { alert('GAME OVER'); startBreakout(); return; }
        }
        x += dx; y += dy;
        gameInterval = requestAnimationFrame(draw);
    }
    draw();
}

// --- CLICKER GAME ---
function startClicker() {
    canvasContainer.innerHTML = `
        <div style="text-align:center; font-family:'Anton',sans-serif">
            <h2 id="clickScore" style="font-size:4rem">0</h2>
            <button id="clickBtn" class="brutal-btn" style="width:200px; height:200px; border-radius:50%">CLICK!</button>
            <p style="margin-top:1rem">CLICK AS FAST AS YOU CAN!</p>
        </div>
    `;
    let score = 0;
    document.getElementById('clickBtn').onclick = () => {
        score++;
        document.getElementById('clickScore').innerText = score;
    };
}

init();
