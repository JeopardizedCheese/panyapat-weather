import { useState } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
    onSearch: (city: string) => void;
}

export default function SearchBar({ onSearch } : SearchBarProps) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="relative max-w-md mx-auto border-gray-600 border rounded-3xl mt-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text"
                placeholder="Search for a city..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-gray-300 rounded-3xl focus:ring-blue-500 focus:border-transparent" />
            </div>
        </form>
    )
}