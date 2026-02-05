import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './store/userSlice';
import type { RootState, AppDispatch } from './store/store';
import { useDarkMode } from './hooks/useDarkMode';
import { useUserFilters } from './hooks/useUserFilters';
import UserCard from './components/shared/UserCard';
import UserModal from './components/shared/UserModal';
import './globals.css';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { 
    searchTerm, setSearchTerm, selectedCity, setSelectedCity, 
    sortBy, setSortBy, filteredUsers, cities 
  } = useUserFilters(users || []);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const totalPages = Math.ceil((filteredUsers?.length || 0) / usersPerPage);
  const currentUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  if (error) return <div className="h-screen flex items-center justify-center text-red-500 font-bold tracking-widest uppercase">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 font-poppins p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-16 flex justify-between items-center">
          <h1 className="text-2xl font-black uppercase tracking-tighter text-blue-600 dark:text-white">
            Users Management Module
          </h1>
          <button onClick={toggleDarkMode} className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:scale-110 transition-transform">
            {isDarkMode ? (
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="relative">
             <input 
              type="text" placeholder="Search users..." 
              className="w-full px-6 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] outline-none focus:ring-4 focus:ring-blue-500/10 font-medium dark:text-white transition-all"
              value={searchTerm} onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
            />
          </div>
          <select 
            className="px-6 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] outline-none font-bold text-slate-500 dark:text-slate-300"
            value={selectedCity} onChange={(e) => {setSelectedCity(e.target.value); setCurrentPage(1);}}
          >
            <option value="">All Cities</option>
            {cities.map(city => <option key={city} value={city}>{city}</option>)}
          </select>
          <select 
            className="px-6 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.5rem] outline-none font-bold text-slate-500 dark:text-slate-300"
            value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="">Sort By</option>
            <option value="name">Name (A-Z)</option>
            <option value="email">Email (A-Z)</option>
          </select>
        </div>

        {loading ? (
          <div className="py-40 text-center font-black text-blue-600 animate-pulse tracking-[0.3em] uppercase">Loading Database...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentUsers.map(user => <UserCard key={user.id} user={user} />)}
            </div>

            {totalPages > 1 && (
              <div className="mt-20 flex justify-center items-center gap-4">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                  className="flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 disabled:opacity-20 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                  Pre
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button 
                      key={i} onClick={() => setCurrentPage(i + 1)}
                      className={`w-12 h-12 flex items-center justify-center text-sm font-black transition-all rounded-2xl ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30 scale-110' : 'bg-white dark:bg-slate-900 text-slate-400 border border-slate-100 dark:border-slate-800'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 disabled:opacity-20 transition-all"
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            )}
          </>
        )}
        <UserModal />
      </div>
    </div>
  );
}

export default App;