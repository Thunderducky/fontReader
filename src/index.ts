import fs from 'fs';
import stream from 'stream';
function run(){
    const data = fs.readFileSync("./assets/Hack-Regular.ttf");
    const sfntVersion = data.readUInt32BE();
    const numTables = data.readUInt16BE(4);
    const searchRange = data.readUInt16BE(6);
    const entrySelector = data.readUInt16BE(8);
    const rangeShift = data.readUInt16BE(10);
    const header = {
        sfntVersion,
        numTables,
        searchRange,
        entrySelector,
        rangeShift
    }
    console.log(header);
}
run();