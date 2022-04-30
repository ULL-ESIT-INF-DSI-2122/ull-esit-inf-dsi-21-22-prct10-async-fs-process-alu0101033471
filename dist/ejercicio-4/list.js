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
 * Clase List que contine un método que lista un directorio
 */
class List {
    constructor() { }
    /**
    * Método listar que lista las notas de un usuario
    */
    listar() {
        yargs_1.default.command({
            command: 'list',
            describe: 'Listar un directorio',
            builder: {
                ruta: {
                    describe: 'Ruta a listar',
                    demandOption: true,
                    type: 'string',
                }
            },
            handler(argv) {
                fs_1.default.readdir(`${argv.ruta}`, (err, files) => {
                    if (err) {
                        console.error(chalk_1.default.red(`${argv.ruta} no existe`));
                    }
                    else {
                        let i = 0;
                        files.forEach(file => {
                            fs_1.default.stat(`${argv.ruta}/${file}`, (err, stats) => {
                                if (err) {
                                    console.error(chalk_1.default.red(`La ruta que se intenta saber no existe o no se encuentra`));
                                }
                                else {
                                    if (!stats.isDirectory()) {
                                        console.log(chalk_1.default.green(`${file} `));
                                    }
                                }
                            });
                            i++;
                        });
                        if (i === 0) {
                            console.log(chalk_1.default.green(`${argv.ruta} esta vacio`));
                        }
                    }
                });
            },
        });
    }
}
exports.List = List;
