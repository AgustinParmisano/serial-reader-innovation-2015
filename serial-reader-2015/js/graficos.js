$(function () {
    $('#container').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: 'Energía consumida y generada'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            title: {
                text: 'Hora del Día'
            },
            type: 'datetime',
        },
            dateTimeLabelFormats : {
                day: '%H:%M',
            },

        yAxis: {
            title: {
                text: 'Energía'
            },
            labels: {
                formatter: function () {
                    return this.value / 1000 + 'k';
                }
            }
        },
        tooltip: {
            pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
        },
        plotOptions: {
            area: {
                pointStart: 0,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: [{
            name: 'Consumida',
            color: '#b30000',
            data: [20, 20, 20, 30, 40, 50, 40, 40, 50, 60, 55, 65, 70, 85, 80, 80, 85, 90, 70, 50, 40, 20, 20, 20],
            pointInterval: 3600 * 1000 // one day]
        }, {
            name: 'Generada',
            color: '#00e600',
            data: [0,0,0,0,0,5,10,15,25,35,50,70,90,110,130,120,105,85,70,40,15,0,0,0],
            pointInterval: 3600 * 1000 // one day]
        }]
    });
});