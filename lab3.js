const fs = require('fs');
const { program } = require('commander');

// Налаштування командного рядка
program
    .option('-i, --input <path>', 'шлях до файлу для читання (обовʼязковий параметр)')
    .option('-o, --output <path>', 'шлях до файлу для запису (необовʼязковий параметр)')
    .option('-d, --display', 'вивести результат у консоль (необовʼязковий параметр)')
    .parse(process.argv);

// Отримуємо значення параметрів
const options = program.opts();

// Перевірка наявності обовʼязкового параметра
if (!options.input) {
    console.error("Please, specify input file");
    process.exit(1);
}

// Перевірка наявності файлу для читання
if (!fs.existsSync(options.input)) {
    console.error("Cannot find input file");
    process.exit(1);
}

// 
const jsonData = fs.readFileSync(options.input, 'utf8');

let data;
try {
    data = JSON.parse(jsonData);
} catch (error) {
    console.error("Error parsing JSON data:", error.message);
    process.exit(1);
}

// 
const filteredData = data.filter(item => item.ku === "13" && item.value > 2);

// 
const result = filteredData.map(item => item.value);

// 
if (options.display) {
    if (result.length === 0) {
        console.log("Нічого не знайдено відповідно до критеріїв.");
    } else {
        console.log(result.join('\n'));
    }
}

// 
if (options.output) {
    fs.writeFileSync(options.output, result.join('\n'), 'utf8');
    console.log(`Результати збережено у файл: ${options.output}`);
}