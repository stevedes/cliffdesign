<?php snippet('header') ?>
	
<div id="content" role="main">

	<section class="intro">
		<h1><?php echo html($page->title()) ?></h1>
		<?php echo kirbytext($page->text()) ?>
	</section>


	<?php foreach($pages->visible() AS $section) : ?>

		<?php $items = $section->children()->visible(); ?>
		
		<section id="<?php echo $section->fragment() ?>">

			<?php echo kirbytext($section->text()) ?>

			<?php if($items && $items->count()): ?>
				
				<?php foreach($items AS $item): ?>

					<article>
						<h2><?php echo html($item->title()) ?> <em><?php echo html($item->subtitle()) ?></em></h2>
					</article>

				<?php endforeach ?>   
				
			<?php endif ?>
			
		</section>

	<?php endforeach ?>

</div>


<?php snippet('footer') ?>