import isExpirationDateValid from "../utils/isExpirationDateValid";

describe('isExpirationDateValid', () => {
  it('should return false for an expired date', () => {
    const expiredMonth = '01';
    const expiredYear = (new Date().getFullYear() - 1).toString();
    const result = isExpirationDateValid(expiredMonth, expiredYear);
    expect(result).toBe(false);
  });

  
  it('should return true for a future date', () => {
    const futureMonth = '12';
    const futureYear = (new Date().getFullYear() + 1).toString();
    const result = isExpirationDateValid(futureMonth, futureYear);
    expect(result).toBe(true);
  });

  it('should return false for an invalid date format', () => {
    const invalidMonth = '13';
    const invalidYear = '2022';
    const result = isExpirationDateValid(invalidMonth, invalidYear);
    expect(result).toBe(false);
  });

  it('should return false for missing month or year', () => {
    const missingMonth = '06';
    const missingYear = '';
    const result = isExpirationDateValid(missingMonth, missingYear);
    expect(result).toBe(false);
  });
});
