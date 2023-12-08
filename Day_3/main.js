import { fileToArray } from "../utils-readFile.js";

/**
* convert str to number
*/
function getNumber(start, end, str) {
    return Number(str.slice(start, end + 1));
}

/**
* for a line, from a certain index, finds the index of a number
* @example '..22...129...' returns [7, 9] 
* @param {Number} index index to start search in line
* @param {String} line current line to search
* @return {Array} [index where number start, index where number ends]
*/
function findNumber(index, line) {
    let start = undefined;
    let end = undefined;
    for (let i = index; i < line.length; i++ ) {
        while (line[i] >= '0' && line[i] <= '9' && i < line.length) {
            if (start == undefined) {
                start = i;
            }
            i++;
        }
        if (start != undefined) {
            end = i - 1;
            break;
        }
    }
    return [start, end];
}

function isPointOrNumber(char) {
    return char == '.' || char >= '0' && char <= '9';
}

/**
* for a line, checks if a symbol is found in the interval from start to end 
* @param {Number} start index to start search in line
* @param {Number} end index to end search in line
* @param {String} line current line of number
* @return {Boolean} true if a symbol is found
*/
function checkSymbolLine(start, end, line) {
    if (start == 0) start = 1;
    for (let i = start - 1; i <= end + 1 && i < line.length; i++) {
        if (!isPointOrNumber(line[i])) {
            return true;
        }
    }
    return false;
}

/**
* for a number in a line, check if it has an adjacent symbol 
* @param {Number} start index start of number
* @param {Number} end index end of number
* @param {String} line current line of number
* @param {Array} arr total array of lines
* @return {Boolean} true if number has a adjacent symbol
*/
function checkSymbol(start, end, line, arr) {
    if (!checkSymbolLine(start, end, arr[line])) {
        if (line == 0) {
            return checkSymbolLine(start, end, arr[line + 1]);
        } else if (line == arr.length - 1){
            return checkSymbolLine(start, end, arr[line - 1]);
        } else {
            return checkSymbolLine(start, end, arr[line + 1]) || checkSymbolLine(start, end, arr[line - 1]);
        }
    }
    return true;
}

function main() {
    console.log('--- Day 3: Gear Ratios --- ')

    const fileName = 'input.txt'
    const arr = fileToArray('./' + fileName);

    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        for (let c = 0; c < arr[i].length & c != undefined; c++) {
            const nbIndex = findNumber(c, arr[i]);
            if (nbIndex[0] != undefined) {
                //check if adjacent
                if (checkSymbol(nbIndex[0], nbIndex[1], i, arr)) {
                    const number = getNumber(nbIndex[0], nbIndex[1], arr[i])
                    if (number) {
                        sum += number;
                    }
                }
            }
            c = nbIndex[1];
        }
    }
    return sum;
}
console.log(main());

