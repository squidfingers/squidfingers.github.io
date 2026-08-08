.PHONY: serve build clean

serve:
	bin/hugo server --cleanDestinationDir

build:
	bin/hugo --gc --cleanDestinationDir --minify

clean:
	rm -rf public resources target
