function cook(tag, element_build_dict) {
    var created_node = document.createElement(tag);

    if (element_build_dict != undefined) {
        if (element_build_dict.substring !== undefined) {
            // element build dict is in this case simply text
            return add_text(created_node, element_build_dict);
        }
        var key, value;
        for (key in element_build_dict) {
            value = element_build_dict[key];

            switch (key.toLowerCase()) {
                case "child":
                    created_node.appendChild(value);
                    break;
                case "classes":
                    for (var i = 0; i < value.length; i++) {
                        created_node.className += value[i] + ' ';
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