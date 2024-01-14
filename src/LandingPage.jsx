import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LandingPage.css';
import CocktailIcon from './images/CocktailIcon.png';

const LandingPage = () => {
    const navigate = useNavigate(); 

    const handleSearch = () => {
        navigate('/search'); // Navigate to the search page
    };

    const handleAddIngredients = () => {
        navigate('/add-ingredients'); // Navigate to Add Ingredients page
    };


    return (
        <div className="landing-page">
            <div className="brand-logo">
                <img src={CocktailIcon} alt="Cocktail Icon" />
            </div>
            <div className="brand-name">MIXMATCH</div>
            <div className="button-container">
                <button onClick={handleSearch} className="search-button">
                    Search for Cocktails
                </button>
                <button onClick={handleAddIngredients} className="ingredients-button">
                    Add Ingredients
                </button>
            </div>
        </div>
    );
};

export default LandingPage;