import  chalk from 'chalk';
import yargs from 'yargs';
import fs from 'fs';

/**
 * Clase MoveryCopiar para directorios oficheros
 */
export class MoveryCopiar {
  constructor(){}

  /**
  * Método moverCopiarRuta que copia un directorio o mueve un fichero de directorio
  */
  moverCopiarRuta(){
    yargs.command({
      command: 'movercopiar',
      describe: 'Mueve un fichero o copia un directorio',
      builder: {
        origen: {
          describe: 'ruta origen',
          demandOption: true,
          type: 'string',
        },
        destino: {
          describe: 'ruta destino',
          demandOption: true,
          type: 'string',
        }
      },
      handler(argv) {
        fs.stat(`${argv.origen}`, (err, stats) => {
          if (err){
            console.error(chalk.red(`La ruta origen no existe`));
          } else {
            if (stats.isDirectory()) {
              fs.stat(`${argv.destino}`, (err, statss) => {
                if (err){
                  console.error(chalk.red(`La ruta destino no existe`));
                } else {
                  if (statss.isDirectory()) {
                    let directorio: string[] = String(argv.origen).split(`/`);
                    let nombre: string = directorio[directorio.length - 1];
                    fs.cp(`${argv.origen}`, `${argv.destino}/${nombre}`,{ recursive: true },(err) => {
                      if(err){
                        console.error(chalk.red(`No se pudo copiar`));
                      } else {
                        console.log(chalk.green(`Directorio ${nombre} copiado en la ruta ${argv.destino}`));
                      }
                    });
                  } else {
                    console.error(chalk.red(`La ruta destino no es un directorio!`));
                  }
                }
              });
            } else {
              fs.stat(`${argv.destino}`, (err, statss) => {
                if (err){
                  console.error(chalk.red(`La ruta destino no existe`));
                } else {
                  if (statss.isDirectory()) {
                    let fichero: string[] = String(argv.origen).split(`/`);
                    let nombre: string = fichero[fichero.length - 1];
                    fs.renameSync(`${argv.origen}`,`${argv.destino}/${nombre}`);
                    console.log(chalk.green(`fichero ${nombre} desplazado a la ruta ${argv.destino}`));
                  } else {
                      console.error(chalk.red(`La ruta destino no es un directorio!`));
                  }
                }
              });  
            }
          }
        });
      },
    });
  }
}