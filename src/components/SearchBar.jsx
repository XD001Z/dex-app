import { useState } from "react";
import { useSearch } from "../hooks/useSearch";

const SearchBar = () => {
    const [name, setName] = useState('');
    const { search, isLoading, error } = useSearch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        search(name);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e) => setName(e.target.value)}  value={name} className="search-inp"/>
            <button disabled={isLoading} className="search-btn">🔎</button>
            {error && <div>{error}</div>}
        </form>
    )
}

export default SearchBar;