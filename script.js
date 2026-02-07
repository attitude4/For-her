const valentineData = [
    { date: 7, name: "Rose Day", msg: "You're my forever bloom! 🌹", sticker: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpueG5tZnd3bnBqZzZxeG94bnBqZzZxeG94bnBqZzZxeG94bnBqJmVwPXYxX3N0aWNrZXJzX3NlYXJjaCZjdD1z/26vUxS1rOdxY92T8Q/giphy.gif" },
    { date: 8, name: "Propose Day", msg: "Still choosing you, every single day. 💍", sticker: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3JueG5tZnd3bnBqZzZxeG94bnBqZzZxeG94bnBqZzZxeG94bnBqJmVwPXYxX3N0aWNrZXJzX3NlYXJjaCZjdD1z/MDJ9fSE54IXey2S/giphy.gif" },
    { date: 9, name: "Chocolate Day", msg: "Sweet as sugar, but way more addictive. 🍫", sticker: "" },
    { date: 10, name: "Teddy Day", msg: "Sending a virtual hug until I can give you a real one. 🧸", sticker: "" },
    { date: 11, name: "Promise Day", msg: "I promise to always keep you laughing. 🤝", sticker: "" },
    { date: 12, name: "Hug Day", msg: "The safest place in the world is in your arms. 🤗", sticker: "" },
    { date: 13, name: "Kiss Day", msg: "Counting down to our next real kiss. 💋", sticker: "" },
    { date: 14, name: "Valentine's Day", msg: "You are my whole heart. Will you be my Valentine?", sticker: "" }
];

const grid = document.getElementById('days-grid');
const today = new Date().getDate();

// Initialize Grid
valentineData.forEach(item => {
    const card = document.createElement('div');
    const isLocked = today < item.date;
    card.className = `day-card ${isLocked ? 'locked' : ''}`;
    card.innerHTML = `<h3>Feb ${item.date}</h3><p>${item.name}</p> ${isLocked ? '🔒' : '❤️'}`;
    
    card.onclick = () => {
        if (!isLocked) showModal(item);
        else alert("Nice try! Wait for the day! 😉");
    };
    grid.appendChild(card);
});

function showModal(item) {
    const modal = document.getElementById('modal');
    const textTarget = document.getElementById('typing-text');
    const extra = document.getElementById('extra-content');
    
    document.getElementById('day-title').innerText = item.name;
    modal.style.display = "block";
    extra.innerHTML = `<img src="${item.sticker}" style="width:100px; margin-top:10px;">`;
    
    // Typewriter effect
    let i = 0;
    textTarget.innerHTML = "";
    function type() {
        if (i < item.msg.length) {
            textTarget.innerHTML += item.msg.charAt(i);
            i++;
            setTimeout(type, 50);
        } else if (item.date === 14) {
            showProposal();
        }
    }
    type();
}

function showProposal() {
    document.getElementById('extra-content').innerHTML = `
        <div style="margin-top:20px;">
            <button id="yes-btn" onclick="celebrate()">YES!</button>
            <button id="no-btn" onmouseover="moveNo()">No</button>
        </div>
    `;
}

function moveNo() {
    const btn = document.getElementById('no-btn');
    btn.style.position = 'fixed';
    btn.style.left = Math.random() * 80 + 'vw';
    btn.style.top = Math.random() * 80 + 'vh';
}

function celebrate() {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    document.getElementById('modal-body').innerHTML = "<h1>YAY! ❤️ See you later tonight! 🌹</h1>";
}

function closeModal() {
    document.getElementById('modal').style.display = "none";
}

// Heart Rain
setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'heart-animation';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    heart.style.duration = Math.random() * 3 + 2 + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
}, 500);
