import { useState, useMemo } from 'react';
import type { User } from '../types/user';

export const useUserFilters = (users: User[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'email' | ''>('');

  const filteredUsers = useMemo(() => {
    const safeUsers = Array.isArray(users) ? users : [];
    let result = [...safeUsers];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(u => 
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(term) || 
        u.email.toLowerCase().includes(term)
      );
    }
    if (selectedCity) result = result.filter(u => u.address?.city === selectedCity);
    if (sortBy === 'name') result.sort((a, b) => (a.firstName || '').localeCompare(b.firstName || ''));
    if (sortBy === 'email') result.sort((a, b) => (a.email || '').localeCompare(b.email || ''));
    
    return result;
  }, [users, searchTerm, selectedCity, sortBy]);

  const cities = useMemo(() => {
    const safeUsers = Array.isArray(users) ? users : [];
    return Array.from(new Set(safeUsers.map(u => u.address?.city).filter(Boolean))).sort();
  }, [users]);

  return { searchTerm, setSearchTerm, selectedCity, setSelectedCity, sortBy, setSortBy, filteredUsers, cities };
};