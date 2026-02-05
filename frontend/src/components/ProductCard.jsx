export default function ProductCard({ product }) {
  const discount =
    product.mrp && product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  return (
    <div className="bg-white/40 backdrop-blur-md rounded-2xl p-5 shadow-lg hover:scale-[1.02] transition">
      <h2 className="text-lg font-bold text-green-900 mb-1">
        {product.title}
      </h2>

      <p className="text-sm text-gray-700 line-clamp-2 mb-3">
        {product.description}
      </p>

      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl font-semibold text-green-800">
          ₹{product.price}
        </span>
        {product.mrp && (
          <span className="text-sm line-through text-gray-500">
            ₹{product.mrp}
          </span>
        )}
        {discount > 0 && (
          <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
            {discount}% OFF
          </span>
        )}
      </div>

      <div className="flex justify-between items-center text-sm mt-3">
        <span className="text-yellow-700 font-medium">
          ⭐ {product.rating || "N/A"}
        </span>

        <span
          className={`font-semibold ${
            product.stock > 0 ? "text-green-700" : "text-red-600"
          }`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </div>
    </div>
  );
}
