import { useState } from 'react';
import { DropdownItem } from '../ui/dropdown/DropdownItem';
import { Dropdown } from '../ui/dropdown/Dropdown';
import { Link } from 'react-router';

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const name = localStorage.getItem('name') || 'Guest';
  const email = localStorage.getItem('email') || '';

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = '/signin';
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="flex items-center dropdown-toggle">
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11">
          <img src="/images/user/owner.jpg" alt="User avatar" />
        </span>
        <span className="block mr-1 font-medium text-theme-sm">{name}</span>
        <svg className={`stroke-current transition-transform ${isOpen ? 'rotate-180' : ''}`} width="18" height="20" viewBox="0 0 18 20">
          <path d="M4.3125 8.65625L9 13.3437L13.6875 8.65625" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <Dropdown isOpen={isOpen} onClose={closeDropdown} className="absolute right-0 mt-4 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="px-4 py-2">
          <span className="block font-medium">{name}</span>
          <span className="block text-sm text-gray-500 dark:text-gray-400">{email}</span>
        </div>
        <ul className="mt-2 space-y-1 border-t pt-2 px-2">
          <li>
            <DropdownItem tag="a" to="/profile" onItemClick={closeDropdown}>
              Edit Profile
            </DropdownItem>
          </li>
          <li>
            <DropdownItem tag="a" to="/settings" onItemClick={closeDropdown}>
              Account Settings
            </DropdownItem>
          </li>
          <li>
            <DropdownItem tag="a" to="/support" onItemClick={closeDropdown}>
              Support
            </DropdownItem>
          </li>
        </ul>
        <div className="px-2 py-2 border-t mt-2">
          <button onClick={handleSignOut} className="w-full text-left text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded">
            Sign Out
          </button>
        </div>
      </Dropdown>
    </div>
  );
}
