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
					
					<?php if($section->fragment() == 'portfolio'): ?>

						<article>
							
							<?php $cover = $item->images()->find('cover.jpg') ?>
							<?php if ($cover) : ?>
							<figure>
								<img src="<?php echo $cover->url() ?>" />
							</figure>
							<?php endif ?>

							<h2><?php echo html($item->title()) ?> <em><?php echo html($item->subtitle()) ?></em></h2>
							<?php echo kirbytext($item->text()) ?>

							<?php $panels = $item->children()->visible(); ?>
							<?php if($panels && $panels->count()): ?>
								<?php foreach($panels AS $panel): ?>
									<?php echo kirbytext($panel->text()) ?>
								<?php endforeach ?>
							<?php endif; ?>

						</article>

					<?php elseif($section->fragment() == 'services'): ?>
						
						<article class="<?php echo $item->fragment() ?>">
							<h2><?php echo html($item->title()) ?></h2>
							<?php echo kirbytext($item->text()) ?>
						</article>

					<?php endif; ?>

					

				<?php endforeach ?>   
				
			<?php endif ?>
			
		</section>

	<?php endforeach ?>

</div>


<?php snippet('footer') ?>