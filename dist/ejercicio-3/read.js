"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Read = void 0;
const chalk_1 = __importDefault(require("chalk"));
const yargs_1 = __importDefault(require("yargs"));
const fs_1 = __importDefault(require("fs"));
/**
 * Clase Read que contiene un método para leer notas
 */
class Read {
    constructor() { }
    /**
    * Método readNote que lee una nota de un usuario
    */
    readNote() {
        yargs_1.default.command({
            command: 'read',
            describe: 'Read the notes of the user',
            builder: {
                user: {
                    describe: 'Name user',
                    demandOption: true,
                    type: 'string',
                }, title: {
                    describe: 'Note title',
                    demandOption: true,
                    type: 'string',
                }
            },
            handler(argv) {
                if (!fs_1.default.existsSync(`./dist/ejercicio-3/${String(argv.user)}`)) {
                    console.error(chalk_1.default.red(`${argv.user} does not exists`));
                }
                if (!fs_1.default.existsSync(`./dist/ejercicio-3/${String(argv.user)}/${String(argv.title)}.json`)) {
                    console.error(chalk_1.default.red(`The note ${String(argv.title)} does not exists`));
                }
                else {
                    let jsonData = require(`./${String(argv.user)}/${String(argv.title)}.json`);
                    console.log(chalk_1.default[`${jsonData.color}`](jsonData.title));
                    console.log(chalk_1.default[`${jsonData.color}`](jsonData.body));
                }
            },
        });
    }
}
exports.Read = Read;
