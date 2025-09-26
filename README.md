# 🎮 RageJump - The Most Infuriating Game Ever Made

## ⚠️ WARNING: This Game is Designed to Make You Rage Quit

RageJump is a browser-based rage platformer that follows the sadistic design philosophy of games like "Getting Over It" and "Jump King". Every mechanic is carefully crafted to maximize player frustration and create moments of pure, unadulterated rage.

## 🚀 How to Play

1. Open `index.html` in your web browser
2. Click "Start Your Suffering" 
3. Use **SPACEBAR** or **CLICK** to jump
4. Try not to throw your keyboard out the window

## 😈 Evil Design Features

### Core Rage Mechanics

- **No Checkpoints Ever**: Fall once, lose everything. Watch 30 minutes of progress vanish in 5 seconds.
- **Input Delay**: 100ms input delay makes every jump feel slightly off and infuriating.
- **Slippery Physics**: Momentum-based controls with evil friction make precise movement nearly impossible.
- **Fake Safety**: Nothing can be trusted. Platforms that look solid will betray you.

### Platform Types (All Designed to Ruin Your Day)

1. **Normal Platforms** - The only "safe" platforms (still slippery)
2. **Fake Platforms** - Look solid but you fall through after landing
3. **Crumbling Platforms** - Start breaking apart the moment you touch them  
4. **Moving Platforms** - Because standing still is too easy

### Traps & Hazards

- **Hidden Spikes**: Pop out when you get close (surprise!)
- **Progressive Difficulty**: Platforms get smaller and more spread out as you climb higher
- **Momentum Chaos**: Random horizontal momentum added to jumps for extra unpredictability

### Psychological Warfare

- **Mocking System**: 13 different humiliating messages taunt you after every death
- **Death Counter**: Tracks your failures for maximum shame
- **Screen Shake**: Visual punishment for your incompetence
- **Height Display**: Shows how much progress you're about to lose

## 🎯 Technical Features

- **HTML5 Canvas** rendering for smooth (but infuriating) gameplay
- **Infinite vertical level** generation
- **Particle effects** for platform destruction
- **Responsive controls** (with evil input delay)
- **Sound effects** support (add your own audio files to `/assets/`)

## 📁 File Structure

```
RageJump/
├── index.html          # Main game page
├── game.js            # Core game logic and rage mechanics
├── styles.css         # Styling and rage-inducing visual effects
├── assets/           # Audio files (optional)
│   ├── jump.wav      # Jump sound
│   ├── death.wav     # Death sound
│   └── mock.wav      # Mocking sound
└── README.md         # This file
```

## 🔧 Customization

### Add Your Own Mocking Messages
Edit the `mockingMessages` array in `game.js`:

```javascript
this.mockingMessages = [
    "Your custom insult here",
    "Even worse than the defaults",
    // Add more soul-crushing messages...
];
```

### Adjust the Evil Level
Modify these variables in `game.js` to make it even more frustrating:

- `inputDelay`: Increase for more input lag
- `friction`: Lower values = more slippery  
- `gravity`: Higher = faster falling
- `jumpPower`: Lower = weaker jumps

### Add Sound Effects
Place audio files in the `/assets/` folder:
- `jump.wav` - Jump sound
- `death.wav` - Death sound  
- `mock.wav` - Mocking sound

## 🎮 Pro Tips (That Won't Help)

1. **Patience is key** - You'll need it when you fall from height 200m back to 0m
2. **Learn the physics** - The slippery controls are intentional and will never feel natural
3. **Expect the unexpected** - Every platform is a potential trap
4. **Take breaks** - For your mental health and your keyboard's safety
5. **Remember**: It's supposed to be unfair. That's the point.

## 🏆 Achievements (Unofficial)

- **First Blood**: Die within 30 seconds
- **Commitment Issues**: Reach 50m height (then fall back to 0)
- **Masochist**: Die 100+ times and keep playing
- **Legend**: Reach 500m+ height (we don't believe you)
- **Enlightenment**: Realize the game is designed to be impossible and quit

## 🤝 Contributing

Want to make the game even more infuriating? Pull requests welcome for:
- New trap types
- More mocking messages
- Additional rage-inducing mechanics
- Better sound effects
- Even more evil physics tweaks

## 📜 License

This game is released under the "Rage at Your Own Risk" license. We are not responsible for:
- Broken keyboards
- Thrown controllers  
- Existential crises
- Loss of faith in humanity
- Spontaneous rage quits

## 🎯 Final Words

Remember: RageJump isn't just a game, it's a test of your patience, determination, and sanity. Every death is a learning experience. Every fall is character building. Every moment of rage is exactly what we intended.

Good luck. You'll need it. 😈

---

*"It's not a bug, it's a feature designed to make you suffer."* - The Developers