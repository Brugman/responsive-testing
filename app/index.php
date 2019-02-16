<?php

$config_file         = dirname( __FILE__ ).'/config.php';
$config_example_file = dirname( __FILE__ ).'/config-example.php';

if ( !file_exists( $config_file ) && file_exists( $config_example_file ) )
    copy( $config_example_file, $config_file );

include $config_file;

$state = 'display';
if ( empty( ( $_GET['preset'] ?? '' ) ) || empty( ( $_GET['url'] ?? '' ) ) )
    $state = 'prepare';

include 'core-head.php';

include 'component-'.$state.'.php';

include 'core-foot.php';

