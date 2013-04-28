"use strict";

function power(tag, element_build_dict) {
    var created_node = document.createElement(tag);

    if (element_build_dict != undefined) {
        if (element_build_dict.substring !== undefined){
            // element build dict is in this case simply text
            return add_text(created_node, element_build_dict);
        }
        var key, value;
        for (key in element_build_dict) {
            value = element_build_dict[key];
            if (key === "Child") {
                created_node.appendChild(value);
            }
            else if (key === "ID") {
                created_node.id = value;
            }
            else if (key === "Class") {
                created_node.className =  value;
            }
            else if (key === "Classes") {
                for (var i = 0; i < value.length; i++) {
                    created_node.className += value[i];
                }
            } else if (key === "Text") {
                add_text(created_node, value);
            } else if (key === 'html'){
                created_node.innerHTML = value;
            } else if(key==='value'){
                created_node.value =value;
            }
            else if (key === 'click'){
                created_node.onclick = value;
            } else if (key === 'keydown'){
                created_node.onkeydown = value;
            } else if (key === 'keyup'){
                created_node.onkeyup = value;
            } else if (key === 'keypress'){
                created_node.onkeypress = value;
            } else if (key === 'mouseover'){
                created_node.onmouseover = value;
            } else if (key === 'mouseout'){
                created_node.onmouseout = value;
            } else if (key === 'mousedown'){
                created_node.onmousedown = value;
            }
            else if (key === 'submit'){
                created_node.onsubmit = value;
            }
            else {
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

