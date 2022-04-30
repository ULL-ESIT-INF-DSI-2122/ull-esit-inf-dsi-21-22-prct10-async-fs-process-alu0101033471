"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveryCopiar = void 0;
const chalk_1 = __importDefault(require("chalk"));
const yargs_1 = __importDefault(require("yargs"));
const fs_1 = __importDefault(require("fs"));
/**
 * Clase MoveryCopiar para directorios oficheros
 */
class MoveryCopiar {
    constructor() { }
    /**
    * Método moverCopiarRuta que copia un directorio o mueve un fichero de directorio
    */
    moverCopiarRuta() {
        yargs_1.default.command({
            command: 'movercopiar',
            describe: 'Mueve un fichero o copia un directorio',
            builder: {
                origen: {
                    describe: 'ruta origen',
                    demandOption: true,
                    type: 'string',
                },
                destino: {
                    describe: 'ruta destino',
                    demandOption: true,
                    type: 'string',
                }
            },
            handler(argv) {
                fs_1.default.stat(`${argv.origen}`, (err, stats) => {
                    if (err) {
                        console.error(chalk_1.default.red(`La ruta origen no existe`));
                    }
                    else {
                        if (stats.isDirectory()) {
                            fs_1.default.stat(`${argv.destino}`, (err, statss) => {
                                if (err) {
                                    console.error(chalk_1.default.red(`La ruta destino no existe`));
                                }
                                else {
                                    if (statss.isDirectory()) {
                                        let directorio = String(argv.origen).split(`/`);
                                        let nombre = directorio[directorio.length - 1];
                                        fs_1.default.cp(`${argv.origen}`, `${argv.destino}/${nombre}`, { recursive: true }, (err) => {
                                            if (err) {
                                                console.error(chalk_1.default.red(`No se pudo copiar`));
                                            }
                                            else {
                                                console.log(chalk_1.default.green(`Directorio ${nombre} copiado en la ruta ${argv.destino}`));
                                            }
                                        });
                                    }
                                    else {
                                        console.error(chalk_1.default.red(`La ruta destino no es un directorio!`));
                                    }
                                }
                            });
                        }
                        else {
                            fs_1.default.stat(`${argv.destino}`, (err, statss) => {
                                if (err) {
                                    console.error(chalk_1.default.red(`La ruta destino no existe`));
                                }
                                else {
                                    if (statss.isDirectory()) {
                                        let fichero = String(argv.origen).split(`/`);
                                        let nombre = fichero[fichero.length - 1];
                                        fs_1.default.renameSync(`${argv.origen}`, `${argv.destino}/${nombre}`);
                                        console.log(chalk_1.default.green(`fichero ${nombre} desplazado a la ruta ${argv.destino}`));
                                    }
                                    else {
                                        console.error(chalk_1.default.red(`La ruta destino no es un directorio!`));
                                    }
                                }
                            });
                        }
                    }
                });
            },
        });
    }
}
exports.MoveryCopiar = MoveryCopiar;
