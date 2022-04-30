"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.observarOpcion = exports.removeOpcion = exports.modifyOpcion = exports.readOpcion = exports.listOpcion = exports.addOpcion = void 0;
const yargs_1 = __importDefault(require("yargs"));
const add_1 = require("./add");
const list_1 = require("./list");
const read_1 = require("./read");
const remove_1 = require("./remove");
const modify_1 = require("./modify");
const observador_1 = require("./observador");
exports.addOpcion = new add_1.Add();
exports.listOpcion = new list_1.List();
exports.readOpcion = new read_1.Read();
exports.modifyOpcion = new modify_1.Modify();
exports.removeOpcion = new remove_1.Remove();
exports.observarOpcion = new observador_1.Observer();
exports.addOpcion.addNote();
exports.listOpcion.listNote();
exports.readOpcion.readNote();
exports.modifyOpcion.modifyNote();
exports.removeOpcion.removeNote();
exports.observarOpcion.ObserverNote();
yargs_1.default.parse();
