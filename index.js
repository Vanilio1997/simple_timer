const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');
let timerId = null
buttonEl.disabled = true
    


// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    const floorTime = (Timevalue) => Math.floor(Timevalue)
    // Округляет значение  величины времени в меньшую сторону
    clearInterval(timerId)
    const changeZeroValue = (value) => value < 10 ? `0${value}` : value 
    // Если одно из значнеий времени равно 0 возвращает '00' 
    let changigTimerSeconds = seconds
    
    timerId = setInterval(timerWork, 1000)
    
    function timerWork (){     
      let timerHours = changeZeroValue(floorTime(changigTimerSeconds / 60 / 60))
      let timerMinutes = changeZeroValue(floorTime((changigTimerSeconds  - (timerHours * 60 * 60)) / 60))
      let timerSeconds = changeZeroValue(floorTime(changigTimerSeconds - (timerMinutes * 60 + timerHours * 60 * 60)))
      

      timerEl.innerHTML = `${timerHours}:${timerMinutes}:${timerSeconds}`

      if(changigTimerSeconds === 0){
        clearInterval(timerId)
      }   
      changigTimerSeconds--
    }   
  };
};

console.log(inputEl.value);

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  inputEl.value =  e.target.value.replace(/[^0-9]/g, '');
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
