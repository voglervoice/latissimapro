/* jQuery.preloader - v0.97.2 - K Reeve aka BinaryKitten */

(function ($) {
    $.preLoadImages = function(imageList,callback,progress) {
        var pic = [], i, total, loaded = 0;
        if (typeof imageList != 'undefined') {
            if ($.isArray(imageList)) {
                total = imageList.length; // used later
                for (i=0; i < total; i++) {
                    pic[i] = new Image();
                    pic[i].onload = function() {
                        loaded++; // should never hit a race condition due to JS's non-threaded nature

                        // Progress
                        if(progress)
                            progress(loaded / total);

                        if (loaded == total) {
                            if ($.isFunction(callback)) {
                                callback();
                            }
                        }
                    };
                    pic[i].src = imageList[i];
                }
            } else {
                pic[0] = new Image();
                if ($.isFunction(callback)) {
                    pic[0].onload = callback;
                }
                pic[0].src = imageList;
            }
        } else if ($.isFunction(callback)) {
            //nothing passed but we have a callback.. so run this now
            //thanks to Evgeni Nobokov
            callback();
        }
        pic = undefined;
    };

    $.preLoadCSSImages = function(callback,progress) {
        var pic = [], i, imageList = [], loaded = 0, total, regex = /url\((?:"|')?(?!data:)([^)"']+)(?:"|')?\)/i,spl;
        var cssSheets = document.styleSheets, path,myRules='',Rule,match,txt,img,sheetIdx,ruleIdx;
        for (sheetIdx=0;sheetIdx < cssSheets.length;sheetIdx++){
            var sheet = cssSheets[sheetIdx];
            try
            {
                if (typeof sheet.href == 'string' && sheet.href.length > 0) {
                    spl = sheet.href.split('/');spl.pop();path = spl.join('/')+'/';
                } else {
                    path = './';
                }
                if (sheet.cssRules) {
                    myRules = sheet.cssRules;
                } else if (sheet.rules) {
                    myRules = sheet.rules;
                }
                if (myRules.length > 0) {
                    for (ruleIdx=0;ruleIdx<myRules.length;ruleIdx++) {
                        Rule = myRules[ruleIdx];
                        txt = Rule.cssText ? Rule.cssText : Rule.style.cssText;
                        txt = $.trim(txt);
                        if ('@' === txt.substr(0,1)) {
                            continue;
                        }
                        match = regex.exec(txt);
                        if (match != null) {
                            img = match[1];
                            if (img.substring(0,4) == 'http') {
                                imageList[imageList.length] = img;
                            } else if ( match[1].substring(1,2) == '/') {
                                var p2 = path.split('/');p2.pop();p2.pop();p2x = p2.join("/");
                                imageList[imageList.length] = p2x+img;
                            } else {
                                imageList[imageList.length] = path+img;
                            }
                        }
                    };
                }
            }
            catch(error)
            {

            }
        };

        total = imageList.length; // used later
        if (total > 0) {
            for (i=0; i < total; i++) {
                pic[i] = new Image();
                pic[i].onload = pic[i].onerror = function() {
                    loaded++; // should never hit a race condition due to JS's non-threaded nature

                    // Progress
                    if(progress)
                        progress(loaded / total);

                    if (loaded == total) {
                        if ($.isFunction(callback)) {
                            callback();
                        }
                    }
                };
                pic[i].src = imageList[i];
            }
        } else if($.isFunction(callback)) {
            //nothing found, but we have a callback.. so run this now
            //thanks to Evgeni Nobokov
            callback();
        }
    };
    $.preLoadCssImages = $.preLoadCSSImages;

    $.preLoadAllImages = function(imageList,callback) {
        if (typeof imageList != 'undefined') {
            if ($.isFunction(imageList)) {
                callback = imageList;
            } else if (!$.isArray(imageList)) {
                imageList = [imageList];
            }
        }
        $.preLoadCSSImages(function(){
            if (imageList.length > 0) {
                $.preLoadImages(imageList,callback);
            } else {
                callback();
            }
        });
    }
})(jQuery);