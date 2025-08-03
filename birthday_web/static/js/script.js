document.addEventListener('DOMContentLoaded', () => {
    const outputBox = document.getElementById('outputBox');

    const data = {
        jokes: [
            "Why don't scientists trust atoms? Because they make up everything!",
            "Remember when you told me ‘Never stop laughing’? Well, atoms listened, Dad!",
            "I told my dad to embrace his mistakes… He cried. Then he hugged me and my sister!",
            "Why did the birthday cake go to the doctor? Because it was feeling crumby!"
        ],
        riddles: [
            "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I? — An Echo",
            "What comes once in a minute, twice in a moment, but never in a thousand years? — The letter M"
        ],
        messages: [
            "Dad, you always said, ‘Never stop laughing’ — here’s to more laughter today! 🎂",
            "From Saturday-morning pancakes to late-night talks, every memory with you shines. Happy Birthday! ❤️",
            "You taught me to chase my dreams fearlessly. I hope today all YOUR dreams come true, Dad! 🌟",
            "Happy Birthday, Dad! Your wisdom, kindness, and laughter make every day brighter.",
            "To the man who taught me everything I know: may your day be filled with the joy you bring to others!"
        ],
        special: "Dad, beyond every joke and riddle lies my biggest truth: I am who I am because of you. Your love is my greatest gift."
    };

    const typeWriter = (text) => {
        outputBox.classList.add('typewriter');
        outputBox.textContent = '';
        let i = 0;
        const speed = 35;
        const typing = () => {
            if(i < text.length){
                outputBox.textContent += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            } else {
                outputBox.classList.remove('typewriter');
            }
        };
        typing();
    };

    document.getElementById('jokeBtn').addEventListener('click', () => {
        const joke = data.jokes[Math.floor(Math.random()*data.jokes.length)];
        typeWriter('😂 ' + joke);
    });

    document.getElementById('riddleBtn').addEventListener('click', () => {
        const riddle = data.riddles[Math.floor(Math.random()*data.riddles.length)];
        typeWriter('🧩 ' + riddle);
    });

    document.getElementById('messageBtn').addEventListener('click', () => {
        const msg = data.messages[Math.floor(Math.random()*data.messages.length)];
        typeWriter('💌 ' + msg);
    });

    const specialBtn = document.getElementById('specialBtn');
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('specialModal');
    const specialText = document.getElementById('specialText');
    const closeModal = document.getElementById('closeModal');
    // Voice note
    const voiceBtn = document.getElementById('voiceBtn');
    const voiceNote = document.getElementById('voiceNote');

    voiceBtn.addEventListener('click', ()=>{
        voiceNote.play();
    });
    specialBtn.addEventListener('click', () => {
        // Dim & show modal
        overlay.classList.remove('hidden');
        modal.classList.add('active');
        modal.classList.remove('hidden');
        document.body.style.overflow='hidden';
        // Typewriter inside modal
        specialText.textContent='';
        typeWriterModal(data.special, specialText);
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        overlay.classList.add('hidden');
        modal.classList.remove('active');
        document.body.style.overflow='auto';
    });

    // Reveal special button after delay (like opening gift)
    setTimeout(() => {
        specialBtn.classList.remove('hidden');
        specialBtn.style.animation = 'bounceIn 1s ease-out';
    }, 4000);

    // Typewriter for modal (slower)
    const typeWriterModal = (text, el) => {
        let i=0;
        const speed=40;
        (function typing(){
            if(i<text.length){
                el.textContent+=text.charAt(i);
                i++;
                setTimeout(typing,speed);
            }
        })();
    };

    // Simple photo carousel
    const carousel = document.getElementById('carousel');
    const carouselImg = document.getElementById('carouselImg');
    const photos = [
        'photo1.jpg','photo2.jpg','photo3.jpg'
    ];
    let photoIndex=0;
    const rotatePhotos=()=>{
        carouselImg.style.opacity=0;
        setTimeout(()=>{
            photoIndex=(photoIndex+1)%photos.length;
            carouselImg.src = '/static/images/' + photos[photoIndex];
            carouselImg.style.opacity=1;
        },400);
    };
    setInterval(rotatePhotos,4000);
    carousel.classList.remove('hidden');

    // Falling confetti 🎊
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    let confettiPieces = [];

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const createConfetti = () => {
        for(let i=0;i<150;i++){
            confettiPieces.push({
                x: Math.random()*canvas.width,
                y: Math.random()*canvas.height-
                   canvas.height,
                size: Math.random()*6+4,
                color: `hsl(${Math.random()*360},70%,60%)`,
                speed: Math.random()*3+2,
                angle: Math.random()*360
            });
        }
    };
    const drawConfetti = () => {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        confettiPieces.forEach(p=>{
            p.y += p.speed;
            p.angle += 2;
            if(p.y>canvas.height) p.y = -10;
            ctx.fillStyle = p.color;
            ctx.save();
            ctx.translate(p.x,p.y);
            ctx.rotate(p.angle*Math.PI/180);
            ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size);
            ctx.restore();
        });
        requestAnimationFrame(drawConfetti);
    };
    createConfetti();
    drawConfetti();

    // Floating balloons effect (existing)
    for (let i = 0; i < 8; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.left = Math.random() * 100 + 'vw';
        balloon.style.animationDuration = 6 + Math.random() * 4 + 's';
        balloon.style.backgroundColor = `hsl(${Math.random()*360}, 70%, 65%)`;
        document.body.appendChild(balloon);
    }

    const revealBtn = document.getElementById('revealBtn');
    const revealBox = document.getElementById('revealBox');

    revealBtn.addEventListener('click', () => {
        revealBox.classList.toggle('active');
        if (revealBox.classList.contains('active')) {
            revealBox.textContent = '🎉 Surprise! You are amazing and loved beyond words. Happy Birthday! 🎉';
        } else {
            revealBox.textContent = '';
        }
    });


});
