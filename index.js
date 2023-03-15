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

let type = process.argv.length > 2 ? process.argv[2] : null;
if (type === 'help') {
	console.log('node index.js <noun,verb> <length>');
	process.exit();
}
if (!['noun', 'verb'].includes(type)) {
	console.log('NOT VALID TYPE');
	process.exit(1);
}
let length = process.argv.length > 3 ? process.argv[3] : getRandomInt(3, 10);

let word;

switch (type) {
	case 'noun':
		word = makeNoun(length);
		break;
	case 'verb':
		word = makeVerb(length);
		break;
}
console.log(word);
