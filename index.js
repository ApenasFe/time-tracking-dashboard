async function readJson(displayCallback, timeKey){
  //Fazendo fetch e parse do arquivo data.json
  let dataObject = await fetch('./data.json');
  let dataText = await dataObject.text();
  const data = JSON.parse(dataText);
  let choosenKey = timeKey;
  displayCallback(data, choosenKey);
};

//Exibe os dados JSON
function displayData(myData, selectedTimeKey){
  for (let i = 0; i < myData.length; i++){
      let activityTitle = myData[i].title;
      let activityTimeframes = myData[i].timeframes;
      let timeframeKey = selectedTimeKey;
      //Cria um container de atividade com os dados JSON
      createContainer(activityTitle, activityTimeframes, timeframeKey);
      };
};

//Função da criação dos containers com os dados JSON
function createContainer(activity, timeFrame, time) {
  document.getElementById('activity-container-id').innerHTML += 

  `<div class="activity-banner-box">
    <div class="banner-box" id="${activity.toLowerCase().replace(/ /, "-")}-banner">
      <img src="images/icon-${activity.toLowerCase().replace(/ /, "-")}.svg" alt="Activity Icon" class="activity-icon">
    </div>
    
    <div class="activity-box" id="${activity.toLowerCase().replace(/ /, "-")}-info">
      <div class="activity-info" id="current-time">
        <p class="activity-text" id="${activity.toLowerCase().replace(/ /, "-")}-text">${activity}</p>
        <p class="activity-text" id="current-time-text" name="${activity.toLowerCase().replace(/ /, "-")}-current-time">${timeFrame[time].current}hrs</p>
      </div>
      
      <div class="activity-info" id="last-time">
        <div class="ellipsis-grid">
          <img src="images/icon-ellipsis.svg" class="ellipsis-icon">
        </div>
        <p class="activity-text" id="last-time-text" name="${activity.toLowerCase().replace(/ /, "-")}-previous-time">Última semana - ${timeFrame[time].previous}hrs</p>
      </div>
    </div>
  </div>`;
};

//Função dos botões para mudar as horas no rastreador de acordo com os dados JSON
async function dataSwap(btnKey) {
let jsonObject = await fetch('./data.json');
let jsonDataText = await jsonObject.text();
const jsonData = JSON.parse(jsonDataText);

for (i = 0; i < jsonData.length ;i++) {
  let activityTitle = jsonData[i].title.toLowerCase().replace(/ /, '-');
  let activityTime = jsonData[i].timeframes[btnKey];
  currentElement = activityTitle + '-current-time';
  previousElement = activityTitle + '-previous-time';
  
  document.getElementsByName(currentElement)[0].innerHTML = activityTime['current'] + 'hrs';
  document.getElementsByName(previousElement)[0].innerHTML = 'Última semana - ' + activityTime['previous'] + 'hrs';
}

};

readJson(displayData, 'weekly');

//Botões
document.getElementById('daily-btn').addEventListener('click', function(){dataSwap('daily');});
document.getElementById('weekly-btn').addEventListener('click', function(){dataSwap('weekly');});
document.getElementById('monthly-btn').addEventListener('click', function(){dataSwap('monthly');});