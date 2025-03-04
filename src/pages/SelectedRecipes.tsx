import { useRecipeStore } from '../store/useRecipeStore.ts';
import { Box, Grid2, Typography } from '@mui/material';
import RecipeCard from '../components/RecipeCard.tsx';

const SelectedRecipes = () => {
  const { savedRecipes } = useRecipeStore();
  return (
    <Box>
      <Grid2 container spacing={2}>
        {!savedRecipes.length ? (
          <Typography>Not Found</Typography>
        ) : (
          savedRecipes?.map((meal) => (
            <Grid2 key={meal.idMeal} size={3}>
              <RecipeCard key={meal.idMeal} recipe={meal} isDelete />
            </Grid2>
          ))
        )}
      </Grid2>
    </Box>
  );
};

export default SelectedRecipes;
