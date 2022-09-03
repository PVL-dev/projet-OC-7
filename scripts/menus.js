import { sortedRecipes } from '../scripts/drawer.js';
import { startAlgorythm, ingredientsArray, appareilsArray, ustensilesArray, searchedTags } from '../scripts/search.js';

let menuInput;
let menuBtn;
let menuIcon;
let menuList;
let menuName;
let activeMenu;
export let menuOpened;

export const eventMenus = () => {
    document.querySelectorAll(".btn").forEach((e) => {
        e.addEventListener("click", openMenu)
    });
};

const openMenu = (e) => {
    const target = e.target;
    activeMenu = document.querySelector(".menu-form-active");
    closeOtherMenus(target); // Ferme les autres menus déjà ouverts
    menuSelection(target); // Ciblage du menu et récupération de ses infos dans le DOM
    toggleMenu(); // Active ou désactive le style CSS du menu
    menuTagList(); // Met à jour les tags affichés dans le menu
};

const closeOtherMenus = (target) => {
    // Ferme les autres menus déjà ouverts
    if (activeMenu && !activeMenu.classList.contains(`input-${target.classList[3]}`)) {
        toggleMenu();
    };
};

const menuSelection = (target) => {
    // Ciblage du menu et récupération de ses infos dans le DOM
    if (target.classList.contains("ingredients")) {
        menuInput = document.querySelector(".input-ingredients");
        menuBtn = document.querySelector(".btn-ingredients");
        menuIcon = document.querySelector(".i-ingredients");
        menuList = document.querySelector(".menu-list-ingredients");
        menuName = "ingredients";
    }
    else if (target.classList.contains("appareil")) {
        menuInput = document.querySelector(".input-appareil");
        menuBtn = document.querySelector(".btn-appareil");
        menuIcon = document.querySelector(".i-appareil");
        menuList = document.querySelector(".menu-list-appareil");
        menuName = "appliance";
    }
    else if (target.classList.contains("ustensiles")) {
        menuInput = document.querySelector(".input-ustensiles");
        menuBtn = document.querySelector(".btn-ustensiles");
        menuIcon = document.querySelector(".i-ustensiles");
        menuList = document.querySelector(".menu-list-ustensiles");
        menuName = "ustensils";
    };
};

const toggleMenu = () => {
    // Active ou désactive le style CSS du menu
    if (menuInput.classList.contains("menu-form-active")) {
        menuInput.classList.remove("menu-form-large");
        menuList.classList.remove("menu-large");
        menuBtn.classList.remove("menu-large");
        menuInput.classList.remove("menu-form-small");
        menuList.classList.remove("menu-small");
        menuBtn.classList.remove("menu-small");
        menuInput.classList.remove("menu-form-active");
        menuList.classList.remove("menu-list-active");
        menuBtn.classList.remove("btn-active");
        menuIcon.style.transform = "rotate(0deg)";
        cleanInput('input-ingredients');
        cleanInput('input-appareil');
        cleanInput('input-ustensiles');
        menuOpened = false;
    } else {
        menuInput.classList.add("menu-form-active");
        menuList.classList.add("menu-list-active");
        menuBtn.classList.add("btn-active");
        menuIcon.style.color = "white";
        menuIcon.style.transform = "rotate(180deg)";
        menuOpened = true;
    };
};

export const menuTagList = () => {
    // Met à jour les tags affichés dans le menu
    const limit = 500;
    menuList.replaceChildren();
    let allTags = tagsRecover(sortedRecipes[0]);
    let sortedTags = tagsSorting(allTags);
    displayMenuTags(sortedTags, limit);
};

const tagsRecover = (sortedRecipes) => {
    // Récupère la liste de tous les tags du menu sélectionné
    const allTags = [];
    for (let i=0 ; i<sortedRecipes.length ; i++) {
        if (menuName === "ingredients") {
            sortedRecipes[i][menuName].forEach(ingredient => {
                if (!allTags.includes(ingredient.ingredient)) {
                    allTags.push(ingredient.ingredient);
                };
            });
        } else if (menuName === "appliance") {
            if (!allTags.includes(sortedRecipes[i][menuName])) {
                allTags.push(sortedRecipes[i][menuName]);
            };
        } else if (menuName === "ustensils") {
            sortedRecipes[i][menuName].forEach(ustensil => {
                if (!allTags.includes(ustensil)) {
                    allTags.push(ustensil);
                };
            });
        };
    };
    return allTags;
};

const tagsSorting = (allTags) => {
    // Tri les tags par recherche puis par ordre alphabétique
    searchedTags[0].forEach(tag => {
        for (let i = 0 ; i <  allTags.length ; i++) {
            if (!allTags[i].toLowerCase().includes(tag.toLowerCase())) {
                allTags.splice(i,1);
                i-=1;
            };
        };
    });
    allTags.sort();
    return allTags;
};

