<?php

// get viewport details
$viewports = false;
foreach ( $presets as $preset )
    if ( $preset['key'] == $_GET['preset'] )
        $viewports = $preset['viewports'];

// bad config? return
if ( !$viewports )
{
?>
<script>window.location.replace('/');</script>
<?php
}

// config
$spacing = 30;
$scrollbar_width = 17;
// wrapper width: all columns
$wrapperwidth = 0;
foreach ( $viewports as $width => $name )
    $wrapperwidth += $width + $scrollbar_width;
// wrapper width: in between columns
$wrapperwidth += $spacing * ( count( $viewports ) - 1 );
// wrapper width: padding
$wrapperwidth += $spacing * 2;

?>
<style>
#display { width: <?=$wrapperwidth;?>px; padding: <?=$spacing;?>px; }
.viewports .viewport + .viewport { margin-left: <?=$spacing;?>px; }
</style>

<section id="display">

    <ul class="viewports">

<?php foreach ( $viewports as $width => $name ): ?>

        <li class="viewport" style="width: <?=$width + $scrollbar_width;?>px;">

            <div class="title"><?=$name;?> (<?=$width;?>px)</div>

            <iframe src="<?=$_GET['url'];?>"></iframe>

        </li>

<?php endforeach; ?>

    </ul>

</section><!-- display -->

