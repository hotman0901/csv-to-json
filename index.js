const csv = require('csv-parser');
const fs = require('fs');
let enJson = {};
let zhJson = {};
let chJson = {};
// 要轉換的csv檔案 放在根目錄
fs.createReadStream('test.csv')
    .pipe(csv())
    .on('data', (data) => {
        // 必須是excel 最上面的column name 為en、tw、cn
        // 所以拆解會有en、tw、cn的key
        const { en, tw, cn } = data;
        enJson[en] = en;
        zhJson[en] = tw;
        chJson[en] = cn;
    })
    .on('end', () => {
        const exportPath = 'i18nExport';
        // 先檢查路徑是否存在，不存在先 mkdir folder
        if (!fs.existsSync(exportPath)) {
            fs.mkdir(`${__dirname}/${exportPath}`, (err) => {});
        }

        // 寫檔案
        fs.writeFileSync('./i18nExport/en.json', JSON.stringify(enJson));
        fs.writeFileSync('./i18nExport/tw.json', JSON.stringify(zhJson));
        fs.writeFileSync('./i18nExport/cn.json', JSON.stringify(chJson));
    });
