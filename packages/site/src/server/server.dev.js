import express from 'express';
import path from 'path';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config.dev';
import { ASSET_DIR, BASE_URL, PORT, HOST } from '../../../../config';

const app = express();

const compiler = webpack(webpackConfig);

app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
    writeToDisk: true,
}));

app.use(hotMiddleware(compiler));

app.use(`${BASE_URL}/${ASSET_DIR}`, express.static(`./${ASSET_DIR}`));

app.get(BASE_URL, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../', 'index.html'))
});

app.listen(PORT, HOST);