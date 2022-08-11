window.dom = {
    //create labels
    create(string) {
        const container = document.createElement("template"); //template label can contain all types of labels
        container.innerHTML = string.trim();      //trim the space
        return container.content.firstChild;
    },
    //append a sibling after a node
    after(node1, node2) {
        node1.parentNode.insertBefore(node2, node1.nextSibling); //find the parentNode then call insertBefore
    },
    //append a sibling before a node
    before(node1, node2) {
        node1.parentNode.insertBefore(node2, node1)
    },
    //append a parent node
    wrap(node, parent) {
        dom.before(node, parent)
        dom.append(parent, node)
    },
    //remove a node, and return it
    remove(node){
        node.parentNode.removeChild(node)
        return node
    },
    //remove all childNode, and return them
    empty(node){
        const  list = []
        let temp = node.firstChild
        while(temp){
            list.push(dom.remove(node.firstChild))
            temp = node.firstChild
        }
        return list
    },
    //set or get attribution
    attr(node, attrName, attrValue){ //reload
        if(arguments.length === 3){//three parameters means set
            //eg dom.attr(div,'name','Jeremy') 
            node.setAttribute(attrName, attrValue)
        }else if(arguments.length === 2){//two parameters means get
            //eg dom.attr(div,'name')
            return node.getAttribute(attrName) 
        }
    },
    //set or get text content
    text(node, string){
        if (arguments.length === 2){
            //eg: dom.text(div,'Hello')
            if('innerText' in node){
                node.innerText = string
                }else{
                node.textContent = string
            }
        }else if(arguments.length === 1){
            //eg: dom.text(div)
            if('innerText' in node){
                return node.innerText
                }else{
                return node.textContent
            }
        }
    },
    //set or get HTML content
    html(node, string){
        if (arguments.length === 2){
            //eg: dom.text(div,'<span> Hello </span>')
            node.innerHTML = string
        }else if(arguments.length === 1){
            //eg: dom.text(div,'<span> Hello </span>')
            return node.innerHTML
        }
    },
    //set or get CSS content
    style(node, name, value){
        if(arguments.length === 3){
            //eg: dom.style(div,'color','red')
            node.style[name] = value
        }else if(arguments.length === 2){
            //eg: dom.style(div,'color')
            return node.style[name]
        }else if(name instanceof Object){
            //eg: dom.style(div,{color:'red'})
            const object = name
            for(let key in object){
                node.style[key] = object[key]
            }
        }
    },
    //add, delete or has class
    class: {
        add(node,className){
            node.classList.add(className)
        },
        delete(node,className){
            node.classList.remove(className)
        },
        has(node, className){
            return node.classList.contains(className)
        },
    },
    //add listener
    on(node, eventName, fn){
        //eg: dom.on(test, 'click',fn)
        node.addEventListener(eventName, fn)
    },
    //remove listener
    off(node, eventName, fn){
        //eg: dom.off(test, 'click',fn)
        node.removeEventListener(eventName, fn)
    },
    //get node by selector
        find(selector, scope){ 
            //eg: dom.find('#test') or dom.find('.red',test2)
            return (scope || document).querySelectorAll(selector)
        },
    //get parent node
    parent(node){
        return node.parentNode
    },
    //get children nodes
    children(node){
        return node.children
    },
    //get sibling nodes
    sibling(node){
        return Array.from(node.parentNode.children).filter(n=>n!==node)
    },
    //get next sibling node
    next(node){
        let temp = node.nextSibling
        while(temp && temp.nodeType === 3){
            temp = temp.nextSibling
        }
        return temp;
    },
    //get previous sibling node
    previous(node){
        let temp = node.previousSibling
        while(temp && temp.nodeType === 3){
            temp = temp.previousSibling
        }
        return temp;
    },
    //travel nodes
    each(nodeList, fn){
        for(let i=0;i < nodeList.length;i++){
            fn.call(null,nodeList[i])
        }
    },
    //get node index
    index(node){
        const list = dom.children(node.parent)
        let index
        for(index = 0; index < list.length; index++){
            if(list[index] === node){
                break
            }
        }
        return index;
    }
};