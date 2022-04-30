import yargs from 'yargs';
import {Add} from './add';
import {List} from './list';
import {Read} from './read';
import {Remove} from './remove';
import {Modify} from './modify';
import {Observer} from './observador';


export const addOpcion = new Add();
export const listOpcion = new List();
export const readOpcion = new Read();
export const modifyOpcion = new Modify();
export const removeOpcion = new Remove();
export const observarOpcion = new Observer();


addOpcion.addNote();
listOpcion.listNote();
readOpcion.readNote();
modifyOpcion.modifyNote();
removeOpcion.removeNote();
observarOpcion.ObserverNote();

yargs.parse();