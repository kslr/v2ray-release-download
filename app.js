const got = require('got');
const fs = require('fs');
const p = require('path');

(async () => {
    let response = await got('https://api.github.com/repos/v2fly/v2ray-core/releases');
    let responseBody = JSON.parse(response.body);
    responseBody[0]['assets'].forEach(function (element) {
        let name = element.name;
        let download_url = element.browser_download_url;
        console.info(`${name}  ${download_url}`);

        await got.stream(download_url).pipe(fs.createWriteStream(p.resolve(__dirname, `data/${name}`)));
    })
})();
