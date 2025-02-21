import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Tab,
  Tabs,
  Card,
  CardContent,
  Typography,
  IconButton,
  styled
} from '@mui/material';
import { 
  PianoAlt as PianoIcon,
  Mic as MicIcon,
  DrumKit as DrumIcon,
  ChevronRight as DetailsIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const StyledCard = styled(Card)(({ theme, selected }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: selected ? '#383838' : '#444',
  border: `2px solid ${selected ? '#2dba4e' : 'transparent'}`,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#383838',
    transform: 'translateY(-2px)',
  }
}));

const TrackTypeTab = styled(Tab)(({ color }) => ({
  backgroundColor: color,
  color: 'white',
  opacity: 0.7,
  '&.Mui-selected': {
    opacity: 1,
    color: 'white'
  }
}));

const InstrumentsModal = ({ open, onClose }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedType, setSelectedType] = useState('software');

  const trackTypes = [
    {
      type: 'software',
      label: 'Software Instrument',
      color: '#2dba4e',
      icon: <PianoIcon sx={{ fontSize: 48 }}/>,
      description: 'Plug in a USB MIDI keyboard to play and record using a wide variety of instruments like piano, organ, and synths.'
    },
    {
      type: 'audio',
      label: 'Audio',
      color: '#007AFF',
      icon: <MicIcon sx={{ fontSize: 48 }}/>,
      description: 'Record using a microphone or line input — or drag and drop audio files.'
    },
    {
      type: 'drummer',
      label: 'Drummer',
      color: '#FFB900',
      icon: <DrumIcon sx={{ fontSize: 48 }}/>,
      description: 'Add a drummer that automatically plays along with your song.'
    }
  ];

  const handleCreate = () => {
    console.log('Creating track:', selectedType);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: '#2a2a2a',
          borderRadius: 12,
        }
      }}
    >
      <DialogTitle sx={{ color: 'white' }}>
        Choose a track type
      </DialogTitle>

      <DialogContent>
        <Tabs 
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          sx={{ 
            mb: 3,
            backgroundColor: '#333',
            padding: 0.5,
            borderRadius: 1
          }}
        >
          {trackTypes.map((type) => (
            <TrackTypeTab 
              key={type.type}
              label={type.label}
              color={type.color}
            />
          ))}
        </Tabs>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
          {trackTypes.map((type) => (
            <motion.div
              key={type.type}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <StyledCard 
                selected={selectedType === type.type}
                onClick={() => setSelectedType(type.type)}
              >
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    {type.icon}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {type.description}
                  </Typography>
                </CardContent>
              </StyledCard>
            </motion.div>
          ))}
        </Box>
      </DialogContent>

      <DialogActions sx={{ borderTop: '1px solid #444', p: 2 }}>
        <Button 
          startIcon={<DetailsIcon />}
          sx={{ color: '#666' }}
        >
          Details
        </Button>
        <Box sx={{ flex: 1 }} />
        <Button onClick={onClose} sx={{ color: 'white', bgcolor: '#555', mr: 1 }}>
          Cancel
        </Button>
        <Button onClick={handleCreate} variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InstrumentsModal; 