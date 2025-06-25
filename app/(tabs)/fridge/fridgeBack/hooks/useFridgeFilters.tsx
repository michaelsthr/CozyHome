import { useState, useMemo } from 'react';
import { KuehlschrankItem, FridgeCategoryType } from '../types/fridge';

export const useFridgeFilters = (items: KuehlschrankItem[] = []) => {
  const [activeFilter, setActiveFilter] = useState<FridgeCategoryType | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'amount'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredAndSortedItems = useMemo(() => {
    const filteredItems = activeFilter === 'ALL'
      ? [...items]
      : items.filter(item => item.kategorie === activeFilter);

    return filteredItems.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'category':
          comparison = (a.kategorie || '').localeCompare(b.kategorie || '');
          break;
        case 'amount':
          comparison = (a.anzahl || 0) - (b.anzahl || 0);
          break;
      }
      
      return sortDirection === 'desc' ? -comparison : comparison;
    });
  }, [items, activeFilter, sortBy, sortDirection]);

  const handleSort = (field: 'name' | 'category' | 'amount') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  return {
    activeFilter,
    setActiveFilter,
    sortBy,
    sortDirection,
    filteredAndSortedItems,
    handleSort
  };
};