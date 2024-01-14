
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CocktailDetails.css'; 

const CocktailDetails = () => {
    const { id } = useParams(); 
    const [cocktailDetails, setCocktailDetails] = useState(null);

    useEffect(() => {
        const fetchCocktailDetails = async () => {
            try {
                const response = await fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${id}`);
                const data = await response.json();
                setCocktailDetails(data.drinks[0]);
            } catch (error) {
                console.error('Error fetching cocktail details:', error);
            }
        };

        fetchCocktailDetails();
    }, [id]);

    if (!cocktailDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="cocktailDetailContainer">
            <div className="cocktailImageContainer">
                <img src={cocktailDetails.strDrinkThumb} alt={cocktailDetails.strDrink} className="cocktailImageDetails" />
            </div>
            <div className="cocktailInfoContainer">
                <h1 className="cocktailTitle">{cocktailDetails.strDrink}</h1>
                <p className="cocktailCategory"><strong>Category:</strong> {cocktailDetails.strCategory}</p>
                <p className="cocktailInstructions"><strong>Instructions:</strong> {cocktailDetails.strInstructions}</p>
                <p className="cocktailGlass"><strong>Glass:</strong> {cocktailDetails.strGlass}</p>
                <p className="cocktailIngredientsTitle"><strong>Ingredients:</strong></p>
                <ul className="cocktailIngredientsList">
                    {[...Array(15)].map((_, index) => {
                        const ingredient = cocktailDetails[`strIngredient${index + 1}`];
                        const measure = cocktailDetails[`strMeasure${index + 1}`];
                        return ingredient ? <li key={index} className="cocktailIngredientItem">{ingredient} - {measure}</li> : null;
                    })}
                </ul>
            </div>
        </div>
    );
};

export default CocktailDetails;