const displayMenuTags = (sortedTags, limit) => {
    // Affiche les tags recherchés et triès dans le menu correspondant
    for (let i = 0; i < limit; i++) {
        if (sortedTags[i]) {
            const newLi = document.createElement("li");
            newLi.classList.add(`li-${menuName}`);
            newLi.classList.add(`li-tag`);
            newLi.innerHTML = `${sortedTags[i]}`;
            menuList.appendChild(newLi);
            newLi.addEventListener("click", displayGeneralTags);
            if (i === limit - 1) {
                menuList.classList.remove("menu-large")
                menuBtn.classList.remove("menu-large")
                menuList.classList.remove("menu-small")
                menuBtn.classList.remove("menu-small")
            };
        } else if (menuBtn.classList.contains("btn-active")) {
            if (i < 20 && i > 10) {
                menuInput.classList.add("menu-form-large")
                menuList.classList.add("menu-large")
                menuBtn.classList.add("menu-large")
                menuList.classList.remove("menu-small")
                menuBtn.classList.remove("menu-small")
            } else if (i < 10) {
                menuInput.classList.add("menu-form-small")
                menuList.classList.add("menu-small")
                menuBtn.classList.add("menu-small")
                menuList.classList.remove("menu-large")
                menuBtn.classList.remove("menu-large")
            } else if (i > 20) {
                menuList.classList.remove("menu-large")
                menuBtn.classList.remove("menu-large")
                menuList.classList.remove("menu-small")
                menuBtn.classList.remove("menu-small")
            };
            i = limit;
        };
    };
};

const displayGeneralTags = (e) => {
    // Affiche les tags sélectionnés dans les menus en haut de page, au-dessus des menus
    const selectedTag = e.target;
    const newTag = document.createElement("li");

    if (selectedTag.classList.contains("li-ingredients")) {
        newTag.classList.add(`tag-ingredient`);
        cleanInput('input-ingredients'); // Nettoyage du champ de recherche
    } else if (selectedTag.classList.contains("li-appliance")) {
        newTag.classList.add(`tag-appliance`);
        cleanInput('input-appareil'); // Nettoyage du champ de recherche
    } else if (selectedTag.classList.contains("li-ustensils")) {
        newTag.classList.add(`tag-ustensils`);
        cleanInput('input-ustensiles'); // Nettoyage du champ de recherche
    };

    const newHtml = `${selectedTag.innerText} <i id = "${selectedTag.innerText}" class="far fa-times-circle"></i>`;
    newTag.innerHTML = newHtml;

    const tagsList = document.querySelector(".tags");
    tagsList.appendChild(newTag);
    
    newTag.addEventListener("click", removeTag); // Eventlistener pour la suppression du tag

    const newSearchTag = selectedTag.innerText.split(" ");
    newSearchTag.forEach(elmt => {
        if (selectedTag.classList.contains("li-ingredients")) {
            addTag(ingredientsArray[0], elmt);
        } else if (selectedTag.classList.contains("li-appliance")) {
            addTag(appareilsArray[0], elmt);
        } else if (selectedTag.classList.contains("li-ustensils")) {
            addTag(ustensilesArray[0], elmt);
        };
    });
};

const cleanInput = (className) => {
    // Nettoyage du champ de recherche
    const input = document.querySelector(`.${className}`);
    input.value = "";
    searchedTags[0]=[];
};

const addTag = (Array, newTag) => {
    // Ajoute le nouveau tag à l'Array qui lui correspond
    let tagToken = 0;
    Array.forEach((elmt) => {
        if (elmt === newTag) {
            tagToken++;
        };
    });
    if (tagToken === 0) {
        Array.push(newTag);
    };
    startAlgorythm(); // Lance une nouvelle recherche avec le tag en plus
};

const removeTag = (e) => {
    // Supprime le tag de l'Array qui lui correspond et du DOM
    if (e.target.id !== "") {
        const tag = e.target.parentNode;
        let arrayToSearch;

        if (tag.classList.contains("tag-ingredient")) {
            arrayToSearch = ingredientsArray[0];
        } else if (tag.classList.contains("tag-appliance")) {
            arrayToSearch = appareilsArray[0];
        } else if (tag.classList.contains("tag-ustensils")) {
            arrayToSearch = ustensilesArray[0];
        };

        const tagBtn = e.target;
        const oldTagSearch = tagBtn.id.split(" ");
        oldTagSearch.forEach(oldTag => {
            for (let i = 0; i < arrayToSearch.length; i++) {
                if (oldTag.toLowerCase().includes(arrayToSearch[i].toLowerCase()) || arrayToSearch[i].toLowerCase().includes(oldTag.toLowerCase())) {
                    arrayToSearch.splice(i, 1);
                    i -= 1;
                };
            };
        });

        tag.remove(); // Supprime le tag du DOM
        startAlgorythm(); // Lance une nouvelle recherche avec le tag en moins
    };
};

