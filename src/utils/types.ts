export interface Order {
    price: number;
    size: number;
    percentage?: number;
}

export interface TickerData {
    best_bid: string;
    best_bid_size: string;
    best_ask: string;
    best_ask_size: string;
    time: string;
}

export interface OrderBookProps {
    pair: string;
}
