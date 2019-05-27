import React from 'react';

import Chart from 'react-google-charts';

function SentimentsTrend({ trend }) {
  const sentimentsTrendData = trend.map(t => {
    return [t.session_name, t.sentiment.score];
  });

  return (
    <Chart
      width={'600px'}
      height={'400px'}
      chartType="Line"
      loader={<div>Loading Chart...</div>}
      data={[['Session', 'Sentiment'], ...sentimentsTrendData]}
      options={{
        chart: {
          title: 'Sentiments Trend'
        },
        colors: ['#5996C3']
      }}
    />
  );
}

export default SentimentsTrend;
