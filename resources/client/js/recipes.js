function pageLoad(){
    listRecipes();
}

function listRecipes(){
    console.log("Invoked listRecipes() ");
    let url = "/recipe/list";

    fetch(url, {
        method: 'get',
    }).then(response => {
        return response.json();                 //now return that promise to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));        // if it does, convert JSON object to string and alert
        } else {
            let recipesHTML = `<div>`;
            recipesHTML += `<table><td>Recipe ID</td><td>Recipe Name</td>`;
            for(let r of response.recipes){
                recipesHTML += `<tr>`

                    + `<td>${r.RecipeID}</td>`
                    + `<td>${r.RecipeName}</td>`
                    +`<td id="recipe"+${r.RecipeID}><button>Show Recipe</button> </td>`
                    + `</tr>`;
            }
            recipesHTML += `</div>`;
            document.getElementById('recipes').innerHTML = recipesHTML;
        }
    });
}

function fetchRecipe(){

}

function addRecipe(){

}