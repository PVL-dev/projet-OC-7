import { recipes } from "../data/recipes.js";
import { drawRecipes, sortedRecipes } from "./drawer.js";

export const searchAlgorythm = (sortingPath, searchDatas) => {
    console.log('path =', sortingPath, 'values =', searchDatas);

    if (!searchDatas[0]) {
        console.log("Aucune données à rechercher")
        sortedRecipes[0] = recipes;
    } else {
        let resultat = recipes.filter(function(element) {
            return element.description.toLocaleLowerCase().includes(searchDatas[0].toLocaleLowerCase());
        });
        //let resultat = recipes.filter(elmt => elmt.description.toLocaleLowerCase().includes(searchDatas[0].toLocaleLowerCase()));
        console.log(resultat);

        sortedRecipes[0] = resultat;
    };
    
    drawRecipes();
};

