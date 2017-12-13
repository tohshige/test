var fs = require('fs');
var Converter = require("csvtojson").Converter;
var converter = new Converter({});

    converter.on("end_parsed", function (jsonArray) {
        fs.writeFile('dist/all.utf8.json', JSON.stringify(jsonArray, null, '    '));
        console.log("JSON形式で出力されました");
    });

    require("fs").createReadStream("dist/all2.utf8.csv").pipe(converter);

