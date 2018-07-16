// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    files: [
      "../../node_modules/@angular/material/prebuilt-themes/indigo-pink.css",
      "../shared/src/styles/material-icons.css",
      {
        pattern: '../shared/src/assets/*.*',
        watched: true,
        included: false,
        served: true,
        nocache: true
      }
    ],
    proxies: {
        "/assets/": `/absolute${path.join(config.buildWebpack.root,
            'projects/shared/src/assets/')}`,
    },
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../../coverage'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
      ? ['coverage-istanbul']
      : ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    browsers: ['ChromeDev'],
    customLaunchers: {
      ChromeDev: {
        base: 'Chrome',
        chromeDataDir: '../../Karma',
        flags: [
          "--remote-debugging-port=9222"
        ]
      },
      ChromeCI: {
        base: 'ChromeHeadless',
        chromeDataDir: '/Chrome',
        flags: ['--no-sandbox']
      }
    }
  });
};
