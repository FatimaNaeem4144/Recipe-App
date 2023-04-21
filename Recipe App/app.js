(async function (){
    const response = await fetch ("./recipes.json");
    const recipes = await response.json();

    const inputElem = document.getElementById("searchInput");
    const btnElem = document.getElementById("searchBtn");
    const listElem = document.getElementById("recipeList");
    const detailsElem = document.getElementById("recipeDetailsContainer");

function loadRecipeDetails(recipe){
        detailsElem.innerHTML = `
        <h2 class="title">${recipe.title}</h2>
        <h3>Ingredients:</h3>
        <ul>${recipe.ingredients.map (function(ingredient){
            return "<li>" + ingredient + "</li>"
        }).join("")}</ul>
        <h3>Instructions:</h3>
        <div>${recipe.instructions}</div>
        `;
}

function displaySearchResults (results){
    listElem.innerHTML = "";
    results.forEach(function (recipe){
        const li = document.createElement("li");
        li.innerHTML = recipe.title;
        li.addEventListener("click", function (){
            loadRecipeDetails(recipe);
        })
        listElem.appendChild(li);
    })
}
function search(){
        const query = inputElem.value.toLowerCase(); 
        const results = recipes.filter(function(recipe){
            return (recipe.title.toLowerCase().includes(query) ||
            recipe.ingredients.join(" ").toLowerCase().includes(query));
        });
        displaySearchResults(results);
}

    btnElem.addEventListener("click", search);
})(); 