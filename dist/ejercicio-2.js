"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.palabra2 = exports.palabra = exports.Ejercicio2 = void 0;
const fs = __importStar(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const yargs = __importStar(require("yargs"));
const child_process_1 = require("child_process");
/**
 * Clase Ejercicio2 que devuelva el número de
 * ocurrencias de una palabra en un fichero de texto de dos maneras
 */
class Ejercicio2 {
    constructor() { }
    /**
     * Método comando que usa del método pipe de un Stream para
     * poder redirigir la salida de un comando hacia otro.
     */
    comando() {
        yargs.command({
            command: 'ocurrencias',
            describe: 'Numero de veces que sale una palabra en el archivo',
            builder: {
                archivo: {
                    describe: 'archivo',
                    demandOption: true,
                    type: 'string',
                },
                palabra: {
                    describe: 'palabra',
                    demandOption: true,
                    type: 'string',
                }
            },
            handler(argv) {
                if (process.argv.length === 5) {
                    if (fs.existsSync(`${argv.archivo}`)) {
                        const cat = (0, child_process_1.spawn)('cat', [`${argv.archivo}`]);
                        const grep = (0, child_process_1.spawn)('grep', [`${argv.palabra}`]);
                        const wc = (0, child_process_1.spawn)('wc', [`-l`]);
                        cat.stdout.pipe(grep.stdin);
                        grep.stdout.pipe(wc.stdin);
                        console.log(chalk_1.default.green(`Número de veces que se repite la palabra ${argv.palabra}: : con método pipe()`));
                        wc.stdout.pipe(process.stdout);
                    }
                    else {
                        console.log(chalk_1.default.red(`${argv.archivo} no existe `));
                    }
                }
                else {
                    console.log(chalk_1.default.red(`numero de argumentos mal introducidos`));
                }
            }
        });
    }
    /**
     * Método creando los subprocesos necesarios y registrando manejadores
     * a aquellos eventos necesarios para implementar la funcionalidad solicitada.
     */
    comando2() {
        yargs.command({
            command: 'ocurrencias',
            describe: 'Numero de veces que sale una palabra en el archivo',
            builder: {
                archivo: {
                    describe: 'archivo',
                    demandOption: true,
                    type: 'string',
                },
                palabra: {
                    describe: 'palabra',
                    demandOption: true,
                    type: 'string',
                }
            },
            handler(argv) {
                if (process.argv.length === 5) {
                    if (fs.existsSync(`${argv.archivo}`)) {
                        const cat = (0, child_process_1.spawn)('cat', [`${argv.archivo}`]);
                        let catOutput = '';
                        let catOutputAsArray = [];
                        cat.stdout.on('data', (piece) => catOutput += piece);
                        let contador = 0;
                        cat.on('close', () => {
                            catOutputAsArray = catOutput.split(/\s+/);
                            for (let i = 0; i < catOutputAsArray.length; i++) {
                                if (catOutputAsArray[i] === argv.palabra) {
                                    contador++;
                                }
                            }
                            console.log(chalk_1.default.green(`Número de veces que se repite la palabra ${argv.palabra}: con método pipe()`));
                            console.log(contador);
                        });
                    }
                    else {
                        console.log(chalk_1.default.red(`${argv.archivo} no existe `));
                    }
                }
                else {
                    console.log(chalk_1.default.red(`numero de argumentos mal introducidos`));
                }
            }
        });
    }
}
exports.Ejercicio2 = Ejercicio2;
/**
 * Objetos de la clase creada con los dos métodos de comandos
*/
exports.palabra = new Ejercicio2();
exports.palabra2 = new Ejercicio2();
exports.palabra.comando2();
//palabra2.comando();
yargs.parse();
