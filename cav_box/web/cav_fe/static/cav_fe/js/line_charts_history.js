var config_history = {
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
					round: 'minute',
					unit: 'minute',
					tooltipFormat: 'll HH:mm',
					stepSize: 1,
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
					labelString: 'Date Time (1 Min - per count)'
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

$('#history-btn').click(function(){
	var ctx = document.getElementById('history-canvas').getContext('2d');
	window.myLineHistory = new Chart(ctx, config_history);
});


	
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

	//addDataset for both live_lines and history_line
	var colorNames = Object.keys(window.chartColors);
	document.getElementById('inlineCheckboxBSM').addEventListener('click', function() {
		console.log("searching...");

		//add line
		if($(this).prop("checked")){
			console.log(config_history.data.datasets.length);
			var colorName = colorNames[config_history.data.datasets.length % colorNames.length];
			var newColor = window.chartColors[colorName];
			BSMLineIndex = config_history.data.datasets.length;
			var newDataset = {
				label: this.value + (config_history.data.datasets.length),
				borderColor: newColor,
				backgroundColor: color(newColor).alpha(0.5).rgbString(),
				data: [],
			};

			for (var index = 0; index < config_history.data.labels.length; ++index) {
				newDataset.data.push(randomScalingFactor());
			}

			config_history.data.datasets.push(newDataset);

		}else{
			//remove line
			config_history.data.datasets.splice(BSMLineIndex, 1);// remove the label first
		}
		
		window.myLineHistory.update();
	});

	document.getElementById('inlineCheckboxMAP').addEventListener('click', function() {
		console.log("searching...");

		//add line
		if($(this).prop("checked")){
			console.log(config_history.data.datasets.length);
			var colorName = colorNames[config_history.data.datasets.length % colorNames.length];
			var newColor = window.chartColors[colorName];
			MAPLineIndex = config_history.data.datasets.length;
			var newDataset = {
				label: this.value + (config_history.data.datasets.length),
				borderColor: newColor,
				backgroundColor: color(newColor).alpha(0.5).rgbString(),
				data: [],
			};

			for (var index = 0; index < config_history.data.labels.length; ++index) {
				newDataset.data.push(randomScalingFactor());
			}

			config_history.data.datasets.push(newDataset);

		}else{
			//remove line
			config_history.data.datasets.splice(MAPLineIndex, 1);// remove the label first
		}
		
		window.myLineHistory.update();
	});

	document.getElementById('inlineCheckboxSPAT').addEventListener('click', function() {
		console.log("searching...");

		//add line
		if($(this).prop("checked")){
			var colorName = colorNames[config_history.data.datasets.length % colorNames.length];
			var newColor = window.chartColors[colorName];
			SPATLineIndex = config_history.data.datasets.length;
			var newDataset = {
				label: this.value+ (config_history.data.datasets.length),
				borderColor: newColor,
				backgroundColor: color(newColor).alpha(0.5).rgbString(),
				data: [],
			};

			for (var index = 0; index < config_history.data.labels.length; ++index) {
				newDataset.data.push(randomScalingFactor());
			}

			config_history.data.datasets.push(newDataset);

		}else{
			//remove line
			config_history.data.datasets.splice(SPATLineIndex, 1);// remove the label first
		}
		
		window.myLineHistory.update();
	});

	document.getElementById('inlineCheckboxTIM').addEventListener('click', function() {
		console.log("searching...");

		//add line
		if($(this).prop("checked")){
			
			var colorName = colorNames[config_history.data.datasets.length % colorNames.length];
			var newColor = window.chartColors[colorName];
			TIMLineIndex = config_history.data.datasets.length;
			var newDataset = {
				label: this.value + (config_history.data.datasets.length ),
				borderColor: newColor,
				backgroundColor: color(newColor).alpha(0.5).rgbString(),
				data: [],
			};

			for (var index = 0; index < config_history.data.labels.length; ++index) {
				newDataset.data.push(randomScalingFactor());
			}

			config_history.data.datasets.push(newDataset);

		}else{
			//remove line
			config_history.data.datasets.splice(TIMLineIndex, 1);// remove the label first
		}
		
		window.myLineHistory.update();
	});

	//add data
	document.getElementById('search_history_graph_data').addEventListener('click', function() {
			let history_start_datetime = new Date(document.getElementById("history_start_datetime").value);
			let history_end_datetime = new Date(document.getElementById("history_end_datetime").value);
			let Axes_total_seconds = (history_end_datetime.getTime()-history_start_datetime.getTime())/1000;
			let Axes_total_minutess = Axes_total_seconds / 60;
			let Axes_total_hours = Axes_total_minutess / 60;

			if (config_history.data.datasets.length > 0) 
			{
				for (var index = 0; index < config_history.data.datasets.length; ++index) {
					//clear existing date
					config_history.data.datasets[index].data = [];

					//Add data 
					console.log("testing "+ config_history.data.datasets[index].data.length);
					console.log(Axes_total_minutess);

					//1 minute per count
					let history_step_datetime = history_start_datetime;
					for (var i=0 ;i<Axes_total_minutess;i++)
					{
						history_step_datetime = moment(history_step_datetime).add(1, 'm').toDate();
						console.log("Step: "+history_step_datetime);
						config_history.data.datasets[index].data.push({
							//	x: newSec(config_history.data.datasets[index].data.length),
								x: moment(history_step_datetime).add(1, 'm').toDate(),
								y: randomScalingFactor(),
							});
					}
					
				}
				if(window.myLineHistory !='undefined')
					window.myLineHistory.update();
			}
		});

		

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
