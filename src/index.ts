class Block {
    public index: number;
    public hash: string;
    public prerviousHash: string;
    public data: string;
    public timestamp: number;
    constructor(
        index: number,
        hash: string,
        prerviousHash: string,
        data: string,
        timestamp: number
    ){
        this.index = index;
        this.hash = hash;
        this.prerviousHash = prerviousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock:Block = new Block(0, "2020202020", "", "Hello", 123456);

let blockchain:[Block] = [genesisBlock];

console.log(blockchain);
export {};