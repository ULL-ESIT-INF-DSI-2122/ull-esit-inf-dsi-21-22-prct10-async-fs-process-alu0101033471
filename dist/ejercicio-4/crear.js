"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crear = void 0;
const chalk_1 = __importDefault(require("chalk"));
const yargs_1 = __importDefault(require("yargs"));
const fs_1 = __importDefault(require("fs"));
/**
 * Clase Crear que crea un directorio
 */
class Crear {
    constructor() { }
    /**
    * Método crearDirectorio que crea un directorio a traves de la ruta que recibe
    */
    crearDirectorio() {
        yargs_1.default.command({
            command: 'crear',
            describe: 'crea un directorio a traves de la ruta que recibe',
            builder: {
                ruta: {
                    describe: 'ruta del directorio',
                    demandOption: true,
                    type: 'string',
                }
            },
            handler(argv) {
                fs_1.default.mkdir(`${argv.ruta}`, (err) => {
                    if (err) {
                        return console.error(chalk_1.default.red(`No se pudo crear el directorio`));
                    }
                    else {
                        console.log(chalk_1.default.green(`Directorio creado`));
                    }
                });
            },
        });
    }
}
exports.Crear = Crear;
