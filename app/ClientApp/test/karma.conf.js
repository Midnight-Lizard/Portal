// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

process.env.ENV="test";

module.exports = function (config) {
    config.set({
        basePath: '.',
        frameworks: ['jasmine'],
        files: [
            // '../../wwwroot/assets/styles.css',
            '../../wwwroot/dist/vendor.css',
            '../../wwwroot/dist/vendor.js',
            './boot-tests.ts'
        ],
        preprocessors: {
            './boot-tests.ts': ['webpack']
        },
        reporters: ['progress', 'kjhtml'],
        tfsReporter: { outputFile: 'test-results.xml', outputDir: 'test-results' },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeDev'],
        customLaunchers: {
            ChromeDev: {
                base: 'Chrome',
                chromeDataDir: '../../Karma'
            },
            ChromeCI: {
                base: 'ChromeHeadless',
                chromeDataDir: '~/Chrome',
                flags: ['--no-sandbox']
            }
        },
        mime: { 'application/javascript': ['ts'] },
        singleRun: false,
        webpack: require('../../webpack.config.js')()[0],
                //.filter(config => config.target !== 'node'), // Test against client bundle, because tests run in a browser
        webpackMiddleware: { stats: 'errors-only' },
    });
};
