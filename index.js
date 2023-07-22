const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');
let timerId = null
buttonEl.disabled = true
    


// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let secondsId;
  return (seconds) => {
    const endTime = new Date().getTime() + (seconds * 1000);
    const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

    cancelAnimationFrame(secondsId)
    function getRemainingTime(deadline) {
      const currentTime = new Date().getTime();
      return deadline - currentTime;
    }
    
    function pad(value) {
      return ('0' + Math.floor(value)).slice(-2);;
    }
    function showTime() {
      const remainingTime = getRemainingTime(endTime);
      const seconds = pad((remainingTime / 1000) % 60);
      const minutes = pad((remainingTime / (60 * 1000)) % 60);
      const hours = pad((remainingTime / (60 * 60 * 1000)) % 24);
      timerEl.innerHTML = `${hours}:${minutes}:${seconds}`;


      if (remainingTime >= 1000) {
        secondsId =  requestAnimationFrame(showTime);
      }
    }

    secondsId = requestAnimationFrame(showTime);
  };
  
}


const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  const numbersCheck  = e.target.value.replace(/[^0-9]/g, '');
  inputEl.value =   +numbersCheck > 0 ? numbersCheck : 0;

  if(inputEl.value){
    buttonEl.disabled = false
  } else {
    buttonEl.disabled = true
  }
 
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);
  animateTimer(seconds);
  buttonEl.disabled = true
  inputEl.value = '';
});
