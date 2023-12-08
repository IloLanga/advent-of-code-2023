import {readFileSync} from 'fs';

export function fileToArray(filename) {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/);
    return arr;
}