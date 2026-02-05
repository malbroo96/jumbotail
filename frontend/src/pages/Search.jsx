import React from 'react';
import ProductCard from '../components/ProductCard';

export default function Search() {
  const sample = [{ name: 'Sample', price: 9.99 }];
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Search</h1>
      <div className="grid gap-4 mt-4">
        {sample.map((p, i) => (
          <ProductCard key={i} product={p} />
        ))}
      </div>
    </div>
  );
}
