
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

                case 'value':
                    created_node.value = v;
                    break;

                default :
                    if (_cook_all_events.indexOf(k.toLowerCase()) !== -1) {
                        v = v instanceof Array ? v : [v]; 
                        for (j=0; j<v.length; j++) {
                            cook_event.add(created_node, k, v[j])
                        }
                    } else {
                        (v || v === false || v === '' ) && (created_node).setAttribute(k, v);
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
function span(a,b,c){return cook('span',a,b,c);}function div(a,b,c){return cook('div',a,b,c);}function p(a,b,c){return cook('p',a,b,c);}function article(a,b,c){return cook('article',a,b,c);}function section(a,b,c){return cook('section',a,b,c);}function aside(a,b,c){return cook('aside',a,b,c);}function audio(a,b,c){return cook('audio',a,b,c);}function video(a,b,c){return cook('video',a,b,c);}function figure(a,b,c){return cook('figure',a,b,c);}function caption(a,b,c){return cook('caption',a,b,c);}function form(a,b,c){return cook('form',a,b,c);}function select(a,b,c){return cook('select',a,b,c);}function option(a,b,c){return cook('option',a,b,c);}function optgroup(a,b,c){return cook('optgroup',a,b,c);}function button(a,b,c){return cook('button',a,b,c);}function textarea(a,b,c){return cook('textarea',a,b,c);}function ul(a,b,c){return cook('ul',a,b,c);}function ol(a,b,c){return cook('ol',a,b,c);}function li(a,b,c){return cook('li',a,b,c);}function abbr(a,b,c){return cook('abbr',a,b,c);}function br(a,b,c){return cook('br',a,b,c);}function hr(a,b,c){return cook('hr',a,b,c);}function table(a,b,c){return cook('table',a,b,c);}function tr(a,b,c){return cook('tr',a,b,c);}function th(a,b,c){return cook('th',a,b,c);}function thead(a,b,c){return cook('thead',a,b,c);}function tbody(a,b,c){return cook('tbody',a,b,c);}function tfoot(a,b,c){return cook('tfoot',a,b,c);}function td(a,b,c){return cook('td',a,b,c);}function colgroup(a,b,c){return cook('colgroup',a,b,c);}function blockquote(a,b,c){return cook('blockquote',a,b,c);}function pre(a,b,c){return cook('pre',a,b,c);}function b(a,b,c){return cook('b',a,b,c);}function u(a,b,c){return cook('u',a,b,c);}function strike(a,b,c){return cook('strike',a,b,c);}function strong(a,b,c){return cook('strong',a,b,c);}function sub(a,b,c){return cook('sub',a,b,c);}function sup(a,b,c){return cook('sup',a,b,c);}function a(a,b,c){return cook('a',a,b,c);}function col(a,b,c){return cook('col',a,b,c);}function img(a,b,c){return cook('img',a,b,c);}function script(a,b,c){return cook('script',a,b,c);}function link(a,b,c){return cook('link',a,b,c);}function meta(a,b,c){return cook('meta',a,b,c);}function iframe(a,b,c){return cook('iframe',a,b,c);}function input(a,b,c){return cook('input',a,b,c);}function label(a,b,c){return cook('label',a,b,c);}function h1(a,b,c){return cook('h1',a,b,c);}function h2(a,b,c){return cook('h2',a,b,c);}function h3(a,b,c){return cook('h3',a,b,c);}function h4(a,b,c){return cook('h4',a,b,c);}function h5(a,b,c){return cook('h5',a,b,c);}function h6(a,b,c){return cook('h6',a,b,c);}function radio(a,b,c) { 
            if (_isObj(a)){a.type = 'radio'}
            else if(_isObj(b)) {b.type = 'radio'}
            else if (_isObj(c)) {c.type = 'radio'}
            else if (a === undefined) {a = {type:'radio'}}
            else if (b === undefined) {b = {type:'radio'}}
            else {c = {type:'radio'}}
            return cook('input',a,b,c)}
            function checkbox(a,b,c) { 
            if (_isObj(a)){a.type = 'checkbox'}
            else if(_isObj(b)) {b.type = 'checkbox'}
            else if (_isObj(c)) {c.type = 'checkbox'}
            else if (a === undefined) {a = {type:'checkbox'}}
            else if (b === undefined) {b = {type:'checkbox'}}
            else {c = {type:'checkbox'}}
            return cook('input',a,b,c)}
            function textinput(a,b,c) { 
            if (_isObj(a)){a.type = 'text'}
            else if(_isObj(b)) {b.type = 'text'}
            else if (_isObj(c)) {c.type = 'text'}
            else if (a === undefined) {a = {type:'text'}}
            else if (b === undefined) {b = {type:'text'}}
            else {c = {type:'text'}}
            return cook('input',a,b,c)}
            