
var count = 0;
var isSetInterval = false;

var config_live = {
	type: 'line',
	data: {
		labels: [ ],
		datasets: 
		[]
	},
	options: {
		title: {
			text: 'Messages Line Chart'
		},
		scales: {
			xAxes: [{
				type: 'time',
				time: {
					parser: timeFormat,
					round: 'second',
					unit: 'second',
					tooltipFormat: 'll HH:mm:ss',
					stepSize: INTERVAL_SECS,
					displayFormats: {
						'millisecond': 'MMM DD',
						'second': 'DD/MM HH:mm:ss',
						'minute': 'DD/MM HH:mm',
						'hour': 'MMM DD',
						'day': 'MMM DD',
						'week': 'MMM DD',
						'month': 'MMM DD',
						'quarter': 'MMM DD',
						'year': 'MMM DD',
					}
				},
				scaleLabel: {
					display: true,
					labelString: 'Date Time (Refresh every '+INTERVAL_SECS+' secs, x-axis step '+(INTERVAL_SECS ) +' secs)'
				}
			}],
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'Message Count',
					stepSize: 10
				}
			}]
		},
	}
};


window.onload = function() {
    var ctx = document.getElementById('real-time-canvas').getContext('2d');
    window.myLine = new Chart(ctx, config_live);

    // Create WebSocket connection.
    let socket1 = new WebSocket('ws://localhost:1337');

    // Connection opened
    socket1.addEventListener('open', function (event) {
        socket1.send('Connected to Websocket -1 Server!');
    });

	socket1.addEventListener('message', function (event) {
        console.log('line_chart_live.js - Message from SERVER: ', event.data);
		var json = JSON.parse(event.data);
		console.log("count live data for " + json.message_type);

		if(json.message_type.trim() == "BSM" || json.message_type.trim()=="BasicSafetyMessage")
		{
			++BSMLiveCount;
		}
		else if(json.message_type.trim() == "TIM" || json.message_type.trim()=="TravelerInformationMessage")
		{
			++TIMLiveCount; 
		}
		else if(json.message_type.trim() == "SPAT" ){
			++SPATLiveCount;
			console.log("SPAT count " + SPATLiveCount);
		}
		else if(json.message_type.trim() == "MAP" ){
			++MAPLiveCount; 
		}

    });//end of socket message listener

    //update live chart
    setInterval(()=>{
        let interval =  new Promise((resolve,reject)=>{
             resolve('waited for ' + INTERVAL_SECS +' secs');
        });

        interval.then((data)=>{
            console.log('data '+ data);
            console.log("config datasets length: " + config_live.data.datasets.length);

            if (config_live.data.datasets.length > 0 && config_live.data.labels !=null && config_live.data.labels) {
                //update date at y-axis
                updateArryElementDataCountbyName(config_live.data.datasets,"BasicSafetyMessage",BSMLiveCount);
                BSMLiveCount = 0;

                updateArryElementDataCountbyName(config_live.data.datasets,"TIM",TIMLiveCount);
                TIMLiveCount = 0;

                updateArryElementDataCountbyName(config_live.data.datasets,"SPAT",SPATLiveCount);
                SPATLiveCount = 0;

                updateArryElementDataCountbyName(config_live.data.datasets,"MAP",MAPLiveCount);
                MAPLiveCount = 0;

                //update x-axis
                console.log("data labels length: "+config_live.data.labels.length)
                config_live.data.labels.push(newSec(0));

                //data (in each dataset) length equals to data labels length. data (in each dataset) max length = MAX_LIVE_DATASETS_LENGTH
                if(config_live.data.labels.length > MAX_LIVE_DATASETS_LENGTH)
                {
                    //pop the oldest label data and  datasets data
                    console.log("remove data. Reach max data labels length: "+config_live.data.labels.length)
                    config_live.data.labels.shift();
                    removeDatasetsFirstElementDatabyName(config_live.data.datasets,"TIM");
                    removeDatasetsFirstElementDatabyName(config_live.data.datasets,"BasicSafetyMessage");
                    removeDatasetsFirstElementDatabyName(config_live.data.datasets,"SPAT");
                    removeDatasetsFirstElementDatabyName(config_live.data.datasets,"MAP");
                }
                if(window.myLine!=null && window.myLine!='undefined')
                 window.myLine.update();
            }
        });

    }, INTERVAL_SECS * 1000);

};

