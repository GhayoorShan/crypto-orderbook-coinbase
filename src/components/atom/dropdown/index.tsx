import React from 'react';

interface DropdownProps {
    options: string[];
    value?: string;
    onChange: (value: string) => void;
    label: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange, label }) => {
    return (
        <div className="dropdown w-28">
            <label className="block text-xs font-medium text-gray-300 mb-1 ml-1">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-base leading-6 text-white focus:outline-none  sm:text-sm sm:leading-5 hover:bg-gray-700  duration-150"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
