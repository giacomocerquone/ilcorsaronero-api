var icn = require("../index.js");
icn.search("Batman", "BDRiP", function(err, data) {
    if (err) throw err;
    console.log(data);
});
