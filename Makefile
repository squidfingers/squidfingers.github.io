.PHONY: serve build check clean

serve:
	bin/hugo server --cleanDestinationDir

build:
	bin/hugo --gc --cleanDestinationDir --minify
	bin/htmltest

check:
	bin/htmltest

clean:
	rm -rf public resources target tmp .hugo_build.lock
