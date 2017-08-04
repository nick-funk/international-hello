# international-hello
Web service written in Go to display Hello, World! in many languages

To win some stickers from a friend, he informed me I had to write a Hello, World application in Go.

Well, I made one. It's a tad more sophisticated than he probably expected, but what's wrong with a bit of overkill?

International Hello is a simple Go web service that does server side templating to allow us to nicely manage script and style templates.

E.g. for the following _index.html_ file

```
<html>
<head>
  {{bundle:styles/bundles/somestyle}}
</head>

...

  {{bundle:scripts/bundles/somescript}}
</html>
```

We have two "bundles" referenced here, which are just markup files we can template insert into the html response within the web service.

An example of these might look like the following.

styles/bundles/somestyle:
```
<link rel="stylesheet" href="/styles/index.css">
```

scripts/bundles/somescript
```
<script type="text/javascript" src="/scripts/vendor/jquery-3.2.1.js"></script>
<script type="text/javascript" src="/scripts/index.js"></script>
```

It's nothing fancy, but it makes for a simple web service that can serve up html, scripts, and styles without repeated references all over your pages.

The rest of the functionality is just done via one source file main.go with a few handler methods.
