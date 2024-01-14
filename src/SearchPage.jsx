import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CocktailIcon from './images/CocktailIcon.png';
import './SearchPage.css'; 

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const navigate = useNavigate();



    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/search.php?s=${query}`);
            const data = await response.json();
            setSearchResults(data.drinks);
        } catch (error) {
            console.error("Error fetching data: ", error);
            setSearchResults([]);
        }
    };

    return (
        <div className="searchPage">
            <div className="flexContainer">
                <img
                    src={CocktailIcon}
                    alt="Cocktail Icon"
                    className="topLeftIcon"
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }}
                />
                <form onSubmit={handleSearch} className="searchForm">
                    <input
                        type="text"
                        placeholder="Search for cocktails"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="searchInput"
                    />
                    <button type="submit" className="searchButton">Search</button>
                </form>
            </div>
            <div className="searchResults">
                {searchResults?.map((drink) => (
                    <div key={drink.idDrink} className="resultItem" onClick={() => navigate(`/cocktail/${drink.idDrink}`)}>
                        <img src={drink.strDrinkThumb} alt={drink.strDrink} className="resultImage" />
                        <p className="resultName">{drink.strDrink}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;