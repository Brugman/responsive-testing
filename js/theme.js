let preset             = document.getElementById("js-preset");
let set_preset_buttons = document.querySelectorAll('.js-set-preset');

/**
 * Methods.
 */

function set_preset(new_preset) {
    // abort if we have no new preset or there is no preset element
    if ( new_preset == null || preset == null )
        return;
    // set
    preset.value = new_preset;
    // loop over buttons
    set_preset_buttons.forEach(function(el) {
        // all neutral
        el.classList.remove("active");
        // one active
        if ( el.dataset.preset == new_preset ) {
            el.classList.add("active");
        }
    });
}

/**
 * Runtime.
 */

set_preset( new URLSearchParams( window.location.search ).get('preset') );

/**
 * Events.
 */

set_preset_buttons.forEach(function(el) {
    el.addEventListener('click', function(event) {
        // prevent default
        event.stopPropagation();
        event.preventDefault();
        // set
        set_preset( this.dataset.preset );
        // focus
        document.querySelector('.js-url').focus();
        // clear url
        window.history.replaceState( {}, document.title, '/' );
    });
});

