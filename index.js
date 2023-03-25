const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
    return (seconds) => {
        //Сперва создаем setInterval, и присваиваем переменной, чтобы найти самый высокий id в системе.
        let highestIdInterval = setInterval(";");
        // Потом останавливаем все запущенные таймеры.
        for (let i = 0 ; i < highestIdInterval ; i++) {
            clearInterval(i);
        }

        // Объявляем счетчик всех секунд
        let counter = seconds;

        // Объявляем секунды
        let theSecond = 0;
        let minutes = 0;
        let hours = 0;

        // Если количество всех секунд больше 60, значит на надо понять, сколько секунд будет без минут и часов
        if (counter > 60) {
            // Выясняем, сколько минут в secondsCount
            let minutesNotRounded = counter / 60

            // Math.trunc берет получившееся целое число без округления. Поэтому перемножаем количество целых минут на 60 секунд, чтобы потом вычесть это число из общего числа секунд. И как разницу получаем фактическое количество секунд.
            theSecond = counter - Math.trunc(minutesNotRounded) * 60;

            // минуты тоже сразу получили
            minutes = Math.trunc(minutesNotRounded)

            counter = minutes;
        } else if (counter == 60) { // если у нас ровно 60 секунд, тогда просто записываем 59 секунд и 1 минуту
            theSecond = 0
            minutes = 1
            counter = 0;
        } else { // если же у нас меньше 60 секунд, тогда просто записываем количество секунд
            theSecond = seconds
            counter = 0;
        }

        //Если минут больше 60, надо вычеслить и часы. Минуты у нас хранятся теперь в secondsCount
        if (counter > 60) {
            let hoursNotRounded = counter / 60
            minutes = counter - Math.trunc(hoursNotRounded) * 60;
            hours = Math.trunc(hoursNotRounded)

        } else if (counter == 60) {
            hours = 1
            minutes = 0

        }
        const formatTimer = (timeNumber) => {
            if (timeNumber < 10) {
                timeNumber = `0${timeNumber}`
                return timeNumber
            } else {
                return timeNumber
            }
        }

        timerEl.textContent = `${formatTimer(hours)}: ${formatTimer(minutes)}: ${formatTimer(theSecond)}`

        // Логика внутри таймера
        const func = () => {
            if (theSecond > 0) {
                theSecond -= 1
            }
            if (theSecond == 0 && minutes > 0) {
                theSecond += 59
                minutes -= 1
            }

            if (theSecond == 0 && minutes == 0 && hours > 0) {
                hours -= 1
                minutes += 59
                theSecond += 59
            }
            timerEl.textContent = `${formatTimer(hours)}: ${formatTimer(minutes)}: ${formatTimer(theSecond)}`

            // Останавливаем выполнение функции, если у нас закончилось время
            if (hours == 0 && minutes == 0 && theSecond == 0) {
                clearInterval(timer)
            }
        }
        const timer = setInterval(func, [1000])

    };
};

const animateTimer = createTimerAnimator();
inputEl.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '')

    // Очистите input так, чтобы в значении
    // оставались только числа
});

buttonEl.addEventListener('click', () => {
    const seconds = Number(inputEl.value);
    animateTimer(seconds);
    inputEl.value = '';
});
