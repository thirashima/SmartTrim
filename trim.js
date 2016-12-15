var SmartTrim = (function(){
    "use strict";
    var min = 80,
        max = 200,
        ideal = 100,
        str = '',
        optional_delimiters = [',', ';', ':'];

    function close_to_ideal(fragment_length){
        if( (fragment_length < ideal && (ideal - fragment_length < 20)) || (fragment_length > ideal && fragment_length - ideal < 20) ){
            return true;
        }
        return false;
    }

    function reduce_fragments(s, separator){
        var start = 0,
            str_array = s.split(separator),
            possible_match = str_array[start],
            matched_length = possible_match.length,
            out = [];

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
            out.push(str_array[x]);
            if(x != str_array.length-1){
            	out.push(separator);
            }
        }
        return out.join("");
    }

    return {
        trim: function(original_str, options){
            options = options||{};
            str = original_str;
            
            if(options.min)
		        min = options.min;

            if(options.max)
		        max = options.max;

            if(options.ideal)
		        ideal = options.ideal;

            if(options.optional_delimiters)
                optional_delimiters = options.optional_delimiters;

            var found = null,
                whitespace_fragments = null;

            found = reduce_fragments(str, '.');
	
            if( close_to_ideal(found.length) ){
                return [found, str.substr(found.length)];
            }else{
                for(var x=0;x<optional_delimiters.length;x++){
                    var delimiter = optional_delimiters[x];
                    var re = new RegExp(delimiter);
                    if(re.test(found)){
                        var frags = reduce_fragments(found, delimiter);
                        if(close_to_ideal(frags.length)){
                            found = frags;
                            break;
                        }
                    }
                }
                if( close_to_ideal(found.length) ){
                    return [found, str.substr(found.length)];
                }else{
                    whitespace_fragments = reduce_fragments(found, ' ');
                }
            }
                
            if(whitespace_fragments && whitespace_fragments.length < max){
                return [whitespace_fragments, str.substr(whitespace_fragments.length)];
            }

            //failed to trim
            return [null, str];

        }
    };
})();
