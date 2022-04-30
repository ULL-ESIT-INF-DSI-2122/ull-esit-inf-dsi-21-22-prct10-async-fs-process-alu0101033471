import  chalk from 'chalk';
import yargs from 'yargs';
import fs from 'fs';
import path from 'path';


/**
 * Clase Crear que crea un directorio
 */
export class Crear {
  constructor(){}

  /**
  * Método crearDirectorio que crea un directorio a traves de la ruta que recibe
  */
  crearDirectorio(){
    yargs.command({
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
       
        fs.mkdir(`${argv.ruta}`, (err) => {
          if (err) {
            return console.error(chalk.red(`No se pudo crear el directorio`));
          }
          else {
            console.log(chalk.green(`Directorio creado`));
          }
        });
        
      },
    });
  }
}