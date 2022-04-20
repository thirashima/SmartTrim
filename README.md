SmartTrim
=========

A JavaScript module that trims a string to the nearest sensible fragment, that is closest to an "ideal" given length. 

This function prefers looking for whole sentences first (most likely to be coherent). If whole sentances do not match our parameters,
then it will try sentence fragments, delimited by commas (or any other optional delimiters). If that fails, it fall back to whole words, 
seperated by whitespace (least likely to be coherent). 

The return value of the function is an array containing the trimmed fragment (if found) at the first position, and the remainder of the string in the second position.

**Usage**

```javascript
var str = "Here is a string to trim. yadda yadda yadda.";
var options = { //these are the same as the defaults already set in the module, and a thus optional
    min: 80, //absolute minimum length
    max: 200, //absolute maximum length
    ideal: 100, //target length
    wiggle_room: 20, //how close to ideal we want to get before accepting result
    optional_delimiters: [",", ";", ":"] //where to split sentences when looking for sensible fragments
};
var results = SmartTrim.trim(str, options); 
```
