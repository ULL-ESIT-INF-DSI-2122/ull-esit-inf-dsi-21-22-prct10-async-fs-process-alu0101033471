import  chalk from 'chalk';
import yargs from 'yargs';
import fs from 'fs';

/**
 * Clase Obersever que contiene un método que observa las notas de un usuario
 */
export class Observer {
  constructor(){}

  /**
  * Método ObserverNote que observa eldirectorio del usuario
  */
  ObserverNote(){
    yargs.command({
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
         if (!fs.existsSync(`./dist/ejercicio-3/${String(argv.user)}`)){
          console.error(chalk.red('El usuario no tiene un directorio creado'));
        } else {
          fs.watch(`./dist/ejercicio-3/${String(argv.user)}`, (eventType, filename) =>{
            console.log("\nEn l archivo", filename);
            console.log("El tipo de cambio fue:", eventType);
            fs.access(`./dist/ejercicio-3/${String(argv.user)}/${filename}`, fs.constants.F_OK, (err) => {
              console.log(`${filename} ${err ? 'borrado' : 'añadido o modificado'}`);
            });
            
          });
        }
      },
    });
  }
}