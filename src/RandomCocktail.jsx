import React, { useState, useEffect } from 'react';

const RandomCocktail = () => {
    const [cocktail, setCocktail] = useState(null);

    useEffect(() => {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
            .then((response) => response.json())
            .then((data) => {
                // The API returns an array of drinks, we'll take the first one
                setCocktail(data.drinks[0]);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
                setCocktail(null);
            });
    }, []);

    if (!cocktail) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{cocktail.strDrink}</h1>
            <p>ID: {cocktail.idDrink}</p>
            <p>Category: {cocktail.strCategory}</p>
            <p>Alcoholic: {cocktail.strAlcoholic === "Alcoholic" ? 'Yes' : 'No'}</p>

            <p>Glass: {cocktail.strGlass}</p>
            <p>Instructions: {cocktail.strInstructions}</p>
            <p>Ingredients:</p>
            <ul>
                {Object.keys(cocktail).map((key) => {
                    if (key.startsWith('strIngredient') && cocktail[key]) {
                        return <li key={key}>{cocktail[key]}: {cocktail[`strMeasure${key.slice(13)}`]}</li>;
                    }
                    return null;
                })}
            </ul>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
        </div>
    );
};

export default RandomCocktail;