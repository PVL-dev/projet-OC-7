import { recipes } from "../data/recipes.js";
import { drawRecipes, sortedRecipes } from "./drawer.js";
import { menuOpened, menuTagList } from "./menus.js";

export const searchAlgorythm = (searchDatas) => {
    console.log('values =', searchDatas);
    
    sortedRecipes[0] = recipes;

    if (searchDatas.length == 0) {
        console.log("Aucune données à rechercher")
    } else {
        let finalResult = [];
        finalResult = sortedRecipes[0];

        searchDatas.forEach(element => {
            let rawResult = finalResult.filter(recette => {
                return recette.name.toLowerCase().includes(element.toLowerCase())
                    || recette.description.toLowerCase().includes(element.toLowerCase())
                    || recette.appliance.toLowerCase().includes(element.toLowerCase())
                    || recette.ingredients.some((ingredient)=> ingredient.ingredient.toLowerCase().includes(element.toLowerCase()))
                    || recette.ustensils.some((ustensil)=> ustensil.toLowerCase().includes(element.toLowerCase()))
            });
            finalResult = rawResult;
        });
        
        sortedRecipes[0] = finalResult;
    };
    
    drawRecipes();
    if (menuOpened == true) {
        menuTagList();
    };
};

