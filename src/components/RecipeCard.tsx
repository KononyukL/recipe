import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecipeStore } from '../store/useRecipeStore.ts';
import { IMeal } from '../type/meals.ts';
import { MouseEvent } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

interface IRecipeCard {
  recipe: IMeal;
  isDelete?: boolean;
}
const RecipeCard = ({ recipe, isDelete }: IRecipeCard) => {
  const navigate = useNavigate();

  const { savedRecipes, addRecipe, removeRecipe } = useRecipeStore();
  const isSaved = savedRecipes.some((r) => r.idMeal === recipe.idMeal);

  const handleSave = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isSaved) {
      removeRecipe(recipe.idMeal);
    } else {
      addRecipe(recipe);
    }
  };

  const onClick = () => {
    navigate(`recipe/${recipe.idMeal}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }} onClick={onClick}>
      <CardMedia
        component="img"
        height="194"
        image={recipe.strMealThumb}
        alt="Meals"
      />
      <CardContent>
        <Typography>{recipe.strMeal}</Typography>
        <Typography>{recipe.strCategory}</Typography>
        <Typography>{recipe.strArea}</Typography>
      </CardContent>
      <IconButton aria-label="add to favorites" onClick={handleSave}>
        {isDelete ? (
          <DeleteIcon />
        ) : (
          <FavoriteIcon color={isSaved ? 'warning' : 'inherit'} />
        )}
      </IconButton>
    </Card>
  );
};

export default RecipeCard;
