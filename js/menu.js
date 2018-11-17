(function(){
    // Menu Bar & Nav Toggle (see .menu-bar and .main-nav in app.css)
    var mainNav = document.getElementById('main-nav');
    var pageHeader = document.getElementById('page-header');
    if (mainNav && pageHeader) {
        var isNavShowing = false;
        // Add classname to main nav
        mainNav.className += ' main-nav-toggle';// hides nav
        var mainNavClassName = mainNav.className;
        // Create menu toggle
        var menuToggle = document.createElement('a');
        menuToggle.appendChild(document.createTextNode('Menu'));
        menuToggle.href = '#';
        menuToggle.addEventListener('click', function(e){
            e.preventDefault();
            mainNav.className = isNavShowing ? mainNavClassName : mainNavClassName + ' show';
            isNavShowing = ! isNavShowing;
        });
        // Create menu bar
        var menuBar = document.createElement('div');
        menuBar.className = 'menu-bar';
        menuBar.appendChild(menuToggle);
        // Insert menu bar before page header
        pageHeader.parentNode.insertBefore(menuBar, pageHeader);
    }
    /*
    Result:
    <div class="menu-bar"><a href="#">Menu</a></div>
    <header id="page-header"...
    */
}());
