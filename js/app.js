/*
 * Create a list that holds all of your cards
 */
var openCardsList = [], openCardStatus = false;
var cardsList = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb'];
var openCount = 0, clickCount = 0, time = 0, timeoutPtr;

var movesText = document.getElementsByClassName('moves')[0];
var modalDisplay = document.querySelectorAll('.modal')[0].style;
var timerEle = document.getElementsByClassName('timer')[0];

function init() {
    openCardsList.length = 0, openCardStatus = false;
    cardsList = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb'];
    openCount = 0, clickCount = 0, time = 0;
    cardsList = shuffle(cardsList.concat(cardsList));
    var cards = document.querySelectorAll('.card');
    var deck = document.querySelectorAll('.deck > li');
    for (var i = 0; i < cardsList.length; i++) {
        cards[i].children[0].classList = cardsList[i];
        cards[i].className = 'card';
        cards[i].addEventListener('click', eventListenerForCards);
    }
    clearTimeout(timeoutPtr);
    setEventListnerReset();
    setTimer();
    setStars();
    movesText.innerHTML = clickCount;
    modalDisplay.display = 'none';
}

init();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function eventListenerForCards() {
    var className = event.target.children[0].className;
    if (openCardsList.indexOf(className) != -1) {
        var element = document.getElementsByClassName(className);
        element[0].parentElement.className = element[1].parentElement.className = 'card open match disable';
        openCardStatus = false;
        openCount++;
        if (openCount == 8) {
            endGame();
        }
        return;
    } else {
        if (openCardStatus) {
            closeOtherCards();
        }
        openCardsList.push(className);
        event.target.className = 'card open show disable';
        openCardStatus = true;
    }
    if(clickCount == 14 || clickCount == 20) {
        updateStart();
    }
    updateClickCount();
}

function closeOtherCards() {
    setTimeout(function () {
        var elements = document.querySelectorAll('.card.open.show');
        for (let i = 0; i < elements.length; i++) {
            elements[i].className = "card";
        }
        openCardsList.length = 0;
        openCardStatus = false;
    }, 1000);
}

function setEventListnerReset() {
    document.getElementsByClassName('restart')[0].addEventListener('click', function () {
        var cardsList = document.querySelectorAll('.card.open.match.disable');
        for (var i = 0; i < cardsList.length; i++) {
            cardsList[i].className = 'card';
        }
        init();
    })
}

function setTimer() {
    timerEle.innerHTML = ++time;
    timeoutPtr = setTimeout(setTimer, 1000);
}

function updateStart() {
    var stars = document.getElementsByClassName('fa fa-star');
    stars[stars.length - 1].className = 'fa fa-star-o';
}

function setStars() {
    var star = document.getElementsByClassName('stars');
    star[0].innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
}

function updateClickCount() {
    movesText.innerHTML = ++clickCount;
}

function endGame() {
    debugger;
    document.getElementsByClassName('modal-close')[0].addEventListener('click', 
        function() {
            init();
        });
    document.getElementsByClassName('modal-time')[0].innerHTML = timerEle.innerHTML
    document.getElementsByClassName('modal-star')[0].innerHTML = 
    document.getElementsByClassName('fa fa-star').length;
    modalDisplay.display = 'block';
    clearTimeout(timeoutPtr);
}