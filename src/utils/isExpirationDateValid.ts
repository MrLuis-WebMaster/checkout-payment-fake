const isExpirationDateValid = (month: string, year: string): boolean => {
    if (!month || !year) return false;
  
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const expirationYear = parseInt(year, 10);
    const expirationMonth = parseInt(month, 10);
  
    if ( expirationYear < currentYear || (expirationYear === currentYear && expirationMonth < currentMonth)) return false;
  
    return true;
  };
  
export default isExpirationDateValid