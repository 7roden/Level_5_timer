import * as moment from '../node_modules/moment/moment';

document.getElementById('decrease').addEventListener('click', () => {
  let setMinutes = Number(document.getElementById('time').innerText);
  setMinutes = (setMinutes <= 0) ? setMinutes : (--setMinutes);
  document.getElementById('time').innerHTML = `${setMinutes}`;
});

document.getElementById('increase').addEventListener('click', () => {
  let setMinutes = Number(document.getElementById('time').innerText);
  document.getElementById('time').innerHTML = `${++setMinutes}`;
});

document.getElementById('start').addEventListener('click', () => {
  let setMinutes = Number(document.getElementById('time').innerText);
  if (setMinutes > 0) {
    document.getElementById('timer').style.visibility = 'visible';
    document.getElementById('setTime').style.display = 'none';
    document.querySelector('#title').innerHTML = 'Time left';
     myTimer(setMinutes);
  } else {
    alert('Timer not set');
  }
})


function myTimer(minutes: number) {
  let duration = moment.duration({
    'minutes': minutes,
    'seconds': 0
  });
  let interval = 1;
  let timer = setInterval(function () {
    duration = moment.duration(duration.asSeconds() - interval, 'seconds');
    let min = duration.minutes();
    let sec = duration.seconds();
    let timeLeft = (min < 10) ? ('0' + min) : ('' + min);
    timeLeft += ':' + ((sec < 10) ? ('0' + sec) : ('' + sec));
    document.getElementById('timer').innerText = timeLeft;
    if (min == 0 && sec == 0) {
      document.getElementById('timer').style.visibility = 'hidden';
      document.getElementById('setTime').style.display = 'block';
      document.getElementById('time').innerText = '0';
      document.querySelector('#title').innerHTML = 'Set time in minute';
      clearInterval(timer);
      alert('Time is over');
    }
  }, 1000);

}