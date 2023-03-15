const consonants = [
	'm',
	'n',
	'b',
	't',
	'k',
	'v',
	's',
	'z',
	'j',
	'l'
];

const vowels = [
	'i',
	'u',
	'o',
	'e',
	'a'
];

function addLetter(word) {
	const last = word[word.length - 1];

	let areLastTwoConsonants = false;
	if (word.length > 1) {
		areLastTwoConsonants =
			consonants.includes(word[word.length - 2])
			&& consonants.includes(last);
	}

	let isLastVowel = vowels.includes(last);

	let c = '';
	if (!isLastVowel && (getRandomBoolean() || areLastTwoConsonants)) {
		c = getRandomElement(vowels);
	} else {
		c = getRandomElement(consonants, last);
	}

	return word + c;
}

function makeWord(length, badEndings = []) {
	let str = '';

	if (getRandomBoolean()) {
		str += getRandomElement(vowels);
		str += getRandomElement(consonants);
	} else {
		str += getRandomElement(consonants);
		str += getRandomElement(vowels);
	}

	let word;
	do {
		word = finishWord(str, length);
	} while(hasEndings(str, badEndings));

	return word;
}

function finishWord(word, length) {
	while(word.length < length - 1) {
		word = addLetter(word);
	}

	// so last two letters are not consonants
	while(word.length < length) {
		let isLastVowel = vowels.includes(word[word.length - 1]);

		let c = '';
		if (!isLastVowel) {
			c = getRandomElement(vowels);
		} else {
			c = getRandomElement(consonants);
		}

		if (word[word.length - 1] !== c) {
			word += c;
		}
	}

	return word;
}

function hasEndings(word, badEndings) {
	let has = false;
	badEndings.forEach((ending) => {
		has = has || word.endsWith(ending);
	});
	return has;
}

function getRandomElement(array, except = null) {
	let c;
	do {
		c = array[getRandomInt(array.length)];
	} while(c === except);
	return c;
}

function getRandomInt(min, max = null /*exclusive*/) {
	if(max === null) {
		max = min;
		min = 0;
	}

	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomBoolean() {
	return Math.random() < .5;
}

function makeNoun(length) {
	return makeWord(length, ['na']);
}

function makeVerb(length) {
	return makeWord(length, ['ta', 'sat', 'za', 'ma', 'to', 'ab']);
}

function getArg(num) {
	return process.argv.length > num ? process.argv[num] : null;
}

let action = getArg(2);
if (action === 'help') {
	console.log('node index.js make <Amount> <noun,verb> <min length> <max length>');
	process.exit();
}
if (action !== 'make') {
	console.log('Unknown action');
	process.exit(1);
}
let amount = parseInt(getArg(3));
if (!Number.isInteger(amount)) {
	console.log(`'${amount}' is not an integer`);
	process.exit(1);
}
let type = getArg(4);
if (!['noun', 'verb'].includes(type)) {
	console.log('NOT VALID TYPE');
	process.exit(1);
}
// let length = process.argv.length > 3 ? process.argv[3] : getRandomInt(3, 10);
let minLength = parseInt(getArg(5));
let maxLength = parseInt(getArg(6));
if (!Number.isInteger(minLength)) {
	console.log(`'${minLength}' is not an integer`);
	process.exit(1);
}
if (!Number.isInteger(maxLength)) {
	console.log(`'${maxLength}' is not an integer`);
	process.exit(1);
}
let fun;

switch (type) {
	case 'noun':
		fun = makeNoun;
		break;
	case 'verb':
		fun = makeVerb;
		break;
}

for(let i = 0; i < amount; i++) {
	console.log(fun(getRandomInt(minLength, maxLength + 1)));
}
