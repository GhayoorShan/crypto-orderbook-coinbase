import React from 'react';
import { Order } from '../../../utils/types';

interface TableProps {
    data: Order[];
    label?: string;
    type: 'bids' | 'asks';
    isLoading: boolean;
}

const OrderBookTable: React.FC<TableProps> = ({ data, label, type, isLoading }) => {
    const placeholderData = Array(8).fill({ price: '--', size: '--', percentage: '0.00' });

    return (
        <div>
            {label && <h2 className={`text-xl font-semibold ${type === 'bids' ? 'text-green-500' : 'text-red-500'} mb-2`}>{label}</h2>}
            <div className="h-64 overflow-y-auto custom-scrollbar pr-2">
                {isLoading
                    ? placeholderData.map((_, index) => (
                          <div key={index} className="flex justify-between py-1">
                              <span className="shimmer w-20"></span>
                              <span className="shimmer w-20"></span>
                          </div>
                      ))
                    : data.map(({ price, size, percentage }) => (
                          <div
                              key={price}
                              className="flex justify-between py-1"
                              style={{
                                  backgroundImage: `linear-gradient(to right, ${
                                      type === 'bids'
                                          ? `rgba(0, 255, 0, ${Number(percentage) / 100})`
                                          : `rgba(255, 0, 0, ${Number(percentage) / 100})`
                                  } 0%, ${
                                      type === 'bids'
                                          ? `rgba(0, 255, 0, ${Number(percentage) / 100})`
                                          : `rgba(255, 0, 0, ${Number(percentage) / 100})`
                                  } 100%)`
                              }}
                          >
                              <span>{size}</span>
                              <span className={type === 'bids' ? 'text-green-500' : 'text-red-500'}>{price}</span>
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default OrderBookTable;
