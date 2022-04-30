"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Add = void 0;
const chalk_1 = __importDefault(require("chalk"));
const yargs_1 = __importDefault(require("yargs"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Clase Add que contiene un método para añadir notas
 */
class Add {
    constructor() { }
    /**
    * Método addNote que añade una nota
    */
    addNote() {
        yargs_1.default.command({
            command: 'add',
            describe: 'Add a new note',
            builder: {
                title: {
                    describe: 'Note title',
                    demandOption: true,
                    type: 'string',
                },
                user: {
                    describe: 'Name user',
                    demandOption: true,
                    type: 'string',
                },
                body: {
                    describe: 'Body of the note',
                    demandOption: true,
                    type: 'string',
                },
                color: {
                    describe: 'Color of the letters',
                    demandOption: true,
                    type: 'string',
                }
            },
            handler(argv) {
                if (!fs_1.default.existsSync(`./dist/ejercicio-3/${String(argv.user)}`)) {
                    fs_1.default.mkdir(path_1.default.join(__dirname, String(argv.user)), (err) => {
                        if (err) {
                            return console.error(chalk_1.default.red(err));
                        }
                    });
                }
                if (fs_1.default.existsSync(`./dist/ejercicio-3/${argv.user}/${argv.title}.json`)) {
                    console.error(chalk_1.default.red('Note title taken!'));
                }
                else {
                    let info = {
                        title: String(argv.title),
                        body: String(argv.body),
                        color: argv.color
                    };
                    let data = JSON.stringify(info, null, 2);
                    setTimeout(() => {
                        fs_1.default.writeFile(`./dist/ejercicio-3/${argv.user}/${argv.title}.json`, data, (err) => {
                            if (err) {
                                return console.error(chalk_1.default.red(err));
                            }
                            else {
                                console.log(chalk_1.default.green(`New note added!`));
                            }
                        });
                    }, 1000);
                }
            },
        });
    }
}
exports.Add = Add;
