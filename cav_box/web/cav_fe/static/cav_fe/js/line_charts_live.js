
		var count = 0;
		var isSetInterval = false;

		var config_live = {
			type: 'line',
			data: {
				labels: [ ],
				datasets: 
				[
					{
						label: 'BSM',
						backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
						borderColor: window.chartColors.blue,
						fill: false,
						data: [
								// randomScalingFactor(),randomScalingFactor()
							],
					}					
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
							labelString: 'Date Time (Every 2 secs)'
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
    socket1.addEventListener('message', function (event) {
        // console.log(event.data.length);
        // console.log(event.data.indexOf('{'));
        // console.log(event.data.substr(event.data.indexOf('{'), event.data.length-event.data.indexOf('{')));
        //let jsonStr=event.data.substr(event.data.indexOf('{'), event.data.length-event.data.indexOf('{'));
        //let jsonObj = JSON.parse(jsonStr);

        console.log('Message from SERVER: ', event.data);
        // console.log(jsonObj.messageId);
        // console.log(jsonObj.value);
        count++;
        if(!isSetInterval){
            isSetInterval = true;
            setInterval(function(){
                //display count
                //push one count every minute number/min
                if (config.data.datasets.length > 0) {
                    for (var index = 0; index < config.data.datasets.length; ++index) {
                            // config.data.labels.push(newMin(config.data.labels.length));
                            config.data.labels.push(newSec(0));
                            config.data.datasets[index].data.push(count);
                            //reset count
                            isSetInterval = false;
                            count=0;
                    }
                    window.myLine.update();
                }						
            }, INTERVAL_SEC * 1000);
        }
    });

};

		
		// document.getElementById('randomizeData').addEventListener('click', function() {
		// 	config.data.datasets.forEach(function(dataset) {
		// 		dataset.data.forEach(function(dataObj, j) {
		// 			if (typeof dataObj === 'object') {
		// 				dataObj.y = randomScalingFactor();
		// 			} else {
		// 				dataset.data[j] = randomScalingFactor();
		// 			}
		// 		});
		// 	});

		// 	window.myLine.update();
		// });

		// var colorNames = Object.keys(window.chartColors);
		// document.getElementById('addDataset').addEventListener('click', function() {
		// 	var colorName = colorNames[config.data.datasets.length % colorNames.length];
		// 	var newColor = window.chartColors[colorName];
		// 	var newDataset = {
		// 		label: 'Dataset ' + config.data.datasets.length,
		// 		borderColor: newColor,
		// 		backgroundColor: color(newColor).alpha(0.5).rgbString(),
		// 		data: [],
		// 	};

		// 	for (var index = 0; index < config.data.labels.length; ++index) {
		// 		newDataset.data.push(randomScalingFactor());
		// 	}

		// 	config.data.datasets.push(newDataset);
		// 	window.myLine.update();
		// });

		// document.getElementById('addData').addEventListener('click', function() {


		// 		if (config.data.datasets.length > 0) {
		// 			config.data.labels.push(newMin(config.data.labels.length));

		// 			for (var index = 0; index < config.data.datasets.length; ++index) {
		// 				if (typeof config.data.datasets[index].data[0] === 'object') {
		// 					console.log("testing "+ newMin(config.data.datasets[index].data.length));
		// 					config.data.datasets[index].data.push({
		// 						x: newMin(config.data.datasets[index].data.length),
		// 						y: 5,//randomScalingFactor(),
		// 					});
		// 				} else {
		// 					//config.data.datasets[index].data.push(randomScalingFactor());
		// 					config.data.datasets[index].data.push(15);
		// 				}
		// 			}
		// 			if(window.myLine !='undefined')
		// 				window.myLine.update();
		// 		}
		// 	});

			

		// document.getElementById('removeDataset').addEventListener('click', function() {
		// 	config.data.datasets.splice(0, 1);
		// 	window.myLine.update();
		// });

		// document.getElementById('removeData').addEventListener('click', function() {
		// 	config.data.labels.splice(-1, 1); // remove the label first

		// 	config.data.datasets.forEach(function(dataset) {
		// 		dataset.data.pop();
		// 	});

		// 	window.myLine.update();
		// });
	