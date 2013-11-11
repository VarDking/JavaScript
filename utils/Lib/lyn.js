(function (exports, undefined) {
    //<editor-fold desc="string">

    exports.string = {};

    exports.string.format = function () {
        if (!arguments[0]) {
            return "";
        }
        if (arguments.length == 1) {
            return arguments[0];
        }
        else if (arguments.length >= 2) {
            for (var i = 1; i < arguments.length; i++) {
                arguments[0] = arguments[0].replace(new RegExp("\\{" + (i - 1) + "\\}", "gm"), arguments[i]);
            }
            return arguments[0].replace(new RegExp("\\{", "gm"), "{").replace(new RegExp("\\}", "gm"), "}");
        }
    };

    exports.string.fromObj = function (o) {
        var arr = [];
        var fmt = function (s) {
            if (typeof s == 'object' && s != null) {
                if (s.hasOwnProperty("length")) {
                    var retStr = "[";
                    for (var k = 0; k < s.length; k++) {
                        if (k == 0) retStr += exports.string.fromObj(s[k]);
                        else retStr += "," + exports.string.fromObj(s[k]);
                    }
                    return retStr + "]";
                }
                return string.fromObj(s);
            }
            return /^(string|number)$/.test(typeof s) ? '"' + s + '"' : s;
        };
        if (o.hasOwnProperty("length")) {
            return fmt(o);
        } else {
            for (var i in o) {
                arr.push('"' + i + '":' + fmt(o[i]));
            }
            return '{' + arr.join(',') + '}';
        }
    };
    //</editor-fold>

    //<editor-fold desc="array">
    exports.array = {};

    exports.array.contain = function (array, obj) {
        var flag = false;
        for (var i = 0; i < array.length; i++) {
            var item = array[i];
            if (item === obj) {
                flag = true;
            }
        }
        return true;
    };

    exports.array.find = function (array, propertyName, propertyValue) {
        var returnValue = [];
        for (var i = 0; i < array.length; i++) {
            var item = array[i];
            if (item[propertyName] === propertyValue) {
                returnValue.push(item);
            }
        }
        return returnValue;
    };
    //</editor-fold>

    exports.dateTime = {};

    exports.dateTime.format = function (dt, format) {
        var o = {
            "M+": dt.getMonth() + 1, //month
            "d+": dt.getDate(), //day
            "h+": dt.getHours(), //hour
            "m+": dt.getMinutes(), //minute
            "s+": dt.getSeconds(), //second
            "q+": Math.floor((dt.getMonth() + 3) / 3), //quarter
            "S": dt.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (dt.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    };

    exports.dateTime.getNowDateStr = function (format) {
        if (!!format) format = 'yyyy-MM-dd';
        var d = new Date();
        return this.format(d, format);
    }

})(
        typeof exports !== "undefined" ?
            exports :
            lyn = {}
    );

