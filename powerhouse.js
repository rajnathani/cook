"use strict"



function get(to_get){
	if (!to_get){ return false;}
	//Check if its an ID
	if (to_get.slice(0,1) == "#") {
		return document.getElementById(to_get.slice(1));
	}
}


function create_element(tag, element_build_dict){
	var created_node = document.createElement(tag);

    if (element_build_dict != undefined){
        var key,value;
    for (key in element_build_dict) {
        value = element_build_dict[key];
		if (key === "Structure") { created_node.appendChild(value);}
		else if (key === "ID") { created_node.id = value;}
		else if (key === "Class") {add_class(created_node, value);}
		else if (key === "Classes") {
			for(var i=0; i < value.length; i++){
			add_class(created_node(value[i]));
			}
		} else if (key === "Text") { add_text(created_node,value);}
		else{
			this.setAttribute(key, value);
		}
    }
    }
	return created_node;
}

function add_class(node, class_name){
    	node.className += (" " + class_name);
}

function remove_class(node, class_name){
        	node.className = node.className.replace(class_name, '');
        	node.className = node.className.replace((' ' + class_name), '');
        	node.className = node.className.replace((class_name + ' '), '');
}

function has_class(node, class_name){
    	return (node.className.indexOf(class_name) != - 1)
    }

function add_text(node, text){
	node.appendChild(document.createTextNode(text));
}


function get_doc_height() {
    return Math.max(
        Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
        Math.max(document.body.offsetHeight, document.documentElement.offsetHeight),
        Math.max(document.body.clientHeight, document.documentElement.clientHeight)
    );
}

function get_inner_height(){
    return window.innerHeight;
}

function get_scrolled(){
    return Math.max(window.scrollY, document.body.scrollTop);
}


function is_there(val){
	return !(val === "" || val === undefined || val === null);
}

function remove_element(list, item){
	var pos = list.indexOf(item);
	if (pos != -1){
		list.splice(pos,1)
	} return list;
}

function toggle_display(node, display_type){
	if (!is_there(display_type)) display_type = 'block';
	if (is_there(node)){
		if (node.style.display==display_type) node.style.display = 'none';
		else  node.style.display = display_type;
	}
}

function animate_out(delay_length, main, todo){
    var delay = 0;

    if (animationPossible){
        delay = delay_length - 30;
    }
    setTimeout(function(){get('#' + main).remove(); }, delay);
    for (var key in todo){
        var value = todo[key];
        add_class(key,value);
    }
}


