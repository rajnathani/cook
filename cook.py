import re


buf = '''
var _cook_all_events = ("blur focus focusin focusout load resize scroll unload click dblclick " +
    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    "change select submit keydown keypress keyup error contextmenu dragover dragleave " +
    "dragstart drag dragend animationstart animationend animationiteration").split(" ");

var _cook_$ = window.$ && (($ === window.jQuery) || ($ === window.Zepto));

function _distin3Ps(parameter_list) {
    var dict = {};
    var par;
    for (var j = 0; j < parameter_list.length; j++) {
        par = parameter_list[j];
        if (_isString(par) || typeof par === 'number') {
            dict.text = par;
        } else if (_isArray(par)) {
            dict.children = par;
        } else if (par !== undefined) {
            dict.details = par;
        }
    }
    return dict;
}

var cook_event = {
        GUID: 1,
        add: function (element, type, handler) {
            if (_cook_$) {
                $(element).on(type, handler);
            }
            else if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else {
                if (!handler.$$guid) handler.$$guid = cook_event.event.GUID++;
                if (!element.events) element.events = {};
                var handlers = element.events[type];
                if (!handlers) {
                    handlers = element.events[type] = {};
                    if (element["on" + type]) {
                        handlers[0] = element["on" + type];
                    }
                }
                handlers[handler.$$guid] = handler;
                element["on" + type] = this.handle;
            }
        },
        remove: function (element, type, handler) {
            if (_cook_$) {
                $(element).off(type, handler);
            }
            else if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else {
                if (element.events && element.events[type]) {
                    delete element.events[type][handler.$$guid];
                }
            }
        },
        handle: function (event) {
            var returnValue = true;
            event = event || cook_event.fix(((this.ownerDocument || this.document || this).parentWindow || window).event);
            var handlers = this.events[event.type];
            for (var i in handlers) {
                this.$$handleEvent = handlers[i];
                if (this.$$handleEvent(event) === false) {
                    returnValue = false;
                }
            }
            return returnValue;
        },
        fix: function (event) {
            event.preventDefault = cook_event.fix_preventDefault;
            event.stopPropagation = cook_event.fix_stopPropagation;
            return event;
        },
        fix_preventDefault: function () {
            this.returnValue = false;
        },
        fix_stopPropagation: function () {
            this.cancelBubble = true;
        }
};

function _isArray(obj) {
    return  Object.prototype.toString.call(obj) === '[object Array]';
}

function _isString(obj) {
    return obj !== undefined && obj.substring;
}

function _isObj(obj) {
    return obj !== undefined && !_isArray(obj) && !_isString();
}

function cook(tag, first_parameter, second_parameter, third_parameter) {

    var par_dict = _distin3Ps([first_parameter, second_parameter, third_parameter]);
    var text = par_dict.text;
    var children = par_dict.children;
    var details = par_dict.details;

    var created_node = document.createElement(tag);

    if (text !== undefined) {
        if (default_text_not_html) {
            _add_text(created_node, text);
        } else {
            created_node.innerHTML = text;
        }
    }

    if (details !== undefined) {
        var k, v, i, j;
        for (k in details) {
            if (!details.hasOwnProperty(k)) {
                continue;            
            }
            v = details[k];

            switch (k.toLowerCase()) {

                case "classes":
                    for (j = 0; j < v.length; j++) {
                        created_node.className += v[j] + ' ';
                    }
                    break;
                case "text":
                    _add_text(created_node, v);
                    break;
                case 'html':
                    created_node.innerHTML = v;
                    break;
              
                default :
                    if (_cook_all_events.indexOf(k.toLowerCase()) !== -1) {
                        v = v instanceof Array ? v : [v]; 
                        for (j=0; j<v.length; j++) {
                            cook_event.add(created_node, k, v[j])
                        }
                    } else {
                        (v || v === false || v === '' || v === 0 ) && (created_node).setAttribute(k, v);
                    }

            }
        }
    }
    if (children !== undefined) {
        var frag = document.createDocumentFragment();
        for (var c = 0; c < children.length; c++) {
            children[c] && frag.appendChild(children[c]);
        }
        created_node.appendChild(frag);
    }
    return created_node;
}

function _add_text(node, text) {
    node.appendChild(document.createTextNode(text));
    return node;
}
'''

if __name__ == '__main__':
    cook_text_details_html_functions = [
        'span', 'div', 'p', 'article', 'section', 'aside', 'audio', 'video', 'figure', 'caption', 'form' , 'select', 'option', 'optgroup', 'button', 'textarea', 'ul', 'ol', 'li', 'abbr', 'br', 'hr', 'table', 'tr', 'th', 'thead', 'tbody', 'tfoot', 'td', 'colgroup', 'blockquote', 'pre', 'b', 'u', 'strike', 'strong', 'sub', 'sup', 'a', 'col', 'img', 'script', 'link', 'meta', 'iframe', 'input','label', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']


    for cur in cook_text_details_html_functions:
        buf += "function {0}(a,b,c){{return cook('{0}',a,b,c);}}".format(cur)

    

    cook_extra_form_functions = [('radio', 'radio'),('checkbox', 'checkbox'),('textinput', 'text')]

    for func_name,form_type in cook_extra_form_functions: 

        buf += '''function {0}(a,b,c) {{ 
            if (_isObj(a)){{a.type = '{1}'}}
            else if(_isObj(b)) {{b.type = '{1}'}}
            else if (_isObj(c)) {{c.type = '{1}'}}
            else if (a === undefined) {{a = {{type:'{1}'}}}}
            else if (b === undefined) {{b = {{type:'{1}'}}}}
            else {{c = {{type:'{1}'}}}}
            return cook('input',a,b,c)}}
            '''.format( func_name, form_type)
   
    
    f = open('cook.semi.js', 'w')
    f.write(buf)
    f.close()
    import os
    minified = os.popen('uglifyjs cook.semi.js -c -m').read()



    minified = '''
/* Config */
var default_text_not_html = false;
/* End Config */\n\n''' + minified

    f = open('cook.js', 'w')
    f.write(minified)
    f.close()




    