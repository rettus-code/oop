const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
var managerList =[];
var internList =[];
var engineerList =[];
const render = require("./lib/htmlRenderer");

displayOptions();

function displayOptions(){
    inquirer.prompt([
        {
            type:"list",
            message:"choose one",
            name: "userChoice",
            choices: ["add Mananger", "add Intern", "add Engineer", "exit"]
        }
    ]).then(function(response){
        switch(response.userChoice){
            case"add Mananger":
            addManager();
            break;
            case"add Intern":
            addIntern();
            break;
            case"add Engineer":
            addEngineer();
            break;
            default:
            exitApp();
        }
    })
    displayOptions();
}
function addManager(){
    inquirer.prompt([
        {
            type:"input",
            message:"enter Name",
            name:"name"
        },
        {
            type:"input",
            message:"enter Id",
            name:"id"
        },
        {
            type:"input",
            message:"enter Email",
            name:"email"
        },
        {
            type:"input",
            message:"enter office number",
            name:"officeNumber"
        }
    ]).then(function(response){
        var myManager = new Manager(response.name, response.id, response.email, response.officeNumber)
        managerList.push(myManager);
        console.log(managerList)
        displayOptions();
    })

}
function addIntern(){
    inquirer.prompt([
        {
            type:"input",
            message:"enter Name",
            name:"name"
        },
        {
            type:"input",
            message:"enter Id",
            name:"id"
        },
        {
            type:"input",
            message:"enter Email",
            name:"email"
        },
        {
            type:"input",
            message:"enter school",
            name:"school"
        }
    ]).then(function(response){
        var myIntern = new intern(response.name, response.id, response.email, response.school)
        internList.push(myIntern);
        console.log(internList)
        displayOptions();
    })
}
function addEngineer(){
    inquirer.prompt([
        {
            type:"input",
            message:"enter Name",
            name:"name"
        },
        {
            type:"input",
            message:"enter Id",
            name:"id"
        },
        {
            type:"input",
            message:"enter Email",
            name:"email"
        },
        {
            type:"input",
            message:"enter github",
            name:"github"
        }
    ]).then(function(response){
        var myEngineer = new Engineer(response.name, response.id, response.email, response.school)
        egineerList.push(myEngineer);
        console.log(engineerList)
        displayOptions();
    })

}
function exitApp(){
    let frontHTML = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>My Team</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="style.css">
        <script src="https://kit.fontawesome.com/c502137733.js"></script>
    </head>
    
    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 jumbotron mb-3 team-heading">
                    <h1 class="text-center">My Team</h1>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="team-area col-12 d-flex justify-content-center">`
    let closingHTML = ` </div>
    </div>
</div>
</body>

</html>`
let managerHTML = "";
for (var i=0; i<managerList.length; i++){
    managerHTML += `<div class="card employee-card">
    <div class="card-header">
        <h2 class="card-title">${managerList[i].name}</h2>
        <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>{{ role }}</h3>
    </div>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item">ID: ${managerList[i].id}</li>
            <li class="list-group-item">Email: <a href="mailto:${managerList[i].email}">${managerList[i].email}</a></li>
            <li class="list-group-item">Office number: ${managerList[i].officeNumber}</li>
        </ul>
    </div>
</div>`
}
let internHTML = "";
for (var i=0; i<internList.length; i++){
    internHTML += `<div class="card employee-card">
    <div class="card-header">
        <h2 class="card-title">${internList[i].name}</h2>
        <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>{{ role }}</h3>
    </div>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item">ID: ${internList[i].id}</li>
            <li class="list-group-item">Email: <a href="mailto:${internList[i].email}">${internList[i].email}</a></li>
            <li class="list-group-item">School: ${internList[i].school}</li>
        </ul>
    </div>
</div>`
let engineerHTML = "";
for (var i=0; i<engineerList.length; i++){
    engineerHTML += `<div class="card employee-card">
    <div class="card-header">
        <h2 class="card-title">${engineerList[i].name}</h2>
        <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>{{ role }}</h3>
    </div>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item">ID: ${engineerList[i].id}</li>
            <li class="list-group-item">Email: <a href="mailto:${engineerList[i].email}">${engineerList[i].email}</a></li>
            <li class="list-group-item">GitHub: <a href="https://github.com/${engineerList[i].github}" target="_blank" rel="noopener noreferrer">{{ github }}</a></li>
        </ul>
    </div>
</div>`
}
let HTML = frontHTML + managerHTML + internHTML + engineerHTML + closingHTML;
fs.writeFileSync("./index.html", HTML, function(){
    console.log("file generated");
    process.exit(0)
        }       )
    }
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
