const fs = require("fs");
const axios = require("axios");
const http = require("http");

function changeData(fileData , apiData)
{
    console.log(apiData);
    var cityCountryDetails = apiData.name+","+apiData.sys.country;
    var minMaxTempDetails = "Min : "+apiData.main.temp_min+" | Max "+apiData.main.temp_max;
    var iconData = "<img src='https://api.openweathermap.org/img/w/"+apiData.weather[0].icon+".png'/>";

    fileData = fileData.replace("#CITY_COUNTRY#", cityCountryDetails);
    fileData = fileData.replace("#TEMPERATURE#", apiData.main.temp);
    fileData = fileData.replace("#MIN_MAX_TEMPERATURE#",  minMaxTempDetails);
    fileData = fileData.replace("#ICON#", iconData);

    return fileData;
}

const server = http.createServer((request, response) =>{
   if(request.url=="/")
   {
    axios.get('https://api.openweathermap.org/data/2.5/weather?q=Noida&appid=17e911a7ae34731652868419f9eb7c62&units=metric')
  .then(function (apiResponse) {
   
        var fileData = fs.readFileSync("index.html", "utf-8");
        var updatedFileData = changeData(fileData , apiResponse.data);

        response.write( updatedFileData);
        response.end();
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
    });
   }
});

server.listen(8000);
