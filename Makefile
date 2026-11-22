.PHONY: help serve build clean deep-clean

help:
	@echo "Targets:"
	@echo "  serve         Starts the local Hugo development server with live reload."
	@echo "  build         Builds the production site into public/, then runs htmltest against the output."
	@echo "  clean         Removes Hugo generated output and caches."
	@echo "  deep-clean    clean, plus downloaded tools and htmltest cache."

serve:
	bin/hugo server --cleanDestinationDir --buildFuture

build:
	bin/hugo --gc --cleanDestinationDir --minify
	bin/htmltest

clean:
	rm -rf public resources .hugo_build.lock

deep-clean: clean
	rm -rf target tmp
