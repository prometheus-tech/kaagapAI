import React from 'react';

import Grid from '@material-ui/core/Grid';
import EmotionItem from './EmotionItem/EmotionItem';

function Emotions({ emotions }) {
  const labels = ['joy', 'anger', 'disgust', 'sadness', 'fear'];

  return (
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <Grid container spacing={16} justifyContent="center">
          {labels.map((label, index) => {
            if (emotions[label] > 0) {
              return (
                <Grid key={index} item xs={2} style={{ marginBottom: '16px' }}>
                  <EmotionItem label={label} score={emotions[label]} />
                </Grid>
              );
            } else {
              return null;
            }
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Emotions;
