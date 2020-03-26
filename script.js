const typeUp={};
const textLibrary = [
    "I like cheese", "happiness=function(){healthy:true}", 'I can type fast', 'Irregardless','try write code without autocomplete','Visual Studio Code','cohort26'
]

// global variables
let wordIndex = 0
const textDisplay = $(".sampleText");
typeUp.seconds = 0;
typeUp.minutes = 0;
typeUp.interval;
typeUp.time = $("#time");
// generate a random text from the sample Text library
typeUp.sampleText = function(){
    // const i = Math.floor (Math.random()* textLibrary.length);
    textDisplay.html(`${textLibrary[wordIndex]}`);
    if  (wordIndex < textLibrary.length - 1){
        wordIndex++;
    }else if(wordIndex > textLibrary.length){
        typeUp.resultWindow("correct");
        clearInterval(typeUp.interval);
    }
    return textDisplay.html
}

// using typed js library to create typing effects.
typeUp.typedAnimation = function(){
    $(".typed").typed({
    strings: ['How fast can you type?'],
    smartBackspace: true,
    typeSpeed: 30,
    startDelay: 500,
    backSpeed: 30,
    loop: true,
    loopCount:2
});
}

// timer
typeUp.timer = function () {
    typeUp.interval = setInterval(function(){
        typeUp.seconds++;
        typeUp.time.html(`${typeUp.minutes}m ${typeUp.seconds}s`);
        if (typeUp.seconds === 60) {
            typeUp.minutes++;
            typeUp.seconds = 0;
        } else if (typeUp.minutes === 30) {
            swal({
                title: "30 minutes? Really?🙄",
                button: "Play again !"
            }).then(typeUp.reStart())
        }
    },1000)

}
// function of button click to let user choose difficulty level
typeUp.scrollPage = function(){
    $('.startButton').on('click',function(e){
        e.preventDefault();
        typeUp.startGame()
    })
}
// after reading rules, scroll page to game section
typeUp.startGame = function(){
    typeUp.timer();
    $('html').animate({
        scrollTop: $('#gamePage').offset().top
    }, 800, 'swing', function () {
        typeUp.sampleText();
    });
}

// compare user input with sample text
typeUp.result = function(){
    $('.submitButton').on('click',function(e){
        e.preventDefault();
        const userInput = $('textarea').val()
        if (userInput === textDisplay.html()){
            typeUp.sampleText();
            $('textarea').val('');
        }else{
            clearInterval(typeUp.interval);
            typeUp.resultWindow('wrong');
        }
    })
}
// clearbutton for clear userinput
typeUp.clearInput= function(){
    $('.clearButton').on('click',function(e){
        e.preventDefault();
        $('textarea').val('');
    })
}
// page reload
typeUp.reStart = function () {
    $('.swal-button--confirm').on('click',function(e){
        e.preventDefault();
        typeUp.minutes = 0;
        typeUp.seconds = 0;
        $('html').animate({
            scrollTop: $('#homePage').offset().top
        }, 800, function () {
            $('textarea').val('');
            location.reload();
        })
    })
} 

// results pop up window
typeUp.resultWindow = function(result){
    if (result === "correct" ){
        swal({
            title: "Good job!🎉",
            text: `Time used: ${typeUp.minutes}m ${typeUp.seconds}s`,
            button: "Play again !"
        }).then(typeUp.reStart())
    }else if (result === "wrong"){
        swal({
            title: "You lost...😬",
            text: `Time used: ${typeUp.minutes}m ${typeUp.seconds}s`,
            button: "Play Again !"
        }).then(typeUp.reStart())
    }
}
// exit game
typeUp.exitGame = function(){
    $('.exit').on('click', function(){
        const exit = swal({
            title: "Are you sure you want to exit the game?",
            buttons:true
        });
        if (exit){
            typeUp.reStart()
        };
    })
}
// init function
typeUp.init=function(){
    typeUp.typedAnimation();
    typeUp.scrollPage();
    typeUp.clearInput();
    typeUp.result();
    typeUp.exitGame();
}
// document ready
$(function(){
    typeUp.init();
})