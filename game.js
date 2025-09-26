// RageJump - The Most Infuriating Game Ever Made
class RageJump {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.gameStarted = true;
        this.gameRunning = true;
        this.showTutorialPopup = true;
        
        // Player properties
        this.player = {
            x: 400, // Center of screen
            y: 430, // On the starting platform
            width: 20,
            height: 20,
            velocityY: 0,
            velocityX: 0,
            isGrounded: true,
            color: '#ff6b6b'
        };
        
        // Game physics (designed to be slippery and annoying but still possible)
        this.gravity = 0.8;
        this.jumpPower = -15;
        this.friction = 0.88; // Less slippery for better control
        this.airResistance = 0.99; // Less air resistance
        
        // Camera
        this.camera = { y: 0 };
        
        // Game state
        this.height = 0;
        this.deaths = 0;
        this.platforms = [];
        this.particles = [];
        
        // Save system (for maximum psychological damage)
        this.bestHeight = this.loadBestHeight();
        this.totalDeaths = this.loadTotalDeaths();
        this.sessionStartTime = Date.now();
        this.totalPlayTime = this.loadTotalPlayTime();
        
        // Frame rate limiting for consistent timing
        this.targetFPS = 60;
        this.frameInterval = 1000 / this.targetFPS;
        this.lastFrameTime = 0;
        
        // Secret evil nudge mechanic (every 20 seconds)
        this.nudgeTimer = 0;
        this.nudgeInterval = 20 * 60; // 20 seconds at 60fps
        
        // Rage mechanics
        this.mockingMessages = [
            "Seriously? Already?",
            "You alone are the reason shampoo has instructions",
            "You slow?",
            "Keep practicing, champ 🥇",
            "This aint it",
            "I hate you",
            "I have a personal issue with you, specifically",
            "You genuinely suck.",
            "Baby’s first videogame? 🍼",
            "Cute attempt",
            "Blink if you're slow!",
            "nice one",
            "Not even close.",
            "Keyboard unplug?",
            "No Hoes.",
            "Lmao.",
            "You are the reason tinder added swiping left",
            "My pet rock gets more game than you",
            "Smooth brain",
            "I am currently failing one of my classes but im not going to say which one.",
            "Your playstyle should be a warcrime",
            "You miss 100% of the backshots you don't make - Peter Griffin - Michael Angelo - Bruce Wayne - Chuck Norris - LeBron James - Jamal - That one dude",
            "My grandmother could do better",
            "Failure, you are. Yes. - Yoda",
            "Maybe gaming isn't for you",
            "Ragebait",
            "L",
            "More projects at Callenflynn.vercel.app",
            "More projects at github.com/Callenflynn",
            "Why even try?",
            "Did you do that on purpose?",
            "Son, we have to talk... Mom and I are getting a divorce",
            "BOOOOOZOOOOOOOOOOO",
            "You bring shame to your family",
            "I would explain what you did wrong, but I don't speak Dumbass",
            "FAILIURE",
            "EMOTIONAL DAMAGE",
            "Have you tried turning it off forever?",
            "That was... impressive. In the worst way.",
            "I've seen potatoes with better reflexes",
            "Perhaps try a different hobby?",
            "Ouch. That was painful to watch.",
            "Did you do that on purpose?",
            "Even the tutorial was too hard, huh?",
            "Maybe try easy mode... oh wait, there isn't one",
            "Fatass.",
            "PEAK ragebait",
            "Is getting good on the agenda?",
            "I am genuinly impressed... at how ASS you are.",
            "get a job bro  🥀 ",
            "💔",
            "This has gotta be on purpose bro",
            "DAMNNNNNNNNNNNNNNNNNNNNN",
            "Are we still on for sushi later?",
            "PEAK ragebait",
            "Just... Don't...",
            "🎶Tell me why ain't nothin but a miiiistakeee🎶🎶🎶",
            "you can't do it.",
            "Dog Water",
            "Ts mf is NOT locked in rn",
            "Average Tiktok filter user",
            "It is ONE BUTTON. Not rocket science",
            "Please give up. Please give up. Please give up. Please give up. Please give up. Please give up. ",
            "You are insulting my game with your 'skill'",
            "Just stop",
            "Nobody wants you here",
            "Jojosiwa drunk at disneyland",
            "You got games on yo phone?",
            "67",
            "1738",
            "Do I need to make a tutorial for a one button game?",
            "You had one job...",
            "Seriously?",
            "Dogshi",
            "No shot 😭😭😭",
            "ts",
            "Bro 💔💔",
            ":(",
            "...",
            "bad",
            "Good Boyyyyy",
            "...",
            "I like to see the world burn",
            "Nike: Don't Do it",
            " Dih 🥀 ",
            "I'm not angry, just disappointed",
            "Your future is as bright as your gaming skills",
            `You fell from ${this.height}m. Your best is ${this.bestHeight}m.`,
            "Even the tutorial was too hard, huh?",
            "Maybe try easy mode... oh wait, there isn't one",
            "That was a bold move.",
            "Your future is as bright as your gaming skills, Dim.",
            `You fell from ${this.height}m. Your best is ${this.bestHeight}m.`,
            `${this.totalDeaths} total deaths. Still trying?`,
            `You've wasted ${this.formatPlayTime()} on this game`,
            "Remember when you were at your best height? Good times.",
            `Only ${this.bestHeight - this.height}m away from your record when you died`
        ];
        
