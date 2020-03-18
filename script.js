const typeUp={};
const textLibrary = [
    "I like cheese", "happiness=function(){healthy:true}", 'I can type fast', 'Irregardless','try write code without autocomplete','Visual Studio Code','cohort26'
]

const textDisplay = $(".sampleText")

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
// function of button click to scroll page to next section
typeUp.scrollPage = function(){
    $('.startButton').on('click',function(e){
        e.preventDefault();
        $('html').animate({
            scrollTop: $('#gamePage').offset().top
        },1000,'swing',function(){
            typeUp.sampleText();
        });
    });
}

// timer

// compare user input with sample text
typeUp.result = function(){
    $('.submitButton').on('click',function(e){
        e.preventDefault();
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

        $('html').animate({
            scrollTop: $('#homePage').offset().top
        }, 1000, function () {
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