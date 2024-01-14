import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import SearchPage from './SearchPage';
import CocktailDetails from './CocktailDetails';
import AddIngredientsPage from './AddIngredients';
import CocktailSuggestionsPage from './CocktailSuggestions';


const App = () => {
    return (
        <Router>
            
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/cocktail/:id" element={<CocktailDetails />} />
                <Route path="/add-ingredients" element={<AddIngredientsPage />} />
                <Route path="/cocktail-suggestions" element={<CocktailSuggestionsPage />} />
            </Routes>
            
        </Router>
    );
};

export default App;