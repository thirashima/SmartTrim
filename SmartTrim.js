const SmartTrim = (function(){
    "use strict";
    //options
    let min = 80,
        max = 200,
        ideal = 100,
        wiggle_room = 20,
        optional_delimiters = [',', ';', ':'];

    function close_to_ideal(fragment_length){
        if( (fragment_length < ideal && (ideal - fragment_length < wiggle_room)) || (fragment_length > ideal && fragment_length - ideal < wiggle_room) ){
            return true;
        }
        return false;
    }

    function reduce_fragments(s, separator){
        let start = 0,
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
        for(let x=0;x<=start;x++){
            out.push(str_array[x]);
            if(x != str_array.length-1){
            	out.push(separator);
            }
        }
        return out.join("");
    }

    return {
        trim: function(str, options){
            options = options||{};
            
            if(options.min)
                min = options.min;

            if(options.max)
                max = options.max;

            if(options.ideal)
                ideal = options.ideal;
            
            if(options.wiggle_room)
                wiggle_room = options.wiggle_room;

            if(options.optional_delimiters)
                optional_delimiters = options.optional_delimiters;

            let found = null;

            //check for whole sentences first
            found = reduce_fragments(str, '.');
	
            if( close_to_ideal(found.length) ){
                return [found, str.substr(found.length)];
            }else{
                //next, try delimiters
                for(let x=0;x<optional_delimiters.length;x++){
                    let delimiter = optional_delimiters[x];
                    let re = new RegExp(delimiter);
                    if(re.test(found)){
                        let frags = reduce_fragments(found, delimiter);
                        if(close_to_ideal(frags.length)){
                            found = frags;
                            break;
                        }
                    }
                }
                if( close_to_ideal(found.length) ){
                    return [found, str.substr(found.length)];
                }else{
                    //if we can't trim on whole sentences or delimited fragments, try whitespace
                    let whitespace_fragments = reduce_fragments(found, ' ');
                    if(whitespace_fragments.length < max){
                        return [whitespace_fragments, str.substr(whitespace_fragments.length)];
                    }
                }
            }

            //failed to trim
            return [null, str];

        }
    };
})();
