import  chalk from 'chalk';
import yargs from 'yargs';
import fs from 'fs';

/**
 * Clase Read que contiene un método para leer un fichero
 */
export class Read {
  constructor(){}

  /**
  * Método read que lee una nota de un usuario
  */
  read(){
    yargs.command({
      command: 'read',
      describe: 'Leer el contenido de un fichero',
      builder: {
        ruta: {
          describe: 'Ruta',
          demandOption: true,
          type: 'string',
        }
      },
      handler(argv) {
        if (!fs.existsSync(`${argv.ruta}`)){
          console.error(chalk.red(`${argv.ruta} does not exists`));
        } else {
          fs.readFile(`${argv.ruta}`, (err, data) => {
            if(err){
              console.error(chalk.red(`${argv.ruta} no es un fichero`));
            } else {
            console.log(chalk.green(data.toString()));
            }
          });
        }
      },
    });
  }
}