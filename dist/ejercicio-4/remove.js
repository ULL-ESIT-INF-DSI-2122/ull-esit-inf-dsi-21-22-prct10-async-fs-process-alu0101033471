"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Remove = void 0;
const chalk_1 = __importDefault(require("chalk"));
const yargs_1 = __importDefault(require("yargs"));
const fs_1 = __importDefault(require("fs"));
/**
 * Clase Remove que contiene un método para borrar ficheros  directorios
 */
class Remove {
    constructor() { }
    /**
    * Método remove que elimina un fichero o directorio
    */
    remove() {
        yargs_1.default.command({
            command: 'remove',
            describe: 'Elimina la ruta',
            builder: {
                ruta: {
                    describe: 'Ruta a borrar',
                    demandOption: true,
                    type: 'string',
                }
            },
            handler(argv) {
                fs_1.default.stat(`${argv.ruta}`, (err, stats) => {
                    if (err) {
                        console.error(chalk_1.default.red(`La ruta que se intenta borrar no existe`));
                    }
                    else {
                        if (stats.isDirectory()) {
                            fs_1.default.rm(`${argv.ruta}`, { recursive: true }, (err) => {
                                if (err) {
                                    return console.error(chalk_1.default.red(`No se pudo borrar el directorio`));
                                }
                                else {
                                    console.log(chalk_1.default.green(`Directorio borrado`));
                                }
                            });
                        }
                        else {
                            fs_1.default.unlinkSync(`${argv.ruta}`);
                            console.log(chalk_1.default.green(`Fichero eliminado!`));
                        }
                    }
                });
            },
        });
    }
}
exports.Remove = Remove;
