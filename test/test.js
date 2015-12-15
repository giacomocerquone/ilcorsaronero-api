var icn = require("../index.js");

icn.search("Star Wars", "BDRiP", function(err, data) {
    if (err) throw err;
    console.log(data);
});
icn.latest(function(err, data) {
  if (err) throw err;
  console.log(data);
});
