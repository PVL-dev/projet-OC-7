import { recipes } from '../data/recipes.js';
import { drawRecipes, sortedRecipes } from './drawer.js';
import { menuTagList } from './menus.js';

export const eventSearchbars = () => {
    const searchbars = document.querySelectorAll(".form-control");
    searchbars.forEach((input) => {
        if (input.classList.contains("main-search")) {
            input.addEventListener('keyup', search);
        } else {
            input.addEventListener('keyup', tagSearch);
        };
    });
};

export let mainSearch = [[]];
export let ingredientsArray = [[]];
export let appareilsArray = [[]];
export let ustensilesArray = [[]];
export let searchedTags = [[]];

export const search = (e) => {
    // 
    sortedRecipes[0] = []; // Reset de la liste des recettes 
    
    const textInput = document.querySelector(".main-search"); // Récupère l'input principal et le divise en mots clés
    mainSearch[0] = textInput.value.split(" ");

    let sortingToken = false; // Informe si une recherche a été effectuée
    let sortingValues; // Variable qui contiendra les données brutes à traiter avant recherche

    sortingValues = mainSearch[0]; // Si la searchbar principale contient des données on les envoient à l'algorythme de recherche
    if (sortingValues[0]?.length > 2) {
        sortingToken = true;
        let sortingPath = ["description", "name", "ingredients"]; // Les catégories dans lesquelles rechercher les données
        //await fastAlgorytm(recipes, sortingPath, sortingValues); // Envoi vers l'algorythme de recherche
    };
    
    sortingValues = ingredientsArray[0]; // Si un tag Ingrédients est sélectionné on l'envoie à l'algorythme de recherche
    if (sortingValues[0]?.length > 2) {
        let sortingPath = ["ingredients"];
        if (sortingToken === false) {
            //await fastAlgorytm(recipes, sortingPath, sortingValues);
            sortingToken = true;
        } else {
            fastCheck(sortingPath, sortingValues);
        };
    };
    
    sortingValues = ustensilesArray[0]; // Si un tag Ustensiles est sélectionné on l'envoie à l'algorythme de recherche
    if (sortingValues[0]?.length > 2) {
        let sortingPath = ["ustensils"];
        if (sortingToken === false) {
            //await fastAlgorytm(recipes, sortingPath, sortingValues);
            sortingToken = true;
        } else {
            fastCheck(sortingPath, sortingValues);
        };
    };
    
    sortingValues = appareilsArray[0]; // Si un tag Appareils est sélectionné on l'envoie à l'algorythme de recherche
    if (sortingValues[0]?.length > 2) {
        let sortingPath = ["appliance"];
        if (sortingToken === false) {
            //await fastAlgorytm(recipes, sortingPath, sortingValues);
            sortingToken = true;
        } else {
            fastCheck(sortingPath, sortingValues);
        };
    };

    if (sortingToken === false) {
        sortedRecipes[0] = recipes;
    };
    drawRecipes(); // On génére et affiche la nouvelle liste de recettes
    menuTagList(); // Met à jour les tags affichés dans les menus
};

const tagSearch = (e) => {
    // Récupére la valeur de l'input et la renvoie vers les fonctions de création des menus
    searchedTags[0] = e.target.value.split(" ");
    menuTagList();
};

