import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
        >
          <Heart className="text-rose-500" size={24} />
          <span className={`font-serif text-xl font-medium transition-colors duration-300 ${
            isScrolled ? 'text-rose-600' : 'text-rose-500'
          }`}>Tribute to Women</span>
        </Link>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors duration-300 hover:text-rose-500 ${
                  location.pathname === '/' 
                    ? 'text-rose-500' 
                    : isScrolled ? 'text-gray-800' : 'text-gray-700'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/khulu" 
                className={`text-sm font-medium transition-colors duration-300 hover:text-rose-500 ${
                  location.pathname === '/khulu' 
                    ? 'text-rose-500' 
                    : isScrolled ? 'text-gray-800' : 'text-gray-700'
                }`}
              >
                Khulu
              </Link>
            </li>
            <li className="relative group">
              <button 
                className={`text-sm font-medium transition-colors duration-300 hover:text-rose-500 flex items-center ${
                  location.pathname.includes('/tribute/') 
                    ? 'text-rose-500' 
                    : isScrolled ? 'text-gray-800' : 'text-gray-700'
                }`}
              >
                All Tributes
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left">
                <div className="bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 p-2">
                  <Link to="/tribute/aunt-kazi" className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-500 rounded-md">Aunt Kazi</Link>
                  <Link to="/tribute/aunt-banana" className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-500 rounded-md">Aunt Banana</Link>
                  <Link to="/tribute/aunt-sibo" className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-500 rounded-md">Aunt Sibo</Link>
                  <Link to="/tribute/aunt-mpoki" className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-500 rounded-md">Aunt Mpoki</Link>
                  <Link to="/tribute/aunt-tshidi" className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-500 rounded-md">Aunt Tshidi</Link>
                  <Link to="/tribute/aunt-nderi" className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-500 rounded-md">Aunt Nderi</Link>
                  <Link to="/tribute/sis-baba" className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-500 rounded-md">Sis Baba</Link>
                  <Link to="/tribute/aunt-wiza" className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-500 rounded-md">Aunt Wiza</Link>
                  <Link to="/tribute/gege" className="block px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-500 rounded-md">Gege</Link>
                </div>
              </div>
            </li>
          </ul>
        </nav>
        
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700 hover:text-rose-500 transition-colors duration-300"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md animate-fade-in">
          <div className="container-custom py-4">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className={`block text-sm font-medium transition-colors duration-300 hover:text-rose-500 ${
                    location.pathname === '/' ? 'text-rose-500' : 'text-gray-800'
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/khulu" 
                  className={`block text-sm font-medium transition-colors duration-300 hover:text-rose-500 ${
                    location.pathname === '/khulu' ? 'text-rose-500' : 'text-gray-800'
                  }`}
                >
                  Khulu
                </Link>
              </li>
              <li className="pt-2 border-t border-gray-100">
                <span className="block text-xs font-medium text-gray-500 mb-2">All Tributes</span>
                <ul className="space-y-2 pl-2">
                  <li>
                    <Link to="/tribute/aunt-kazi" className="block text-sm text-gray-700 hover:text-rose-500">Aunt Kazi</Link>
                  </li>
                  <li>
                    <Link to="/tribute/aunt-banana" className="block text-sm text-gray-700 hover:text-rose-500">Aunt Banana</Link>
                  </li>
                  <li>
                    <Link to="/tribute/aunt-sibo" className="block text-sm text-gray-700 hover:text-rose-500">Aunt Sibo</Link>
                  </li>
                  <li>
                    <Link to="/tribute/aunt-mpoki" className="block text-sm text-gray-700 hover:text-rose-500">Aunt Mpoki</Link>
                  </li>
                  <li>
                    <Link to="/tribute/aunt-tshidi" className="block text-sm text-gray-700 hover:text-rose-500">Aunt Tshidi</Link>
                  </li>
                  <li>
                    <Link to="/tribute/aunt-nderi" className="block text-sm text-gray-700 hover:text-rose-500">Aunt Nderi</Link>
                  </li>
                  <li>
                    <Link to="/tribute/sis-baba" className="block text-sm text-gray-700 hover:text-rose-500">Sis Baba</Link>
                  </li>
                  <li>
                    <Link to="/tribute/aunt-wiza" className="block text-sm text-gray-700 hover:text-rose-500">Aunt Wiza</Link>
                  </li>
                  <li>
                    <Link to="/tribute/gege" className="block text-sm text-gray-700 hover:text-rose-500">Gege</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;