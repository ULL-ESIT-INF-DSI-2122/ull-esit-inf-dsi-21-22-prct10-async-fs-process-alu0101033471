"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observer = void 0;
const chalk_1 = __importDefault(require("chalk"));
const yargs_1 = __importDefault(require("yargs"));
const fs_1 = __importDefault(require("fs"));
/**
 * Clase Obersever que contiene un método que observa las notas de un usuario
 */
class Observer {
    constructor() { }
    /**
    * Método ObserverNote que observa eldirectorio del usuario
    */
    ObserverNote() {
        yargs_1.default.command({
            command: 'observer',
            describe: 'Observa el directorio del usuario',
            builder: {
                user: {
                    describe: 'Name user',
                    demandOption: true,
                    type: 'string',
                }
            },
            handler(argv) {
                if (!fs_1.default.existsSync(`./dist/ejercicio-3/${String(argv.user)}`)) {
                    console.error(chalk_1.default.red('El usuario no tiene un directorio creado'));
                }
                else {
                    fs_1.default.watch(`./dist/ejercicio-3/${String(argv.user)}`, (eventType, filename) => {
                        console.log("\nEn l archivo", filename);
                        console.log("El tipo de cambio fue:", eventType);
                        fs_1.default.access(`./dist/ejercicio-3/${String(argv.user)}/${filename}`, fs_1.default.constants.F_OK, (err) => {
                            console.log(`${filename} ${err ? 'borrado' : 'añadido o modificado'}`);
                        });
                    });
                }
            },
        });
    }
}
exports.Observer = Observer;
