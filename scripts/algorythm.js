import { recipes } from "../data/recipes.js";
import { drawRecipes, sortedRecipes } from "./drawer.js";
import { menuOpened, menuTagList } from "./menus.js";

export const searchAlgorythm = (searchDatas) => {
    console.log('values =', searchDatas);
    sortedRecipes[0] = recipes;

    if (searchDatas.length == 0) {
        console.log("Aucune données à rechercher")
    } else {
        console.time('SearchTime');
        for(let l1 = 0; l1 < searchDatas.length; l1++) {
            // Pour chaque valeur à rechercher dans les recettes
            const data = searchDatas[l1].toLowerCase();
            console.log(data);
            let rawResult = [];

            for(let l2 = 0; l2 < sortedRecipes[0].length; l2++) {
                // Pour chaque recettes dans l'Array sortedRecipes
                const recette = sortedRecipes[0][l2];
                console.log(recette);
                
                if (recette.name.toLowerCase().includes(data) 
                || recette.description.toLowerCase().includes(data)
                || recette.appliance.toLowerCase().includes(data)
                || recette.ingredients.some((ingredient)=> ingredient.ingredient.toLowerCase().includes(data))
                || recette.ustensils.some((ustensil)=> ustensil.toLowerCase().includes(data))) {
                    rawResult.push(recette);
                    console.log("Oui");
                } else {
                    console.log("Non");
                };
                
                console.log(rawResult);
            };
            sortedRecipes[0] = rawResult;
        };
        console.timeEnd('SearchTime');
    };
    
    drawRecipes();
    if (menuOpened == true) {
        menuTagList();
    };
};

