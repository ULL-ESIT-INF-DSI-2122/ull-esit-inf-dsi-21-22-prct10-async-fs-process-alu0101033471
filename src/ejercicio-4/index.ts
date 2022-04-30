import yargs from 'yargs';
import {Saber} from './saber';
import {Crear} from './crear';
import {List} from './list';
import {Read} from './read';
import {Remove} from './remove';
import {MoveryCopiar} from './movercopiar';



export const saberOpcion = new Saber();
export const crearOpcion = new Crear();
export const listOpcion = new List();
export const readOpcion = new Read();
export const modifyOpcion = new MoveryCopiar();
export const removeOpcion = new Remove();



saberOpcion.saberRuta();
crearOpcion.crearDirectorio();
listOpcion.listar();
readOpcion.read();
modifyOpcion.moverCopiarRuta();
removeOpcion.remove();

yargs.parse();