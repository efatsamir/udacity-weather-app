/* Global Variables */

const date = document.querySelector('#date');
const temp = document.querySelector('#temp');
const content = document.querySelector('#content');


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'-'+ d.getDate()+'-'+ d.getFullYear();

// select generate btn
const generateBtn = document.querySelector('#generate');

// add event listener on it
generateBtn.addEventListener('click', performAction);

function performAction() {

    const feelings =  document.querySelector('#feelings').value;

    getData()
    .then( data => {
        
        postData({date: newDate, temperature: data.main.temp, userResponse: feelings});
        updateUI();
  
       }) 
    
}


// getData function to fetch data from api
const getData = async () => {
     
    const zipCode = document.querySelector('#zip').value;

    const apiKey = 'a6bb055b99a381eaeba20e8f13bac044';
    const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';

    const response = await fetch(baseUrl + zipCode + '&appid=' + apiKey + '&units=imperial');
    try {
        const data = await response.json();
        return data; 
    }catch(err) {
        console.log(err);
    }
}

// define postData function to post incoming data to the server
const postData = async ( data = {} ) => {

    const response = await fetch('/add', {

    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    
    body: JSON.stringify(data)   
});

try {
    const newData = await response.json();
    // console.log(newData);
    return newData;

  }catch(err) {
  console.log(err);
  }

}


// update ui 
const updateUI = async () => {
    
    const request = await fetch('/home');
    try {
        const all = await request.json();
        // console.log(all);
        date.innerHTML = date.innerHTML +' '+ all.date;
        temp.innerHTML = temp.innerHTML +' '+ all.temperature + ' F';
        content.innerHTML = content.innerHTML +' ' +all.userResponse;

    } catch(err) {
        console.log(err);
    };

}