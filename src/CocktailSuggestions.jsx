import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CocktailIcon from './images/CocktailIcon.png';
import './CocktailSuggestions.css';

const CocktailSuggestions = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { ingredients: initialIngredients } = location.state || { ingredients: [] };
    const [ingredients, setIngredients] = useState(initialIngredients);
    const [possibleCocktails, setPossibleCocktails] = useState([]);


    const formatIngredient = (ingredients) => ingredients.map(ingredient => ingredient.replace(/\s+/g, '_')).join(',');

    const fetchCocktails = async (ingredientCombination) => {
        const formattedIngredients = formatIngredient(ingredientCombination);
        const url = `https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=${formattedIngredients}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return Array.isArray(data.drinks) ? data.drinks.map(drink => ({
                id: drink.idDrink,
                name: drink.strDrink,
                image: drink.strDrinkThumb
            })) : [];
        } catch (error) {
            console.error(`Error fetching cocktails for ${formattedIngredients}:`, error);
            return [];
        }
    };

    const getCombinations = (arr, minSize, maxSize) => {
        const result = [];
        const combine = (combo, depth, start) => {
            if (combo.length === depth) {
                result.push(combo);
                return;
            }
            for (let i = start; i < arr.length; i++) {
                combine([...combo, arr[i]], depth, i + 1);
            }
        };

        for (let depth = minSize; depth <= maxSize; depth++) {
            combine([], depth, 0);
        }

        return result;
    };

    const handleCocktailClick = (cocktailId) => {
        navigate(`/cocktail/${cocktailId}`); // Navigate to cocktail details with ID
    };

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const removeIngredient = (index) => {
        const newIngredients = ingredients.filter((_, idx) => idx !== index);
        setIngredients(newIngredients);
    };

    useEffect(() => {
        const getCocktails = async () => {
            let allCocktailsMap = new Map();
            for (let size = 2; size <= 4; size++) {
                const ingredientCombinations = getCombinations(ingredients, size, size);
                for (const combination of ingredientCombinations) {
                    const drinks = await fetchCocktails(combination);
                    drinks.forEach(drink => allCocktailsMap.set(drink.id, drink));
                    await delay(100); // Delay to avoid rate limit
                }
            }
            setPossibleCocktails(Array.from(allCocktailsMap.values()));
        };

        getCocktails();
    }, [ingredients]);



    return (
         
        <div>
            <div className="flexContainerCS">
                
                <img
                    src={CocktailIcon}
                    alt="Cocktail Icon"
                    className="topIconCS"
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }} 
                />
                <h1>COCKTAILS:</h1>
            </div>

            <div className="ingredientsContainer">
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredientBox">
                        <span className="ingredientText">{ingredient}</span>
                        <button onClick={() => removeIngredient(index)} className="removeButton">x</button>
                    </div>
                ))}
            </div>

            <div className="cocktailGrid">
                <div className="cocktailCardsContainer">
                    {possibleCocktails.map((cocktail) => (
                        <div key={cocktail.id} className="cocktailCard" onClick={() => handleCocktailClick(cocktail.id)}>
                            <img src={cocktail.image} alt={cocktail.name} className="cocktailImage" />
                            <div className="cocktailName">{cocktail.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};



export default CocktailSuggestions;