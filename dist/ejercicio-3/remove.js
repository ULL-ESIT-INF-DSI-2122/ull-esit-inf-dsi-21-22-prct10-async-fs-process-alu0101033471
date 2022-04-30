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
 * Clase Remove que contiene un método para borrar notas
 */
class Remove {
    constructor() { }
    /**
    * Método removeNote que elimina una nota de un usuario
    */
    removeNote() {
        yargs_1.default.command({
            command: 'remove',
            describe: 'Remove the notes of the user',
            builder: {
                title: {
                    describe: 'Note title',
                    demandOption: true,
                    type: 'string',
                },
                user: {
                    describe: 'Name user',
                    demandOption: true,
                    type: 'string',
                }
            },
            handler(argv) {
                if (!fs_1.default.existsSync(`./dist/ejercicio-3/${String(argv.user)}/${String(argv.title)}.json`)) {
                    console.error(chalk_1.default.red(`No note found`));
                }
                else {
                    fs_1.default.unlinkSync(`./dist/ejercicio-3/${String(argv.user)}/${String(argv.title)}.json`);
                    console.log(chalk_1.default.green(`Note ${String(argv.title)} removed!`));
                }
            },
        });
    }
}
exports.Remove = Remove;
