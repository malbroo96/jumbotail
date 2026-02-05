import SearchPage from "./pages/SearchPage";

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="px-6 py-4 bg-white/20 backdrop-blur-md shadow-md">
        <div className="flex items-center gap-4 mb-2">
          <div className="text-4xl font-bold text-green-600">📦</div>
          <h1 className="text-2xl font-bold text-green-900">Jumbotail</h1>
        </div>
        <p className="text-sm text-green-800">
          🔍 Smart Electronics Search — Find the best products, ranked
          intelligently
        </p>
      </header>

      <SearchPage />
    </div>
  );
}
