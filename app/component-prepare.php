<section id="prepare">

        <h1>Responsive Testing 3: Test with a vengeance</h1>

        <h2>Choose a preset</h2>

<?php if ( !empty( $presets ) ): ?>

        <ul class="presets">

<?php foreach ( $presets as $preset ): ?>

            <li class="preset">
                <a href="#" class="js-set-preset" data-preset="<?=$preset['key'];?>">
                    <div class="name"><?=$preset['name'];?></div>
<?php if ( !empty( $preset['viewports'] ) ): ?>
                    <table class="viewports">
<?php foreach ( $preset['viewports'] as $width => $name ): ?>
                        <tr>
                            <td><?=$name;?></td>
                            <td><?=$width;?>px</td>
                        </tr>
<?php endforeach; // $preset['viewports'] ?>
                    </table>
<?php endif; // $preset['viewports'] ?>
                </a>
            </li>

<?php endforeach; // $presets ?>

        </ul>

<?php else: // $presets is empty ?>

        <p>No presets found.</p>

<?php endif; // $presets ?>

        <h2>Enter a URL</h2>

        <form id="" class="" action="/" method="get" role="form">

            <input type="hidden" name="preset" class="js-preset" value="">

            <input type="text" name="url" class="url js-url" value="<?=( $_GET['url'] ?? '' );?>" required>

        </form>

</section><!-- replaceme -->

