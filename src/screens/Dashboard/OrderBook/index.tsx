import React, { useEffect, useRef, useState } from 'react';
import useOrderBook from '../../../hooks/useOrderBook';
import { ALLOWED_AGGREGATION } from '../../../utils/constants';
import Dropdown from '../../../components/atom/dropdown';
import OrderBookTable from '../../../components/molecule/table';
import RealTimeChart from '../RealTimeChart';

interface OrderBookProps {
    pair: string;
}
let check = 0;
const OrderBook: React.FC<OrderBookProps> = ({ pair }) => {
    const [aggregation, setAggregation] = useState<number>(0.01);
    const { topBids, topAsks, currentPrice, tickerData, isLoading, error } = useOrderBook(pair, aggregation);
    const previousPriceRef = useRef<number | null>(null);
    const [priceColor, setPriceColor] = useState<string>('text-gray-300');

    const handleIncrementChange = (value: string) => {
        setAggregation(parseFloat(value));
    };

    // if (check < 20)
    // console.log('tickerData', typeof tickerData);
    // check++;

    useEffect(() => {
        if (previousPriceRef.current !== null && currentPrice !== null) {
            if (currentPrice > previousPriceRef.current) {
                setPriceColor('text-green-500');
            } else if (currentPrice < previousPriceRef.current) {
                setPriceColor('text-red-500');
            } else {
                setPriceColor('text-gray-300');
            }
        }
        previousPriceRef.current = currentPrice;
    }, [currentPrice]);

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    return (
        <div className="flex flex-row justify-between items-center gap-20 pt-10">
            <RealTimeChart tickerData={tickerData} />
            <div className="flex justify-between">
                <div className="orderbook bg-gray-800 p-4 rounded-lg shadow-lg max-w-sm min-w-[300px]">
                    <div className="controls mb-4 flex justify-between items-center">
                        {currentPrice !== null && (
                            <div className={`text-center text-xl font-semibold mt-2 ${priceColor}`}> ${currentPrice.toFixed(2)} </div>
                        )}
                        <Dropdown options={ALLOWED_AGGREGATION} value={aggregation.toString()} onChange={handleIncrementChange} label="Aggregation" />
                    </div>
                    <div className="flex flex-col">
                        <OrderBookTable data={topBids} label="Bids" type="bids" isLoading={isLoading} />

                        <OrderBookTable data={topAsks} label="Asks" type="asks" isLoading={isLoading} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderBook;
