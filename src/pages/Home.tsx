import { ChangeEvent, useMemo, useState } from 'react';
import { useGetAllMeals, useGetByName } from '../query /recipes.ts';
import {
  Box,
  FormControl,
  Grid2,
  Input,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import RecipeCard from '../components/RecipeCard.tsx';
import { useDebounce } from '../hooks/useDebounce.ts';

const Home = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const debouncedChange = useDebounce(name, 500);

  const { data: allData = [] } = useGetAllMeals();
  const { data: nameData = [] } = useGetByName(debouncedChange);

  const data = debouncedChange ? nameData : allData;

  const sortedData = useMemo(() => {
    if (!category) return data;

    return data.filter((item) => item.strCategory === category);
  }, [data, category]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData?.slice(indexOfFirstItem, indexOfLastItem);

  const categories = Object.keys(
    allData.reduce<Record<string, unknown>>((acc, cur) => {
      if (!acc[cur.strCategory]) {
        acc[cur.strCategory] = true;

        return acc;
      }

      return acc;
    }, {})
  );

  const handleChangePage = (_event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  return (
    <Box>
      <Box
        sx={{
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Search"
        />
        <FormControl sx={{ width: '200px' }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={handleChange}
          >
            <MenuItem value={''}>Clear</MenuItem>
            {categories.map((item) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid2 container spacing={2}>
        {currentItems?.map((meal) => (
          <Grid2 key={meal.idMeal} size={3}>
            <RecipeCard key={meal.idMeal} recipe={meal} />
          </Grid2>
        ))}
      </Grid2>
      <Pagination
        count={Math.ceil(sortedData.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
        sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
      />
    </Box>
  );
};

export default Home;
