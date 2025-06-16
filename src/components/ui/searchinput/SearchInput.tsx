import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

type SearchInputProps = {
  placeholder?: string;
  onSearch: (value: string) => void;
  delay?: number;
  className?: string;
};

export default function SearchInput({ placeholder = 'Search...', onSearch, delay = 300, className = '' }: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, delay, onSearch]);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>
  );
}
