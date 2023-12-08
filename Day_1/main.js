import { fileToArray } from "../utils-readFile.js";

/**
* returns the first digit found in a string, if none is found, return NaN 
* @param {String} line
* @return {String} first digit found as a char
*/
function getFirstDigit(line) {
    for (let i = 0; i < line.length; i++) {
        if (line[i] >= '0' && line[i] <= '9')
            return line[i];
    }
    return NaN;
}

/**
* returns the last digit found in a string, if none is found, return NaN 
* @param {String} line
* @return {String} last digit found as a char
*/
function getLastDigit(line) {
    for (let i = line.length - 1; i >= 0 ; i--) {
        if (line[i] >= '0' && line[i] <= '9')
            return line[i];
    }
    return NaN;
}

/**
* @param {String} line
* @return {Number} number made from first and last digit found in string
*/
function getLineCalibration(line) {
    const firstDigit = getFirstDigit(line);
    const lastDigit = getLastDigit(line);
    if (firstDigit != NaN && lastDigit != NaN) {
        return Number(`${firstDigit}${lastDigit}`)
    }
    return 0;
}

/**
* for each line, find the calibration by getting a number from the first and last digit of the line,
* then adding this number
* @param {Array} arr
* @return {Number} sum of all calibration found by lines
*/
function getCalibration(arr) {
    let sum = 0;
    arr.forEach(line => {
        sum += getLineCalibration(line)
    });
    return sum;
}

function main() {
    console.log('--- Day 1: Trebuchet?! --- ')

    const fileName = 'input_big.txt'
    const arr = fileToArray('./' + fileName);

    const result = getCalibration(arr);

    return result;
}

console.log(main())