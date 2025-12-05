//variables
const title = document.getElementById("title");
const sub = document.getElementById("sub");
function conversion(){ //converts to json https://www.geeksforgeeks.org/javascript/how-to-convert-html-form-field-values-to-json-object-using-javascript/
let dataForDates = document.getElementById("calendarData");
let formArray = {}; //for json
for (let i = 0; i<dataForDates.elements.length; i++){
    let element = dataForDates.elements[i];
    if(element.type !== "submit"){
        formArray[element.title] = element.value;
    }
}
let jsonData = JSON.stringify(formArray); //to be readable
//edited for this one here to be sent to the json
fetch('/adminInJS', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: jsonData
})
.then(send => send.json())
}
function blackie(){
    document.body.classList.toggle("dark-mode");
}