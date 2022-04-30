import  chalk from 'chalk';
import yargs from 'yargs';
import fs from 'fs';


/**
 * Clase Saber que contine un método que notifica si una ruta es directorio o fichero
 */
export class Saber {
  constructor(){}

  /**
  * Método saberRuta que comprueba si una ruta es directorio o fichero
  */
  saberRuta(){
    yargs.command({
      command: 'saber',
      describe: 'Saber si la ruta es un directorio o un fichero',
      builder: {
        ruta: {
          describe: 'ruta a saber',
          demandOption: true,
          type: 'string',
        }
      },
      handler(argv) {
        fs.stat(`${argv.ruta}`, (err, stats) => {
          if (err){
            console.error(chalk.red(`La ruta que se intenta saber no existe o no se encuentra`));
          } else {
          if (stats.isDirectory()) {
            console.log(chalk.green(`${argv.ruta} es un directorio `));
          } else {
            console.log(chalk.green(`${argv.ruta} es un fichero`));
          }
        }
        });
      },
    });
  }
}  