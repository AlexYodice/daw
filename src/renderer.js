const { InstrumentsModal } = require('./components/instruments_modal.js');
const { FileManager } = require('./utils/FileManager.js');
const { Piano } = require('./instruments/Piano.js');
const { TrackTypeModal } = require('./components/track_type_modal.js');

class DAWApp {
    constructor() {
        this.tracks = [];
        this.instrumentsModal = new InstrumentsModal();
        this.fileManager = new FileManager();
        this.tempo = 120;
        this.trackTypeModal = new TrackTypeModal();
        
        // Use jQuery's ready method
        $(document).ready(() => {
            this.setupEventListeners();
        });
    }

    setupEventListeners() {
        const addTrackBtn = $('.add-track-btn');
        console.log('Found add track button:', addTrackBtn);

        if (addTrackBtn) {
            addTrackBtn.on('click', () => {
                console.log('ADD TRACK CLICKED!!!');
                this.instrumentsModal.show();
                this.instrumentsModal.populateModal(this.addTrack.bind(this));
            });
        }

        window.addEventListener('trackTypeSelected', (e) => {
            if (e.detail.type === 'software') {
                this.instrumentsModal.show();
            } else {
                this.addTrack({
                    name: `Track ${this.tracks.length + 1}`,
                    type: e.detail.type
                });
            }
        });

        // Listen for instrument selection
        $(window).on('instrumentSelected', (e, data) => {
            this.addTrack(data);
        });

        // Add file menu handlers
        window.api.receive('menu-save', () => {
            this.fileManager.saveProject(this.tracks);
        });

        window.api.receive('menu-open', async () => {
            const project = await this.fileManager.loadProject();
            if (project) {
                this.loadProject(project);
            }
        });
    }

    setupTempoControl() {
        const tempoDisplay = $('.tempo-display');
        
        tempoDisplay.on('click', () => {
            const newTempo = prompt('Enter new tempo (BPM):', this.tempo);
            if (newTempo && !isNaN(newTempo) && newTempo > 0) {
                this.tempo = Math.min(Math.max(parseInt(newTempo), 20), 999);
                tempoDisplay.text(this.tempo);
                this.updateMetronome();
            }
        });
    }

    updateMetronome() {
        // We'll implement metronome functionality later
        const intervalMs = (60 / this.tempo) * 1000;
        console.log(`Metronome interval: ${intervalMs}ms`);
    }

    showAddTrackDialog() {
        // This will show a dialog to select instrument type
        // For now, let's just add a default track
        this.addTrack({
            name: `Track ${this.tracks.length + 1}`,
            type: 'audio'
        });
    }

    addTrack(trackInfo) {
        const trackElement = this.createTrackElement(trackInfo);
        $('.track-list').append(trackElement);
        this.tracks.push(trackInfo);
    }

    createTrackElement(track) {
        return $('<div>', {
            class: 'track',
            html: `
                <div class="track-header">
                    <button class="track-expand-btn">⌄</button>
                    <span class="track-name">Track ${this.tracks.length + 1}</span>
                </div>
            `
        });
    }

    loadProject(project) {
        // Clear existing tracks
        this.tracks = [];
        $('.track-list').empty();
        $('.tracks-container').empty();

        // Load project tracks
        project.tracks.forEach(track => {
            this.addTrack(track);
        });
    }

    setupScrollSync() {
        const tracksContainer = $('.tracks-container');
        const measureNumbers = $('.measure-numbers');
        
        // Sync scroll
        tracksContainer.on('scroll', () => {
            measureNumbers.css('transform', `translateX(-${tracksContainer.scrollLeft}px)`);
        });
    }

    setupKeyboardInput() {
        const keyMap = {
            'a': 'C4', 'w': 'C#4', 's': 'D4', 'e': 'D#4',
            'd': 'E4', 'f': 'F4', 't': 'F#4', 'g': 'G4',
            'y': 'G#4', 'h': 'A4', 'u': 'A#4', 'j': 'B4'
        };

        document.addEventListener('keydown', (e) => {
            if (e.repeat) return; // Prevent key repeat
            
            const note = keyMap[e.key.toLowerCase()];
            if (note) {
                // Play the note on the active instrument
                const activeTrack = this.tracks.find(track => track.instance instanceof Piano);
                if (activeTrack && activeTrack.instance) {
                    activeTrack.instance.playNote(note);
                }
            }
        });

        document.addEventListener('keyup', (e) => {
            const note = keyMap[e.key.toLowerCase()];
            if (note) {
                const activeTrack = this.tracks.find(track => track.instance instanceof Piano);
                if (activeTrack && activeTrack.instance) {
                    activeTrack.instance.stopNote(note);
                }
            }
        });
    }
}

// Make sure jQuery is loaded first
window.$ = window.jQuery = require('jquery');

window.addEventListener('load', () => {
    console.log('Window loaded!');
    
    // Super simple test
    const button = document.querySelector('.add-track-btn');
    console.log('Found button with vanilla JS:', button);
    
    button.addEventListener('click', () => {
        console.log('Button clicked with vanilla JS!');
        alert('Button clicked!');
    });
    
    // Then try jQuery
    const $button = $('.add-track-btn');
    console.log('Found button with jQuery:', $button.length);
    
    $button.on('click', () => {
        console.log('Button clicked with jQuery!');
    });
});