        this.goldenMockingMessage = "LOOOOOOOOL YOU SUCK";
        
        this.inputBuffer = [];
        this.inputDelay = 100; 
        
        this.generateInitialPlatforms();
        this.bindEvents();
        
        this.gameStarted = true;
        this.gameRunning = true;
        
        this.tutorialImage = new Image();
        this.tutorialImage.src = 'assets/press-space.png';
        
        this.tutorialAnimation = 0;
        
        this.momentumMeter = {
            value: 0, 
            speed: 0.02, 
            direction: 1, // 1 or -1, direction of oscillation
            paused: false, // Whether the meter is paused
            pauseTimer: 0, // Time remaining in pause
            pauseDuration: 42 // 0.7 seconds at 60fps
        };
        
        this.consecutiveFakePlatforms = 0;
        
        // Achievements system
        this.achievements = {
            goldenMessage: {
                id: 'goldenMessage',
                name: 'Golden Message',
                description: '0.5% chance of seeing this message!',
                icon: '✨',
                unlocked: this.loadAchievement('goldenMessage')
            },
            getTrolled: {
                id: 'getTrolled',
                name: 'Get Trolled',
                description: 'Bozo',
                icon: 'trollflip.jpg',
                unlocked: this.loadAchievement('getTrolled')
            },
            lol: {
                id: 'lol',
                name: 'LOL',
                description: 'Get laughed at',
                icon: '😂',
                unlocked: this.loadAchievement('lol')
            }
        };
        
        // Track if "don't fall now" message has been shown this round
        this.shownDontFallMessage = false;
        
        // Track last highest position for instant death on big falls
        this.lastHighPosition = 0;
        
        // Start the game loop
        this.gameLoop();
        
