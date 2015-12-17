var icn = require("../index.js");

icn.search("Star", function(err, data) {
    if (err) throw err;
    console.log(data.length + " search");
});
