const identifyCardType = (cardNumber: string) => {
    if (/^4/.test(cardNumber)) {
      return 'visa';
    } else if (/^5[1-5]/.test(cardNumber)) {
      return 'mastercard';
    } else if (/^3[47]/.test(cardNumber)) {
      return 'americanExpress';
    } else {
      return 'Desconocido';
    }
};

export default identifyCardType