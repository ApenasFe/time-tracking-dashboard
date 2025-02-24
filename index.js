async function readJson(callback, timeKey){
    //Fazendo fetch e parse do arquivo data.json
    let dataObject = await fetch('./data.json');
    let dataText = await dataObject.text();
    const data = JSON.parse(dataText);
    let choosenKey = timeKey
    callback(data, choosenKey);
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

    `<div class="banner-box" id="${activity.toLowerCase().replace(/ /, "-")}-banner">
      <img src="images/icon-${activity.toLowerCase().replace(/ /, "-")}.svg" alt="Activity Icon" class="activity-icon">
    </div>
    
    <div class="activity-box" id="${activity.toLowerCase().replace(/ /, "-")}-info">
      <div class="activity-info" id="current-time">
        <p class="activity-text" id="${activity.toLowerCase().replace(/ /, "-")}-text">${activity}</p>
        <p class="activity-text" id="current-time-text">${timeFrame[time].current}hrs</p>
      </div>
      
      <div class="activity-info" id="last-time">
        <div class="ellipsis-grid">
          <img src="images/icon-ellipsis.svg" class="ellipsis-icon">
        </div>
        <p class="activity-text" id="last-time-text">Last Week - ${timeFrame[time].previous}hrs</p>
      </div>
    </div>`;
};

function clearContainer(btnKey) {
    document.getElementById('activity-container-id').innerHTML = ''
    readJson(displayData, btnKey);
}

readJson(displayData, 'weekly');

document.getElementById('daily-btn').addEventListener('click', function(){clearContainer('daily');});
document.getElementById('weekly-btn').addEventListener('click', function(){clearContainer('weekly');});
document.getElementById('monthly-btn').addEventListener('click', function(){clearContainer('monthly');});