var icn = require("../index.js");

icn.search("Star Wars", ["BDRiP", "DVD"], function(err, data) {
  if (err) throw err;
  console.log(data.length + " search");
});
icn.latest(function(err, data) {
  if (err) throw err;
  console.log(data.length + " latest")
});
