# Informe de la actividad
Práctica relacionada con el uso de  las APIs proporcionadas por Node.js para interactuar con el sistema de ficheros, así como para crear procesos.

## Ejercicio 1

Tras interactuar e intentar entender el siguiente código:
```typescript
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```
Si se realiza una traza del programa, en caso de introducir por linea de comandos un número de argumentos distinto a 3, notifica de un error, en caso contrario la función access, si no encuentra el archivo pasado por argumento, notifica de un error y en caso de si encontrarlo comienza con un mensaje de inicio, se salta el proceso ** watcher.on ** y visualiza el último mensaje del programa. Después, por cada modificación en el fichero introducido por comando, se notificará con un mensaje por consola.

///¿Qué hace la función access? ¿Para qué sirve el objeto constants?

## Ejercicio 2
## Ejercicio 3
## Ejercicio 4