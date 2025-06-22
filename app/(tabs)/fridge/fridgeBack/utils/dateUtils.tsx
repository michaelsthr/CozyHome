export const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
};

export const isExpired = (date: string | undefined): boolean => {
  if (!date) return false;
  
  const expireDate = new Date(date);
  const today = new Date();
  
  expireDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  
  return expireDate < today;
};