import { useEffect, useRef, useState, useCallback } from 'react';

interface OrderUpdate {
    type: string;
    changes: [string, string, string][];
}

const COINBASE_WS_URL = 'wss://ws-feed.pro.coinbase.com';

const useWebSocket = (
    pair: string,
    onOrderUpdate: (update: OrderUpdate) => void,
    onTickerUpdate: (price: number) => void,
    onBestBidsUpdate: ([]) => void
) => {
    const ws = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    const messageQueue = useRef<any[]>([]);

    const sendMessage = useCallback((message: any) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(message));
        } else {
            messageQueue.current.push(message);
        }
    }, []);

    useEffect(() => {
        ws.current = new WebSocket(COINBASE_WS_URL);

        ws.current.onopen = () => {
            setIsConnected(true);
            while (messageQueue.current.length > 0) {
                const message = messageQueue.current.shift();
                ws.current?.send(JSON.stringify(message));
            }
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'l2update') {
                onOrderUpdate(data);
            } else if (data.type === 'ticker') {
                onTickerUpdate(parseFloat(data.price));
                onBestBidsUpdate(data);
            }
        };

        ws.current.onclose = () => {
            setIsConnected(false);
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error: ', error);
        };

        return () => {
            if (ws.current) {
                const unsubscribeMessage = {
                    type: 'unsubscribe',
                    channels: [
                        { name: 'level2_batch', product_ids: [pair] },
                        { name: 'ticker', product_ids: [pair] }
                    ]
                };
                if (ws.current.readyState === WebSocket.OPEN) {
                    ws.current.send(JSON.stringify(unsubscribeMessage));
                }
                ws.current.close();
            }
        };
    }, [pair, onOrderUpdate, onTickerUpdate, onBestBidsUpdate]);

    return { sendMessage };
};

export default useWebSocket;
