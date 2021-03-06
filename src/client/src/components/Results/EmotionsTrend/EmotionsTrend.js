import React from 'react';

import Chart from 'react-google-charts';

function EmotionsTrend({ trend }) {
  const emotionsTrendData = trend.map(t => {
    return [
      t.session_name,
      t.emotion.joy,
      t.emotion.anger,
      t.emotion.disgust,
      t.emotion.sadness,
      t.emotion.fear
    ];
  });

  return (
    <Chart
      width={'800px'}
      height={'400px'}
      chartType="Line"
      loader={<div>Loading...</div>}
      data={[
        ['Session', 'Joy', 'Anger', 'Disgust', 'Sadness', 'Fear'],
        ...emotionsTrendData
      ]}
      options={{
        colors: ['#F5C54F', '#D1383A', '#52A253', '#5996C3', '#474747']
      }}
    />
  );
}

export default EmotionsTrend;
