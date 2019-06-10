// 引入gulp工具
const gulp = require('gulp'),
      htmlmin = require('gulp-htmlmin'),
      sass = require('gulp-sass'),
      connect = require('gulp-connect'),
      babel = require('gulp-babel'),
      uglify = require('gulp-uglify'),
      cleanCss = require('gulp-clean-css')

// 指定任务(第一个参数是任务名称，第二个参数就是这个任务要执行的代码函数)
// gulp.task('a', () => {
//   console.log(123)
// })

// 指定一个压缩html的任务
gulp.task('html', () => {
  // src是去读取文件，gulp读取文件的方式是文件流
  // 通过pipe管道的方式去压缩html
  // 最后把压缩的结果放到dist目录里
  // **代表所有目录，*代表所有文件
  gulp.src('src/**/*.html')
    .pipe(htmlmin({
      removeComments: true,// 清除HTML注释
      collapseWhitespace: true,// 压缩HTML
      collapseBooleanAttributes: true,// 省略布尔属性的值 <input checked="true"/> ==> <input />
      removeEmptyAttributes: true,// 删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: true,// 删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true,// 删除<style>和<link>的type="text/css"
      minifyJS: true,// 压缩页面JS
      minifyCSS: true// 压缩页面CSS 
    }))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())

})

// 编译scss
gulp.task('css', () => {
  gulp.src('src/css/**/*.scss')
    .pipe(sass())
    .pipe(cleanCss())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})

// 开启服务器任务
gulp.task('server', () => {
  connect.server({
    root: 'dist', // 服务器的根路径
    livereload: true, // 自动刷新
    port: 2333
  })
})

// 一些不需要任何操作，只需要单纯移动的资源
gulp.task('move', () => {
  gulp.src('src/libs/**/*')
    .pipe(gulp.dest('dist/libs'))  
  
    gulp.src('src/images/**/*')
      .pipe(gulp.dest('dist/images'))
})

// js任务：es6转es5，然后再压缩
gulp.task('js', () => {
  gulp.src('src/js/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload())
})

// 监听文件的修改，只要文件做了修改，那就自动执行对应的任务
gulp.task('watch', () => {
  // 第一个参数是监听改变的文件
  // 第二个参数就是这些文件修改之后要执行的任务
  gulp.watch('src/**/*.html', ['html'])
  gulp.watch('src/css/**/*.scss', ['css'])
  gulp.watch('src/js/**/*.js', ['js'])
})

// 默认就会执行的任务
// 把需要执行的任务列表放进来，只需要输入gulp 所有的任务都会执行
gulp.task('default', ['html', 'css', 'js', 'server', 'move', 'watch'])
