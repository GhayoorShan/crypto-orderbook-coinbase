import React, { useState } from 'react';
import OrderBook from './OrderBook';
import Dropdown from '../../components/atom/dropdown';
import { ALLOWED_CURRENCY } from '../../utils/constants';

const Dashboard: React.FC = () => {
    const [pair, setPair] = useState('BTC-USD');

    const handleChange = (value: string) => {
        setPair(value);
    };
    return (
        <div className=" bg-gray-900 min-h-screen text-white">
            <div className="bg-gray-800 py-4 shadow-lg px-5">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-semibold text-gray-300">Crypto Order Book</h1>
                    <Dropdown options={ALLOWED_CURRENCY} value={pair.toString()} onChange={handleChange} label="Select Currency Pair" />
                </div>
            </div>
            <div className="container mx-auto py-3 px-5">
                <OrderBook pair={pair} />
            </div>
        </div>
    );
};

export default Dashboard;
