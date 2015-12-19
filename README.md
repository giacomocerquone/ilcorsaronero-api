#ilcorsaronero-api
With this module we can get magnets of torrents from ilcorsaronero.info. They're not providing any kind of API, so this module just scrape the information from the website.

##Installation
Give `npm install ilcorsaronero-api` into your project<br/>
Or<br/>
Download this repo and give `npm install`<br/>

##Methods
Right now the module provide two functions:

###.search("string to search", categories, callback(err, data) {});
With this method we search for torrents.<br/>
"categories" is a parameter and it can be a string or an array of string, it's optional and if added the module will avoid completely to scrape every other item resulted from the search that doesn't match the paramaterso, being also faster in this way.

###.latest(categories, callback(err, data) {});
With this method we get latest available torrents.
It works the same as the other method, with the difference that, obviously, here any search string is needed.

##Example of Usage
There is a very simple example in the 'test' folder. This is what it contains:
```javascript
var icn = require("ilcorsaronero-api");

icn.search("Star Wars", "BDRiP" function(err, data) {
  if (err) throw err;
  console.log(data.length + " search");
});
icn.latest(function(err, data) {
  if (err) throw err;
  console.log(data.length + " latest")
});
```

##Response Array
Any method will respond with an array of objects. Here an example of an array response with only one object inside of it:
```javascript
{ cat: 'BDRiP',
  name: ' - Star Wars The Return of the Jedi Despecialized Edition ITA ENG AC3 AVCHD 720p v1.0 ZMachine - ',
  link: 'magnet:?xt=urn:btih: ...',
  size: '1.05 GB',
  date: '03.06.15',
  seeds: '32',
  peers: '6' }
```

##Available categories
The categories are the ones you can see from the website, capital letters and space must be respected:<br/>
>Screener<br/>
DVD<br/>
SerieTv<br/>
Anime<br/>
BDRiP<br/>
PC Games<br/>
PlayStation<br/>
XBOX<br/>
Musica<br/>
Audiolibri<br/>
Ebooks<br/>
App Win<br/>
App Linux<br/>
App Mac<br/>
H4cikn9<br/>
Altro

##TODO
I will absolutely improve that piece of code that handle the array of categories in input... it's awful as it is right now, but it works and I needed something that could work very soon.

##License
Released under the GNU 3 license.<br>
If you distribute a copy or make a fork of the project, you have to credit this project as source.<br>
Copyright © 2015, Giacomo cerquone.<br>
All rights reserved.
