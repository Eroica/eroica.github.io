# Patterns matching CSS files that should be minified. Files with a -min.css
# suffix will be ignored.
CSS_FILES = $(filter-out %.min.css, $(wildcard \
	css/*.css \
	css/**/*.css \
))

CSS_MINIFIED = $(CSS_FILES:.css=.min.css)

# target: minify - Minifies CSS and JS.
minify: minify-css

# target: minify-css - Minifies CSS.
minify-css: $(CSS_FILES) $(CSS_MINIFIED)

%.min.css: %.css
	@echo '==> Minifying $<'
	postcss -u autoprefixer $< > $@
	@echo

# target: clean - Removes minified CSS and JS files.
clean:
	rm -f $(CSS_MINIFIED) $(JS_MINIFIED)

# target: help - Displays help.
help:
	@egrep "^# target:" Makefile