<p align="right">
English description | <a href="../ru/handlebars-helpers.md">Описание на русском</a>
</p>

# Handlebars-helpers

There are some usefull built-in helpers. You can add your own helpers to /tars/user-tasks/html/helpers/handlebars-helpers. It is not necessary to register your helpers. You just have to add them to exported object "handlebarsHelpers" as a function. All custom (user's) helpers will be available in tempalates automatically. Besides, all custom helpers will be moved automatically after update of your project via TARS-CLI.

Let's describe built-in helpers.

## repeat

It is used to create a simple loop from 0 to n.

There is is syntax:

```handlebars
{{#repeat n}}
    Do something
{{/repeat}}
```

n — is a number of repetitions. Number, integer.


## is

It is used to extend the standard if. Built if is able to check only a value exist or not. #is allows you to use the default behavior if. The comparison operation is passed as a string as the second argument. The comparison values are passed as a string as the first and third arguments. Following operations are available (all operations are performed in JavsScript, respectively, and the comparison result is obtained in the same way as if it were if inside js):

* `==` Not strict equality.
* `===` Strict equality.
* `>` Strict greater.
* `>=` Greater or equal.
* `<` Strictly less.
* `<=` Less or equal.
* `!=` Not strict inequality.
* `!==` Strict inequality.

test is the variable passed to the template.

```js
testModule: {
    test: 10
}
```

There is is syntax:

```handlebars
{{#is test '>' 9}}
    true
{{else}}
    false
{{/is}}
```


## strip

It cuts all spaces from the passed content.

There is is syntax:

```handlebars
<style>
    ul li {
        display: inline-block;
    }
</style>

{{#strip}}
    <ul>
        <li>qwe</li>
        <li>asd</li>
    </ul>
{{/strip}}
```

Result:

```html
<ul><li>qwe</li><li>asd</li></ul>
```


## toLowerCase

Transform passed string to lowercase.

There is is syntax:

```handlebars
{{toLowerCase 'string'}}
```


## toUpperCase

Transform passed string to uppercase.

There is is syntax:

```handlebars
{{toUpperCase 'string'}}
```


## capitalizeFirst

Transform of the first character of passed string to uppercase.

There is is syntax:

```handlebars
{{capitalizeFirst 'string'}}
```

## formatDate, now, i18n

Additional helpers. Docs are in https://github.com/assemble/handlebars-helpers