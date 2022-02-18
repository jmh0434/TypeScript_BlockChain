class Human{ // java나 c++ 처럼 인터페이스 만들기. 파라미터가 아니라 아예 여기서 타입을 지정
    public name: string;
    public age: number;
    public gender: string;
    constructor(name:string, age:number, gender:string) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
}
const min = new Human("min", 24, "male");
const sayHi = (person: Human) => { // person은 Human 인터페이스를 따른다
    return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}`;
};

console.log(sayHi(min));
export {};