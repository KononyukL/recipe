import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Layout from './components/Layout.tsx';
import SelectedRecipes from './pages/SelectedRecipes.tsx';
import RecipeDetails from './pages/RecipeDetails.tsx';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/selected" element={<SelectedRecipes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
