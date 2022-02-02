import { createRequire } from "module";
const require = createRequire(import.meta.url);

import chalk from 'chalk';
import _ from 'pdf-to-printer';
const { print } = _;

const chokidar = require('chokidar');
const path = require('path');

const watchPath = path.join('C:/Users/shiki/Documents', '*.pdf');
const watchOptions = {
  persistent   : true,
  ignoreInitial: true
}

const watcher = chokidar.watch(watchPath, watchOptions);
console.log(chalk.green(`Observando ${watchPath}...`));

watcher.on('add', path => {

  console.log(chalk.blue(`Nuevo archivo encontrado: ${path}`));
  console.log(chalk.cyan('Imprimiendo...'));

  const printOptions = [
    { printer: "Impresora Sapito 9000" },
    { printer: "Multifuncional 123" },
  ];

  let printerTasks = printOptions.map((options, i) => {
    return print(path, options)
      .then(() => {
        console.log(chalk.green(`Archivo [${path}] impreso en impresora ${i + 1} (${options.printer})`));
      })
      .catch((error) => {
        console.log(chalk.red(`Error al imprimir en impresora ${i + 1} (${options.printer})`))
        console.log(chalk.red(error));
      });
  });

  Promise.all(printerTasks).finally(() => {
    console.log(chalk.green(`Observando ${watchPath}...`));
  });

})
