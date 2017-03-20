google-translate
----------------

[![Greenkeeper badge](https://badges.greenkeeper.io/unlight/google-translate.svg)](https://greenkeeper.io/)
Translate text using translate.google.com directly (without API key).


USAGE
-----
```js
googleTranslate(text, {from?: code, to: code});
```
**Parameters:**  
`text` - source translating text  
**Options:**  
`from` - language code for source text (default: "en")  
`to` - destination language code  

EXAMPLE
-------
```js
var googleTranslate = require("google-translate");
var result = googleTranslate("Hello world", {to: "de"});
console.log(result); // Hallo Welt
```