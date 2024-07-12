import { Order } from './types';
const aggregatePrice = (price: number, aggregation: number): number => {
    return Math.floor(price / aggregation) * aggregation;
};

export const getTopOrdersWithPercentage = (orders: Map<number, number>, topN: number, isAscending: boolean, aggregation: number): Order[] => {
    const aggregatedOrders = new Map<number, number>();
    console.log('isAscending-', isAscending);

    // Aggregate orders based on the current aggregation level
    orders.forEach((size, price) => {
        const aggregatedPrice = aggregatePrice(price, aggregation);
        if (aggregatedOrders.has(aggregatedPrice)) {
            //The ! operator is a TypeScript non-null assertion operator, the value accessing is not null or undefined.
            aggregatedOrders.set(aggregatedPrice, aggregatedOrders.get(aggregatedPrice)! + size);
        } else {
            aggregatedOrders.set(aggregatedPrice, size);
        }
    });

    let topOrders = Array.from(aggregatedOrders.entries())
        .map(([price, size]) => ({ price: roundToDecimals(price, 2), size: roundToDecimals(size, 8) }))
        // .sort((a, b) => (isAscending ? a.price - b.price : b.price - a.price))
        .slice(0, topN);

    const totalSize = topOrders.reduce((sum, order) => sum + order.size, 0);

    return topOrders.map((order) => ({
        ...order,
        percentage: totalSize > 0 ? (order.size / totalSize) * 100 : 0
    }));
};

export const updateOrderBook = (orderBook: Map<number, number>, changes: [string, string, string][], side: 'buy' | 'sell'): Map<number, number> => {
    changes.forEach(([currentSide, priceStr, sizeStr]) => {
        console.log(currentSide, priceStr, sizeStr);

        const price = parseFloat(priceStr);
        const size = parseFloat(sizeStr);

        if (size === 0) {
            orderBook.delete(price);
        }
        let remainingSize = size;
        if (orderBook.has(price)) {
            // console.log('price', price, 'size', size, 'remainingSize', remainingSize);

            const existingSize = orderBook.get(price)!;
            if (existingSize > remainingSize) {
                orderBook.set(price, existingSize - remainingSize);
                remainingSize = 0;
            } else {
                remainingSize -= existingSize;
                orderBook.delete(price);
            }
        }

        if (remainingSize > 0) {
            orderBook.set(price, remainingSize);
        }
    });

    // Sort  order book
    const sortedOrderBook = new Map([...orderBook.entries()].sort((a, b) => (side === 'buy' ? b[0] - a[0] : a[0] - b[0])));

    return sortedOrderBook;
};

export const roundToDecimals = (num: number, decimals: number): number => {
    const factor = Math.pow(10, decimals);
    return Math.round(num * factor) / factor;
};
