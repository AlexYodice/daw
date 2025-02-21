const { Piano } = require('../instruments/Piano.js');

class InstrumentsModal {
  constructor() {
    console.log('InstrumentsModal: Initializing...');
    this.modal = document.getElementById('instruments-modal');
    
    // Debug: Let's check if we're even getting here
    console.log('Modal element:', this.modal);
  }

  show() {
    console.log('Show method called');
    if (this.modal) {
      this.modal.style.display = 'block';
    } else {
      console.error('Modal element not found!');
    }
  }

  hide() {
    console.log('Hide method called');
    if (this.modal) {
      this.modal.style.display = 'none';
    }
  }

  populateModal() {
    console.log('Populate modal called');
    if (!this.modal) {
      console.error('Cannot populate modal - element not found');
      return;
    }

    this.modal.innerHTML = `
      <div class="modal-content">
        <h2>Choose a track type</h2>
        
        <div class="track-types">
          <div class="track-type software">
            <button class="track-type-btn software-btn">Software Instrument</button>
            <div class="track-type-card">
              <div class="track-type-icon">
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <rect width="48" height="48" fill="none"/>
                  <rect x="8" y="12" width="8" height="24" fill="#2dba4e"/>
                  <rect x="20" y="12" width="8" height="24" fill="#2dba4e"/>
                  <rect x="32" y="12" width="8" height="24" fill="#2dba4e"/>
                </svg>
              </div>
              <p>Plug in a USB MIDI keyboard to play and record using a wide variety of instruments.</p>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="details-btn">Details</button>
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
    // Handle track type selection
    this.modal.find('.track-type').click(function() {
      $('.track-type').removeClass('selected');
      $(this).addClass('selected');
      $('.create-btn').prop('disabled', false);
    });

    this.modal.find('.cancel-btn').click(() => this.hide());
    this.modal.find('.create-btn').click(() => {
      if (this.modal.find('.track-type.selected').length) {
        this.createTrack('software');
        this.hide();
      }
    });
  }

  createTrack(type) {
    console.log('Creating track:', type);
    const trackList = document.querySelector('.track-list');
    if (!trackList) {
      console.error('Track list not found!');
      return;
    }

    const newTrack = document.createElement('div');
    newTrack.className = 'track';
    newTrack.dataset.type = type;
    newTrack.innerHTML = `
      <div class="track-header">
        <button class="track-expand-btn">⌄</button>
        <span class="track-name">Track ${trackList.children.length + 1}</span>
      </div>
    `;
    
    trackList.appendChild(newTrack);
  }
}

module.exports = { InstrumentsModal };
