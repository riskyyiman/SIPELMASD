import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type Option = {
  value: string;
  label: string;
};

type FilterDropdownProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export default function FilterDropdown({ options, value, onChange, className = '' }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {selectedOption?.label}
        <ChevronDown className={`w-5 h-5 ml-2 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 w-full mt-1 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm ${option.value === value ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
