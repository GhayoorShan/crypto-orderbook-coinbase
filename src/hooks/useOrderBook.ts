import { useEffect, useState, useCallback } from 'react';
import useWebSocket from './useWebSocket';
import { getTopOrdersWithPercentage, updateOrderBook } from '../utils/helpers';
import { fetchInitialOrderBook } from '../utils/api/coinbaseApi';
import { Order, TickerData } from '../utils/types';

const useOrderBook = (pair: string, aggregation: number) => {
    const [bids, setBids] = useState<Map<number, number>>(new Map());
    const [asks, setAsks] = useState<Map<number, number>>(new Map());
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [topBids, setTopBids] = useState<Order[]>([]);
    const [topAsks, setTopAsks] = useState<Order[]>([]);
    const [currentPrice, setCurrentPrice] = useState<number | null>(null);
    const [tickerData, setTickerData] = useState<TickerData[]>([
        {
            best_bid: '',
            best_bid_size: '',
            best_ask: '',
            best_ask_size: '',
            time: ''
        }
    ]);
    const { sendMessage } = useWebSocket(
        pair,
        useCallback((update) => {
            // Filtering changes for 'buy' and 'sell' separately
            const buyChanges = update.changes.filter((change) => change[0] === 'buy');
            const sellChanges = update.changes.filter((change) => change[0] === 'sell');

            setBids((prevBids) => updateOrderBook(new Map(prevBids), buyChanges, 'buy'));
            setAsks((prevAsks) => updateOrderBook(new Map(prevAsks), sellChanges, 'sell'));
        }, []),
        useCallback((price) => {
            setCurrentPrice(price);
        }, []),
        useCallback((data: any) => {
            // console.log('data', data);

            const { best_bid, best_bid_size, best_ask, best_ask_size, time } = data;
            const newData: TickerData = { best_bid, best_bid_size, best_ask, best_ask_size, time };
            setTickerData((prevData) => {
                const updatedData = [...prevData, newData];
                return updatedData.slice(-200);
            });
        }, [])
    );
    const initializeOrderBook = async () => {
        setIsLoading(true);
        setTickerData([]);
        setError(null);
        try {
            const { bids, asks } = await fetchInitialOrderBook(pair);
            setBids(bids);
            setAsks(asks);

            sendMessage({
                type: 'subscribe',
                channels: [
                    { name: 'level2_batch', product_ids: [pair] },
                    { name: 'ticker', product_ids: [pair] }
                ]
            });
        } catch (err) {
            setError('Failed to fetch initial order book data');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        initializeOrderBook();

        return () => {
            sendMessage({
                type: 'unsubscribe',
                channels: [
                    { name: 'level2_batch', product_ids: [pair] },
                    { name: 'ticker', product_ids: [pair] }
                ]
            });
        };
    }, [pair, sendMessage]);

    useEffect(() => {
        setTopBids(getTopOrdersWithPercentage(bids, 10, false, aggregation));
        setTopAsks(getTopOrdersWithPercentage(asks, 10, true, aggregation));
    }, [bids, asks, aggregation]);

    return { topBids, topAsks, currentPrice, tickerData, isLoading, error, setBids, setAsks };
};

export default useOrderBook;
