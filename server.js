const path =    require('path'),
    express =   require('express'),
    bodyParser = require('body-parser'),
    webpack =   require('webpack'),
    config =    require('./webpack.config'),
    devmd =     require('webpack-dev-middleware'),
    hotmd =     require('webpack-hot-middleware'),
    router =    require('./server/router'),
    errHandler = require('./server/error-handler');

const html = `<!DOCTYPE html>
<html>
    <head>
        <title>Eurobank Key Management</title>
    </head>

    <body>
        <div id="app-wrap"></div>

        ` + Object.keys(config.entry).map((key) => `<script src="dist/${key}.js"></script>`).join('\n') + `
    </body>
</html>`;

const app =     express(),
    compiler =  webpack(config),
    port = 3000,
    address = '0.0.0.0';

app.use(devmd(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(hotmd(compiler));
app.use(errHandler);

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router, function (req, res) {
  res.send(html);
});

app.listen(port, address, (err) => {
    if(err)
        return console.log(err);

    console.log(`Listening at http://${address}:${port}`);
});