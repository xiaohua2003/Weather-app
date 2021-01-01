/* Global Variables */
const apiKey="9c606971d1bdf33fab80334cc3f2c71c";
const baseURL="http://api.openweathermap.org/data/2.5/weather?zip=";
const zipBox=document.getElementById("zip");


document.getElementById("generate").addEventListener("click", performance);
function performance(e){
const zip=zipBox.value;
const url=`${baseURL}${zip}&appid=${apiKey}`;
const feelings=document.getElementById("feelings").value;
let d = new Date();
let newDate = (d.getMonth()+1)+'-'+ d.getDate()+'-'+ d.getFullYear();
getWeather(url)
.then(function(projectData){
  // Add data
  console.log(projectData);
  postData('/addWeather', {date: newDate, temp: projectData.main.temp, content:feelings} );
})
.then(
  updateUI()
)
};
//fetch weather data from OpenWeather Map
const getWeather= async (URL)=>{
  const res = await fetch(URL);
  try {
    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

//function to post data
  async function postData(url, data) {
    console.log(data)
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),        
  })
  try {
    const ProjectData = await response.json();
    console.log(ProjectData);
    return ProjectData;
  }catch(error) {
  console.log("error", error);
  }
};
//updat UI elements
const updateUI=async() => {
  const request = await fetch('/all');
  try{
    const projectData = await request.json();
    console.log(projectData);
    document.getElementById('date').innerHTML =projectData.date;
    document.getElementById('temp').innerHTML =projectData.temp;
    document.getElementById('content').innerHTML=projectData.content;
  }catch(error){
    console.log("error", error);
  }
};

