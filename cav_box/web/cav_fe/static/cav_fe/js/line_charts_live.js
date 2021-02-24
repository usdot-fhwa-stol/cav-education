
var count = 0;
var isSetInterval = false;

var config_live = {
	type: 'line',
	data: {
		labels: [ ],
		datasets: 
		[
			// {
			// 	label: 'BSM',
			// 	backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
			// 	borderColor: window.chartColors.blue,
			// 	fill: false,
			// 	data: [
			// 			// randomScalingFactor(),randomScalingFactor()
			// 		],
			// }					
		]
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
					stepSize: 5,
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
					labelString: 'Date Time (Every 10 secs)'
				}
			}],
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'Message Count',
					stepSize: 5
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
        socket1.send('Connected to Websocket Server!');
    });

    // Listen for messages
    // socket1.addEventListener('message', function (event) {
    //     console.log('Message from SERVER: ', event.data);
    //     count++;
    //     if(!isSetInterval){
    //         isSetInterval = true;
    //         setInterval(function(){
    //             //display count
    //             //push one count every minute number/min
    //             if (config_live.data.datasets.length > 0) {
    //                 for (var index = 0; index < config_live.data.datasets.length; ++index) {
    //                         // config_live.data.labels.push(newMin(config_live.data.labels.length));
    //                         config_live.data.labels.push(newSec(0));
    //                         config_live.data.datasets[index].data.push(count);
    //                         //reset count
    //                         isSetInterval = false;
    //                         count=0;
    //                 }
    //                 window.myLine.update();
    //             }						
    //         }, INTERVAL_SEC * 1000);
    //     }
    // });

	socket1.addEventListener('message', function (event) {
        console.log('Message from SERVER: ', event.data);
		//var parser = new JSONParser();
		var json = JSON.parse(event.data);
        console.log('Value from SERVER: ', json.value);
        console.log('Value from SERVER: ', json.value.length);
		
		console.log("count live data for " + json.value);
		if(json.value.trim() == "BSM" || json.value.trim()=="BasicSafetyMessage")
		{
			++BSMLiveCount;
		}
		else if(json.value.trim() == "TIM" || json.value.trim()=="TravelerInformationMessage")
		{
			++TIMLiveCount; 
		}
		else if(json.value.trim() == "SPAT" ){
			++SPATLiveCount;
			console.log("SPAT count " + SPATLiveCount);
		}
		else if(json.value.trim() == "MAP" ){
			++MAPLiveCount; 
		}

        if(!isSetInterval){
            isSetInterval = true;
            setInterval(function(){
                //display count
                //push one count every minute number/min
				console.log("config length: " + config_live.data.datasets.length);

				//distribute data based on index
				config_live.data.labels.push(newSec(0));
                if (config_live.data.datasets.length > 0) {
                    for (var index = 0; index < config_live.data.datasets.length; ++index) {
							if(index == BSMLiveLineIndex)
							{
								console.log("update BSM data count. BSM index " + BSMLiveLineIndex);
								console.log("BSM count " + BSMLiveCount);
								config_live.data.datasets[index].data.push(BSMLiveCount);
							}
							else if(index == TIMLiveLineIndex)
							{
								console.log("update TIM data count. TIM index " + TIMLiveLineIndex);
								config_live.data.datasets[index].data.push(TIMLiveCount);
							}
							else if(index == SPATLiveLineIndex)
							{
								console.log("update SPAT data count; SPAT index " + SPATLiveLineIndex);
								console.log("SPAT count " + SPATLiveCount);
								config_live.data.datasets[index].data.push(SPATLiveCount);
							}
							else if (index == MAPLiveLineIndex)
							{
								console.log("update MAP data count. MAP index " + MAPLiveLineIndex);
								config_live.data.datasets[index].data.push(MAPLiveCount);
							}
                    }
                    if(window.myLine!=null && window.myLine!='undefined')
					 window.myLine.update();
                }
				
				//reset count
				isSetInterval = false;
				BSMLiveCount = 0;
				TIMLiveCount = 0;
				SPATLiveCount = 0;
				MAPLiveCount = 0;						
            }, INTERVAL_SEC * 1000);
        }
    });
};

