export let sortedRecipes = [];

export const drawRecipes = () => {
    const main = document.querySelector('main');
    main.replaceChildren();
    console.log(sortedRecipes);

    sortedRecipes[0].forEach((recipe) => { // Pour chaque recette du tableau trié
        const newArcticle = document.createElement('article');

        recipe.ingredients.map(e => { // Raccourcissement des unités pour l'affichage
            if (e.unit === "grammes") {
                e.unit = "g";
            } else if (e.unit === "cuillères à soupe") {
                e.unit = "cuillères";
            };
        });

        const newHtml = `
        <img class ="recipe-img" src ="" alt = "">
        <div class = "recipe d-flex flex-column ">
            <div class = "recipe-head mb-3 d-flex justify-content-between align-items-center">
                <h3>${recipe.name}</h3>
                <div class = d-flex align-items-center>
                    <i class="far fa-clock mr-1 d-flex align-items-center"></i>
                    <h2>${recipe.time} min</h2>
                </div>
            </div >
            <div class = "d-flex justify-content-between align-items-start">
                <ul>${recipe.ingredients.map(e => {
                    return `<li class = " ingredients ${e}" title="${e}" > <h4>${e.ingredient}</h4> <span>${e.quantity ? ' :' : ''} ${e.quantity ? e.quantity : ' '} ${e.unit ? e.unit : ' '}</span></li>`
                }).join("")}
                </ul>
                <p>${recipe.description}</p>
            </div>
        </div>
        `;
        newArcticle.innerHTML = newHtml;
        main.appendChild(newArcticle);
    });

    if (sortedRecipes[0].length === 0) { // Message d'erreur si aucune recette dans le tableau
        const newArcticle = document.createElement('article');
        const newHtml = `<p class ="no-result">
            Aucune recette ne correspond à vos critères. Essayez de changer d'ingrédients ou d'ustensiles par exemple...</p>`;
        newArcticle.innerHTML = newHtml;
        main.appendChild(newArcticle);
    };
};

