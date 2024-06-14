import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TickerData } from '../../../utils/types';

interface RealTimeChartProps {
    tickerData?: TickerData[];
    isLoading?: boolean;
}

const RealTimeChart: React.FC<RealTimeChartProps> = ({ tickerData = [], isLoading = false }) => {
    const formatTime = (time: string) => {
        const date = new Date(time);
        if (isNaN(date.getTime())) {
            return '';
        }
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    };

    return (
        <div className="relative lg:w-[1000px] lg:h-[600px]">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-opacity-75 z-10">
                    <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>
                </div>
            )}
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={1100}
                    height={600}
                    data={isLoading ? [] : tickerData.reverse()}
                    margin={{ right: 20, left: 20, top: 20, bottom: 20 }}
                >
                    <XAxis dataKey="time" tickFormatter={formatTime} interval={Math.ceil(tickerData.length / 10)} />
                    <YAxis domain={['dataMin - 10', 'dataMax + 10']} allowDataOverflow={true} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="best_bid" stroke="green" name="Best Bid" strokeWidth={2} />
                    <Line type="monotone" dataKey="best_ask" stroke="red" name="Best Ask" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RealTimeChart;
