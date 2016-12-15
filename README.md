SmartTrim
=========

A JavaScript module that trims a string to the nearest sensible fragment. 

** Usage **

```javascript
var str = "";
var options = {
    min: 80,
    max: 200,
    ideal: 100
};
var results = SmartTrim.trim(str, options); //returns an array with two values, first being the trimmed snippet, second being any remainder of the orignal string.
```