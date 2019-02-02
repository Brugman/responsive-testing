(function($) {

    /**
     * Methods.
     */

    function set_preset( preset ) {
        $('.js-preset').val( preset );
    }

    function show_preset( preset ) {
        $('.js-set-preset').removeClass('active');
        $('.js-set-preset[data-preset='+preset+']').addClass('active');
    }

    /**
     * Runtime.
     */

    var urlparams = new URLSearchParams( window.location.search );
    var urlpreset = urlparams.get('preset');
    if ( urlpreset != null ) {
        show_preset( urlpreset );
        set_preset( urlpreset );
    }

    /**
     * Triggers.
     */

    $('.js-set-preset').on( 'click', function ( event ) {
        // prevent default
        event.stopPropagation();
        event.preventDefault();
        // get
        var preset = $( this ).data('preset');
        // show
        show_preset( preset );
        // set
        set_preset( preset );
        // focus
        $('.js-url').focus();
        // clear url
        window.history.replaceState( {}, document.title, '/' );
    });

})( jQuery );