import { useParams } from 'react-router-dom';
import { useGetMeal } from '../query /recipes.ts';
import { Box, Link, Stack, Typography } from '@mui/material';
import DetailsMean from '../components/DetailsMean.tsx';

const RecipeDetails = () => {
  const { id = '' } = useParams<{ id: string }>();

  const { data = [] } = useGetMeal(id);
  const [meal] = data;

  if (!meal) {
    return null;
  }

  const ingredientsAndMeasures = Object.keys(meal)
    .filter(
      (key) => key.startsWith('strIngredient') || key.startsWith('strMeasure')
    )
    .reduce<{ ingredient: string; measure: string }[]>((acc, key) => {
      const index = key.replace(/\D/g, '');
      if (index) {
        const ingredientKey = `strIngredient${index}`;
        const measureKey = `strMeasure${index}`;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (meal[ingredientKey] && meal[measureKey]) {
          acc.push({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            ingredient: meal[ingredientKey],
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            measure: meal[measureKey],
          });
        }
      }

      return acc;
    }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: '20px',
        gap: '20px',
      }}
    >
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        width="400px"
        height="400px"
      />
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography fontWeight={600}>{meal.strMeal}</Typography>
        <Typography>{meal.strTags}</Typography>
        <DetailsMean title="Date Modified" text={meal.dateModified} />
        <DetailsMean title="Id" text={meal.idMeal} />
        <DetailsMean title="Area" text={meal.strArea} />
        <DetailsMean title="Category" text={meal.strCategory} />
        <DetailsMean
          title="Creative Commons Confirmed"
          text={meal.strCreativeCommonsConfirmed}
        />
        <DetailsMean title="Drink Alternate" text={meal.strDrinkAlternate} />
        <DetailsMean title="Image Source" text={meal.strImageSource} />
        <Box>
          Ingredients:
          <ul>
            {ingredientsAndMeasures.map(({ ingredient, measure }) => (
              <li key={ingredient}>
                {ingredient}: {measure}
              </li>
            ))}
          </ul>
        </Box>
        <Typography>{meal.strInstructions}</Typography>
        <Stack direction="row" spacing={2}>
          <Link href={meal?.strSource}>Source</Link>
          <Link href={meal?.strYoutube}>Youtube</Link>
        </Stack>
      </Box>
    </Box>
  );
};

export default RecipeDetails;
