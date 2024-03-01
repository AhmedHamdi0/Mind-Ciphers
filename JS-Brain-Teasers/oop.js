function makePerson(name, age) {
	const person = {};
	person.name = name;
	person.age = age;
	return person;
}

const vicky = makePerson('Vicky', 24);
// console.log(vicky.name); // -> Logs 'Vicky'
// console.log(vicky.age); // -> Logs 24


const personStore = {
	greet: () => console.log('hello'),
};

// personStore.greet(); // -> Logs 'hello'


function personFromPersonStore(name, age) {
	const person = Object.create(personStore);
	person.name = name;
	person.age = age;
	return person;
}

const sandra = personFromPersonStore('Sandra', 26);
// console.log(sandra.name); // -> Logs 'Sandra'
// console.log(sandra.age); //-> Logs 26
// sandra.greet(); //-> Logs 'hello'


personStore.introduce = function () {
	console.log(`Hi, my name is ${this.name}`);
}

// sandra.introduce(); // -> Logs 'Hi, my name is Sandra'


function PersonConstructor() {
	this.greet = () => console.log('hello');
}

const simon = new PersonConstructor;
// simon.greet(); // -> Logs 'hello'


function personFromConstructor(name, age) {
	const person = new PersonConstructor();
	person.name = name;
	person.age = age;
	return person;
}

const mike = personFromConstructor('Mike', 30);
// console.log(mike.name); // -> Logs 'Mike'
// console.log(mike.age); //-> Logs 30
// mike.greet(); //-> Logs 'hello'


PersonConstructor.prototype.introduce = function () {
	console.log(`Hi, my name is ${this.name}`);
}

// mike.introduce(); // -> Logs 'Hi, my name is Mike'


class PersonClass {
	constructor(name) {
		this.name = name;
	}

	greet() {
		console.log('hello');
	}
}

const george = new PersonClass();
// george.greet(); // -> Logs 'hello'


class DeveloperClass extends PersonClass {
	constructor(name, age) {
		super(name);
		this.age = age;
	}

	introduce() {
		console.log(`Hello World, my name is ${this.name}`)
	}
}

// const thai = new DeveloperClass('Thai', 32);
// console.log(thai.name); // -> Logs 'Thai'
// thai.introduce(); //-> Logs 'Hello World, my name is Thai'


const userFunctionStore = {
	sayType: function () {
		console.log(`I am a ${this.type}`);
	}
}

function userFactory(name, score) {
	let user = Object.create(userFunctionStore);
	user.type = "User";
	user.name = name;
	user.score = score;
	return user;
}

const adminFunctionStore = Object.create(userFunctionStore);

function adminFactory(name, score) {
	const admin = new userFactory(name, score);
	admin.type = 'Admin';
	return admin;
}

userFunctionStore.sharePublicMessage = () => console.log('Welcome users!');
const adminFromFactory = adminFactory("Eva", 5);
adminFromFactory.sayType() // -> Logs "I am a Admin"
adminFromFactory.sharePublicMessage() // -> Logs "Welcome users!"


class Dog {
	constructor() {
		this.legs = 4;
	}
	speak() {
		console.log('Woof!');
	}
}

const robotSkillsMixin = {
	skin: 'metal',
	speak: function () { console.log(`I have ${this.legs} legs and am made of ${this.skin}`) },
}

let robotFido = new Dog();
robotFido = Object.assign(robotFido, robotSkillsMixin);
robotFido.speak() // -> Logs "I am made of metal"
