import React from 'react';

export default function ProductCard({ product }) {
  return (
    <div className="p-4 border rounded">
      <h3 className="font-bold">{product?.name || 'Product'}</h3>
      <p>${product?.price ?? '0.00'}</p>
    </div>
  );
}
