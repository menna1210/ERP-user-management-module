import { useState, useMemo } from 'react';
import type { User } from '../types/user';

export const useUserFilters = (users: User[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'email' | ''>('');

  const filteredUsers = useMemo(() => {
    let filtered = users.filter(user => {
      const firstName = user.firstName.toLowerCase();
      const lastName = user.lastName.toLowerCase();
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const email = user.email.toLowerCase();
      const search = searchTerm.toLowerCase();

      const matchesSearch = 
        firstName.startsWith(search) || 
        lastName.startsWith(search) || 
        fullName.startsWith(search) ||
        email.startsWith(search);

      const matchesCity = selectedCity === '' || user.address.city === selectedCity;

      return matchesSearch && matchesCity;
    });

    if (sortBy === 'name') {
      filtered.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (sortBy === 'email') {
      filtered.sort((a, b) => a.email.localeCompare(b.email));
    }

    return filtered;
  }, [users, searchTerm, selectedCity, sortBy]);

  const cities = useMemo(() => {
    const allCities = users.map(user => user.address.city);
    return Array.from(new Set(allCities));
  }, [users]);

  return {
    searchTerm,
    setSearchTerm,
    selectedCity,
    setSelectedCity,
    sortBy,
    setSortBy,
    filteredUsers,
    cities
  };
};