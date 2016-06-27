'use strict';
var fs = require('fs');
var path = require('path');
var readline = require('readline');

/**
 * Check if a string (assumed to be 2-letters) is one of the forbidden strings
**/
function isForbidden(string){
	if (string.search('ab|cd|pq|xy') >= 0){
		return true;
	}
	return false;
}

function isVowel(string){
	if (string.length === 1 && string.search('a|e|i|o|u') >= 0){
		return true;
	}
	return false;
}


function isNice1(string){
	let hasDoubled = false;
	let vowelCount = 0;
	let hasForbiddenTuple = false;
	for (let i = 0; i < string.length - 1; i++){
		let window = string.slice(i, i + 2);
		if (!hasDoubled && window[0] === window[1]){
			hasDoubled = true;
		}
		if (isForbidden(window)){
			return false
		}
		if (isVowel(window[0])){
			vowelCount += 1
		}
	}
	if (isVowel(string[string.length - 1])){
		vowelCount += 1;
	}

	if (vowelCount > 2 && hasDoubled){
		return true;
	}
	return false;
}

/**
 * Add index of the given 2-letter string in the given collection
**/
function addLetterTuple(index, tuple, coll){
	if (coll.hasOwnProperty(tuple)){
		coll[tuple].push(index)
	} else {
		coll[tuple] = [index];
	}
}

/**
 * Check if the given tuples have at least one element following the rules:
 *    - The letter tuple appears at least twice
 *    - The two occurences are not overlapping
 * @param {Object<Object[]<number>>} tuples - Object with the letter tuples as keys, and the list 
 * of indices where each tuple appears, as values.
**/
function checkTuples(tuples){
	for (let tuple in tuples){
		let indices = tuples[tuple];
		if (indices.length > 1){
			// The indices is built sorted, first elem is the minimum
			let firstIndex = indices[0]
			let areNonOverlapping = indices.some((curr, idx, arr) => {return curr > firstIndex + 1; });
			if (areNonOverlapping){
				return true;
			}
		}
	}
	return false;
}


function isNice2(string){
	let hasSplitRepeat = false;
	let tuples = {};
	for (let i = 0; i < string.length - 2; i++){
		let window = string.slice(i, i + 3);

		if (!hasSplitRepeat && window[0] === window[2]){
			hasSplitRepeat = true;
		}

		addLetterTuple(i, window.slice(0, 2), tuples);
	}
	addLetterTuple(string.length - 2, string.slice(string.length - 2), tuples);

	let hasOkTuple = checkTuples(tuples);

	if (hasSplitRepeat && hasOkTuple){
		return true;
	}
	return false;
}

function part1(){
	checkLines(isNice1);
}

function part2(){
	checkLines(isNice2);
}

function checkLines(niceFunction){
	let niceCount = 0;

	let inFile = path.join(__dirname, 'pb_5_input.txt');
	console.log(inFile);
	let instream = fs.createReadStream(inFile);
	let rl = readline.createInterface({input: instream});

	rl.on('line', line => {
		let nice = niceFunction(line);
		console.log(`${line} -- ${nice}`);
		if(nice){
			niceCount += 1;
		}
	});

	rl.on('close', () => {
		console.log(niceCount)
	});
}

if (require.main === module){
	part2();
}