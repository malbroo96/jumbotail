import { useState, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import { useDebounce } from "../hooks/useDebounceThrottle";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounced search function
  const performSearch = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setProducts([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/v1/search/product?query=${encodeURIComponent(searchQuery)}`,
      );
      const data = await res.json();
      setProducts(data.data || []);
    } catch (err) {
      console.error("Search failed", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce the search with 500ms delay
  const debouncedSearch = useDebounce(performSearch, 500);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    setProducts([]);
  };

  return (
    <main className="px-6 py-8">
      {/* Search Box */}
      <div className="max-w-3xl mx-auto bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-lg">
        <div className="flex gap-3">
          {/* Input with clear button */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search iPhone, sasta iphone, iphone 50k..."
              value={query}
              onChange={handleInputChange}
              className="w-full px-4 py-3 pr-10 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {/* Clear button */}
            {query && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-lg font-bold transition"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Search button */}
          <button
            onClick={() => performSearch(query)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-yellow-400 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
            disabled={!query.trim()}
          >
            Search
          </button>
        </div>
      </div>

      {/* Results */}
      <section className="mt-10 max-w-6xl mx-auto">
        {loading && (
          <p className="text-center text-green-900 font-medium">
            🔍 Searching products…
          </p>
        )}

        {!loading && query && products.length === 0 && (
          <p className="text-center text-green-900">
            No products found. Try a different query.
          </p>
        )}

        {!loading && !query && products.length === 0 && (
          <p className="text-center text-green-700 text-sm">
            Start typing to search products…
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
