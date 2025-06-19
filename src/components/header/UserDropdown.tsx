import { useState } from 'react';

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const email = localStorage.getItem('email') || 'guest@example.com';

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="flex items-center">
        <span className="block mr-1 font-medium text-theme-sm">{email}</span>
      </button>
    </div>
  );
}
