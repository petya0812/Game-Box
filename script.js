// ----------------- Переменные -----------------

const $timeHeader = document.querySelector('#time-header') // Блок времени 
const $time = document.querySelector('#time') // Спан времени
const $resultHeader = document.querySelector('#result-header') // Блок рузультата
const $result = document.querySelector('#result') // Спан результата
const $game = document.querySelector('#game') // игровое поле
const $start = document.querySelector('#start') // кнопка старт
const $input = document.querySelector('input') // инпут времени

let score = 0
let isGameStarted = false

// ----------------- Прослушки -----------------

$start.addEventListener('click', startGame)
$game.addEventListener('click',handleBoxClick)
$input.addEventListener('input',setGameTime)

// ----------------- Вспомогательные функции -----------------

function show($el){
    $el.classList.remove('hide')
}

function hide($el){
    $el.classList.add('hide')
}

function getRandom(min,max){
    return Math.floor(Math.random() * (max-min) + min)
}

// ----------------- Основные функции -----------------

function startGame(){
    score = 0
    isGameStarted = true
    hide($start)
    $game.style.backgroundColor = '#fff'
    $time.textContent = $input.value
    hide($resultHeader)
    show($timeHeader)
    setGameTime()

    const interval = setInterval(()=>{
        let time = parseFloat($time.textContent)

        if (time <= 0){
            clearInterval(interval)
            endGame()
        }else{
            $time.textContent = (time - 0.1).toFixed(1)
        }
    },100)

    renderBox()
}

function endGame(){
    isGameStarted = false
    show($start)
    $game.style.backgroundColor = 'ccc'
    $game.innerHTML = ''
    hide($timeHeader)
    show($resultHeader)
    $result.textContent = score
}

function renderBox(){
    $game.innerHTML = ''
    const box = document.createElement('div')
    let boxSize = getRandom(20,50)
    let boxPositionTop = getRandom(0,parseInt($game.offsetHeight) - boxSize)
    let boxPositionLeft = getRandom(0,parseInt($game.offsetWidth) - boxSize)

    box.style.height = box.style.width = `${boxSize}px`
    box.style.position = 'absolute'
    box.style.backgroundColor = '#' + getRandom(100,999)
    box.style.top = `${boxPositionTop}px`
    box.style.left = `${boxPositionLeft}px`
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', true)

    $game.insertAdjacentElement('afterbegin', box)
}

function handleBoxClick(event){
    if (isGameStarted && event.target.dataset.box){
        renderBox()
        score++
    }
}

function setGameTime(){
    if (!isGameStarted){
        $time.textContent = $input.value
        show($timeHeader)
        hide($resultHeader)
    }
}