// Floating Hearts Generator
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart-animation';
    heart.innerHTML = ['❤️', '💖', '💗', '💕'][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + 'vw';
    
    // Randomize size and speed
    const size = Math.random() * 20 + 15 + 'px';
    const duration = Math.random() * 3 + 4 + 's';
    
    heart.style.fontSize = size;
    heart.style.animationDuration = duration;
    
    document.body.appendChild(heart);
    
    // Remove heart after it floats away
    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// Start floating hearts immediately
setInterval(createHeart, 400);

// Setup the Days (Updated for immediate Rose Day access)
const valentineData = [
    { date: 7, name: "Rose Day", msg: "You're my forever bloom! 🌹", sticker: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpueG5tZnd3bnBqZzZxeG94bnBqZzZxeG94bnBqZzZxeG94bnBqJmVwPXYxX3N0aWNrZXJzX3NlYXJjaCZjdD1z/26vUxS1rOdxY92T8Q/giphy.gif" },
    { date: 8, name: "Propose Day", msg: "Still choosing you, every single day. 💍", sticker: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHVpazZ0ZzR3bmZ3bnBqZzZxeG94bnBqZzZxeG94bnBqJmVwPXYxX3N0aWNrZXJzX2dpZl9zZWFyY2gmY3Q9cw/MDJ9fSE54IXey2S/giphy.gif" },
    { date: 9, name: "Chocolate Day", msg: "Sweet as sugar, but way more addictive. 🍫", sticker: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnpxbmZ3bnBqZzZxeG94bnBqZzZxeG94bnBqJmVwPXYxX3N0aWNrZXJzX3NlYXJjaCZjdD1z/3o7TKVUn7iM8FMEU24/giphy.gif" },
    { date: 10, name: "Teddy Day", msg: "A virtual hug until I can give you a real one. 🧸", sticker: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnpxbmZ3bnBqZzZxeG94bnBqZzZxeG94bnBqJmVwPXYxX3N0aWNrZXJzX3NlYXJjaCZjdD1z/L95W4MsvRKXpC/giphy.gif" },
    { date: 11, name: "Promise Day", msg: "I promise to always keep you laughing. 🤝", sticker: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnpxbmZ3bnBqZzZxeG94bnBqZzZxeG94bnBqJmVwPXYxX3N0aWNrZXJzX3NlYXJjaCZjdD1z/3o7TKVUn7iM8FMEU24/giphy.gif" },
    { date: 12, name: "Hug Day", msg: "The safest place is in your arms. 🤗", sticker: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnpxbmZ3bnBqZzZxeG94bnBqZzZxeG94bnBqJmVwPXYxX3N0aWNrZXJzX3NlYXJjaCZjdD1z/3o7TKVUn7iM8FMEU24/giphy.gif" },
    { date: 13, name: "Kiss Day", msg: "Counting down to our next real kiss. 💋", sticker: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnpxbmZ3bnBqZzZxeG94bnBqZzZxeG94bnBqJmVwPXYxX3N0aWNrZXJzX3NlYXJjaCZjdD1z/3o7TKVUn7iM8FMEU24/giphy.gif" },
    { date: 14, name: "Valentine's Day", msg: "You are my whole heart. Will you be my Valentine?", sticker: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnpxbmZ3bnBqZzZxeG94bnBqZzZxeG94bnBqJmVwPXYxX3N0aWNrZXJzX3NlYXJjaCZjdD1z/3o7TKVUn7iM8FMEU24/giphy.gif" }
];

const grid = document.getElementById('days-grid');
const now = new Date();
const todayDate = now.getDate();
const currentMonth = now.getMonth(); // 1 = Feb

valentineData.forEach(item => {
    const card = document.createElement('div');
    // Lock logic: If month is Feb and date is < item.date
    const isLocked = (currentMonth === 1 && todayDate < item.date) || currentMonth < 1;
    
    card.className = `day-card ${isLocked ? 'locked' : ''}`;
    card.innerHTML = `<h3>Feb ${item.date}</h3><p>${item.name}</p> ${isLocked ? '🔒' : '❤️'}`;
    
    card.onclick = () => {
        if (!isLocked) showModal(item);
        else alert("Chill! This surprise opens on Feb " + item.date + "! 🕒");
    };
    grid.appendChild(card);
});

function showModal(item) {
    const modal = document.getElementById('modal');
    const textTarget = document.getElementById('typing-text');
    const extra = document.getElementById('extra-content');
    
    document.getElementById('day-title').innerText = item.name;
    modal.style.display = "block";
    extra.innerHTML = `<img src="${item.sticker}" style="width:150px; margin-top:15px; border-radius:10px;">`;
    
    let i = 0;
    textTarget.innerHTML = "";
    function type() {
        if (i < item.msg.length) {
            textTarget.innerHTML += item.msg.charAt(i);
            i++;
            setTimeout(type, 60);
        } else if (item.date === 14) {
            showProposal();
        }
    }
    type();
}

function showProposal() {
    document.getElementById('extra-content').innerHTML += `
        <div style="margin-top:20px;">
            <button id="yes-btn" onclick="celebrate()" style="background:#ff4d6d; color:white; border:none; padding:10px 25px; border-radius:20px; cursor:pointer;">YES!</button>
            <button id="no-btn" onmouseover="moveNo()" style="margin-left:10px;">No</button>
        </div>
    `;
}

function moveNo() {
    const btn = document.getElementById('no-btn');
    btn.style.position = 'fixed';
    btn.style.left = Math.random() * 70 + 10 + 'vw';
    btn.style.top = Math.random() * 70 + 10 + 'vh';
}

function celebrate() {
    // Fireworks effect
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ffb3c1', '#ffffff']
    });
    document.getElementById('modal-body').innerHTML = "<h1>YAY! ❤️<br>I love you so much!</h1><p>Check your door for a real surprise soon... 😉</p>";
}

function closeModal() {
    document.getElementById('modal').style.display = "none";
}
