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

							<div class="contents">
								
								<?php

								echo '<h2>' . html($item->title()). ' <em>' . html($item->subtitle()) . '</em></h2>';
								echo kirbytext($item->text());

								// are panels?
								$panels = $item->children()->visible();

								if($panels && $panels->count()) {
									
									foreach($panels AS $panel) {

										$classes = array();

										$classes[] = 'align-' . $panel->align();

										if ($panel->text() == '') {
											$classes[] = 'notext';
										}
										$classes[] = 'images-' . $panel->images()->count();
		
										echo '<div class="' . implode(' ', $classes) . '">';

										echo kirbytext($panel->text());

										if($panel->hasImages()) {

											foreach($panel->images() as $image) {
												echo '<figure><img src="' . $image->url() . '" /></figure>';
											}

										}

										echo '</div>';
									}

								}

								?>
			
							</div>

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

	<div id="scrollfix"></div>
</div>


<?php snippet('footer') ?>