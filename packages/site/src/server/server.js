import express from 'express';
import path from 'path';
import { ASSET_DIR, BASE_URL, PORT, HOST } from '../../../../config';

const app = express();

app.use(`${BASE_URL}/${ASSET_DIR}`, express.static(`./${ASSET_DIR}`));

app.get(BASE_URL, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../', 'index.html'))
});

app.listen(PORT, HOST);