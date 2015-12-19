'use strict';

var request = require('request'),
    cheerio = require('cheerio');

function search(term, cat, callback) {
  if (typeof term !== 'string') {
    callback(new Error("You must enter a string to search."));
    return;
  }
  scrape("http://ilcorsaronero.info/argh.php?search=" + encodeURIComponent(term), cat, callback);
}

function latest(cat, callback) {
  scrape("http://ilcorsaronero.info/recenti", cat, callback);
}

function scrape(url, cat, callback) {
  if (typeof callback === 'undefined' && typeof cat !== 'function') {
    console.log("Missing callback function.");
    return;
  }
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      // We'll store retrieved data here
      var result = [],
          counter = 0,
          items = $('.odd, .odd2');

      // We don't scrape the category if it's specified and if it isn't an array
      if (typeof cat === 'undefined' || typeof cat === 'function') {
        callback = cat;
      } else if (typeof cat === 'string') {
        items = $('.odd, .odd2').filter(function() {
          return $(this).children('td').eq(0).children('a').text() === cat;
        });
      } else if (Array.isArray(cat)) {
      } else {
        callback(new Error("The category parameter must be a String or an array of String."));
        return;
      }

      items.each(function(i, row) {
        // Unluckily the magnets are not accessible from the search page. We must access the torrent page and get the magnet
        request( $(row).children('td').eq(1).children('a').attr("href"), function(error, response, body) {
          if (!error && response.statusCode == 200) {
            var catScraped = $(row).children('td').eq(0).children('a').text(),
                name = $(row).children('td').eq(1).children('a').text(),
                link = cheerio.load(body)('.magnet').attr('href'),
                size = $(row).children('td').eq(2).text(),
                date = $(row).children('td').eq(4).text(),
                seeds = $(row).children('td').eq(5).text(),
                peers = $(row).children('td').eq(6).text();

            // We've to do this awful thing because I didn't fastly find a way to filter multiple times a cheerio object
            if (Array.isArray(cat)) {
              cat.forEach(function(el) {
                if (catScraped == el)
                  result.push( { "cat": catScraped, "name": name, "link": link, "size": size, "date": date, "seeds": seeds, "peers": peers } );
              });
            } else {
              result.push( { "cat": catScraped, "name": name, "link": link, "size": size, "date": date, "seeds": seeds, "peers": peers } );
            }

            counter++;
            if(counter == items.length) {
              callback(null, result);
            }
          }
        });
      });
    }
  });
}

exports.search = search;
exports.latest = latest;
