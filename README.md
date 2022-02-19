# TypeScript로 블록체인 만들기

[GitHub - jmh0434/TypeScript_BlockChain](https://github.com/jmh0434/TypeScript_BlockChain.git)

# Set Up

## 1. TypeScript 설치

→ node.js 프로젝트를 만든 다음 개발 언어를 타입스크립트로 설정하는 방식으로 진행

→ yarn으로 설치 (yarn은 JS 패키지 매니저 중 하나로 npm이 너무 무거워서 그것을 보완하기 위해 만들어짐)

```bash
yarn global add typescript
```

## 2. tsconfig.json 생성

→ node.js는 타입스크리브를 이해하지 못하기 때문에 자바스크립트 코드로 컴파일하는 작업이 필요함 이를위해서 tsconfig.json에서 컴파일러 설정을 해야 함

## 3. index.ts 생성

→ index.ts는 index.js로 컴파일해야함

→ ‘tsc’를 터미널에 입력하면 index.js와 index.js.map을 만들어주고 그 다음 js를 실행하는 방식

## 4. package.json 설정

→ tsc를 매번 입력하는 과정이 번거롭기 때문에 package.json에 script를 만들어 yarn start 명령어에 넣음.

→ tsc-watch 라이브럴는 타입스크립트의 코드변화를 감지하여 자동으로 tsc 명령을 실행해준다.

# TypeScript

- 마이크로소프트에서 구현한 JavaScript의 슈퍼셋 프로그래밍 언어
- 컴파일의 결과물로 js 코드를 출력
- **정적 타입을 명시할 수 있어서 잘못된 변수나 함수 사용을 막을 수 있다. (JS는 일단 어떻게든 코드를 진행시킴)**
    
    처음에 변수에 값을 넣어주던가 함수를 만들 때 데이터 타입을 지정하면 됨
    
    ```tsx
    const name = "Min",
    age = 24,
    gender = "male";
    
    const sayHi = (name, age, gender) => {
        console.log(`Hello ${name}, you are ${age}, you are a ${gender}`);
    };
    
    sayHi(name, age, gender);
    
    export {};
    
    const sayHi = (name: string, age: number, gender: string) => {
    	console.log(`Hello ${name}, you are ${age}, you are a ${gender}`);
    };
    sayHi("Min", 24,"male");
    ```
    
- 블록체인을 타입스크립트로 만들면 유효성 검사에 있어서 유리한 면이 있음

# 블록체인의 구조

```tsx
class Block { // 블록 클래스
  static calculateBlockHash = ( // 블록 해시를 계산하는 함수. static 속성의 메소드를 만들었기 때문에 Block 클래스로 인스턴스를 만들지 않더라도 메소드 사용 가능
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string => 
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString(); // 블록의 구성요소들로 해시값을 만든다

  static validateStructure = (aBlock: Block): boolean => // 블록의 구조를 검증하는 함수 (참인지 거짓인지 판단)
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string"; // 타입들이 다 맞는지 확인

// 블록을 구성하는 요소들
  public index: number; // 몇 번째 블록인지
  public hash: string; // 해시
  public previousHash: string; // 이전 블록의 해시
  public data: string; // 데이터
  public timestamp: number; // 타임스탬프

  // 생성자
  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}
```

 

# 과정

1. 초기의 블록을 생성한다
2. 데이터를 담아서 새로운 블록을 생성한다.
3. 이 새로운 블록은 블록체인에 연결되기 전에 유효성 검사를 통과해야 한다.
4. 유효성 검사에 통과하면 블록체인에 연결된다.