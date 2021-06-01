const cordinate= {"Kolkata(US Consulate)":["22.56263","88.36304"],
                  "Victoria,Kolkata":["22.572646","88.363895"],
                  "Jadavpur":["22.49929","88.36917"],
                  "Bidhannagar":["22.58157048","88.41002457"],
                  "Dumdum":["22.584952","88.359079"],
                  "Rabindra Sarobar":["22.51106","88.35142"],
                  "Ballygunge":["22.5367507","88.3638022"],
                  "Belur Math,Howrah":["22.629801","88.352017"],
                  "Fort William,Kolkata":["22.55664","88.342674"],
                  "Haldia":["22.06047","88.109737"]}
var myChartList=[];
function clearChart()
{
  if (typeof myChartList !== 'undefined' && myChartList.length > 0)
  {
    for(var i=0;i<myChartList.length;i++)
    myChartList[i].destroy();
  }
}
function chartIt(ctx,data,labelText,scale)
{
  let xlabels=[];
  const ylabels=[];
  let maxValue=-1;
   for(var i=0;i<data.length;i++)
    {
     xlabels.push(data[i].avg);
     ylabels.push(data[i].day.slice(5,10));
     if(xlabels[i]>maxValue)
     maxValue=xlabels[i];
    }

const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ylabels,
          datasets: [{
              label: labelText+"-level",
              data: xlabels,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.4)',
                  'rgba(54, 162, 235, 0.4)',
                  'rgba(255, 206, 86, 0.4)',
                  'rgba(75, 192, 192, 0.4)',
                  'rgba(153, 102, 255, 0.4)',
                  'rgba(255, 159, 64, 0.4)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        plugins: {
           legend: {
             labels: {
             boxWidth: 0,
                     }
                   }
                },
          scales: {
              y: {
                  beginAtZero: true,
                  max: (Math.floor(maxValue/10))*10+20,
                  min: 0
              }
          }
      }
  });
  var red = scale[0];
  var orange=scale[1];
  var yellow=scale[2]; //set this to whatever is the deciding color change value
  var lightGreen=scale[3];
  var dataset = myChart.data.datasets[0];
  for (var i = 0; i < dataset.data.length; i++) {
  if (dataset.data[i] >=red)
        {
        dataset.backgroundColor[i] = 'rgba(255, 0, 0, 0.4)';
        dataset.borderColor[i] = 'rgba(255, 0, 0, 1)';
        }
  else if(dataset.data[i]>=orange)
        {
        dataset.backgroundColor[i]=  'rgba(255, 69, 0, 0.4)';
        dataset.borderColor[i] = 'rgba(255, 69, 0, 1)';
        }
  else if(dataset.data[i]>=yellow)
        {
        dataset.backgroundColor[i]=  'rgba(255, 255, 0, 0.4)';
        dataset.borderColor[i] = 'rgba(255, 255, 0, 1)';
        }
  else if(dataset.data[i]>=lightGreen)
        {
        dataset.backgroundColor[i]= 'rgba(0, 100, 0, 0.4)';
        dataset.borderColor[i] = 'rgba(0, 100, 0, 1)';
        }
  else
        {
        dataset.backgroundColor[i]= 'rgba(0, 255, 0, 0.4)';
        dataset.borderColor[i] = 'rgba(0, 255, 0, 1)';
        }

    }
    myChart.update();
    myChartList.push(myChart);
}
function showAQI(aqi,time,city,temp)
{
  let text="";
  document.getElementById("AQI-logo").innerHTML = aqi;
  let date=time.split(" ")[0];
  let tm=time.split(" ")[1].slice(0,5);
  if(aqi>300)
  {
  document.getElementById("AQI-logo").style.backgroundColor="#82161a";
  text="Hazardous";
  document.body.style.backgroundImage= "linear-gradient(110deg, rgba(130,22,26,0.9), white)"; //130, 22, 26
  }
  else if(aqi>200)
  {
  document.getElementById("AQI-logo").style.backgroundColor="#750ea1";
  document.body.style.backgroundImage= "linear-gradient(110deg, rgba(174,0,255,0.9), white)"; //174, 0, 255
  text="Dangerous";
  }
  else if(aqi>150)
  {
  document.getElementById("AQI-logo").style.backgroundColor="#e32733";
  text="Unhealthy";
  document.body.style.backgroundImage= "linear-gradient(110deg, rgba(240,24,38,0.9), white)"; //240, 24, 38
  }
  else if(aqi>100)
  {
  document.getElementById("AQI-logo").style.backgroundColor="#FF8C00";
  text="Moderate";
  document.body.style.backgroundImage= "linear-gradient(110deg, rgba(255, 102, 0,0.9),white)"; //255, 102, 0
  }
  else if(aqi>50)
  {
  document.getElementById("AQI-logo").style.backgroundColor="#fcfc32";
  text="Satisfactory";
  document.body.style.backgroundImage= "linear-gradient(110deg,rgba(255, 255, 0,0.9),white)";
  }
  else
  {
  document.getElementById("AQI-logo").style.backgroundColor="#23eb37";
  text="Good";
  document.body.style.backgroundImage= "linear-gradient(105deg, rgba(35,235,55,0.9),white)";
  }
 let d=new Date().toLocaleString('en-us', {  weekday: 'long' })+" "+tm;
 // const timeTemp="<p>Updated on "+d+"</p>"+"<p>Temp : "+Math.round(temp)+"°C</p>";
 const timeTemp="<p>Updated on "+d+"</p>";
 document.getElementById("AQI-head").innerHTML=city.split(', India', 1);
 document.getElementById("AQI-info").innerHTML="<span>"+text+"</span>"+"<br>"+timeTemp+"<br>";
 const txt=text.toLowerCase();
 document.getElementById("AQI-img").src = txt+".png";
}
function storeData(aqi,data)
{
  if(data!=null)
  aqi.push(data.v);
  else
  aqi.push("NA");
}
function trunc(number)
{
  return Math.round(number*10)/10;
}
function showWeather(iaqi)
{
  let aqi=[];
  storeData(aqi,iaqi.pm25);
  storeData(aqi,iaqi.pm10);
  storeData(aqi,iaqi.co);
  storeData(aqi,iaqi.o3);
  aqi.push(trunc(iaqi.t.v)+"°C");
  aqi.push(trunc(iaqi.p.v)+"hPa");
  aqi.push(trunc(iaqi.h.v)+"%");
  aqi.push(trunc(iaqi.w.v)+" km/h");
  const data=document.querySelectorAll('h3');
  for(var i=0;i<data.length;++i)
  {
    data[i].innerHTML=aqi[i];
  }
}
var data = {
    latitude: 22.56263,
    longitude: 88.36304
};
// var xhr = new XMLHttpRequest();
// xhr.open('POST', '/');
// xhr.onload = function(data) {
// const json= JSON.parse(this.responseText);
// const aqi=json.data.aqi;  // aqi index
// const iaqi=json.data.iaqi;            // current-time data
// const time=json.data.time;           //current time
// const debug=json.data.debug;        //synched time
// const city=json.data.city;
// showAQI(aqi,time.s,city.name,iaqi.t.v);
// Chart.defaults.font.size= 18;
// Chart.defaults.font.weight= "bold";
// clearChart();
// var ctx;
// showWeather(iaqi);
// };
// xhr.setRequestHeader('Content-Type', 'application/json');
// xhr.send(JSON.stringify(data));
document.getElementById('middle-menu').addEventListener('click',(e)=>
{
  const text=e.target.text;
  const lat=cordinate[text][0];
  const long=cordinate[text][1];
   var data = {
       latitude: lat,
       longitude: long
   };
   var xhr = new XMLHttpRequest();
   xhr.open('POST', '/');
   xhr.onload = function(data) {
   const json= JSON.parse(this.responseText);
   const aqi=json.data.aqi;  // aqi index
   const iaqi=json.data.iaqi;            // current-time data
   const time=json.data.time;           //current time
   const debug=json.data.debug;        //synched time
   const city=json.data.city;
   showAQI(aqi,time.s,city.name,iaqi.t.v);
   showWeather(iaqi);
   console.log(debug);
   };
   xhr.setRequestHeader('Content-Type', 'application/json');
   xhr.send(JSON.stringify(data));
});



// var ctx = document.getElementById('myChart').getContext('2d');
// chartIt(ctx,daily.o3);
// ctx=document.getElementById('myChart1').getContext('2d');
// chartIt(ctx,daily.pm10)
// ctx=document.getElementById('myChart2').getContext('2d');
// chartIt(ctx,daily.pm25)
// ctx=document.getElementById('myChart3').getContext('2d');
// chartIt(ctx,daily.uvi)


// 095ed0eb2eca12fc9a1de055bf7bb87b
