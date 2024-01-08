export const simulateApiCall = async () => {
    const randomSuccess = Math.random() < 0.5;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (randomSuccess) {
          resolve('Pago completado exitosamente');
        } else {
          reject('Error al procesar pago');
        }
      }, 1000); 
    });
};