var Fontmin = require('fontmin');
// import Fontmin from 'fontmin'

var srcPath = './static/font-family/child_font.ttf'; // 字体源文件路径
var destPath = 'static';    // 字体输出路径
var text = '策划：陈淑文、林丽芳、张晓钰、孔宾、陈宝育、陈坊钦、林帆 顾问：黄海霞、王欢';//有哪些文字可能需要用到这个字体的,都可以在这里进行配置

// 初始化
var fontmin = new Fontmin()
    .src(srcPath)               // 输入配置
    .use(Fontmin.glyph({        // 字型提取插件
        text: text              // 所需文字
    }))
    .use(Fontmin.ttf2eot())     // eot 转换插件
    .use(Fontmin.ttf2woff())    // woff 转换插件     
    .use(Fontmin.ttf2svg())     // svg 转换插件
    .use(Fontmin.css())         // css 生成插件
    .dest(destPath);            // 输出配置

// 执行
fontmin.run(function (err, files, stream) {

    if (err) {                  // 异常捕捉
        console.error(err);
    }

    console.log('done');        // 成功
});