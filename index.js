const Crawler = require("crawler");
const fs = require("fs");
const Epub = require("epub-gen")
const tempPath = "./temp.json";
const urlPath = "https://truyenfull.vn/truyen-than-khong-thien-ha/chuong-"
const getDiff = (string, diffBy) => string.split(diffBy).join('')
let tempData =[]

let option = {
    title: "TTKD", // *Required, title of the book.
    author: "TTKD", // *Required, name of the author.
};

var c = new Crawler({
    maxConnections: 10,
    // This will be called for each crawled page
    callback: function (error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var $ = res.$;
            chapterNumber = getDiff(res.options.uri, urlPath)
           let title=$(".chapter-title").text();
           let data='<span style="white-space: pre-line">'+$(".chapter-c").text()+'</span>';
            article = {
                title: title,
                data: data

            }
            tempData.push(article);
 

            if (chapterNumber % 2 == 0) {
                fs.writeFile(tempPath, JSON.stringify(tempData), function (err) {
                    if (err) throw err;
                    console.log('Save');
                });

            }

            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            // console.log($(".chapter-c").html());
        };
        done();
    }
});
let urlArr = [];
// Queue just one URL, with default callback
for (let index = 1; index < 5; index++) {
    let url = urlPath + index;
    urlArr.push(url);



}


   c.queue(urlArr);

  




