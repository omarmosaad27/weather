/* Global Variables */
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?zip="
const apiKey = "&appid=1f11b28f69fa1eca8b5d113e368d6c55&units=imperial"
let dateDiv = document.querySelector("#date")
let tempDiv = document.querySelector("#temp")
let feelingsDiv = document.querySelector("#content")

// 1  

document.querySelector("#generate").addEventListener("click", weatherApp)


// 2
function weatherApp() {
    // Create date
    let date = new Date();
    let newDate = date.getMonth()+1 + '.' + date.getDate() + '.' + date.getFullYear();
    const zipInputValue = document.querySelector("#zip").value;
    const userFeelingsValue = document.querySelector("#feelings").value;
    const finalUrl = `${apiUrl}${zipInputValue}${apiKey}`
    // 3 function to fetch api 
    fetchDataFromApi(finalUrl)
        
        .then(function (data) {
        
            // 5 function to post data to server 
            addDataToServer('/addNewData', { temp: data.main.temp, date: newDate, feelings: userFeelingsValue })

            // 7 function to get data from server and update ui
            retrieveDataFromServer()
        }).catch(error => console.log(error));
    

};


// 4 function to fetch the api

async function fetchDataFromApi(finalUrl) {
    try {
        // making a fetch request to api and convert data to json
        const data = await (await fetch(finalUrl)).json()
        return data
    } catch (error) {
        console.log(error);
    }
}

// 6 function to add received to our server 

async function addDataToServer (url = "", data = {}) {
    try {
        // make a fetch resuest to the addWeather route and make a post request 
        const allData = await (await fetch(url, {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
    
        })).json();
        return allData
    } catch (error) {
        console.log(error);
    }
}

// 8 function to retrieve data from server and add it to dom elements
async function retrieveDataFromServer(){
    try {
        //  make a fetch request to all route to get data from  server
        const dataRetrieved = await (await fetch('/serverData')).json()
        dateDiv.innerHTML = dataRetrieved.date
        tempDiv.innerHTML = dataRetrieved.temp
        feelingsDiv.innerHTML = dataRetrieved.feelings
    } catch (error) {
        console.log(error);
    }
}