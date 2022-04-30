import  chalk from 'chalk';
import yargs from 'yargs';
import fs from 'fs';

/**
 * Clase List que contine un método que lista un directorio
 */
export class List {
  constructor(){}

  /**
  * Método listar que lista las notas de un usuario
  */
  listar(){
    yargs.command({
      command: 'list',
      describe: 'Listar un directorio',
      builder: {
        ruta: {
          describe: 'Ruta a listar',
          demandOption: true,
          type: 'string',
        }
      },
      handler(argv) {
        fs.readdir(`${argv.ruta}`, (err, files) =>  {
          if(err){
            console.error(chalk.red(`${argv.ruta} no existe`));
          } else {
            let i:number = 0;
            files.forEach(file => {
              fs.stat(`${argv.ruta}/${file}`, (err, stats) => {
                if (err){
                  console.error(chalk.red(`La ruta que se intenta saber no existe o no se encuentra`));
                } else {
                if (!stats.isDirectory()) {
                  console.log(chalk.green(`${file} `));
                } 
              }
              });
              i++;
            });
            if(i === 0){
              console.log(chalk.green(`${argv.ruta} esta vacio`));
            }
          }
        });
      },
    });
  }
}