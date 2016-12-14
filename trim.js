//This function prefers looking for whole sentences first (most likely to be cogent). If whole sentances do not match our parameters,
//then it will try sentence fragments, delimited by commas. If that fails, it fall back to whole words, 
//seperated by whitespace (least lilely to be cogent). 
var SmartTrim = (function(){
    "use strict";
    var min = 80,
        max = 200,
        ideal = 100,
        str = '';

    function close_to_ideal(pmatch_length){
        if( (pmatch_length < ideal && (ideal - pmatch_length < 20)) || (pmatch_length > ideal && pmatch_length - ideal < 20) ){
            return true;
        }
        return false;
    }

    function reduce_fragments(s, separator){
        var start = 0,
            str_array = s.split(separator),
            possible_match = str_array[start],
            matched_length = possible_match.length,
            out = "";

        while(matched_length < min){
            start++;
            matched_length += (str_array[start].length + 1);
        }
        if(matched_length < max){
            while(matched_length < ideal && !close_to_ideal(matched_length)){
                start++;
                matched_length += (str_array[start].length + 1);
            }
        }
        for(var x=0;x<=start;x++){
            out += str_array[x];
            if(x != str_array.length-1){
            	out+=separator;
            }
        }
        return out;
    }

    return {
        init: function(options){
            if(options.str)
		        str = options.str;
            if(options.min)
		        min = options.min;
            if(options.max)
		        max = options.max;
            if(options.ideal)
		        ideal = options.ideal;
        },
        trim: function(){
            
            //not sure if we want to prefer the whole string, if it's below the max threshold.
            if(str.length < max){
                return [str, null];
            }

            var found = null,
                wsr = null;

            found = reduce_fragments(str, '.');
	
            if( close_to_ideal(found.length) ){
                return [found, str.substr(found.length)];
            }else{
                if(/,/.test(found)){
                    var commasr = reduce_fragments(found, ',');

                    if(close_to_ideal(commasr.length)){
                        return [commasr, str.substr(commasr.length)];
                    }else{
                        wsr = reduce_fragments(commasr, ' ');
                    }
                }else{
                    wsr = reduce_fragments(found, ' ');
                }
            }
                
            if(wsr && wsr.length < max){
                return [wsr, str.substr(wsr.length)];
            }

            return [];

        }
    };
})();
