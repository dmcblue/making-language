export const consonants = [
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

export const vowels = [
	'i',
	'u',
	'o',
	'e',
	'a'
];

export function addLetter(word) {
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

export function makeWord(length, badEndings = []) {
	let str = '';

	if (getRandomBoolean()) {
		str += getRandomElement(vowels);
		str += getRandomElement(consonants);
	} else {
		str += getRandomElement(consonants);
		str += getRandomElement(vowels);
	}

	// no hope, bail
	if (str.length === length && badEndings.includes(str)) {
		return str;
	}

	let word, count = 0;
	do {
		word = finishWord(str, length);
		count++;
	} while(hasEndings(str, badEndings) && count < 100);

	if (count === 100) {
		console.log(`Inf Loop for '${str}' '${length}'`); 
	}

	return word;
}

export function finishWord(word, length) {
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

export function hasEndings(word, badEndings) {
	let has = false;
	badEndings.forEach((ending) => {
		has = has || word.endsWith(ending);
	});
	return has;
}

export function getRandomElement(array, except = null) {
	let c;
	do {
		c = array[getRandomInt(array.length)];
	} while(c === except);
	return c;
}

export function getRandomInt(min, max = null /*exclusive*/) {
	if(max === null) {
		max = min;
		min = 0;
	}

	return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomBoolean() {
	return Math.random() < .5;
}

export function makeNoun(length) {
	return makeWord(length, ['na']);
}

export function makeVerb(length) {
	return makeWord(length, ['ta', 'sat', 'za', 'ma', 'to', 'ab']);
}

export function makeAdj(length) {
	return makeWord(length, []);
}
