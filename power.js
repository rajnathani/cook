"use strict";

function power(tag, element_build_dict) {
    var created_node = document.createElement(tag);

    if (element_build_dict != undefined) {
        if (element_build_dict.substring !== undefined) {
            // element build dict is in this case simply text
            return add_text(created_node, element_build_dict);
        }
        var key, value;
        for (key in element_build_dict) {
            value = element_build_dict[key];

            switch (key) {
                case "Child":
                    created_node.appendChild(value);
                    break;
                case "ID":
                    created_node.id = value;
                    break;
                case "Class":
                    created_node.className = value;
                    break;
                case "Classes":
                    for (var i = 0; i < value.length; i++) {
                        created_node.className += value[i];
                    }
                    break;
                case "Text":
                    add_text(created_node, value);
                    break;
                case 'html':
                    created_node.innerHTML = value;
                    break;

                case 'value':
                    created_node.value = value;
                    break;
                case 'click':
                    created_node.onclick = value;
                    break;
                case 'keydown':
                    created_node.onkeydown = value;
                    break;
                case 'keyup':
                    created_node.onkeyup = value;
                    break;
                case 'keypress':
                    created_node.onkeypress = value;
                    break;
                case 'mouseover':
                    created_node.onmouseover = value;
                    break;
                case 'mouseout':
                    created_node.onmouseout = value;
                    break;
                case 'mousedown':
                    created_node.onmousedown = value;
                    break;

                case 'submit':
                    created_node.onsubmit = value;
                    break;
                default :
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

