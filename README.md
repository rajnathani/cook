cook
====

A BSD licensed open source JavaScript library providing functions to facilitate easier creation of DOM elements, on the browser side.
The API and download links can be found on cook's webpage at [cook.relfor.co](http://cook.relfor.co)

#API

    cook(tag,details)

tag represents the html tag, example "span", "div",etc. details is either string or an object (dictionary).
- text: cook(tag, details) will create and return node of tag 'tag' with an internal text node of content 'text', customizing how 'text' is interpreted can be modified, more [here](#text-html-config)
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


##Write even lesser?

Using calls like `cook('span', details)`, `cook('div', details)`, `cook('li', details)` to churn out those html nodes is possible, however would you want to further type lesser and improve readability of your code? Cook can help you here. An html tag represented by cook looks generically like:

    tag(first_parameter, seconds_parameter)

where the following is possible
- Only first_parameter is mentioned
In this case first_parameter can be
    - text: text is a string, this will be equivalent to calling `cook(tag, {text:text})` OR simply `cook(tag,text)`
    - details: details is a dictionary, this will be equivalent to calling cook(tag, details)
- Both the first\_parameter and second\_parameter are mentioned
In this case the function can be called in either of these two ways
`tag(text,details)` OR `tag(details,text)`
text is a string representing the internal text node, and details is a dictionary which follows the same rules (for a dictionary) of the details parameter in the function `cook(tag,details)` mentioned above, this would therefore be equivalent to calling `cook(details + {'text':text})` where `details` is a dictionary.

The html tags which can be represented in the above way are:

    span, div, p, article, section,
    aside, audio, video, figure, caption,
    form , select, option, optgroup,
    button, textarea, ul, ol, li, abbr,
    table, tr, th, thead, tbody, tfoot,
    td, colgroup, blockquote,
    pre, b, i, u, strike, strong, sub, sup

The html tags which CANNOT be represented the above way are:

    a, input, col, link, script, meta, iframe

Read the next section to check their APIs.


##Remaining tags?

In the previous section almost every html tag was represented by its own named function, barring the ones below:

    a, input, col, link, script, meta, iframe

The API of the functions of these html tags are as follows:

    a(text,href,details)

in pseudo code this is equivalent to calling cook('a',details + {'text':text, 'href':href}). Obviously dictionary concatenation isn't permitted in javascript! The above translates to the details dictionary being filled in with key 'text' of value text, and key 'href' of value href.

    a(details)

equivalent to calling cook('a', details)

    input(details)

equivalent to calling cook('input', details)

    meta(details)

equivalent to calling cook('meta', details)

    col(details)

equivalent to calling cook('col', details)

    link(href, details)

equivalent to cook('link', details + {'href':href})

    link(details)

equivalent to cook('link', details)

    script(src, details)

equivalent to cook('script', details + {'src':src})

    script(details)

equivalent to cook('script', details)

    iframe(src, details)

equivalent to cook('iframe', details + {'src':src})

    iframe(details)

equivalent to cook('iframe', details)

    img(src, details)

equivalent to cook('img', details + {'src':src})

    img(details)

equivalent to cook('img', details)

##Let's make life simpler: deeper than html tag functions

So far we have functions as span(), div(), button(), etc. However there are some elements which we create which can be grouped distinctly. For example checkboxes?, wouldn't it be better if we could make a checkbox by having a checkbox() function rather than using input({'type':'checkbox'})? This section is about these types of functions.

    radio(details)

equivalent to cook('input', details + {'type':'radio'}) OR input(details + {'type':'radio'})

    checkbox(details)

equivalent to cook('input', details + {'type':'checkbox'}) OR input(details + {'type':'checkbox'})

    textinput(details)

equivalent to cook('input', details + {'type':'text'}) OR input(details + {'type':'text'})

##Some aliases? Better readability?

To create a node with a 'u' tag the u() function can be used, li() function for 'li', p() for 'p'. Maybe you want to make your code more readable for yourself and/or for the others who work with it. For this cook.js has aliases to the lowly descriptive tag names like 'a', 'li', 'p', etc. Below is the complete list.

p() -> paragraph()
a() -> hyperlink()
b() -> bold()
i() -> underline()
u() -> italic()
li() -> list_item()

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
div({'children':[
  p('Here are some popular search engines'),
  ul({'children':[
    li({'child':
      a('Google', 'http://www.google.com')
    }),
    li({'child':
      a('Bing', 'http://www.bing.com')
    }),
    li({'child':
      a('Yahoo', 'http://www.yahoo.com')
    })
  ]})
]);</pre>

</td>
</tr>
</table>
