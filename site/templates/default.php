<?php snippet('header') ?>
<?php snippet('navigation') ?>

	
<div role="main">

	<h1><?php echo html($page->title()) ?></h1>
	<?php echo kirbytext($page->text()) ?>

</div>


<?php snippet('footer') ?>