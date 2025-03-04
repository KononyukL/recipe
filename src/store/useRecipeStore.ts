import { IMeal } from '../type/meals.ts';
import { create } from 'zustand/react';

interface IRecipeStore {
  savedRecipes: IMeal[];
  addRecipe: (recipe: IMeal) => void;
  removeRecipe: (id: string) => void;
}

export const useRecipeStore = create<IRecipeStore>((set) => ({
  savedRecipes: [],
  addRecipe: (recipe: IMeal) =>
    set((state) => ({
      savedRecipes: [...state.savedRecipes, recipe],
    })),
  removeRecipe: (id: string) =>
    set((state) => ({
      savedRecipes: state.savedRecipes.filter((recipe) => recipe.idMeal !== id),
    })),
}));
