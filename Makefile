.PHONY: help serve build check clean deep-clean

help:
	@echo "Targets:"
	@echo "  serve         Starts the local Hugo development server with live reload."
	@echo "  build         Builds the production site into public/, then runs htmltest against the output."
	@echo "  check         Same as build; alias."
	@echo "  clean         Removes Hugo generated output and caches."
	@echo "  deep-clean    Removes all generated output, caches, and build tools."

serve:
	bin/hugo server --cleanDestinationDir

build:
	bin/hugo --gc --cleanDestinationDir --minify
	bin/htmltest

check: build

clean:
	rm -rf public resources .hugo_build.lock

deep-clean:
	rm -rf public resources target tmp .hugo_build.lock
