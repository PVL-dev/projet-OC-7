import { recipes } from '../data/recipes.js';
import { sortedRecipes, drawRecipes } from '../scripts/drawer.js';
import { eventSearchbars } from '../scripts/search.js';
import { eventMenus } from './menus.js';

const start = () => {
    sortedRecipes[0] = recipes;
    drawRecipes();
    eventSearchbars();
    eventMenus();
};

start();

