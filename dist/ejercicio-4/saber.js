"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Saber = void 0;
const chalk_1 = __importDefault(require("chalk"));
const yargs_1 = __importDefault(require("yargs"));
const fs_1 = __importDefault(require("fs"));
/**
 * Clase Saber que contine un método que notifica si una ruta es directorio o fichero
 */
class Saber {
    constructor() { }
    /**
    * Método saberRuta que comprueba si una ruta es directorio o fichero
    */
    saberRuta() {
        yargs_1.default.command({
            command: 'saber',
            describe: 'Saber si la ruta es un directorio o un fichero',
            builder: {
                ruta: {
                    describe: 'ruta a saber',
                    demandOption: true,
                    type: 'string',
                }
            },
            handler(argv) {
                fs_1.default.stat(`${argv.ruta}`, (err, stats) => {
                    if (err) {
                        console.error(chalk_1.default.red(`La ruta que se intenta saber no existe o no se encuentra`));
                    }
                    else {
                        if (stats.isDirectory()) {
                            console.log(chalk_1.default.green(`${argv.ruta} es un directorio `));
                        }
                        else {
                            console.log(chalk_1.default.green(`${argv.ruta} es un fichero`));
                        }
                    }
                });
            },
        });
    }
}
exports.Saber = Saber;
