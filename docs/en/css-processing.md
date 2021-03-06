<p align="right">
English description | <a href="../ru/css-processing.md">Описание на русском</a>
</p>

# CSS

You can use folow css-preprocessors:
* [scss](http://sass-lang.com) .sass extension is supported;
* [less](http://www.lesscss.ru);
* [stylus](http://learnboost.github.io/stylus)  

You can choose css-preprocessor in [tars-config.js](options.md#csspreprocessor).

In general, there are no surprises when using css-preprocessor. Use all the possibilities offered by the selected tool.

If you are used to the usual css, you can use css-syntax in any preprocessor.

All files with _ prefix won't be compiled by builder. You can use these files for importing. Actually, you can import all files, what you want, but if you include file without _ you will have two copies in compiled css-file. So, with is the reason, why files with _ prefix won't be compiled. You can import all type of styles files: scss (sass), less, styl, css.
Example of import using (scss):

```scss
// files are located in one directory
@import '_partial.scss';

// _partial.sass is located in neighbour directory partials
@import '../partials/_partial.sass';
```

If you want to include the files from the static directory (pictures), you must use the placeholder %=static=% (value of the placeholder is adjusted in the [tars-config.js](options.md#staticprefixforcss)). Then including of the image as a background (the picture will be taken from your main module) will be as follows (in this example scss is used):

```scss
.main {
    background: url('%=static=%assets/main/bg.png') repeat;
}
```

**%=staticPrefixForCss=% prefix works, but this prefix is depricated! Use just %=static=% or \_\_static\_\_!**

There are a couple of points on the organization scss|less|styl-files (scss is selected):

* Each module has its own css-representation.
* Common styles for the project is recommended to put in common.scss in static/scss
* Included fonts' styles is in fonts.scss
* Mixins are in mixins.scss
* UI-elements styles are in GUI.scss
* Variables are in vars.scss
* Libraries styles are in static/scss/libraries (may contains sub-folders and css-files).
* Styles for plugins are in static/scss/plugins (may contains sub-folders and css-files).
* Styles that we don't now where determine have to be put in static/scss/etc/etc.{scss,css}.
* In the main folder with css (in this case, scss folder) you can not create new files (except when you correct task by yourselves connected with working with css). New files can be created only in the static/scss/plugins and libraries.

Union of styles will be in the following order:
* Normalize
* Styles for libraries
* Mixins, sprites
* Fonts
* Vars
* GUI
* Common stylies (common.scss)
* Styles for plugins (static/scss/plugins, including all subdirectories)
* Modules' styles (css is supported)
* Styles of etc.{scss,css}

For IE8 and IE9 you can add fixes in a folder in the ie module folder. You need to create ie8.{scss,css} or ie9.{scss,css}.

Also, you can use css-files and not to include them to bundle. There is folder separate-css in static/scss, where you can store all files, which have to be included manually. There is an example of including in any template:

```handlebars
<link href="%=static=%css/separate-css/your-file.css" rel="stylesheet" type="text/css">
```

**%=staticPrefix=% prefixe works, but this prefixe is depricated! Use just %=static=% or \_\_static\_\_!**
