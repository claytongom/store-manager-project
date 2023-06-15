const sales = [
    {
      saleId: 1,
      date: '2023-06-13T13:22:47.000Z',
      productId: 1,
      quantity: 5,
    },
    {
      saleId: 1,
      date: '2023-06-13T13:22:47.000Z',
      productId: 2,
      quantity: 10,
    },
    {
      saleId: 2,
      date: '2023-06-13T13:22:47.000Z',
      productId: 3,
      quantity: 15,
    },
  ];

  const newSale = {
    id: 1,
    productsSold: [
      {
        productId: 1,
        quantity: 1,
      },
    ],
  };
  
  const productsSold = [
    {
      productId: 1,
      quantity: 1,
    },
  ];
  
  module.exports = {
    sales,
    newSale,
    productsSold,    
  };