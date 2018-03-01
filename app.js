document.addEventListener("DOMContentLoaded", function(event) {
const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById('phrase');
let missed = 0;//keep track the number of gusses the player has missed;

//hide the tart screen overlay
const overlay = document.querySelector('#overlay');
const startButton = document.querySelector('.btn__reset');
const title = document.querySelector('.title');
const phrasesul = document.querySelector("#phrase ul");

startButton.addEventListener("click",()=>{
  overlay.style.visibility = "hidden";
});

//creat phrases
const phrases = [
  "const",
  "work bag",
  "tracks",
  "make",
  "home"
];

//creat functions randomly choose a phrase from the phrases array and
//split that phrase into a new array of characters.
function getRandomPhraseArray(arr){
    let rand = arr[Math.floor(Math.random() * arr.length)];
    return rand.split('') ;
}



//Create an addPhraseToDisplay function that loops through an array of characters.
function addPhraseToDisplay(arr){
    // do stuff any arr that is passed in, and add to `#phrase ul`
  for(let i=0;i<arr.length;i++){
       let letter =  arr[i];
       const li = document.createElement("li");
       li.innerHTML = letter;

       phrasesul.appendChild(li);

       if(letter!==" "){
         li.className = 'letter';
       };
  };
}

//function get and add phrase to dispaly;

function newPhrase (arr){
  const phraseArray= getRandomPhraseArray(arr);
  addPhraseToDisplay(phraseArray);
}

newPhrase(phrases);

//create checkLetter function guessing a letter
function checkLetter(btn){
  const letter = btn.innerHTML;
  const randomLetter = document.querySelectorAll('.letter');
  let match = null;
  for(let i=0;i<randomLetter.length;i++){
    const random = randomLetter[i].textContent;
    if(letter === random.toLowerCase()){
         randomLetter[i].classList.add('show');
         match = letter;
    }
  };
  return match;
}


//add addEventListener to Keyboard
const keyboard = document.querySelector("#qwerty");
keyboard.addEventListener("click",(e)=>{
   e.target.className = "chosen";
   e.target.setAttribute("disabled",true);
   let letterFound = checkLetter(e.target);//pass button to the function

   //count the missed guesses
   if(letterFound === null) {
     const tries = document.querySelector('.tries');
     tries.remove();
     missed += 1;//store the state of scoreboard
   }
   var check = checkWin();
   if(check) {
     reset();
   }
});


//create checkWin funtion to check whether the game has benn won
function checkWin(){
  const showNum = document.querySelectorAll('.show').length;
  const lettersNum = document.querySelectorAll('.letter').length;
  if(showNum == lettersNum){
    overlay.style.visibility = "visible";
    overlay.className = "win";
    startButton.innerHTML = "Reset";
    title.innerHTML = "You Won!";
    return true;
  }else if (missed >= 5) {
    overlay.style.visibility = "visible";
    overlay.className = "lose";
    title.innerHTML = "Better luck next time!";
    startButton.innerHTML = "Reset";
    return true;
  }else {
    return null;
  }
}

function reset(){
  //new phrase
  phrasesul.innerHTML='';
  newPhrase(phrases);
  missed = 0;
  //claer .chosen button
  const chosen = document.querySelectorAll('.chosen');
  for(let i=0;i<chosen.length;i++){
    chosen[i].disabled = false;
    chosen[i].classList.remove('chosen');
  }
  //reset scoreboard
  resetScoreborad ();

}

function resetScoreborad () {
  const ol = document.querySelector('#scoreboard').querySelector('ol');
  ol.innerHTML = '';
  function newLi(){
    const li = document.createElement('li');
    li.innerHTML = "<img src='images/liveHeart.png'>";
    li.className = "tries";
    return li;
  }
   for(let i=0;i<5;i++){
     ol.appendChild(newLi());
   }
}



});
