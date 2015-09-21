$(document).ready(function(){


(function($) {
        var configuration = { // Change this settings to match your environment/needs
          host: 'http://clima.info.unlp.edu.ar',
          endpoint: '/last?lang=es',
          dateFormat: 'DD/MM/YY HH:mm'
        },
        $parts = (function($target) {
          return {
            date: $target.find('.date'),
            temperature: $target.find('.temperature'),
            humidity: $target.find('.humidity'),
            bar: $target.find('.bar'),
            windSpeed: $target.find('.wind-speed'),
            windDirection: $target.find('.wind-direction'),
            rain: $target.find('.rain'),
            rainRate: $target.find('.rain-rate'),
            uv: $target.find('.uv'),
            windChill: $target.find('.wind-chill')
          };
        }($('#content'))),
        intervalId;

        function timeStampForHuman(aTimeStamp){ 
          aTimeStamp = aTimeStamp - (3*60*60);
          var timeDate = new Date(aTimeStamp * 1000);
          var date = new Array();
          date['date'] = timeDate.getUTCDate();
          date['month'] = timeDate.getUTCMonth() + 1;
          date['year'] = timeDate.getUTCFullYear();
          date['hours'] = timeDate.getUTCHours();
          date['minutes'] = timeDate.getUTCMinutes();
          return date;
        }

        function update(config) {
          $.getJSON(config.host + config.endpoint, function(data) {
            var dataDate = timeStampForHuman(moment(data.captured_at).format("X"));
            $parts.date.html(dataDate['date'] + '/' + dataDate['month'] + '/' + dataDate['year'] + ' ' + dataDate['hours'] + ':' + dataDate['minutes']);
            $parts.temperature.html(data.temperature);
            $parts.humidity.html(data.humidity);
            $parts.bar.html(data.bar);
            $parts.windSpeed.html(data.wind_speed);
            $parts.windDirection.html(data.wind_direction);
            $parts.windChill.html(data.wind_chill);
            $parts.uv.html(data.uv);
            $parts.rain.html(data.rain);
            $parts.rainRate.html(data.rain_rate);
          });
        }

        update(configuration);

        intervalId = setInterval(function() { update(configuration); }, 60000);
      }(jQuery));
});