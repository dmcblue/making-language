const Alphabet = {};

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

function makeWord() {
	let length = getRandomInt(3, 10);
	let str = '';

	if (getRandomBoolean()) {
		str += getRandomElement(vowels);
	} else {
		str += getRandomElement(consonants);
	}

	let isLastVowel = vowels.includes(str[str.length - 1]);
	if (!isLastVowel) {
		str += getRandomElement(vowels);
	} else {
		str += getRandomElement(consonants);
	}

	while(str.length < length) {
		let areLastTwoConsonants =
			consonants.includes(str[str.length - 2])
			&& consonants.includes(str[str.length - 1]);

		let isLastVowel = vowels.includes(str[str.length - 1]);

		let c = '';
		if (!isLastVowel && (getRandomBoolean() || areLastTwoConsonants)) {
			c = getRandomElement(vowels);
		} else {
			c = getRandomElement(consonants);
		}

		if (str[str.length - 1] !== c) {
			str += c;
		}
	}

	while(str.length <= length) {
		let isLastVowel = vowels.includes(str[str.length - 1]);

		let c = '';
		if (!isLastVowel) {
			c = getRandomElement(vowels);
		} else {
			c = getRandomElement(consonants);
		}

		if (str[str.length - 1] !== c) {
			str += c;
		}
	}

	return str;
}

function getRandomElement(array) {
	return array[getRandomInt(array.length)];
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

for(let i = 0; i < 1; i++) {
	console.log(makeWord());
}
