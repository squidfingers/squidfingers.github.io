(function(){

    var params = {
        contentId          : 'updates',
        paginatorId        : 'paginator',
        paginatorClassName : 'paginator',
        previousClassName  : 'previous',
        nextClassName      : 'next',
        moreClassName      : 'more',
        moreText           : 'Load More',
        loaderClassName    : 'loader',
        loaderText         : 'Loading...',
        doneClassName      : 'done',
        doneText           : 'Nothing more to see.'
    };

    var content = document.getElementById(params.contentId);
    var paginator = document.getElementById(params.paginatorId);

    if (content && paginator) {

        // hide paginator
        paginator.style.display = 'none';

        // get reference to the next page link
        var next = paginator.querySelector('.' + params.nextClassName + ' a');

        if (next) {
            // create container for new elements and insert before paginator
            var div = document.createElement('div');
            div.className = params.paginatorClassName;
            paginator.parentNode.insertBefore(div, paginator);

            // create more button
            var more = document.createElement('a');
            more.appendChild(document.createTextNode(params.moreText));
            more.className = params.moreClassName;
            more.href = next.href;
            div.appendChild(more);

            // create loader
            var loader = document.createElement('div');
            loader.appendChild(document.createTextNode(params.loaderText));
            loader.className = params.loaderClassName;
            div.appendChild(loader);
            loader.style.display = 'none';

            // add listener to load html pages
            more.addEventListener('click', function(e){
                e.preventDefault();

                // show loader, hide button
                loader.style.display = 'block';
                more.style.display = 'none';

                // make request for next page
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function(){
                    if (xhr.readyState === 4) {// done
                        if (xhr.status === 200) {// ok

                            // hide loader
                            loader.style.display = 'none';

                            // convert response to a document node
                            var parser = new DOMParser();
                            var doc = parser.parseFromString(xhr.responseText, 'text/html');

                            // get content from the next page
                            var docContent = doc.getElementById(params.contentId);
                            if (docContent) {
                                // append content to current page
                                while (docContent.firstElementChild) {
                                    content.appendChild(docContent.firstElementChild);
                                }
                            }

                            // check if there's a link to another page of content
                            var docPaginator = doc.getElementById(params.paginatorId);
                            if (docPaginator) {
                                var docNext = docPaginator.querySelector('.' + params.nextClassName + ' a');
                                if (docNext) {

                                    // update more button with link to the next page
                                    more.style.display = 'block';
                                    more.href = docNext.href;

                                } else {

                                    // (just keep more button hidden)
                                    // create done text
                                    var done = document.createElement('div');
                                    done.appendChild(document.createTextNode(params.doneText));
                                    done.className = params.doneClassName;
                                    div.appendChild(done);
                                }
                            }
                        } else {
                            console.log('XMLHttpRequest Error: ' + xhr.status);
                        }
                    }
                };
                xhr.open('GET', this.href + '?' + new Date().getTime(), true);
                xhr.send();
            }, false);
        }
    }
}());
