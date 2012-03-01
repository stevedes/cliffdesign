<?php snippet('header') ?>
	
<div id="content" role="main">

	<section id="intro">
		
		<?php echo kirbytext($page->text()) ?>
	</section>


	<?php foreach($pages->visible() AS $section) : ?>

		<?php $items = $section->children()->visible(); ?>
		
		<section id="<?php echo $section->fragment() ?>">

			<?php echo kirbytext($section->text()) ?>

			<?php if($items && $items->count()): ?>
				
				<?php foreach($items AS $item): ?>
					
					<?php if($section->fragment() == 'portfolio'): ?>

						<article class="open">
							
							<?php $cover = $item->images()->find('cover.jpg') ?>
							<?php if ($cover) : ?>
							<figure>
								<img src="<?php echo $cover->url() ?>" />
							</figure>
							<?php endif ?>

							<?php echo '<h2><a href="">' . html($item->title()). ' <em>' . html($item->subtitle()) . '</em><span class="open">Open</span><span class="close">Close</span></a></h2>'; ?>

							<div class="contents">
								
								<?php

								// tags?
								if ($item->tags()) {
									$tags = split(', ', $item->tags());
	
									if (count((array)$tags) > 0) {
										echo '<div class="panel"><hr / >';
										echo '<ul class="tags">';
										foreach($tags AS $tag) {
											echo '<li class="' . $tag . '">' . ucfirst($tag) . '</li>';
										}

										echo '</ul>';
										echo '</div>';
									}
								}

								// are panels?
								$panels = $item->children()->visible();

								if($panels && $panels->count()) {
									
									foreach($panels AS $panel) {

										$classes = array('panel');

										$classes[] = 'align-' . $panel->align();

										if ($panel->text() == '') {
											$classes[] = 'notext';
										}
										$classes[] = 'images-' . $panel->images()->count();
		
										echo '<div class="' . implode(' ', $classes) . '"><hr / ><div class="panel_inner">';

										if($panel->title()) {
											echo '<h3>' . html($panel->title()) . '</h3>';
										}

										echo kirbytext($panel->text());

										if($panel->hasImages()) {

											foreach($panel->images() as $image) {
												echo '<figure><img src="' . $image->url() . '" /></figure>';
											}

										}

										echo '</div></div>';
									}

								}

								?>
			
							</div>

							<?php
							// quote
							if ($item->quote() && $item->cite()) {
								echo '<blockquote>';
								echo '<p>&#8220;' . $item->quote() . '&#8221;</p>';
								echo '<p class="cite">' . $item->cite() . '</p>';
								echo '</blockquote>';
							}
							?>
							
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