        // Initialize achievements sidebar
        this.updateAchievementsSidebar();
    }
    
    bindEvents() {
        // Display saved stats on startup
        this.displaySavedStats();
        
        // Jump controls (ONE BUTTON ONLY - with evil input delay)
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.scheduleJump();
                // Hide tutorial popup after first jump attempt
                if (this.showTutorialPopup) {
                    this.showTutorialPopup = false;
                }
            }
        });
        
        this.canvas.addEventListener('click', () => {
            this.scheduleJump();
            // Hide tutorial popup after first click
            if (this.showTutorialPopup) {
                this.showTutorialPopup = false;
            }
        });
        
        // Process delayed inputs
        setInterval(() => {
            if (this.inputBuffer.length > 0) {
                const action = this.inputBuffer.shift();
                if (action === 'jump') {
                    this.jump();
                }
            }
        }, this.inputDelay);
    }
    
    scheduleJump() {
        if (this.gameRunning) {
            this.inputBuffer.push('jump');
        }
    }
    
    startGame() {
        document.getElementById('instructions').classList.add('hidden');
        this.gameStarted = true;
        this.gameRunning = true;
        this.resetPlayer();
    }
    
    resetPlayer() {
        this.player.x = 400;
        this.player.y = 430; // On the starting platform
        this.player.velocityY = 0;
        this.player.velocityX = 0;
        this.player.isGrounded = true;
        this.camera.y = 0;
        this.height = 0;
        this.consecutiveFakePlatforms = 0; // Reset fake platform counter
        this.shownDontFallMessage = false; // Reset "don't fall now" message flag for new round
        this.nudgeTimer = 0; // Reset evil nudge timer for new attempt
        this.lastHighPosition = 0; // Reset big fall death tracker
        
        this.updateUI();
    }
    
    jump() {
        if (this.player.isGrounded) {
            this.player.velocityY = this.jumpPower;
            this.player.isGrounded = false;
            this.playSound('jumpSound');
            
            // Use momentum meter value for horizontal momentum
            const momentumStrength = 3; // Max horizontal velocity from momentum
            this.player.velocityX += this.momentumMeter.value * momentumStrength;
            
            // Pause the momentum meter for 0.7 seconds and reverse direction
            this.momentumMeter.paused = true;
            this.momentumMeter.pauseTimer = this.momentumMeter.pauseDuration;
            this.momentumMeter.direction *= -1; // Reverse the oscillation direction
        }
    }
    
    generateInitialPlatforms() {
        // Create a starting platform
        this.platforms.push({
            x: 350,
            y: 450,
            width: 100,
            height: 15,
            type: 'normal',
            color: '#228B22',
            active: true,
            timer: 0,
            originalX: 350,
            respawnTimer: 0,
            respawnDelay: 0,
            flashTimer: 0,
            isFlashing: false
        });
        
        // Generate platforms going up infinitely
        for (let y = 370; y > -10000; y -= 80 + Math.random() * 40) {
            this.createPlatform(y);
        }
    }
    
    createPlatform(y) {
        // Determine platform type with fake platform limiting
        const platformTypes = ['normal', 'crumbling', 'moving'];
        let type;
        
        // Only allow fake platforms if we haven't had 2 in a row
        if (this.consecutiveFakePlatforms < 2) {
            platformTypes.push('fake');
        }
        
        type = platformTypes[Math.floor(Math.random() * platformTypes.length)];
        
        // Update consecutive fake platform counter
        if (type === 'fake') {
            this.consecutiveFakePlatforms++;
        } else {
            this.consecutiveFakePlatforms = 0; // Reset counter
        }
        
        // Make platforms large enough for vertical-only gameplay
        const minWidth = 80; // Larger platforms for one-button gameplay
        const maxWidth = Math.max(minWidth, 140 - Math.abs(y) / 300); // Shrinks very slowly
        const width = minWidth + Math.random() * (maxWidth - minWidth);
        
        // For one-button gameplay, platforms should overlap vertically more
        const recentPlatforms = this.platforms.slice(-2).filter(p => p.active);
        let x;
        
        if (recentPlatforms.length > 0) {
            const lastPlatform = recentPlatforms[recentPlatforms.length - 1];
            const lastCenter = lastPlatform.x + lastPlatform.width / 2;
            
            // Ensure significant overlap for vertical jumping
            const overlapAmount = Math.min(width, lastPlatform.width) * 0.4; // At least 40% overlap
            const maxOffset = Math.max(30, (width + lastPlatform.width) / 2 - overlapAmount);
            
            // Position with controlled horizontal offset
            const offset = (Math.random() - 0.5) * maxOffset;
            x = lastCenter - width / 2 + offset;
            
            // Keep within screen bounds
            x = Math.max(0, Math.min(this.canvas.width - width, x));
        } else {
            // First platforms - center them
            x = (this.canvas.width - width) / 2;
        }
        
        const platform = {
            x: x,
            y: y,
            width: width,
            height: 15,
            type: type,
            active: true,
            timer: 0,
            originalX: x,
            respawnTimer: 0,
            respawnDelay: 0,
            flashTimer: 0, // For warning flash effect
            isFlashing: false
        };
        
        // Special properties for different platform types
        if (type === 'fake') {
            platform.color = '#8B4513'; // Looks like normal platform but isn't
        } else if (type === 'crumbling') {
            platform.color = '#A0522D';
            platform.crumbleTime = 150; // More time for one-button gameplay
        } else if (type === 'moving') {
            platform.color = '#4682B4';
            platform.direction = Math.random() > 0.5 ? 1 : -1;
            platform.speed = 0.4 + Math.random() * 0.4; // Faster moving platforms
        } else {
            platform.color = '#228B22'; // Normal platform
        }
        
        this.platforms.push(platform);
    }
    
    update() {
        if (this.showTutorialPopup) {
            // Animate the tutorial popup
            this.tutorialAnimation += 0.05;
        }
        
        // Update momentum meter
        this.updateMomentumMeter();
        
        if (!this.gameRunning) return;
        
        // Apply gravity
        this.player.velocityY += this.gravity;
        
        // Apply air resistance (makes control harder but not impossible)
        this.player.velocityX *= this.airResistance;
        
        // Update player position
        this.player.x += this.player.velocityX;
        this.player.y += this.player.velocityY;
        
        // Secret evil nudge mechanic - randomly scoot left every 20 seconds
        this.nudgeTimer++;
        if (this.nudgeTimer >= this.nudgeInterval) {
            // Random nudge between 2-8 pixels to the left
            const nudgeAmount = -(2 + Math.random() * 6);
            this.player.x += nudgeAmount;
            this.nudgeTimer = 0; // Reset timer
        }
        
        // Keep player on screen horizontally - death if they go off screen
        if (this.player.x < -this.player.width || this.player.x > this.canvas.width) {
            this.playerDied();
            return; // Exit early to prevent further processing
        }
        
        // Check platform collisions
        this.checkPlatformCollisions();
        
        // Update camera (follow player up, but not down - extra evil)
        if (this.player.y < this.camera.y + 200) {
            this.camera.y = this.player.y - 200;
        }
        
        // Update height (for bragging rights before you lose it all)
        const currentHeight = Math.max(0, Math.floor((430 - this.player.y) / 10));
        if (currentHeight > this.height) {
            this.height = currentHeight;
            this.lastHighPosition = currentHeight; // Update last high position
            
            // Save new best height (and rub it in their face when they fall)
            if (this.height > this.bestHeight) {
                this.bestHeight = this.height;
                this.saveBestHeight();
                
                // Only show "don't fall now" message once per round
                if (!this.shownDontFallMessage) {
                    this.showMockingMessage(`NEW RECORD: ${this.height}m! Don't fall now...`);
                    this.shownDontFallMessage = true;
                }
            }
        }
        if (this.lastHighPosition - currentHeight > 36) {
            this.playerDied();
            return;
        }
        
        if (this.player.y > 600 + Math.abs(this.camera.y)) {
            this.playerDied();
        }
        
        this.updatePlatforms();
        
        this.updateParticles();
        
        if (this.camera.y < -9500) {
            for (let y = -10000; y > this.camera.y - 1000; y -= 80 + Math.random() * 40) {
                this.createPlatform(y);
            }
        }
        
        this.updateUI();
    }
    
    checkPlatformCollisions() {
        this.player.isGrounded = false;
        let standingOnPlatform = null;
        
        for (let platform of this.platforms) {
            if (!platform.active) continue;
            
            // Simple AABB collision detection
            if (this.player.x < platform.x + platform.width &&
                this.player.x + this.player.width > platform.x &&
                this.player.y < platform.y + platform.height &&
                this.player.y + this.player.height > platform.y) {
                
                // Landing on top of platform
                if (this.player.velocityY > 0 && this.player.y < platform.y) {
                    
                    // Handle different platform types (evil mechanics)
                    if (platform.type === 'fake') {
                        // Fake platform - flash warning then player falls through
                        if (!platform.isFlashing) {
                            platform.isFlashing = true;
                            platform.flashTimer = 10; // Flash for 10 frames before disappearing
                        }
                        
                        setTimeout(() => {
                            if (platform.active) {
                                platform.active = false;
                                platform.respawnDelay = 60 + Math.random() * 180;
                                platform.respawnTimer = platform.respawnDelay;
                                this.showMockingMessage("Sike! It was fake!");
                            }
                        }, 200);
                    } else if (platform.type === 'crumbling') {
                        platform.crumbleTime--;
                        if (platform.crumbleTime <= 0) {
                            platform.active = false;
                            platform.respawnDelay = 60 + Math.random() * 180;
                            platform.respawnTimer = platform.respawnDelay;
                            this.createParticles(platform.x + platform.width/2, platform.y, '#A0522D');
                        }
                    }
                    
                    this.player.y = platform.y - this.player.height;
                    this.player.velocityY = 0;
                    this.player.isGrounded = true;
                    standingOnPlatform = platform;
                    
                    // Add some evil friction that makes you slip
                    this.player.velocityX *= this.friction;
                }
            }
        }
        
        if (standingOnPlatform && standingOnPlatform.type === 'moving') {
            this.player.x += standingOnPlatform.direction * standingOnPlatform.speed;
        }
    }
    
    updatePlatforms() {
        for (let platform of this.platforms) {
            if (platform.type === 'moving' && platform.active) {
                platform.x += platform.direction * platform.speed;
                
                if (platform.x <= 0 || platform.x + platform.width >= this.canvas.width) {
                    platform.direction *= -1;
                }
            }
            
            if (platform.isFlashing && platform.flashTimer > 0) {
                platform.flashTimer--;
                if (platform.flashTimer <= 0) {
                    platform.isFlashing = false;
                }
            }
            
            if (!platform.active && platform.respawnTimer > 0) {
                platform.respawnTimer--;
                
                if (platform.respawnTimer <= 0) {
                    platform.active = true;
                    platform.isFlashing = false; // Reset flash state
                    platform.flashTimer = 0;
                    
                    if (platform.type === 'crumbling') {
                        platform.crumbleTime = 150; // Reset crumble time
                    }
                    
                    if (Math.random() < 0.2) { // 20% chance to mock them
                        this.showMockingMessage("Look! A platform appeared... for now.");
                    }
                }
            }
        }
    }
    
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.2; // Gravity
            particle.life--;
            
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    createParticles(x, y, color) {
        for (let i = 0; i < 10; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                color: color,
                life: 60
            });
        }
    }
    
    playerDied() {
        this.deaths++;
        this.totalDeaths++;
        this.saveTotalDeaths();
        this.gameRunning = false;
        
        const wasCloseToRecord = this.height > this.bestHeight * 0.8;
        
        document.body.classList.add('screen-shake');
        setTimeout(() => {
            document.body.classList.remove('screen-shake');
        }, 500);
        
        this.canvas.classList.add('death-flash');
        setTimeout(() => {
            this.canvas.classList.remove('death-flash');
        }, 300);
        
        this.playSound('deathSound');
        
        // 13% chance to play random laugh sound for extra psychological damage
        if (Math.random() < 0.13) {
            this.playRandomLaughSound();
        }
        
        if (Math.random() < 0.15) {
            this.showTrollImage();
            this.unlockAchievement('getTrolled'); 
        } else {
            if (wasCloseToRecord && this.height > 50) {
                this.showMockingMessage(`Ouch! Fell from ${this.height}m when your best is ${this.bestHeight}m. So close!`);
            } else {
                this.showRandomMockingMessage();
            }
        }
        
        // Save play time
        this.savePlayTime();
        
        // Reset after a delay (to let the rage build)
        setTimeout(() => {
            this.resetPlayer();
            this.gameRunning = true;
        }, 2000);
    }
    
    showRandomMockingMessage() {
        // 0.5% chance for the super rare golden message
        if (Math.random() < 0.005) {
            this.showMockingMessage(this.goldenMockingMessage, true); // true = golden
        } else {
            const message = this.mockingMessages[Math.floor(Math.random() * this.mockingMessages.length)];
            this.showMockingMessage(message, false); // false = normal
        }
    }
    
    showMockingMessage(message, isGolden = false) {
        const mockText = document.getElementById('mockingText');
        mockText.textContent = message;
        
        // Style based on rarity
        if (isGolden) {
            mockText.style.color = '#FFD700'; // Gold color
            mockText.style.fontWeight = 'bold';
            mockText.style.fontSize = '32px'; // Larger text
            mockText.style.textShadow = '0 0 20px #FFD700, 3px 3px 6px rgba(0,0,0,0.9)'; // Golden glow
            mockText.style.animation = 'none'; // Remove any existing animation
            mockText.offsetHeight; // Force reflow
            mockText.style.animation = 'goldPulse 0.5s ease-in-out'; // Special golden pulse
            
            // Unlock the golden message achievement
            this.unlockAchievement('goldenMessage');
        } else {
            // Reset to normal styling
            mockText.style.color = '#ff4444';
            mockText.style.fontWeight = 'bold';
            mockText.style.fontSize = '24px';
            mockText.style.textShadow = '3px 3px 6px rgba(0,0,0,0.9)';
            mockText.style.animation = 'none';
        }
        
        mockText.classList.add('show');
        this.playSound('mockSound');
        
        // Golden message stays longer
        const displayTime = isGolden ? 4000 : 1500; // 4 seconds vs 1.5 seconds
        
        setTimeout(() => {
            mockText.classList.remove('show');
        }, displayTime);
    }
    
    showTrollImage() {
        // Play snoop.mp3 at 1.3x speed .4 seconds before trollface
        try {
            const snoopAudio = new Audio('assets/snoop.mp3');
            snoopAudio.volume = 0.8;
            snoopAudio.playbackRate = 1.3;
            snoopAudio.play().catch(() => {});
        } catch (e) {}
        setTimeout(() => {
            // Create and show trollface image after 0.4s
            const trollImg = document.createElement('img');
            trollImg.src = 'assets/trollflip.jpg';
            trollImg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 300px;
                height: auto;
                z-index: 9999;
                border: 5px solid #ff6b6b;
                border-radius: 10px;
                box-shadow: 0 0 30px rgba(255, 107, 107, 0.8);
                animation: trollPop 0.46s ease-out;
            `;
            document.body.appendChild(trollImg);
            setTimeout(() => {
                document.body.removeChild(trollImg);
            }, 800);
        }, 400);
    }
    
    render() {
        this.ctx.fillStyle = 'linear-gradient(180deg, #87CEEB 0%, #4682B4 50%, #2F4F4F 100%)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(0.5, '#4682B4');
        gradient.addColorStop(1, '#2F4F4F');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Save context for camera transformation
        this.ctx.save();
        this.ctx.translate(0, -this.camera.y);
        
        // Draw platforms
        for (let platform of this.platforms) {
            // Only draw platforms that are visible
            if (platform.y > this.camera.y - 50 && platform.y < this.camera.y + this.canvas.height + 50) {
                
                // Handle inactive platforms that are about to respawn
                if (!platform.active) {
                    // Show ghost/preview of platform when it's about to respawn (last 60 frames)
                    if (platform.respawnTimer > 0 && platform.respawnTimer <= 60) {
                        this.ctx.save();
                        this.ctx.globalAlpha = 0.3 + (60 - platform.respawnTimer) / 60 * 0.4; // Fade in effect
                        this.ctx.fillStyle = platform.color;
                        this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
                        
                        // Dashed outline to indicate it's not solid yet
                        this.ctx.setLineDash([5, 5]);
                        this.ctx.strokeStyle = platform.color;
                        this.ctx.lineWidth = 2;
                        this.ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
                        this.ctx.restore();
                    }
                    continue;
                }
                
                this.ctx.fillStyle = platform.color;
                
                // Add some visual effects for different platform types
                if (platform.type === 'crumbling' && platform.crumbleTime < 30) {
                    this.ctx.fillStyle = '#8B4513'; // Change color as it crumbles
                }
                
                // Flash warning for fake platforms
                if (platform.isFlashing && platform.flashTimer > 0) {
                    // Flash between red and normal color
                    if (Math.floor(platform.flashTimer / 3) % 2 === 0) {
                        this.ctx.fillStyle = '#ff4444'; // Warning red flash
                    }
                }
                
                this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
                
                // Add platform outline
                this.ctx.strokeStyle = '#000';
                this.ctx.lineWidth = 2;
                this.ctx.setLineDash([]); // Solid line for active platforms
                this.ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
            }
        }
        
        // Draw particles
        for (let particle of this.particles) {
            this.ctx.fillStyle = particle.color;
            this.ctx.fillRect(particle.x, particle.y, 3, 3);
        }
        
        // Draw player
        this.ctx.fillStyle = this.player.color;
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
        
        // Player outline
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(this.player.x, this.player.y, this.player.width, this.player.height);
        
        // Add angry eyes to the player
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(this.player.x + 3, this.player.y + 3, 4, 4);
        this.ctx.fillRect(this.player.x + 13, this.player.y + 3, 4, 4);
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(this.player.x + 4, this.player.y + 4, 2, 2);
        this.ctx.fillRect(this.player.x + 14, this.player.y + 4, 2, 2);
        
        // Restore context
        this.ctx.restore();
        
        // Show tutorial popup overlay
        if (this.showTutorialPopup) {
            this.renderTutorialPopup();
        }
        
        // Draw momentum meter (always visible during gameplay)
        if (this.gameStarted && !this.showTutorialPopup) {
            this.renderMomentumMeter();
        }
    }
    
    renderTutorialPopup() {
        // Semi-transparent overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Animate the popup with pulsing effect
        const scale = 1 + Math.sin(this.tutorialAnimation * 3) * 0.1;
        this.ctx.save();
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.scale(scale, scale);
        
        // Try to draw the press-space.png image
        if (this.tutorialImage.complete && this.tutorialImage.naturalWidth > 0) {
            // Calculate size to fit nicely on screen
            const maxWidth = 300;
            const maxHeight = 200;
            let width = this.tutorialImage.width;
            let height = this.tutorialImage.height;
            
            // Scale down if too large
            if (width > maxWidth || height > maxHeight) {
                const scaleRatio = Math.min(maxWidth / width, maxHeight / height);
                width *= scaleRatio;
                height *= scaleRatio;
            }
            
            this.ctx.drawImage(this.tutorialImage, -width/2, -height/2, width, height);
        } else {
            // Fallback if image doesn't load - draw text version
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            this.ctx.fillRect(-150, -75, 300, 150);
            this.ctx.strokeStyle = '#ff6b6b';
            this.ctx.lineWidth = 3;
            this.ctx.strokeRect(-150, -75, 300, 150);
            
            // Draw "PRESS" text
            this.ctx.fillStyle = '#000';
            this.ctx.font = 'bold 24px Courier New';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('PRESS', 0, -40);
            
            // Draw spacebar representation
            this.ctx.fillStyle = '#333';
            this.ctx.fillRect(-80, -10, 160, 40);
            this.ctx.strokeStyle = '#000';
            this.ctx.lineWidth = 3;
            this.ctx.strokeRect(-80, -10, 160, 40);
            
            // Draw "SPACE" text on the bar
            this.ctx.fillStyle = '#fff';
            this.ctx.font = 'bold 16px Courier New';
            this.ctx.fillText('SPACE', 0, 15);
            
            // Draw "TO JUMP" text
            this.ctx.fillStyle = '#000';
            this.ctx.font = 'bold 20px Courier New';
            this.ctx.fillText('TO JUMP', 0, 60);
            
            // Additional instruction about the meter
            this.ctx.font = 'bold 14px Courier New';
            this.ctx.fillStyle = '#666';
            this.ctx.fillText('Watch the meter at the bottom!', 0, 85);
        }
        
        this.ctx.restore();
    }
    
    updateMomentumMeter() {
        // Handle pause timer
        if (this.momentumMeter.paused) {
            this.momentumMeter.pauseTimer--;
            if (this.momentumMeter.pauseTimer <= 0) {
                this.momentumMeter.paused = false;
            }
            return; // Don't update meter position while paused
        }
        
        // Oscillate the momentum meter back and forth
        this.momentumMeter.value += this.momentumMeter.speed * this.momentumMeter.direction;
        
        // Bounce at the limits
        if (this.momentumMeter.value >= 1) {
            this.momentumMeter.value = 1;
            this.momentumMeter.direction = -1;
        } else if (this.momentumMeter.value <= -1) {
            this.momentumMeter.value = -1;
            this.momentumMeter.direction = 1;
        }
    }
    
    renderMomentumMeter() {
        // Position at bottom center of screen
        const meterX = this.canvas.width / 2;
        const meterY = this.canvas.height - 60;
        const meterWidth = 200;
        const meterHeight = 20;
        
        // Background bar - different color when paused
        if (this.momentumMeter.paused) {
            this.ctx.fillStyle = 'rgba(100, 100, 0, 0.5)'; // Yellow tint when paused
        } else {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        }
        this.ctx.fillRect(meterX - meterWidth/2, meterY, meterWidth, meterHeight);
        
        // Border
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(meterX - meterWidth/2, meterY, meterWidth, meterHeight);
        
        // Center line
        this.ctx.strokeStyle = '#888';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(meterX, meterY);
        this.ctx.lineTo(meterX, meterY + meterHeight);
        this.ctx.stroke();
        
        // Momentum indicator
        const indicatorX = meterX + (this.momentumMeter.value * (meterWidth / 2 - 5));
        const indicatorWidth = 10;
        
        // Color based on direction and pause state
        if (this.momentumMeter.paused) {
            this.ctx.fillStyle = '#ffeb3b'; // Bright yellow when paused
        } else if (this.momentumMeter.value < -0.1) {
            this.ctx.fillStyle = '#ff6b6b'; // Red for left
        } else if (this.momentumMeter.value > 0.1) {
            this.ctx.fillStyle = '#4ecdc4'; // Blue for right
        } else {
            this.ctx.fillStyle = '#95e1d3'; // Green for center
        }
        
        this.ctx.fillRect(indicatorX - indicatorWidth/2, meterY - 5, indicatorWidth, meterHeight + 10);
        
        // Label - show pause status
        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 12px Courier New';
        this.ctx.textAlign = 'center';
        if (this.momentumMeter.paused) {
            this.ctx.fillText('DIRECTION LOCKED', meterX, meterY - 8);
        } else {
            this.ctx.fillText('JUMP DIRECTION', meterX, meterY - 8);
        }
        
        // Direction arrows
        this.ctx.font = 'bold 14px Courier New';
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.fillText('←', meterX - meterWidth/2 + 15, meterY + 15);
        this.ctx.fillStyle = '#4ecdc4';
        this.ctx.fillText('→', meterX + meterWidth/2 - 15, meterY + 15);
    }
    
    updateUI() {
        document.getElementById('heightDisplay').textContent = `Height: ${this.height}m`;
        document.getElementById('deathCounter').textContent = `Deaths: ${this.deaths}`;
        document.getElementById('bestHeightDisplay').textContent = `Best: ${this.bestHeight}m`;
        document.getElementById('totalDeathsDisplay').textContent = `Total Deaths: ${this.totalDeaths}`;
        document.getElementById('playTimeDisplay').textContent = `Time Wasted: ${this.formatPlayTime()}`;
    }
    
    playSound(soundId) {
        try {
            const sound = document.getElementById(soundId);
            if (sound) {
                sound.currentTime = 0;
                sound.play().catch(() => {
                    // Ignore audio play errors (browser restrictions)
                });
            }
        } catch (e) {
            // Ignore audio errors
        }
    }
    
    playRandomLaughSound() {
        // List of actual laugh sound files in assets/laugh/ (laugh1.wav through laugh6.wav)
        const laughSounds = [
            'laugh1.wav', 'laugh2.wav', 'laugh3.wav', 'laugh4.wav', 'laugh5.wav', 'laugh6.wav', 'laugh7.mp3'
        ];
        
        // Pick a random laugh sound
        const randomLaugh = laughSounds[Math.floor(Math.random() * laughSounds.length)];
        
        // Unlock LOL achievement
        this.unlockAchievement('lol');
        
        try {
            // Create audio element dynamically
            const audio = new Audio(`assets/laugh/${randomLaugh}`);
            audio.volume = 0.7; // Slightly quieter than death sound
            audio.playbackRate = 1.25; // Play at 1.25x speed for extra annoyance
            
            // Add error handling to see if file exists
            audio.addEventListener('error', () => {
                console.log(`Could not load laugh sound: ${randomLaugh}`);
                // Fallback: try to play a simple laugh sound or mock sound
                this.playSound('mockSound'); // Use existing mock sound as fallback
            });
            
            audio.addEventListener('loadeddata', () => {
                console.log(`Successfully loaded laugh sound: ${randomLaugh}`);
            });
            
            audio.play().catch((error) => {
                console.log('Audio play failed:', error);
                // Fallback to existing mock sound
                this.playSound('mockSound');
            });
        } catch (e) {
            console.log('Audio creation failed:', e);
            // Fallback to existing mock sound
            this.playSound('mockSound');
        }
    }
    
    gameLoop(currentTime = 0) {
        // Frame rate limiting to ensure consistent 60 FPS
        const deltaTime = currentTime - this.lastFrameTime;
        
        if (deltaTime >= this.frameInterval) {
            this.update();
            this.render();
            this.lastFrameTime = currentTime - (deltaTime % this.frameInterval);
        }
        
        requestAnimationFrame((time) => this.gameLoop(time));
    }
    
    // Save/Load System (for maximum psychological damage)
    loadBestHeight() {
        return parseInt(localStorage.getItem('ragejump_best_height') || '0');
    }
    
    saveBestHeight() {
        localStorage.setItem('ragejump_best_height', this.bestHeight.toString());
    }
    
    loadTotalDeaths() {
        return parseInt(localStorage.getItem('ragejump_total_deaths') || '0');
    }
    
    saveTotalDeaths() {
        localStorage.setItem('ragejump_total_deaths', this.totalDeaths.toString());
    }
    
    loadTotalPlayTime() {
        return parseInt(localStorage.getItem('ragejump_total_playtime') || '0');
    }
    
    savePlayTime() {
        const sessionTime = Date.now() - this.sessionStartTime;
        this.totalPlayTime += sessionTime;
        localStorage.setItem('ragejump_total_playtime', this.totalPlayTime.toString());
        this.sessionStartTime = Date.now(); // Reset session timer
    }
    
    formatPlayTime() {
        const totalSeconds = Math.floor((this.totalPlayTime + (Date.now() - this.sessionStartTime)) / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        if (hours > 0) {
            return `${hours}h ${minutes}m ${seconds}s`;
        } else if (minutes > 0) {
            return `${minutes}m ${seconds}s`;
        } else {
            return `${seconds}s`;
        }
    }

    resetAllProgress() {
        if (confirm("Are you sure you want to delete ALL your progress? This cannot be undone!")) {
            localStorage.removeItem('ragejump_best_height');
            localStorage.removeItem('ragejump_total_deaths');
            localStorage.removeItem('ragejump_total_playtime');
            this.bestHeight = 0;
            this.totalDeaths = 0;
            this.totalPlayTime = 0;
            this.sessionStartTime = Date.now();
            this.displaySavedStats();
            this.updateUI();
            this.showMockingMessage("Fresh start! Let's see you fail again.");
        }
    }

    displaySavedStats() {
        // Stats are now shown in the game UI, no startup message needed
        console.log(`Previous stats - Best: ${this.bestHeight}m, Deaths: ${this.totalDeaths}, Time: ${this.formatPlayTime()}`);
    }

    // Achievement system functions
    loadAchievement(achievementId) {
        return localStorage.getItem(`ragejump_achievement_${achievementId}`) === 'true';
    }

    saveAchievement(achievementId) {
        localStorage.setItem(`ragejump_achievement_${achievementId}`, 'true');
    }

    unlockAchievement(achievementId) {
        if (!this.achievements[achievementId].unlocked) {
            this.achievements[achievementId].unlocked = true;
            this.saveAchievement(achievementId);
            this.showAchievementNotification(this.achievements[achievementId]);
            this.updateAchievementsSidebar(); // Update the sidebar display
        }
    }

    showAchievementNotification(achievement) {
        // Create achievement notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(90deg, #FFD700, #FFA500);
            color: black;
            padding: 15px 25px;
            border-radius: 10px;
            font-family: 'Courier New', monospace;
            font-weight: bold;
            font-size: 16px;
            z-index: 1001;
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
            border: 2px solid #FFD700;
            animation: slideDown 0.5s ease-out;
        `;
        notification.innerHTML = `🏆 Achievement Unlocked: ${achievement.name}`;
        document.body.appendChild(notification);
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.5s ease-in forwards';
            setTimeout(() => document.body.removeChild(notification), 500);
        }, 3000);
    }

    showAchievements() {
        // This function is no longer needed with the permanent sidebar
        // but we'll keep it for compatibility
        this.updateAchievementsSidebar();
    }

    hideAchievements() {
        // This function is no longer needed with the permanent sidebar
        // but we'll keep it for compatibility
    }

    updateAchievementsSidebar() {
        const achievementsList = document.getElementById('achievementsList');
        // Clear existing content
        achievementsList.innerHTML = '';
        // Add each achievement
        Object.values(this.achievements).forEach(achievement => {
            const achievementDiv = document.createElement('div');
            achievementDiv.className = `achievement ${achievement.unlocked ? 'unlocked' : ''}`;
            // Handle icon display - if it's an image file, create img element, otherwise use emoji/text
            let iconContent;
            if (achievement.unlocked) {
                if (achievement.icon.includes('.jpg') || achievement.icon.includes('.png') || achievement.icon.includes('.gif')) {
                    iconContent = `<img src="assets/${achievement.icon}" alt="${achievement.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 5px;">`;
                } else {
                    iconContent = achievement.icon;
                }
            } else {
                iconContent = '🔒';
            }
            achievementDiv.innerHTML = `
                <div class="achievement-icon">${iconContent}</div>
                <div class="achievement-info">
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-description">${achievement.description}</div>
                </div>
            `;
            achievementsList.appendChild(achievementDiv);
        });
    }
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new RageJump();
});