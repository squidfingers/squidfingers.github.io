# everythingisabox.com

This site is built with [Hugo](https://gohugo.io/).

## Local development

The development tools (`hugo`, `sass`, and `htmltest`) do not need to be
installed manually. The `bin` directory contains wrapper scripts that download
the pinned version of each tool into `target/bin` the first time they're run,
then invoke it.

- `make serve`: Starts the local Hugo development server with live reload.
- `make build`: Builds the production site into `public/`, then runs `htmltest` against the output.
- `make check`: Runs `htmltest` against the previously built `public/` directory.
- `make clean`: Removes generated output and caches.
