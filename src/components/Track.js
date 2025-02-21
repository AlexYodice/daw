export class Track {
    constructor(name, type, icon) {
        this.name = name;
        this.type = type;
        this.icon = icon;
        this.muted = false;
        this.solo = false;
        this.volume = 0.7;
        this.pan = 0;
    }

    render() {
        return `
            <div class="track" data-type="${this.type}">
                <div class="track-controls">
                    <button class="track-mute" title="Mute">M</button>
                    <button class="track-solo" title="Solo">S</button>
                    <button class="track-monitor" title="Monitor">🎧</button>
                </div>
                <div class="track-icon">
                    <img src="assets/instruments/${this.type}.svg" alt="${this.name}">
                </div>
                <div class="track-info">
                    <div class="track-name">${this.name}</div>
                    <div class="track-volume">
                        <div class="volume-slider" style="width: ${this.volume * 100}%"></div>
                    </div>
                </div>
            </div>
        `;
    }

    renderTimeline() {
        return `
            <div class="track-timeline" data-track="${this.name}">
                <div class="track-waveform"></div>
            </div>
        `;
    }
} 