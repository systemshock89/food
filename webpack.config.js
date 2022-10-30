'use strict';

let path = require('path'); // техническая пер-я

module.exports = {
  mode: 'development', // режим работы: development/production/none (никакой оптимизации)
  entry: './src/js/main.js', // файл, с которого будем начинать (обычно в нем прописываются все зав-ти require/import)
  output: {
    filename: 'script.js', // итоговый файл - навание
    path: __dirname + '/dist/js' // путь итогового файла. __dirname - корень папки с проектом
  },
  watch: true, // отслеживаение изменений файлов и автоматическая сборка проекта при сохранении этих файлов

  devtool: "source-map",

  module: {}
};
