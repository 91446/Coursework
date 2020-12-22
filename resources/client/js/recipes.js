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
            recipesHTML += `<table><th>Recipe ID</th><th>Recipe Name</th><th>URL</th><th>Author</th>`;
            for(let r of response.recipes){
                recipesHTML += `<tr>`

                    + `<td>${r.RecipeID}</td>`
                    + `<td>${r.RecipeName}</td>`
                    + `<td><a href="${r.pathURL}">${r.pathURL}</a></td>`
                    + `<td>${r.Author}</td>`
                    +`<td id="recipe"+${r.RecipeID}><button onclick="fetchRecipe(${r.RecipeID})">Show Recipe</button> </td>`
                    + `</tr>`;
            }
            recipesHTML += `</div>`;
            document.getElementById('recipes').innerHTML = recipesHTML;
        }
    });
}

function fetchRecipe(id){
    document.getElementById('recipe'+id);
    console.log("invoked fetchRecipe() with button 'recipe"+id+"'");
    let recipe = '{"id":id}';
    let url = "/recipe/list";

    fetch(url, {
        method: 'get',
        data: recipe,
    }).then(response => {
        return response.json();                 //now return that promise to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));        // if it does, convert JSON object to string and alert
        } else {



        }
    });

}

function addRecipe(){

}