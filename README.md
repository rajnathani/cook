cook
====

A BSD licensed open source JavaScript library providing functions to facilitate easier creation of DOM elements, on the browser side.  
The API and download links can be found on cook's webpage at [cook.relfor.co](http://cook.relfor.co)

#API

    cook(tag,details)
    
tag represents the html tag, example "span", "div",etc. details is either string or an object (dictionary).
- text: cook(tag, details) will create and return node of tag 'tag' with an internal text node of content 'text', customizing how 'text' is interpreted can be modified, more here  
Example:

    cook('span', 'hello world')

- dictionary: cook(tag, details) will create and return a node of tag 'tag'. The dictionary has keys with corresponding values:

<table>
  <tr>
      <th>
          Key
      </th>
      <th>
          Value
      </th>
      <th>
          Result
      </th>
  </tr>
  <tr>
      <td>text</td>
      <td>string</td>
      <td>the value will be the content of the node's internal text node using cook(tag, {text:value})
          is
          equivalent to cook(tag,value)
      </td>
  
  </tr>
  <tr>
  
      <td>child</td>
      <td>node</td>
      <td>
          the value will be the node's child
      </td>
  
  </tr>
  <tr>
      <td>children</td>
      <td>array of nodes</td>
      <td>
          the nodes will be the created node's children in order as given in the array
      </td>
  
  </tr>
  <tr>
      <td>html</td>
      <td>
          string
      </td>
      <td>
          the value will be the inner html of the node.
      </td>
  
  </tr>
  <tr>
      <td>event</td>
      <td>
          function
      </td>
      <td>
          the value which is a function is attached to the node with the event 'event'<br>
          examples of events: 'click', 'focus', 'keyup',etc.<br>
      </td>
  
  </tr>
  <tr>
      <td>attribute</td>
      <td>
          string
      </td>
      <td>
          the value is set as the value of the attribute 'attribute'<br>
          example: 'title', 'data-timestamp', 'value', 'href',etc.<br>
          any valid attribute for a node with tag 'tag' will work here.
      </td>
  
  </tr>
  
</table>

Example:

    cook('div',{children:[
      cook('img', {src:'http://cdn.example.com/logo.png',
                title: 'Our Logo', alt: 'Image of our Logo',
                click:function(){lightbox(this.src)}}),
      cook('p', {class:'img-description',
                text: 'The above image is our current logo.'})]);

