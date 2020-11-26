score = 0; // inital score= 0 //
cross = true; // boolean variable for checking when pikachu and Ash_Ketchum crosses each other // 

audio = new Audio('music.mp3'); // starting audio //  
audiogo = new Audio('gameover.mp3'); // game over audio // 
setTimeout(() => {   
    audio.play()       // setting time to play audio //
}, 1000);
document.onkeydown = function (e) {  // load keyboard number key for input //
    console.log("Key code is: ", e.keyCode) // 38 refers to upkey //
    if (e.keyCode == 38) {
        pikachu = document.querySelector('.pikachu'); // returns the pikachu that matches the keyboard key input //
        pikachu.classList.add('animatePikachu'); // animation for pikachu //
        setTimeout(() => {
            pikachu.classList.remove('animatePikachu')
        }, 700); // 700 millisecond to  animate pikachu // 
    }
    if (e.keyCode == 39) {  
        pikachu = document.querySelector('.pikachu');   // 39 refers to right arrow key //
        pikachuX = parseInt(window.getComputedStyle(pikachu, null).getPropertyValue('left'));
        pikachu.style.left = pikachuX + 112 + "px";
    }
    if (e.keyCode == 37) {
        pikachu = document.querySelector('.pikachu'); // 39 refers to left(-ve sign) arrow key from keyboard checked by console in google //
        pikachuX = parseInt(window.getComputedStyle(pikachu, null).getPropertyValue('left'));
        pikachu.style.left = (pikachuX - 112) + "px";
    }
}

setInterval(() => {  // To check pikachu and Ash_Ketchum are touching each other or not //
    pikachu = document.querySelector('.pikachu'); 
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(pikachu, null).getPropertyValue('left')); // parseInt uses to change pixel distance to number //
    dy = parseInt(window.getComputedStyle(pikachu, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left')); // window.getComputedStyle method returns an object containing the values of all CSS properties of an element//
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));  // getPropertyValue method returns the value of the specified CSS property.//

    offsetX = Math.abs(dx - ox); // Math.abs is used to get absolute value,Difference Between pikachu and Ash_Ketchum //
    offsetY = Math.abs(dy - oy); 
    console.log(offsetX, offsetY) 
    if (offsetX < 73 && offsetY < 52) {    // Constraint for colloiding distance between pikachu and Ash_Ketchum // 
        gameOver.innerHTML = "Game Over - Reload to Play Again" // innerHTML returns the HTML content of an element//
        obstacle.classList.remove('obstacleAni')
        audiogo.play(); //when gameover, this sound plays //
        setTimeout(() => {
            audiogo.pause(); // Both sound will pause //
            audio.pause();
        }, 1000); // 1000 millisecond to  refresh audio //
    }
    else if (offsetX < 145 && cross) { // score only updated when crosses //
        score += 1;
        updateScore(score); // update score //
        cross = false; // cross is made so that score not updates very frequently //
        setTimeout(() => { // After one second set time out back to true //
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration')); //parseFloat is used to take exact duration of animation //
            newDur = aniDur - 0.1; //
            obstacle.style.animationDuration = newDur + 's'; // New duration adding seconds like if it is 4.8, it would be 4.8s//
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {   // update your score while playing //
    scoreCont.innerHTML = "Your Score: " + score // score.Cont for score container,return your score //
}