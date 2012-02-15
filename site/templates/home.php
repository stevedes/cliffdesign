<?php snippet('header') ?>
<?php snippet('navigation') ?>

	
<div role="main">

	<?php foreach($pages->visible() AS $section) : ?>

		<?php $items = $section->children()->visible(); ?>
		
		<section id="<?php echo $section->fragment() ?>">

			<?php echo kirbytext($section->text()) ?>

			<?php if($items && $items->count()): ?>
				
				<?php foreach($items AS $item): ?>

					<article>
						<h1><?php echo html($item->title()) ?></h1>
					</article>

				<?php endforeach ?>   
				
			<?php endif ?>
			
		</section>

	<?php endforeach ?>

</div>


<?php snippet('footer') ?>