"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const chalk_1 = __importDefault(require("chalk"));
const yargs_1 = __importDefault(require("yargs"));
const fs_1 = __importDefault(require("fs"));
/**
 * Clase List que contine un método que lista las notas de un usuario
 */
class List {
    constructor() { }
    /**
    * Método listNote que lista las notas de un usuario
    */
    listNote() {
        yargs_1.default.command({
            command: 'list',
            describe: 'List the notes of the user',
            builder: {
                user: {
                    describe: 'Name user',
                    demandOption: true,
                    type: 'string',
                }
            },
            /**
             * Método para capturar asignaciones de valor
             * @param argv argumento pasado por parametro
             */
            handler(argv) {
                /**
                 * Método para poder leer un directorio y si existe listarlo
                 */
                fs_1.default.readdir(`./dist/ejercicio-3/${String(argv.user)}`, (err, files) => {
                    if (err) {
                        console.error(chalk_1.default.red(`${argv.user} does not exists`));
                    }
                    else {
                        let i = 0;
                        files.forEach(file => {
                            let jsonData = require(`./${String(argv.user)}/${String(file)}`);
                            console.log(chalk_1.default[`${jsonData.color}`](String(jsonData.title)));
                            i++;
                        });
                        if (i === 0) {
                            console.error(chalk_1.default.red(`${argv.user} hasn't got notes`));
                        }
                    }
                });
            },
        });
    }
}
exports.List = List;
