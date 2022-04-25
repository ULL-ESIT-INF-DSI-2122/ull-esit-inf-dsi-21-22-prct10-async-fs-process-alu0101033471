"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
const chalk_1 = __importDefault(require("chalk"));
class Cut {
    constructor() { }
    cut() {
        if (Number(process.argv[3]) === 0 || Number(process.argv[3]) > 3) {
            console.error(chalk_1.default.red('No se puede filtrar por ese numero de campo !'));
            return 0;
        }
        if (fs_1.default.existsSync(`./src/${String(process.argv[2])}`)) {
            console.log(chalk_1.default.green('Archivo existente!'));
        }
        else {
            console.error(chalk_1.default.red(`no existe el archivo`));
            return 0;
        }
        //console.log(`adioooos`,process.argv[3] );
        fs_1.default.watchFile(`./src/${String(process.argv[2])}`, (curr, prev) => {
            if (!fs_1.default.existsSync(`./src/${String(process.argv[2])}`)) {
                console.error(chalk_1.default.red(`Archivo borrado`));
                return 0;
            }
            const cat = (0, child_process_1.spawn)('cat', ['-n', `./src/${String(process.argv[2])}`]);
            const cut = (0, child_process_1.spawn)('cut', [`--delimiter=,`, `-f`, `${process.argv[3]}`, `./src/${String(process.argv[2])}`]);
            cut.stdout.pipe(process.stdout);
            let cutOutput = '';
            let cutOutputAsArray = [];
            cut.stdout.on('data', (piece) => cutOutput += piece);
            cut.on('close', () => {
                cutOutputAsArray = cutOutput.split(/\s+/);
                console.log(cutOutputAsArray);
            });
        });
    }
}
const cortar = new Cut();
cortar.cut();
