import {
	getRandomInt,
	makeAdj,
	makeNoun,
	makeVerb
} from './making-language.js';

function getArg(index) {
	return process.argv.length > index ? process.argv[index] : null;
}

function getArgInt(index, name) {
	const arg = getArg(index);
	if (arg === null || arg === "") {
		missingValueError(name);
	}
	const iarg = parseInt(arg);
	if (isNaN(iarg)) {
		error(`Value '${arg}' for ${name} is not an Integer`);
	}
	return iarg;
}

function getArgWithin(index, name, possibleValues) {
	const arg = getArg(index);
	if (!arg) {
		missingValueError(name);
	}
	if (!possibleValues.includes(arg)) {
		invalidValueError(name, arg);
	}
	return arg;
}

function error(message) {
	console.log(`ERROR: ${message}`);
	help();
	process.exit(1);
}

function missingValueError(name) {
	error(`No value given for ${name}`);
}

function invalidValueError(name, value) {
	error(`Invalid value '${value}' for ${name}`);
}

const
	ACTION = 'ACTION',
	MIN_LENGTH = 'MIN_LENGTH',
	MAX_LENGTH = 'MAX_LENGTH',
	NUM_WORDS = 'NUM_WORDS',
	TYPE = 'TYPE'
;

const Actions = Object.freeze({
	HELP: 'help',
	MAKE: 'make'
});

const Types = Object.freeze({
	ADJECTIVE: 'adj',
	NOUN: 'noun',
	VERB: 'verb'
});


function help() {
	console.log(
`
node index.js <ACTION> <...OPTIONS...>

ACTION help
	Prints this message

ACTION make <NUM_WORDS> <TYPE> <MIN_LENGTH> <MAX_LENGTH>
	Creates N words
	NUM_WORDS	Number of words to generate
	TYPE	${Object.values(Types).join(',')}
	MIN_LENGTH Minimum length in characters of each word
	MAX_LENGTH Maximum length in characters of each word
`
	);
}

let action = getArgWithin(2, ACTION, Object.values(Actions));
if (action === Actions.HELP) {
	help();
	process.exit();
} else if (action === Actions.MAKE) {
	let amount = getArgInt(3, NUM_WORDS);
	let type = getArgWithin(4, TYPE, Object.values(Types));

	let minLength = getArgInt(5, MIN_LENGTH);
	let maxLength = getArgInt(6, MAX_LENGTH);
	let fun;

	switch (type) {
		case 'noun':
			fun = makeNoun;
			break;
		case 'verb':
			fun = makeVerb;
			break;
		case 'adj':
			fun = makeAdj;
	}

	for(let i = 0; i < amount; i++) {
		console.log(fun(getRandomInt(minLength, maxLength + 1)));
	}
}
