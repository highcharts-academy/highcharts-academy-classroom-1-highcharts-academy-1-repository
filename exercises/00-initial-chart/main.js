Highcharts.setOptions({
	colors: ['#1E90FF', '#32CD32', '#FF4500'],
	symbols:["square", "triangle-down", "circle"]
});

Highcharts.chart('container', {
	title: {
		text: 'Highcharts chart',
		align: 'left'
	},
	subtitle: {
		text: 'With modified default elements',
		align: 'left'
	},
	legend: {
		align: 'left',
		verticalAlign: 'top'
	},
	credits: {
		text: 'Highcharts website',
		position: {
			align: 'left',
			x: 10
		}
	},
	yAxis: {
		title: {
			text: 'yAxis title'
		},
		labels: {
			format: '{text} k',
			style: {
				color: '#32CD32'
			}
		},
	},
	xAxis: {
		title: {
			text: 'xAxis title'
		}
	},
  series: [{
		type: 'column',
		name: 'Column series',
        data: [1, 6, null, 3, 2]
  }, {
		name: 'Line series',
        data: [1.5, 5, 2, 3, 6, 5]
  }, {
		type: 'spline',
		name: 'Spline series',
	 	data: [3, 4, 1, 5, 1, 6]
	}]
});