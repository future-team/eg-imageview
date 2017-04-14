var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var Server = require('karma').Server;
var demoWebpackConfig = require('./webpack/demo.config');
var webpackConfig = require('./webpack/webpack.config');
var WebpackDevServer = require("webpack-dev-server");
var open = require('gulp-open');
var extend = require('extend');
var babel = require('gulp-babel');

var config = require('./package.json');
var shell = require('shelljs');

var error = function(e){
  console.error(e);
  if(e.stack){
    console.error(e.stack);
  }
  process.exit(1);
};
gulp.task('karma', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('open', function () {
  gulp.src(__filename)
      .pipe(open({uri: "http://127.0.0.1:8081/webpack-dev-server/example/index.html"}));
});

gulp.task('demo-webpack', function(done) {
  var compiler = webpack(demoWebpackConfig);
  var server = new WebpackDevServer(compiler, {
    hot: true,
    historyApiFallback: false,
    /*proxy: {
      "*": "http://localhost:9090"
    },*/
    filename: config.name+".js",
    publicPath: '/example/build/',
    //headers: { "X-Custom-Header": "yes" },
    stats: { colors: true }
  });
  server.listen(8081, "localhost", function() {
    console.log('server done!')
  });
});

/**
 * i don't why do this, but it is effective!
 */
gulp.task('example-webpack',function(done){
    // 先删除原来的字体文件
    shell.rm([
        'example/*.eot',
        'example/*.woff',
        'example/*.ttf',
        'example/*.svg',
    ]);
    var wpk = extend({}, demoWebpackConfig, {
        entry: ['./example/src/index.js'],
        plugins: []
    });
    webpack(wpk).run(function(err, stats) {
        if(err) throw new gutil.PluginError("example-webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        // 手动拷贝字体文件，不知道为撒一定要在根目录下！
        shell.mv([
            'example/build/*.eot',
            'example/build/*.woff',
            'example/build/*.ttf',
            'example/build/*.svg',
        ],'example/');
        done();
    });
});

gulp.task('require-webpack', function(done) {
  webpack(webpackConfig).run(function(err, stats) {
    if(err) throw new gutil.PluginError("require-webpack", err);
    gutil.log("[webpack]", stats.toString({
      // output options
    }));
    done();
  });
});

gulp.task('min-webpack', function(done) {

  var wbpk = Object.create(webpackConfig);
  wbpk.output.filename = config.name+'.min.js';
  wbpk.plugins = [
    new webpack.optimize.UglifyJsPlugin()
  ];

  webpack(wbpk).run(function(err, stats) {
    if(err) throw new gutil.PluginError("min-webpack", err);
    gutil.log("[webpack]", stats.toString({
      // output options
    }));
    done();
  });
});

gulp.task('babel', function(done){
  return gulp.src('src/**/*.js')
      .pipe(babel())
      .pipe(gulp.dest('lib'));
});

gulp.task('watch', function () {
  gulp.watch(['./lib/**/*.*'], ['demo']);
});

gulp.task('default', ['babel','require-webpack',/*, 'html', 'asset'*/]);
gulp.task('test',['karma']);
gulp.task('demo', ['demo-webpack','open']);
gulp.task('min',['min-webpack']);