//Checkboxes to show/hide lines && addd/remove dataset
var colorNames = Object.keys(window.chartColors);

document.getElementById('inlineCheckboxBSM').addEventListener('click', function() {
	console.log("searching...");

	//add line
	if($(this).prop("checked")){
		console.log(config_live.data.datasets.length);
		var colorName = colorNames[config_live.data.datasets.length % colorNames.length];
		var newColor = window.chartColors[colorName];
		BSMLiveLineIndex = config_live.data.datasets.length;
		var newDataset = {
			label: this.value + (config_live.data.datasets.length),
			borderColor: newColor,
			backgroundColor: color(newColor).alpha(0.5).rgbString(),
			data: [],
		};

		for (var index = 0; index < config_live.data.labels.length; ++index) {
			// newDataset.data.push(randomScalingFactor());
			newDataset.data.push(0);
		}

		config_live.data.datasets.push(newDataset);

	}else{
		//remove line
		config_live.data.datasets.splice(BSMLiveLineIndex, 1);// remove the label first
	}
	
	if(window.myLine!=null && window.myLine!='undefined')
					window.myLine.update();
});

document.getElementById('inlineCheckboxMAP').addEventListener('click', function() {
	console.log("searching...");

	//add line
	if($(this).prop("checked")){
		console.log(config_live.data.datasets.length);
		var colorName = colorNames[config_live.data.datasets.length % colorNames.length];
		var newColor = window.chartColors[colorName];
		MAPLiveLineIndex = config_live.data.datasets.length;
		var newDataset = {
			label: this.value + (config_live.data.datasets.length),
			borderColor: newColor,
			backgroundColor: color(newColor).alpha(0.5).rgbString(),
			data: [],
		};

		for (var index = 0; index < config_live.data.labels.length; ++index) {
			//newDataset.data.push(randomScalingFactor());
			newDataset.data.push(0);
		}

		config_live.data.datasets.push(newDataset);

	}else{
		//remove line
		config_live.data.datasets.splice(MAPLiveLineIndex, 1);// remove the label first
	}
	
	if(window.myLine!=null && window.myLine!='undefined')
					window.myLine.update();
});

document.getElementById('inlineCheckboxSPAT').addEventListener('click', function() {
	console.log("searching...");

	//add line
	if($(this).prop("checked")){
		var colorName = colorNames[config_live.data.datasets.length % colorNames.length];
		var newColor = window.chartColors[colorName];
		SPATLiveLineIndex = config_live.data.datasets.length;
		var newDataset = {
			label: this.value+ (config_live.data.datasets.length),
			borderColor: newColor,
			backgroundColor: color(newColor).alpha(0.5).rgbString(),
			data: [],
		};

		for (var index = 0; index < config_live.data.labels.length; ++index) {
			// newDataset.data.push(randomScalingFactor());
			newDataset.data.push(0);
		}

		config_live.data.datasets.push(newDataset);

	}else{
		//remove line
		config_live.data.datasets.splice(SPATLiveLineIndex, 1);// remove the label first
	}
	
	if(window.myLine!=null && window.myLine!='undefined')
					window.myLine.update();
});

document.getElementById('inlineCheckboxTIM').addEventListener('click', function() {
	console.log("searching...");

	//add line
	if($(this).prop("checked")){
		
		var colorName = colorNames[config_live.data.datasets.length % colorNames.length];
		var newColor = window.chartColors[colorName];
		TIMLiveLineIndex = config_live.data.datasets.length;
		var newDataset = {
			label: this.value + (config_live.data.datasets.length ),
			borderColor: newColor,
			backgroundColor: color(newColor).alpha(0.5).rgbString(),
			data: [],
		};

		for (var index = 0; index < config_live.data.labels.length; ++index) {
			// newDataset.data.push(randomScalingFactor());
			newDataset.data.push(0);
		}

		config_live.data.datasets.push(newDataset);

	}else{
		//remove line
		config_live.data.datasets.splice(TIMLiveLineIndex, 1);// remove the label first
	}
	if(window.myLine!=null && window.myLine!='undefined')
					window.myLine.update();
});
