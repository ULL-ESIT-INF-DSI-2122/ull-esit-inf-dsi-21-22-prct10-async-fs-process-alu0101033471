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
 * Clase Read que contiene un método para leer un fichero
 */
class Read {
    constructor() { }
    /**
    * Método read que lee una nota de un usuario
    */
    read() {
        yargs_1.default.command({
            command: 'read',
            describe: 'Leer el contenido de un fichero',
            builder: {
                ruta: {
                    describe: 'Ruta',
                    demandOption: true,
                    type: 'string',
                }
            },
            handler(argv) {
                if (!fs_1.default.existsSync(`${argv.ruta}`)) {
                    console.error(chalk_1.default.red(`${argv.ruta} does not exists`));
                }
                else {
                    fs_1.default.readFile(`${argv.ruta}`, (err, data) => {
                        if (err) {
                            console.error(chalk_1.default.red(`${argv.ruta} no es un fichero`));
                        }
                        else {
                            console.log(chalk_1.default.green(data.toString()));
                        }
                    });
                }
            },
        });
    }
}
exports.Read = Read;