//Checkboxes to show/hide lines && addd/remove dataset
var colorNames = Object.keys(window.chartColors);

document.getElementById('inlineCheckboxBSM').addEventListener('click', function() {
	//add line
	if($(this).prop("checked")){
		addLiveLine(this);
	}else{
		//remove line
		removeArryElementbyName(config_live.data.datasets, "BasicSafetyMessage");
	}
	
	if(window.myLine!=null && window.myLine!='undefined')
					window.myLine.update();
});

document.getElementById('inlineCheckboxMAP').addEventListener('click', function() {
	console.log("searching...");

	//add line
	if($(this).prop("checked")){
			addLiveLine(this);

	}else{
		//remove line
		removeArryElementbyName(config_live.data.datasets, "MAP");
	}
	
	if(window.myLine!=null && window.myLine!='undefined')
					window.myLine.update();
});

document.getElementById('inlineCheckboxSPAT').addEventListener('click', function() {

	//add line
	if($(this).prop("checked")){
		addLiveLine(this);
	}else{
		//remove line
		removeArryElementbyName(config_live.data.datasets, "SPAT");
	}
	
	if(window.myLine!=null && window.myLine!='undefined')
					window.myLine.update();
});

document.getElementById('inlineCheckboxTIM').addEventListener('click', function() {

	//add line
	if($(this).prop("checked")){
        addLiveLine(this);
	}else{
		//remove line
		removeArryElementbyName(config_live.data.datasets, "TIM");
	}
	if(window.myLine!=null && window.myLine!='undefined')
					window.myLine.update();
});

function addTIM_SPAT_MAP_BSM_live_lines()
{
    let checkboxes = document.getElementsByName('messageTypeCheckbox');
    checkboxes.forEach(checkbox=>{
        addLiveLine(checkbox);
    });
}

//remove data
function removeTIM_BSM_SPAT_MAP_data_live_line()
{
    //remove live line data
    if(config_live!= null && config_live.data != null && config_live.data.datasets!=null ){
         //remove data from all different message history lines
         removeArryElementDatabyName(config_live.data.datasets, "TIM");
         removeArryElementDatabyName(config_live.data.datasets, "SPAT");
         removeArryElementDatabyName(config_live.data.datasets, "BasicSafetyMessage");
         removeArryElementDatabyName(config_live.data.datasets, "MAP");
    }
    //update label x-axis
    config_live.data.labels= [];
    return true;
}

function addLiveLine(checkbox)
{
        var colorName = colorNames[config_live.data.datasets.length % colorNames.length];
		var newColor = window.chartColors[colorName];
		var newDataset = {
			label: checkbox.value + (config_live.data.datasets.length ),
			borderColor: newColor,
			backgroundColor: color(newColor).alpha(0.5).rgbString(),
			data: [],
		};

		for (var index = 0; index < config_live.data.labels.length; ++index) {
			newDataset.data.push(0);
		}
		config_live.data.datasets.push(newDataset);
}

$(document).ready(function(){
    //add all lines
    if($('#inlineCheckboxTIM').prop("checked") && $('#inlineCheckboxBSM').prop("checked")
        && $('#inlineCheckboxSPAT').prop("checked") && $('#inlineCheckboxMAP').prop("checked"))
    {
        //defined in line_charts_live.js
        addTIM_SPAT_MAP_BSM_live_lines();
        if(window.myLine!=null && window.myLine!='undefined')
                window.myLine.update();

    }
})