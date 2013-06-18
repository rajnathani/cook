/* Config */
var default_text_not_html = true;
/* End Config */

var _cook_all_events = ("blur focus focusin focusout load resize scroll unload click dblclick " +
    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    "change select submit keydown keypress keyup error contextmenu dragover dragleave " +
    "dragstart drag dragend animationstart animationend animationiteration").split(" ");




function _distinguishThreeParameter(parameter_list) {
    var dict = {};
    var par;
    for (var j = 0; j < parameter_list.length; j++) {
        par = parameter_list[j];
        if (_isString(par)) {
            dict.text = par;
        } else if (_isArray(par)) {
            dict.children = par;
        } else if (par !== undefined) {
            dict.details = par;
        }
    }
    return dict;
}

function _isArray(obj) {
    return  Object.prototype.toString.call(obj) === '[object Array]';
}

function _isString(obj) {
    return obj !== undefined && obj.substring;
}

function _isDictionary(obj) {
    return obj !== undefined && !_isArray(obj) && !_isString();
}

function cook(tag, first_parameter, second_parameter, third_parameter) {

    var par_dict = _distinguishThreeParameter([first_parameter, second_parameter, third_parameter]);
    var text = par_dict.text;
    var children = par_dict.children;
    var details = par_dict.details;

    var created_node = document.createElement(tag);

    if (text !== undefined) {
        if (default_text_not_html) {
            add_text(created_node, text);
        } else {
            created_node.innerHTML = text;
        }
    }

    if (details !== undefined) {
        var key, value;
        for (key in details) {
            value = details[key];

            switch (key.toLowerCase()) {

                case "classes":
                    for (var j = 0; j < value.length; j++) {
                        created_node.className += value[j] + ' ';
                    }
                    break;
                case "text":
                    add_text(created_node, value);
                    break;
                case 'html':
                    created_node.innerHTML = value;
                    break;

                case 'value':
                    created_node.value = value;
                    break;

                default :
                    if (_cook_all_events.indexOf(key.toLowerCase()) !== -1) {
                        created_node['on' + key] = value;
                    } else {
                        (created_node).setAttribute(key, value);
                    }

            }
        }
    }
    if (children !== undefined) {
        for (var c = 0; c < children.length; c++) {
            created_node.appendChild(children[c]);
        }
    }
    return created_node;
}

function add_text(node, text) {
    node.appendChild(document.createTextNode(text));
    return node;
}


var _cook_text_details_html_functions = [
    'span', 'div', 'p', 'article', 'section', 'aside', 'audio', 'video', 'figure', 'caption', 'form' , 'select', 'option', 'optgroup', 'button', 'textarea', 'ul', 'ol', 'li', 'abbr', 'br', 'hr', 'table', 'tr', 'th', 'thead', 'tbody', 'tfoot', 'td', 'colgroup', 'blockquote', 'pre', 'b', 'u', 'strike', 'strong', 'sub', 'sup', 'a', 'col', 'img', 'script', 'link', 'meta', 'iframe', 'input'];


var html_tag;
for (var i = 0; i < _cook_text_details_html_functions.length; i++) {
    html_tag = _cook_text_details_html_functions[i];

    eval("function " + html_tag + "(first_parameter,second_parameter,third_parameter) { " +
        "return cook('" + html_tag + "', first_parameter,second_parameter,third_parameter);" +
        "}"

    )
}
/*Sample of text-details html tag cook function below:
 function article(first_parameter,second_parameter,third_parameter) {
 return cook('article', first_parameter,second_parameter,third_parameter);
 }
 */

function i(first_parameter, second_parameter, third_parameter) {
    return cook('i', first_parameter, second_parameter, third_parameter);
}


/*Custom html tag cook functions below:*/

var _cook_form_func_name, _cook_form_type;
var _cook_extra_form_functions = [
    ['radio', 'radio'],
    ['checkbox', 'checkbox'],
    ['textinput', 'text']
];

for (var m = 0; m < _cook_extra_form_functions.length; m++) {
    _cook_form_func_name = _cook_extra_form_functions[m][0];
    _cook_form_type = _cook_extra_form_functions[m][1];
    eval("function " + _cook_form_func_name + "(first_parameter,second_parameter,third_parameter) {" +
        "if (_isDictionary(first_parameter)){" +
        "    first_parameter.type = '" + _cook_form_type + "';" +
        "} else if(_isDictionary(second_parameter)) {" +
        "    second_parameter.type = '" + _cook_form_type + "';" +
        "} else if (_isDictionary(third_parameter)) {" +
        "    third_parameter.type = '" + _cook_form_type + "';" +
        "} else if (first_parameter === undefined) {" +
        "    first_parameter = {type:'" + _cook_form_type + "'};" +
        "} else if (second_parameter === undefined) {" +
        "    second_parameter = {type:'" + _cook_form_type + "'}" +
        "} else {" +
        "    third_parameter = {type:'" + _cook_form_type + "'}" +
        "}" +
        "return cook('input', first_parameter,second_parameter,third_parameter);}"
    );
}


var paragraph = p;

var hyperlink = a;

var bold = b;

var italic = i;

var underline = u;


var list_item = li;






