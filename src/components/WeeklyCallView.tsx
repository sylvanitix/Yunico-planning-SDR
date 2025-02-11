import React, { useState, useEffect } from 'react';
import { Box, Container, Paper, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { format, startOfWeek, addDays, addWeeks, subWeeks, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

interface CallBlock {
  date: string;
  start: Date;
  end: Date;
  duration: number;
  calls: number;
}

const WeeklyCallView: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [callBlocks, setCallBlocks] = useState<CallBlock[]>([]);

  useEffect(() => {
    // Ici nous chargerons les données depuis le fichier CSV
    loadCallData();
  }, []);

  const loadCallData = async () => {
    // TODO: Implémenter le chargement des données
  };

  const weekDays = Array.from({ length: 5 }, (_, i) => 
    addDays(startOfWeek(currentWeek, { weekStartsOn: 1 }), i)
  );

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handlePreviousWeek = () => setCurrentWeek(subWeeks(currentWeek, 1));
  const handleNextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1));

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton onClick={handlePreviousWeek}>
          <ChevronLeft />
        </IconButton>
        <Typography variant="h5">
          {format(weekDays[0], 'MMMM yyyy', { locale: fr })}
        </Typography>
        <IconButton onClick={handleNextWeek}>
          <ChevronRight />
        </IconButton>
      </Box>

      <Paper sx={{ p: 2, overflowX: 'auto' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '60px repeat(5, 1fr)', minWidth: 800 }}>
          {/* En-tête des jours */}
          <Box sx={{ gridColumn: '1', borderRight: '1px solid #ddd' }} />
          {weekDays.map((day) => (
            <Box
              key={day.toString()}
              sx={{
                p: 1,
                textAlign: 'center',
                borderBottom: '1px solid #ddd',
                borderRight: '1px solid #ddd',
              }}
            >
              <Typography>
                {format(day, 'EEEE d', { locale: fr })}
              </Typography>
            </Box>
          ))}

          {/* Grille des heures */}
          {hours.map((hour) => (
            <React.Fragment key={hour}>
              <Box
                sx={{
                  p: 1,
                  borderBottom: '1px solid #ddd',
                  borderRight: '1px solid #ddd',
                  textAlign: 'right',
                }}
              >
                <Typography variant="caption">{`${hour}:00`}</Typography>
              </Box>
              {weekDays.map((day) => (
                <Box
                  key={`${day}-${hour}`}
                  sx={{
                    position: 'relative',
                    height: '60px',
                    borderBottom: '1px solid #ddd',
                    borderRight: '1px solid #ddd',
                  }}
                />
              ))}
            </React.Fragment>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default WeeklyCallView;
