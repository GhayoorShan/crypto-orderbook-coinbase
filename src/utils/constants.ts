import { TickerData } from './types';

export const FEED_URL = `wss://ws-feed.pro.coinbase.com`;
export const ALLOWED_CURRENCY = ['BTC-USD', 'ETH-USD', 'LTC-USD', 'BCH-USD'];
export const ALLOWED_AGGREGATION = ['0.01', '0.1', '1', '50', '100'];
export const COINBASE_API_URL = 'https://api.pro.coinbase.com';

export const initialTickerData: TickerData[] = [
    {
        best_bid: '',
        best_bid_size: '',
        best_ask: '',
        best_ask_size: '',
        time: ''
    }
];

export const initialTickerCurrentData: TickerData = {
    best_bid: '',
    best_bid_size: '',
    best_ask: '',
    best_ask_size: '',
    time: ''
};
