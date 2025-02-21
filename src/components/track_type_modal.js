export class TrackTypeModal {
    constructor() {
        this.modal = document.getElementById('track-type-modal');
        this.setupModal();
    }

    setupModal() {
        this.modal.innerHTML = `
            <div class="modal-content">
                <h1>Choose a track type</h1>
                
                <div class="track-types">
                    <button class="track-type-button software">Software Instrument</button>
                    <button class="track-type-button audio">Audio</button>
                    <button class="track-type-button drummer">Drummer</button>

                    <div class="track-type-card software">
                        <div class="track-type-icon">
                            <svg width="100" height="60" viewBox="0 0 100 60">
                                <rect x="10" y="10" width="20" height="40" fill="#2dba4e"/>
                                <rect x="40" y="10" width="20" height="40" fill="#2dba4e"/>
                                <rect x="70" y="10" width="20" height="40" fill="#2dba4e"/>
                            </svg>
                        </div>
                        <p>Plug in a USB MIDI keyboard to play and record using a wide variety of instruments like piano, organ, and synths.</p>
                    </div>

                    <div class="track-type-card audio">
                        <div class="track-type-icon">
                            <svg width="100" height="60" viewBox="0 0 100 60">
                                <path d="M40,10 L60,10 L60,50 L40,50 Z M60,30 Q80,30 80,50 Q80,10 60,30" fill="#2c75c9"/>
                            </svg>
                        </div>
                        <p>Record using a microphone or line input — or drag and drop audio files.</p>
                    </div>

                    <div class="track-type-card drummer">
                        <div class="track-type-icon">
                            <svg width="100" height="60" viewBox="0 0 100 60">
                                <circle cx="50" cy="30" r="25" fill="#e6b93c"/>
                                <rect x="20" y="20" width="10" height="30" fill="#e6b93c"/>
                                <rect x="70" y="20" width="10" height="30" fill="#e6b93c"/>
                            </svg>
                        </div>
                        <p>Add a drummer that automatically plays along with your song.</p>
                    </div>
                </div>

                <div class="modal-footer">
                    <button class="details-btn">▶ Details</button>
                    <div class="action-buttons">
                        <button class="cancel-btn">Cancel</button>
                        <button class="create-btn">Create</button>
                    </div>
                </div>
            </div>
        `;

        this.setupEventListeners();
    }

    setupEventListeners() {
        const trackTypes = this.modal.querySelectorAll('.track-type-button');
        const createBtn = this.modal.querySelector('.create-btn');
        const cancelBtn = this.modal.querySelector('.cancel-btn');

        trackTypes.forEach(track => {
            track.addEventListener('click', () => {
                trackTypes.forEach(t => t.classList.remove('selected'));
                track.classList.add('selected');
                createBtn.disabled = false;
            });
        });

        cancelBtn.addEventListener('click', () => this.hide());
        createBtn.addEventListener('click', () => {
            const selectedTrack = this.modal.querySelector('.track-type-button.selected');
            if (selectedTrack) {
                const trackType = selectedTrack.classList.contains('software') ? 'software' :
                                selectedTrack.classList.contains('audio') ? 'audio' : 'drummer';
                this.createTrack(trackType);
            }
        });
    }

    show() {
        this.modal.style.display = 'flex';
    }

    hide() {
        this.modal.style.display = 'none';
    }

    createTrack(type) {
        window.dispatchEvent(new CustomEvent('trackTypeSelected', {
            detail: { type }
        }));
        this.hide();
    }
} 