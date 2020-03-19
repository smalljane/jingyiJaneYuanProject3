const typeUp={};
const textLibrary = [
    "I like cheese", "happiness=function(){healthy:true}", 'I can type fast', 'Irregardless','try write code without autocomplete','Visual Studio Code','cohort26'
]
// global variables
const textDisplay = $(".sampleText");
typeUp.seconds = 0;
typeUp.minutes = 0;
typeUp.interval;
typeUp.time = $("#time");
// generate a random text from the sample Text library
typeUp.sampleText = function(){
    const i = Math.floor (Math.random()* textLibrary.length);
    textDisplay.html(`${textLibrary[i]}`);
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
        if (typeUp.seconds == 60) {
            typeUp.minutes++;
            typeUp.seconds = 0;
        } else if (typeUp.minutes == 30) {
            swal({
                title: "30 minutes? Really?🙄",
                button: "Play again !"
            }).then(typeUp.reStart())
        }
    },1000)

}
// function of button click to scroll page to next section
typeUp.scrollPage = function(){
    $('.startButton').on('click',function(e){
        e.preventDefault();
        typeUp.timer();
        $('html').animate({
            scrollTop: $('#gamePage').offset().top
        },800,'swing',function(){
            typeUp.sampleText();
        });
    });
}

// compare user input with sample text
typeUp.result = function(){
    $('.submitButton').on('click',function(e){
        e.preventDefault();
        clearInterval(typeUp.interval);
        const userInput = $('textarea').val()
        if (userInput === textDisplay.html()){
            typeUp.resultWindow('correct');
        }else{
            typeUp.resultWindow('wrong');
        }
    })
}

// page reload
typeUp.reStart = function () {
    $('.swal-button').on('click',function(e){
        e.preventDefault();
        typeUp.minutes = 0;
        typeUp.seconds = 0;
        $('html').animate({
            scrollTop: $('#homePage').offset().top
        }, 800, function () {
            $('textarea').val('');
        })
    })
} 

// results pop up window
typeUp.resultWindow = function(result){
    if (result === "correct" ){
        swal({
        title: "Good job!🎉",
        button: "Play again !"
     }).then(typeUp.reStart())
    }else if (result === "wrong"){
        swal({
            title: "You lost...😬",
            button: "Play Again !"
        }).then(typeUp.reStart())
    }
}

// init function
typeUp.init=function(){
    typeUp.typedAnimation();
    typeUp.scrollPage();
    typeUp.result();
}
// document ready
$(function(){
    typeUp.init();
})