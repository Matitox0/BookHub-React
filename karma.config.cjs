// karma.conf.js
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/test/setupTests.js',
      'src/**/*.spec.jsx',
    ],
    preprocessors: {
      'src/test/setupTests.js': ['webpack'],
      'src/**/*.spec.jsx': ['webpack'],
    },
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
                // Instrumenta el codigo fuente para que karma-coverage pueda medir
                // la cobertura real (sin esto el reporte salia en 0/0).
                plugins: [
                  ['istanbul', { exclude: ['**/*.spec.jsx', 'src/test/**', 'src/pages/**', 'src/service/**', 'src/App.jsx', 'src/main.jsx'] }],
                ],
              },
            },
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            type: 'asset/resource',
          },
        ],
      },
      resolve: {
        extensions: ['.js', '.jsx'],
      },
    },
    reporters: ['progress', 'kjhtml', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
      ],
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
    restartOnFileChange: true,
    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-jasmine-html-reporter'
    ]
  });
};
