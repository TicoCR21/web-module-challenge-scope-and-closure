// ⭐️ Example Challenge START ⭐️

/**
 * ### Challenge `processFirstItem`
 * 
 * @instructions
 * Implement a higher-order function called `processFirstItem`.
 * It takes two arguments:
 * @param stringList an array of strings.
 * @param callback function that takes a string as its argument.
 * @returns the result of invoking `callback` with the FIRST element in `stringList`.
 * 
 * Example of usage of this higher-order function:
 * Invoking `processFirstItem` passing `['foo', 'bar']` and `(str) => str + str`,
 * should return 'foofoo'.
*/

let processString = str => str + str;

let processFirstItem = ( stringList, callback ) => callback( stringList[ 0 ] );

console.log( processFirstItem( [ 'foo', 'bar' ], processString ) );
// ⭐️ Example Challenge END ⭐️


///// M V P ///////

/* Task 1: `counterMaker`
 * Study the code for counter1 and counter2. Answer the questions below.
 * 
 * 1. What is the difference between counter1 and counter2?
 *    
 *    Counter2 keeps a global counter. 
 *    Counter1 utilizes closure; therefore, we could have designate counters;
 * 
 * 2. Which of the two uses a closure? How can you tell?
 *    
 *    Counter1 uses closure. The function counter is returned.
 * 
 * 3. In what scenario would the counter1 code be preferable? In what scenario would counter2 be better? 
 *
 *    Counter1 could be use to keep track of independent counters. Counter2 keeps a general counter.
 * 
 *    For example, given a jar full of colorful bouncing balls counter1 could be use to keep track of how many red, blue and yellow balls are in the jar. While counter2 could 
 *    be used to get the total number of balls in the jar.
*/

// counter1 code
function counterMaker() {
  let count = 0;
  return function counter() {
   return count++;
  }
}

const counter1 = counterMaker();

// counter2 code
let count = 0;

function counter2() {
  return count++;
}




/* Task 2: inning() 

Write a function called `inning` that generates a random number of points that a team scored in an inning. This should be a whole number between 0 and 2. */
let inning = ( ) => Math.floor( Math.random() * 3 );

/* Task 3: finalScore()

Write a higher order function called `finalScore` that accepts the callback function `inning` (from above) and a number of innings and and returns the final score of the game in the form of an object.

For example, 

finalScore(inning, 9) might return: 
{
  "Home": 11,
  "Away": 5,
}

*/ 

function finalScore( inning_callback, number_of_innings )
{
  let finalScores = { "Home" : 0, "Away" : 0 };

  for( let i = 0; i < number_of_innings; i++ )
  {
    finalScores[ "Home" ] += inning_callback();
    finalScores[ "Away" ] += inning_callback();
  }
  
  return finalScores;
}

console.log( finalScore( inning, 9 ) );

/* Task 4: 

Create a function called `scoreboard` that accepts the following parameters: 

(1) Callback function `getInningScore`
(2) Callback function `inning`
(2) A number of innings

and returns the score at each pont in the game, like so:

1st inning: awayTeam - homeTeam
2nd inning: awayTeam - homeTeam
3rd inning: awayTeam - homeTeam
4th inning: awayTeam - homeTeam
5th inning: awayTeam - homeTeam
6th inning: awayTeam - homeTeam
7th inning: awayTeam - homeTeam
8th inning: awayTeam - homeTeam
9th inning: awayTeam - homeTeam

Final Score: awayTeam - homeTeam */

function ordinalSuffix( number )
{
  let remainders = [ number % 10, number % 100 ];
  let ordinals = [ "st", "nd", "rd", "th" ];
  let onesPattern = [ 1, 2, 3, 4 ];
  let tenthPattern = [ 11, 12, 13, 14, 15, 16, 17, 18, 19 ];
  return ( onesPattern.includes( remainders[ 0 ] ) && !tenthPattern.includes( remainders[ 1 ] ) ? number + ordinals[ remainders[ 0 ] - 1 ] : number + ordinals[ 3 ] );
}

let getInningScore = ( inning ) => ( { Home : inning(), Away : inning() } );

function scoreboard( getInningScore, inning, innings ) 
{
  let finalScores = { Home : 0, Away : 0 };
  
  console.log( '# inning: Away Team - Home Team' );
  
  for( let i = 1; i <= innings; i++ )
  {
    let currentInning = getInningScore( inning );
    console.log( `${ ordinalSuffix( i ) } inning: ${ currentInning[ "Away" ] } - ${ currentInning[ "Home" ] }` );
    finalScores[ "Away" ] += currentInning[ "Away" ];
    finalScores[ "Home" ] += currentInning[ "Home" ];
  }

  console.log( `\nFinal Score: ${ finalScores[ "Away" ] } - ${ finalScores[ "Home" ] }` );
}

scoreboard( getInningScore, inning, 9 );