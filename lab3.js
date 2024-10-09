const fs = require('fs');
const { program } = require('commander');

program
    .requiredOption('-i, --input <type>', 'Path to input JSON file')
    .option('-o, --output <type>', 'Path to output file')
    .option('-d, --display', 'Display output in console');

program.parse(process.argv);

const options = program.opts();

if (!fs.existsSync(options.input)) {
    console.error('Cannot find input file');
    process.exit(1);
}

try {
    const inputData = JSON.parse(fs.readFileSync(options.input, 'utf8'));
    const result = inputData; // Обробіть дані тут

    if (options.display) {
        console.log(result);
    }

    if (options.output) {
        fs.writeFileSync(options.output, JSON.stringify(result, null, 2), 'utf8');
    }
} catch (error) {
    console.error('Error reading the input file:', error.message);
}