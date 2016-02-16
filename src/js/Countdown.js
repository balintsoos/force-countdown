
module.exports = function (date) {
  var Countdown = {};

  Countdown.end = new Date(date);

  Countdown.start = function () {
    function Clock () {
      var now = new Date();
      var end = Countdown.end;
      var remaining = end.getTime() - now.getTime();
      dateDisplay(dateConversion(remaining));

      setTimeout(Clock, 1000);

      function dateConversion (t) {
        var cd = 24 * 60 * 60 * 1000,
          ch = 60 * 60 * 1000,
          cm = 60 * 1000,
          d = Math.floor(t / cd),
          h = Math.floor( (t - (d * cd)) / ch),
          m = Math.floor( (t - (d * cd) - (h * ch)) / cm),
          s = Math.floor( (t - (d * cd) - (h * ch) - (m * cm)) / 1000);

        if (s === -1) {
          m--;
          s = 59;
        }

        if (m === -1) {
          h--;
          m = 59;
        }

        if (h === -1) {
          d--;
          h = 23;
        }

        if (d < 0 || h < 0 || m < 0 || s < 0) {
          return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
          };
        }

        return {
          days: d,
          hours: h,
          minutes: m,
          seconds: s
        };
      }
      function dateDisplay (dateObject) {
        document.getElementById('days').innerHTML = dateObject.days;
        document.getElementById('hours').innerHTML = dateObject.hours;
        document.getElementById('minutes').innerHTML = dateObject.minutes;
        document.getElementById('seconds').innerHTML = dateObject.seconds;
      }
    }
    Clock();
  }

  return Countdown;
}
