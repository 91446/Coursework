function pageLoad(){
    listAuthors();
}

"use strict"
function listAuthors() {
    //debugger
    console.log("Invoked listAuthors()"); //prints in the console to make debugging easier
    const url = "/author/list/";           //API method on web server will be in category class, method list
    fetch (url, {
        method: "GET",                       //GET method
    }).then(response => {
        return response.json();
    }).then(response => {
        if (response.hasOwnProperty("Error")) {  //checks if response from web server has an error
            alert(JSON.stringify(response));     //if it does, convert JSON object to string and alert (pop up window)
        } else {
            formatAuthorsList(response);      //this function will create an HTML table of the data
        }
    });

}

function formatAuthorsList(myJSONArray) {
    let dataHTML ="";
    dataHTML += "<th>Author First Name</th>" + "<th>Author Last Name</th>" +"<th>Bio</th>" /*+ "<th>More</th>" + "<th>Delete</th>"*/ //adds table headers
    for (let item of myJSONArray) {
        dataHTML += "<tr><td>" + item.FirstName +"</td><td>" + item.LastName +"</td><td>"+ item.Bio + "</td></tr>"; //creates each row from array
    }
    document.getElementById("authors").innerHTML = dataHTML;  //links back to the HTML to be displayed
}
