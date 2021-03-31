import fs from 'fs';
import stream from 'stream';
function getTableRecord(data:Buffer, numTables:number){
    const tableRecordOffset = 12; // offset after the rest of the table directory
    const rowSize = 32;
    const rows = [];
    for(let rowIndex = 0; rowIndex < numTables; rowIndex++){
        const rowOffset = tableRecordOffset + rowIndex * rowSize;
        const tableTag = data.readUInt32BE(rowOffset);
        const checksum = data.readUInt32BE(rowOffset + 4);
        const offset = data.readUInt32BE(rowOffset + 8);
        const length = data.readUInt32BE(rowOffset + 12);
        rows.push({
            tableTag,
            checksum,
            offset,
            length
        })
    }
    return rows;
    
}
function getTableDirectory(data:Buffer){
    const sfntVersion = data.readUInt32BE();
    const numTables = data.readUInt16BE(4);
    // Try not to rely on these values of headers
    const searchRange = data.readUInt16BE(6);
    const entrySelector = data.readUInt16BE(8);
    const rangeShift = data.readUInt16BE(10);
    const tableRecord = getTableRecord(data, numTables);
    const header = {
        sfntVersion,
        numTables,
        searchRange,
        entrySelector,
        rangeShift,
        tableRecord
    }
    return header;
}
function run(){
    const data = fs.readFileSync("./assets/Hack-Regular.ttf");
    const tableDirectory = getTableDirectory(data);
    console.log(JSON.stringify(tableDirectory, null, 2));
    console.log(data.length);
    // Right now I'm not worrying about a checksum because I'm using a trusted font
}
// tags are 4 uint8s
// All tables must begin on 4 byte boundaries
// The space between should be padded with zeroes
run();