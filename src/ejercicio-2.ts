import * as fs from 'fs';
import chalk from 'chalk';
import * as yargs from 'yargs';
import {spawn} from 'child_process';
import * as path from 'path';
import { number } from 'yargs';
/**
 * Clase Ejercicio2 que devuelva el número de 
 * ocurrencias de una palabra en un fichero de texto de dos maneras
 */
export class Ejercicio2 {
  constructor(){}

  /**
   * Método comando que usa del método pipe de un Stream para 
   * poder redirigir la salida de un comando hacia otro.
   */
  comando(){
    yargs.command({
      command: 'ocurrencias',
      describe: 'Numero de veces que sale una palabra en el archivo',
      builder: {
        archivo: {
          describe: 'archivo',
          demandOption: true,
          type: 'string',
        },
        palabra: {
          describe: 'palabra',
          demandOption: true,
          type: 'string',
        }
    },
 
    handler(argv) {
      if(process.argv.length === 5){
        if (fs.existsSync(`${argv.archivo}`)){
          const cat = spawn('cat', [`${argv.archivo}`]);
          const grep = spawn('grep', [`${argv.palabra}`]);
          const wc = spawn('wc', [`-l`]);
  
          cat.stdout.pipe(grep.stdin);
          grep.stdout.pipe(wc.stdin);
          console.log(chalk.green(`Número de veces que se repite la palabra ${argv.palabra}: : con método pipe()`));
          wc.stdout.pipe(process.stdout);
        }
        else{
          console.log(chalk.red(`${argv.archivo} no existe `));
        }
      } else {
        console.log(chalk.red(`numero de argumentos mal introducidos`));
      }
    }
    });
  }

  /**
   * Método creando los subprocesos necesarios y registrando manejadores 
   * a aquellos eventos necesarios para implementar la funcionalidad solicitada.
   */
  comando2(){
    yargs.command({
      command: 'ocurrencias',
      describe: 'Numero de veces que sale una palabra en el archivo',
      builder: {
        archivo: {
          describe: 'archivo',
          demandOption: true,
          type: 'string',
        },
        palabra: {
          describe: 'palabra',
          demandOption: true,
          type: 'string',
        }
    },
 
    handler(argv) {
      if(process.argv.length === 5){
        if (fs.existsSync(`${argv.archivo}`)){
          const cat = spawn('cat', [`${argv.archivo}`]);
          let catOutput = '';
          let catOutputAsArray: string[] = [];
          cat.stdout.on('data', (piece) => catOutput += piece);
          
          let contador: number = 0;
          cat.on('close', () => {
            catOutputAsArray = catOutput.split(/\s+/);
            for(let i: number = 0; i < catOutputAsArray.length; i++){
              if (catOutputAsArray[i] === argv.palabra){
                contador++;
              }
            }
            console.log(chalk.green(`Número de veces que se repite la palabra ${argv.palabra}: con método pipe()`));
            console.log(contador);
         }); 
         
        }
        else{
          console.log(chalk.red(`${argv.archivo} no existe `));
        }
      } else {
        console.log(chalk.red(`numero de argumentos mal introducidos`));
      }
    }
    });
  }
}

/**
 * Objetos de la clase creada con los dos métodos de comandos 
*/
export let palabra = new Ejercicio2();
export let palabra2 = new Ejercicio2();
palabra.comando2();
//palabra2.comando();
yargs.parse();