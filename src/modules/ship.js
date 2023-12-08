export default function Ship() {
// each ship will have a length, number of times hit, if they've been sunk, 
// hit method, isSunk (if numberofhits = length)
    let lengthOfShip;
    let numOfHits = 0;

    const setLengthOfShip = (length) => {
        lengthOfShip = length;
    } 

    const hit = () => {
        numOfHits += 1;
    }

    const isSunk = () => (lengthOfShip - numOfHits) === 0

    return { setLengthOfShip, hit, isSunk, }
}


/*

 * Begin your app by creating the Ship class/factory (your choice).
 * Your ‘ships’ will be objects that include their length, 
 * the number of times they’ve been hit and whether or not they’ve been sunk.
 * REMEMBER you only have to test your object’s public interface. 
 * Only methods or properties that are used outside of your ‘ship’ object need unit tests.
 * Ships should have a hit() function that increases the number of ‘hits’ in your ship.
 * isSunk() should be a function that calculates whether a ship is 
 * considered sunk based on its length and the number of hits it has received.
*/