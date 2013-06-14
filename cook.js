var default_text_not_html = true;


var _cook_all_events = ("blur focus focusin focusout load resize scroll unload click dblclick " +
    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    "change select submit keydown keypress keyup error contextmenu dragover dragleave " +
    "dragstart drag dragend animationstart animationend animationiteration").split(" ");

function cook(tag, details) {
    var created_node = document.createElement(tag);

    if (details !== undefined) {
        if (details.substring !== undefined) {
            // element build dict is in this case simply text
            if (default_text_not_html) {
                return add_text(created_node, details);
            } else {
                created_node.innerHTML = details;
                return created_node;
            }
        }
        var key, value;
        for (key in details) {
            value = details[key];

            switch (key.toLowerCase()) {
                case "child":
                    created_node.appendChild(value);
                    break;
                case "children":
                    for (var i = 0; i < value.length; i++) {
                        created_node.appendChild(value[i]);
                    }
                    break;
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
                    if (_cook_all_events.indexOf(key.toLowerCase()) !== -1){
                        created_node['on' + key] = value;
                    }
                    (created_node).setAttribute(key, value);

            }
        }
    }
    return created_node;
}

function add_text(node, text) {
    node.appendChild(document.createTextNode(text));
    return node;
}


var _cook_text_details_html_functions = [
'span','div','p', 'article', 'section', 'aside', 'audio', 'video', 'figure', 'caption', 'form' , 'select', 'option', 'optgroup', 'button', 'textarea', 'ul', 'ol', 'li', 'abbr', 'table', 'tr', 'th', 'thead', 'tbody', 'tfoot', 'td', 'colgroup', 'blockquote', 'pre', 'b','u', 'strike','strong', 'sub', 'sup'];


var html_tag;
for (var i=0;i < _cook_text_details_html_functions.length;i++){
    html_tag = _cook_text_details_html_functions[i];
    console.log(i);
    console.log(html_tag);
    eval("function " + html_tag +"(text, details) { " +
        "if (details) {"+
            "if (details.substring) {"+
                "var middle = details;"+
                "details = text;"+
                "text = middle;"+
            "}"+
            "details.text = text;"+
        "} else {"+
            "details = text"+
        "}"+
        "return cook('" + html_tag + "', details);"+
    "}"

    )
}
/*Sample of text-details html tag cook function below:
function article(text, details) {
    if (details) {
        if (details.substring) {
            var middle = details;
            details = text;
            text = middle;
        }
        details.text = text;
    } else {
        details = text
    }
    return cook('article', details);
}
*/

function i(text, details) {
    if (details) {
        if (details.substring) {
            var middle = details;
            details = text;
            text = middle;
        }
        details.text = text;
    } else {
        details = text
    }
    return cook('i', details);
}


/*Custom html tag cook functions below:*/

function input(details) {
    return cook('input', details);
}

function radio(details) {
    details.type = 'radio';
    return cook('input', details);
}
function checkbox(details) {
    details.type = 'checkbox';
    return cook('input', details);
}






function textinput(details) {
    details.type = "text";
    return cook('input', details)
}




function col(details) {

    return cook('col', details);
}




function a(text, href, details) {
    if (details === undefined) {
        details = {}
    }
    details.text = text;
    details.href = href;
    return cook('a', details);
}

function img(src, details) {
    if (details === undefined) {
        details = {}
    }
    details.src = src;
    return cook('img', details);
}


function script(src, details) {
    if (details === undefined) {
        details = {}
    }
    details.src = src;
    return cook('script', details);
}

function link(href, details) {
    if (details === undefined) {
        details = {}
    }
    details.href = href;
    return cook('link', details);
}

function iframe(src, details) {
    if (details === undefined) {
        details = {}
    }
    details.src = src;
    return cook('iframe', details);
}




var paragraph = p;

var hyperlink = a;

var bold = b;

var italic = i;

var underline = u;


var list_item = li;







