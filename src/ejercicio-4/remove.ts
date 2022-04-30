import  chalk from 'chalk';
import yargs from 'yargs';
import fs from 'fs';

/**
 * Clase Remove que contiene un método para borrar ficheros  directorios
 */
export class Remove {
  constructor(){}

  /**
  * Método remove que elimina un fichero o directorio
  */
  remove(){
    yargs.command({
      command: 'remove',
      describe: 'Elimina la ruta',
      builder: {
        ruta: {
          describe: 'Ruta a borrar',
          demandOption: true,
          type: 'string',
        }
      },
      handler(argv) {
        fs.stat(`${argv.ruta}`, (err, stats) => {
          if (err){
            console.error(chalk.red(`La ruta que se intenta borrar no existe`));
          } else {
          if (stats.isDirectory()) {
            fs.rm(`${argv.ruta}`,  { recursive: true }, (err) => {
              if (err) {
                return console.error(chalk.red(`No se pudo borrar el directorio`));
              }
              else {
                console.log(chalk.green(`Directorio borrado`));
              }
            });
          } else {
              fs.unlinkSync(`${argv.ruta}`);
              console.log(chalk.green(`Fichero eliminado!`));
          }
        }
        });
      },
    });
  }
}