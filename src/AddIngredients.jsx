import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CocktailIcon from './images/CocktailIcon.png';
import './AddIngredients.css';

const AddIngredientsPage = () => {
    
    const [ingredients, setIngredients] = useState(['', '']);
    const location = useLocation();
    const navigate = useNavigate();

    const handleIngredientChange = (index, event) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = event.target.value;
        setIngredients(newIngredients);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const handleSubmit = () => {
        const filteredIngredients = ingredients.filter(ingredient => ingredient.trim() !== '');
        if (filteredIngredients.length >= 2) {
            console.log('Submitted Ingredients:', filteredIngredients);
            navigate('/cocktail-suggestions', { state: { ingredients: filteredIngredients } });
        }
    };

    const isSubmitEnabled = ingredients.filter(ingredient => ingredient.trim() !== '').length >= 2;

    return (
        <div>
            <div className="flexContainerAI">
                 <img
                     src={CocktailIcon}
                     alt="Cocktail Icon"
                     className="topIcon"
                     onClick={() => navigate('/')}
                     style={{ cursor: 'pointer' }} 
                 />
                <h1>ADD INGREDIENTS</h1>
            </div>

            {ingredients.map((ingredient, index) => (
                <input
                    key={index}
                    type="text"
                    value={ingredient}
                    onChange={(event) => handleIngredientChange(index, event)}
                    placeholder="Enter ingredient"
                />
            ))}
            <button onClick={handleAddIngredient}>+</button>
            <button onClick={handleSubmit} disabled={!isSubmitEnabled}>SUBMIT</button>
        </div>
    );
};

export default AddIngredientsPage;

