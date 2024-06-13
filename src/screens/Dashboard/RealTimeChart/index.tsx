import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TickerData } from '../../../utils/types';

interface RealTimeChartProps {
    tickerData: TickerData[];
}

const RealTimeChart: React.FC<RealTimeChartProps> = ({ tickerData }) => {
    // console.log(tickerData);
    const formatTime = (time: string) => {
        const date = new Date(time);
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    };
    return (
        <LineChart width={1200} height={700} data={tickerData.reverse()} margin={{ right: 20, left: 20 }}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="time" tickFormatter={formatTime} />
            <YAxis domain={['dataMin - 10', 'dataMax + 10']} allowDataOverflow={true} />
            <Tooltip />
            <Legend />
            <Line type="linear" dataKey="best_bid" stroke="green" name="Best Bid" strokeWidth={2} />
            <Line type="linear" dataKey="best_ask" stroke="red" name="Best Ask" strokeWidth={2} />
        </LineChart>
    );
};

export default RealTimeChart;
