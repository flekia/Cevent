//variables
const title = document.getElementById("title");
const sub = document.getElementById("sub"); //forms
const form = document.getElementById("inpo"); //whole forms
const passing = document.getElementById("thyPass"); //password
const pup = document.getElementById("popup"); //wrong answer
const btn = document.getElementById("okayISeeYou");//button
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
fetch('/save', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: jsonData
})
.then(send => send.json())
.then(data => {
    //updates sw's cache for every publish on json
    if(navigator.serviceWorker.controller){
        navigator.serviceWorker.controller.postMessage({
            type: 'UPDATE_CACHE',
            URL: 'Cevent/announcements.json?t=' + new Date.now()
        });
    }
    console.log('Successfuly updated.');
})
.catch(error => console.error("Warning: ", error));
}
function blackie(){
    document.body.classList.toggle("dark");
}
function checekr(){
    const pass = document.getElementById("pass").value;
    if (pass === "IShallWaveTheeGoldAndBlue"){
        form.style.display = "block";
        passing.style.display = "none";
    } else {
        pup.style.display = "block";
        btn.addEventListener("click",function(){
            pup.style.display = "none";
        });
    }
}