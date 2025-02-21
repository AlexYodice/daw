export class Piano {
    constructor(audioContext) {
        this.audioContext = audioContext;
        this.gainNode = this.audioContext.createGain();
        this.gainNode.connect(this.audioContext.destination);
        this.gainNode.gain.value = 0.5;
        
        // Piano sound settings
        this.oscillators = new Map(); // Store active notes
        this.baseFrequencies = {
            'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13,
            'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00,
            'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88
        };
    }

    playNote(note) {
        const frequency = this.baseFrequencies[note];
        if (!frequency) return;

        // Create oscillator for piano-like sound
        const osc = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        // Use sine wave for more piano-like sound
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

        // Envelope for piano-like attack and decay
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(1, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.1, this.audioContext.currentTime + 0.5);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 2);

        // Connect nodes
        osc.connect(gainNode);
        gainNode.connect(this.gainNode);
        
        // Start the note
        osc.start();
        
        // Store the oscillator
        this.oscillators.set(note, { osc, gainNode });
        
        // Stop and cleanup after 2 seconds
        setTimeout(() => {
            this.stopNote(note);
        }, 2000);
    }

    stopNote(note) {
        const oscillator = this.oscillators.get(note);
        if (oscillator) {
            oscillator.osc.stop();
            oscillator.gainNode.disconnect();
            this.oscillators.delete(note);
        }
    }

    setVolume(value) {
        const normalizedValue = Math.max(0, Math.min(1, value / 100));
        this.gainNode.gain.setValueAtTime(normalizedValue, this.audioContext.currentTime);
    }
} 