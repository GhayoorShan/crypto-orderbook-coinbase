import { COINBASE_API_URL } from '../constants';

export const fetchInitialOrderBook = async (pair: string) => {
    const response = await fetch(`${COINBASE_API_URL}/products/${pair}/book?level=2`);
    const data = await response.json();
    const bids = new Map<number, number>();
    const asks = new Map<number, number>();

    data.bids.forEach((bid: [string, string]) => {
        bids.set(parseFloat(bid[0]), parseFloat(bid[1]));
    });

    data.asks.forEach((ask: [string, string]) => {
        asks.set(parseFloat(ask[0]), parseFloat(ask[1]));
    });

    return { bids, asks };
};
