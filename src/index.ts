import * as CryptoJS from "crypto-js"; // javascript에서 해시 함수를 통한 암호화를 할 수 있도록 해주는 Node.js 패키지

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

const genesisBlock: Block = new Block(0, "2020202020202", "", "Hello", 123456); // 첫 번째 블록을 미리 만들어 놓음

let blockchain: Block[] = [genesisBlock]; // 블록들이 연결될 블록체인. 초기에 미리 만든 블록을 먼저 담아 놓음

// 블록체인을 얻는 함수
const getBlockchain = (): Block[] => blockchain;

// 블록체인의 마지막 블록을 얻는 함수
const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

// 새로운 타임스탬프를 찍는 함수
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

// 새로운 블록을 만드는 함수
const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock(); // 이전의 블록
  const newIndex: number = previousBlock.index + 1; // 새로운 인덱스
  const newTimestamp: number = getNewTimeStamp(); // 새로운 타임스탬프
  const newHash: string = Block.calculateBlockHash( // 새로운 해시
    newIndex,
    previousBlock.hash,
    newTimestamp,
    data
  );
  const newBlock: Block = new Block( // 새로운 블록
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimestamp
  );
  addBlock(newBlock); // 새로운 블록을 블록체인에 추가함
  return newBlock; // 새로운 블록을 반환하고 함수 종료
};

const getHashforBlock = (aBlock: Block): string => // 블록의 해시를 구하는 함수 블록 유효성 검사할 때 씀
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.timestamp,
    aBlock.data
  );

// 블록이 유효한 지 검사하는 함수
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => { 
  if (!Block.validateStructure(candidateBlock)) { // 만약 블록을 구성하는 요소의 타입과 일치하지 않는 것이 있다면 false
    return false;
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

// 블록을 블록체인에 추가하는 함수
const addBlock = (candidateBlock: Block): void => { // 리턴해줄 게 없으므로 void 형식
  if (isBlockValid(candidateBlock, getLatestBlock())) { // 이전의 블록과 비교해서 유효성 검사를 통과하면
    blockchain.push(candidateBlock); // 블록체인에 추가
  }
};
// 블록들 생성
createNewBlock ("second block");
createNewBlock ("third block");
createNewBlock ("fourth block");

console.log(blockchain);

export {};