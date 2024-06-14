import React from 'react';

interface TopOfBookProps {
    title: string;
    price: string;
    size: string;
    type: 'bid' | 'ask';
}

const TopOfBook: React.FC<TopOfBookProps> = ({ title, price, size, type }) => {
    return (
        <div className="bg-gray-800 rounded-2xl  shadow-lg min-w-80 max-w-96">
            <div className={`${type === 'bid' ? 'bg-red-600' : 'bg-green-700'} p-3 rounded-t-2xl`}>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
            </div>
            <div className="grid grid-cols-2 divide-x text-center divide-gray-500 text-gray-300 ">
                <div className="flex flex-col items-center py-3">
                    <p className="text-lg font-medium ">{price || '-'}</p>
                    <p className="text-sm text-gray-500">Price</p>
                </div>
                <div className="flex flex-col items-center py-3">
                    <p className="text-lg font-medium ">{size || '-'}</p>
                    <p className="text-sm text-gray-500">Size</p>
                </div>
            </div>
        </div>
    );
};

export default TopOfBook;
