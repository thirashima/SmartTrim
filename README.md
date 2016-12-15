SmartTrim
=========

A JavaScript module that trims a string to the nearest sensible fragment. 

This function prefers looking for whole sentences first (most likely to be coherent). If whole sentances do not match our parameters,
then it will try sentence fragments, delimited by commas (or any other optional delimiters). If that fails, it fall back to whole words, 
seperated by whitespace (least lilely to be coherent). 

The return value of the function is an array containing the trimmed fragment (if found) at the first position, and the remainder of the string in the second position.

** Usage **

```javascript
var str = "";
var options = { //these are the same as the defaults already set in the module, and a thus optional
    min: 80,
    max: 200,
    ideal: 100,
    optional_delimiters: [",", ";", ":"]
};
var results = SmartTrim.trim(str, options); 
```