export const order = {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      {
        name: 'customer',
        title: 'Customer',
        type: 'object',
        fields: [
          { name: 'name', title: 'Name', type: 'string' },
          { name: 'email', title: 'Email', type: 'string' },
          { name: 'address', title: 'Address', type: 'string' },
        ],
      },
      {
        name: 'products',
        title: 'Products',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'product', type: 'reference', to: [{ type: 'products' }] }, // Fix here
              { name: 'quantity', type: 'number' },
            ],
          },
        ],
      },
      {
        name: 'totalAmount',
        title: 'Total Amount',
        type: 'number',
      },
      {
        name: 'paymentStatus',
        title: 'Payment Status',
        type: 'string',
        options: {
          list: ['pending', 'success', 'failed'],
        },
      },
      {
        name: 'createdAt',
        title: 'Created At',
        type: 'datetime',
      },
    ],
  };
  