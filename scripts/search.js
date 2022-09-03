import { menuTagList } from './menus.js';
import { searchAlgorythm } from './algorythm.js';

export const eventSearchbars = () => {
    const searchbars = document.querySelectorAll(".form-control");
    searchbars.forEach((input) => {
        if (input.classList.contains("main-search")) {
            input.addEventListener('keyup', mainSearch);
        } else {
            input.addEventListener('keyup', tagSearch);
        };
    });
};

export let mainSearchArray = [[]];
export let ingredientsArray = [[]];
export let appareilsArray = [[]];
export let ustensilesArray = [[]];
export let searchedTags = [[]];

const mainSearch = () => {
    // Crée un Array avec la valeur entrée dans la barre de recherche et lance l'algorythme
    let mainSearchValue = [];
    const textInput = document.querySelector(".main-search"); // Récupère l'input principal et le divise en mots clés
    mainSearchValue[0] = textInput.value.split(" ");
    if (mainSearchValue[0] == "") {
        mainSearchArray = [[]];
    } else {
        mainSearchArray[0] = mainSearchValue[0];
    };

    startAlgorythm();
};

export const startAlgorythm = () => {
    let searchDatas = [];

    mainSearchArray[0].forEach((elmt) => {
        searchDatas.push(elmt);
    });
    ingredientsArray[0].forEach((elmt) => {
        searchDatas.push(elmt);
    });
    appareilsArray[0].forEach((elmt) => {
        searchDatas.push(elmt);
    });
    ustensilesArray[0].forEach((elmt) => {
        searchDatas.push(elmt);
    });

    searchAlgorythm(searchDatas);
};

const tagSearch = (e) => {
    // Récupére la valeur de l'input et la renvoie vers les fonctions de création des menus
    searchedTags[0] = e.target.value.split(" ");
    menuTagList();
};

