import React from 'react';

import Chart from 'react-google-charts';

function EmotionsTrend({ trend, sessions }) {
  const emotionsTrendData = trend.map(t => {
    return [
      sessions.find(session => {
        return session.session_id === t.session_id;
      }).session_name,
      t.emotion.joy,
      t.emotion.anger,
      t.emotion.disgust,
      t.emotion.sadness,
      t.emotion.fear
    ];
  });

  return (
    <Chart
      width={'600px'}
      height={'400px'}
      chartType="Line"
      loader={<div>Loading Chart...</div>}
      data={[
        ['Session', 'Joy', 'Anger', 'Disgust', 'Sadness', 'Fear'],
        ...emotionsTrendData
      ]}
      options={{
        chart: {
          title: 'Emotions Trend',
          subtitle: 'in score'
        },
        colors: ['#F5C54F', '#D1383A', '#52A253', '#5996C3', '#474747']
      }}
      chartEvents={[
        {
          eventName: 'animationfinish',
          callback: () => {
            console.log('Animation Finished');
          }
        }
      ]}
    />
  );
}

export default EmotionsTrend;
