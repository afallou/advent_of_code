'use strict';
var md5 = require('blueimp-md5');

var leadingZeroCount = 6;
var secretKey = 'yzbqklnj';

/**
 * Find lowest integer such that MD5(key + integer) has 5 five leading zeros
**/
function findLowestSuffix(key, requiredPrefix){
	let i = 0;
	while (true){
		let hash = md5(`${key}${i}`);
		if (hash.slice(0, leadingZeroCount) === requiredPrefix){
			return i;
		};
		i++;
	}
}


function leadingZeroString(){
	let out = ''
	for (let i = 0; i < leadingZeroCount ; i++){
		out = out + '0';
	}
	return out;
}


if (require.main === module){
	let prefix = leadingZeroString();
	let suffix = findLowestSuffix(secretKey, prefix);
	console.log(suffix);
}


