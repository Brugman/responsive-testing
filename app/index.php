<?php

include 'config.php';

$state = 'display';
if ( empty( ( $_GET['preset'] ?? '' ) ) || empty( ( $_GET['url'] ?? '' ) ) )
    $state = 'prepare';

include 'core-head.php';

include 'component-'.$state.'.php';

include 'core-foot.php';

