import React from 'react';
import './LandingPage.css'; // Make sure to create a corresponding CSS file for styling

const LandingPage = () => {
    const handleSearch = () => {
        // Implement your search logic or redirect to search page
        console.log('Search for cocktails!');
    };

    const handleAddIngredients = () => {
        // Implement your add ingredients logic or redirect to ingredients page
        console.log('Add ingredients!');
    };

    return (
        <div className="landing-page">
            <div className="brand-logo">
                {/* Replace src with your actual logo image path */}
                <img src="/path-to-your-logo.png" alt="MixMatch Logo" />
            </div>
            <div className="brand-name">MixMatch</div>
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