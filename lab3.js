const { program } = require('commander');
const fs = require('fs');


program
    .requiredOption('-i, --input <path>', 'path to the input JSON file')
    .option('-o, --output <path>', 'path to the output file')
    .option('-d, --display', 'output the result to console');

program.parse(process.argv);


const options = program.opts();
const inputFilePath = options.input;
const outputFilePath = options.output;
const display = options.display;

if (!inputFilePath) {
    console.error('Please, specify input file.');
    process.exit(1);
}


if (!fs.existsSync(inputFilePath)) {
    console.error('Cannot find input file.');
    process.exit(1);
}


let data;
try {
    data = fs.readFileSync(inputFilePath, 'utf-8');
} catch (error) {
    console.error('Error reading input file:', error.message);
    process.exit(1);
}


if (display) {
    console.log(data);
}


if (outputFilePath) {
    fs.writeFileSync(outputFilePath, data);
    if (display) {
        console.log('Data written to', outputFilePath);
    }
}