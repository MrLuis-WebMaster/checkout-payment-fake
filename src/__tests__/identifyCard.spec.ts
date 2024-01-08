import identifyCardType from "../utils/identifyCardType";


describe('identifyCardType', () => {
  it('should identify Visa card correctly', () => {
    const cardType = identifyCardType('4917484589897107');
    expect(cardType).toBe('visa');
  });

  it('should identify Mastercard correctly', () => {
    const cardType = identifyCardType('5425233430109903');
    expect(cardType).toBe('mastercard');
  });

  it('should identify American Express card correctly', () => {
    const cardType = identifyCardType('378282246310005');
    expect(cardType).toBe('americanExpress');
  });

  it('should return "Desconocido" for unknown card types', () => {
    const cardType = identifyCardType('3566000020000410');
    expect(cardType).toBe('Desconocido');
  });
});
