function pageLoad(){
    listCategories();
}

"use strict"
function listCategories() {
    //debugger
    console.log("Invoked listCategories()"); //prints in the console to make debugging easier
    const url = "/category/list/";           //API method on web server will be in category class, method list
    fetch (url, {
        method: "GET",                       //GET method
    }).then(response => {
        return response.json();
    }).then(response => {
        if (response.hasOwnProperty("Error")) {  //checks if response from web server has an error
            alert(JSON.stringify(response));     //if it does, convert JSON object to string and alert (pop up window)
        } else {
            formatCategoriesList(response);      //this function will create an HTML table of the data
        }
    });

}

function formatCategoriesList(myJSONArray) {
    let dataHTML ="";
    dataHTML += "<th>Category Name</th>" + "<th>Description</th>" /*+ "<th>More</th>" + "<th>Delete</th>"*/  //adds table headers
    for (let item of myJSONArray) {
        dataHTML += "<tr><td>" + item.Name +"</td><td>" + item.Description + "</td></tr>"; //creates each row from array
    }
    document.getElementById("categories").innerHTML = dataHTML;  //links back to the HTML to be displayed
}

/*function listCategories(){
    console.log("Invoked listCategories() ");
    let url = "/category/list";

    fetch(url, {
        method: 'get',
    }).then(response => {
        return response.json();                 //now return that promise to JSON
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));        // if it does, convert JSON object to string and alert
        } else {
            let categoriesHTML = `<div>`;
            categoriesHTML += `<table id="tCategories"><th>Category Name</th><th>Description</th><th>More</th><th>Delete</th>`;
            for(let r of response.categories){
                categoriesHTML += `<tr class="category_${r.CategoryID}">`

                    //+ `<td>${r.RecipeID}</td>`
                    + `<td>${r.Name}</td>`
                    + `<td>${r.Description}</td>`
                    + `<td id="category"+${r.CategoryID}><button onclick="fetchCategory(${r.CategoryID})">Show Category</button> </td>`
                    + `<td><button onclick="deleteCategory(${r.CategoryID})">Delete Category</button></td>`

                    + `</tr>`;
            }
            categoriesHTML += `</div>`;
            document.getElementById('categories').innerHTML = categoriesHTML;
        }
    });
}*/
