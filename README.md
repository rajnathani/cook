cook
====

A BSD licensed open source JavaScript library providing functions to facilitate easier creation of DOM elements, on the browser side.
The API and download links can be found on cook's webpage at [cook.relfor.co](http://cook.relfor.co)

#API

    cook(tag [, first_parameter] [, second_parameter] [, third_parameter])

`tag` represents the html tag, example "span", "div",etc.
`first_parameter` , `second_parameter` , and `third_parameter` can either be any of the following.
**The order of the parameters do NOT matter**

- string: this string will be the inner text of the created node,, customizing how 'text' is interpreted can be modified, more [here](#text-html-config)
Example:


    cook('span', 'hello world')

- array (of nodes): the nodes of the array in order as they are given will be the children, example:


    cook('span', [
        cook('i', 'hello'),
        cook('b', 'world')
    ])

- dictionary:  this dictionary contains details of the created node, which include attributes, properties, events, and more. The keys have the corresponding values, note that the keys are case insensitive:

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
    <td>html</td>
    <td>
        string
    </td>
    <td>
        the value will be the inner html of the node.
    </td>

</tr>
<tr>
    <td>classes</td>
    <td>
        array of strings
    </td>
    <td>
        the created node will have css classes mentioned by the array in the order as given.
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

    cook('div',[
        cook('img', {src:'http://cdn.example.com/logo.png',
                    title: 'Our Logo', alt: 'Image of our Logo',
                    click:function(){lightbox(this.src)}}),
        cook('p', {class:'img-description',
                    text: 'The above image is our current logo.'})]);


##Write even lesser?

Using calls like `cook('span', ...)`, `cook('div', ...)`, `cook('li', ...)` to churn out those html nodes is possible, however would you want to further type lesser and improve readability of your code? Cook can help you here. An html tag represented by cook looks generically like:

    tag(first_parameter, seconds_parameter, third_parameter)

this is equivalent to `cook(tag, first_parameter, second_parameter, third_parameter)`
The html tags which can be represented in the above way are:

    span, div, p, article, section,
    aside, audio, video, figure, caption,
    form , select, option, optgroup,
    button, textarea, ul, ol, li, abbr,
    table, tr, th, thead, tbody, tfoot,
    td, colgroup, blockquote,
    pre, b, i, u, strike, strong, sub, sup,
    a, input, col, link, script, meta, iframe


##Better readability? Aliases

To create a node with a 'u' tag the u() function can be used, li() function for 'li', p() for 'p'. Maybe you want to make your code more readable for yourself and/or for the others who work with it. For this cook.js has aliases to the lowly descriptive tag names like 'a', 'li', 'p', etc. Below is the complete list.

`p(...)` -> `paragraph(...)`
`a(...)` -> `hyperlink(...)`
`b(...)` -> `bold(...)`
`i(...)` -> `underline(...)`
`u(...)` -> `italic(...)`
`li(...)` -> `list_item(...)`


##Let's make life simpler: deeper than html tag functions
So far we have functions as span(), div(), button(), etc. However there are some elements which we create which can be grouped distinctly. For example checkboxes?, wouldn't it be better if we could make a checkbox by having a checkbox() function rather than using input({'type':'checkbox'})? This section is about these types of functions.

    radio(first_parameter, second_parameter, third_parameter)
equivalent to `input(first_parameter, second_parameter, third_parameter)` where the input is of type 'radio'.

    checkbox(first_parameter, second_parameter, third_parameter)
equivalent to `input(first_parameter, second_parameter, third_parameter)` where the input is of type 'checkbox'.

    textinput(first_parameter, second_parameter, third_parameter)
equivalent to `input(first_parameter, second_parameter, third_parameter)` where the input is of type 'textinput'.



#Final notes

##<a name="text-html-config"></a>The text parameter
the 'text' parameter used in functions, eg:cook('span', text),div(text); will make the node have an internal text node of the the value mentioned by the text parameter
Thus if 'text' is specified as 'this is \<b\>important\</b\>', the text will actually be 'this is \<b\>important\</b\>', without the word 'important' boldened. However since one can look at text as a mere subset of innerHTML, cook.js offers you an option to treat this 'text' parameter (not the 'text' key of the details dictionary, this will remain the same) as the node's inner html, which will result in the text looking like 'this is <b>important</b>'.
The top of the cook.js file should have

    /* Config */
        var default_text_not_html = true;
    /* End Config */

As you can see, the default is set to true , you can set this to be false if your preference is to pass in the inner html as the text parameter.

##Make snippets of your code look like html

Given that cook.js offers you a function for every html tag, you can start writing code which looks very similar to html, here is an example:

<table>

<tr>
<th>HTML Code</th>
<th>cook.js</th>

</tr>
<tr>

<td>
<pre>
&lt;div&gt;
  &lt;p&gt;Here are some popular search engines&lt;/p&gt;
  &lt;ul&gt;
    &lt;li&gt;
      &lt;a href=&quot;http://www.google.com&quot;&gt;Google&lt;/a&gt;
    &lt;/li&gt;
    &lt;li&gt;
      &lt;a href=&quot;http://www.bing.com&quot;&gt;Bing&lt;/a&gt;
    &lt;/li&gt;
    &lt;li&gt;
      &lt;a href=&quot;http://www.yahoo.com&quot;&gt;Yahoo&lt;/a&gt;
    &lt;/li&gt;
  &lt;/ul&gt;
&lt;/div&gt;</pre>
</td>
<td>
<pre>
div([
  p('Here are some popular search engines'),
  ul([
    li([
      a('Google', {href:'http://www.google.com'})
    ]),
    li([
      a('Bing', {href:'http://www.bing.com'})
    ]),
    li([
      a('Yahoo', {href:'http://www.yahoo.com'})
    ])
  ])
]);
</pre>

</td>
</tr>
</table>
