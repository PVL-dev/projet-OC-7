import { recipes } from "../data/recipes.js";
import { drawRecipes, sortedRecipes } from "./drawer.js";
import { menuOpened, menuTagList } from "./menus.js";

export const searchAlgorythm = (searchDatas) => {
    console.log('values =', searchDatas);
    sortedRecipes[0] = recipes;

    if (searchDatas.length == 0) {
        console.log("Aucune données à rechercher");
    } else {
        console.time('SearchTime');
        searchDatas.forEach(data => {
            let rawResult = sortedRecipes[0].filter(recette => {
                return recette.name.toLowerCase().includes(data.toLowerCase())
                    || recette.description.toLowerCase().includes(data.toLowerCase())
                    || recette.appliance.toLowerCase().includes(data.toLowerCase())
                    || recette.ingredients.some((ingredient)=> ingredient.ingredient.toLowerCase().includes(data.toLowerCase()))
                    || recette.ustensils.some((ustensil)=> ustensil.toLowerCase().includes(data.toLowerCase()));
            });
            sortedRecipes[0] = rawResult;
        });
        console.timeEnd('SearchTime');
    };
    
    drawRecipes();
    if (menuOpened == true) {
        menuTagList();
    };
};

