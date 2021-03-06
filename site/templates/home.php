<?php snippet('header') ?>
	
<div id="content" role="main">

	<section id="intro">
		<h1><span>Welcome</span></h1>
		<?php echo kirbytext($page->text()) ?>
	</section>

	<?php $n = 0; ?>

	<?php foreach($pages->visible() AS $section) : ?>

		<?php $items = $section->children()->visible(); ?>
		
		<?php $about_pic = $section->images()->find('about.jpg') ?>

		<section id="<?php echo $section->fragment() ?>">

			<?php if ($about_pic) : ?>
			<figure>
				<img src="<?php echo $about_pic->url() ?>" />
			</figure>
			<?php endif ?>

			<h1><span><?php echo html($section->title()) ?></span></h1>

			<?php echo kirbytext($section->text()) ?>

			<?php if($section->fragment() == 'about'): ?>
				<?php if ($site->linkedin()) : ?>
					<a class="linkedin" href="<?php echo $site->linkedin() ?>">Linked In</a>
				<?php endif ?>
			<?php endif ?>

			<?php if($section->fragment() == 'contact'): ?>

				<ul class="contacts">
					<li class="post">
						<a href="<?php echo $site->map() ?>">Google Map</a>
					</li>
					<li class="phone">
						<strong><?php echo $site->phone() ?></strong>
					</li>
					<li class="email">
						<strong><a href="mailto:&#x64;&#97;&#x76;&#x69;&#x64;&#x40;&#x63;&#x6c;&#x69;&#x66;&#102;&#100;&#101;&#x73;&#x69;&#103;&#x6e;&#46;&#99;&#x6f;&#46;&#x75;&#107;">&#100;&#97;&#x76;&#x69;&#100;&#64;&#x63;&#x6c;&#x69;&#102;&#x66;&#x64;&#101;&#x73;&#105;&#103;&#110;&#46;&#99;&#111;&#46;&#117;&#107;</a></strong>
					</li>
				</ul>

				<?php snippet('enquiry') ?>
			<?php endif ?>


			<?php if($items && $items->count()): ?>
				
				<?php foreach($items AS $item): ?>
					
					<?php if($section->fragment() == 'portfolio'): ?>

						<article class="open" id="<?php echo $item->uid(); ?>">
							
							<?php $cover = $item->images()->find('cover.jpg') ?>
							<?php if ($cover) : ?>
							<figure>
								<img src="<?php echo $cover->url() ?>" />
							</figure>
							<?php endif ?>

							<?php echo '<h2><a href="">' . html($item->title()). ' <em>' . html($item->subtitle()) . '</em><span class="open">Open</span><span class="close">Close</span></a></h2>'; ?>

							<div class="contents">
								
								<?php
								// moved this to ajax call. More responsive
								/*
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
								*/
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

						<article class="<?php echo $item->fragment() ?><?php echo ($n%2) ? ' odd' : ' even' ?>">
							<?php if($item->hasImages()) : ?> 
								<figure>
									<img src="<?php echo $item->images()->first()->url() ?>" />
								</figure>
							<? endif ?>
						
							<h2><?php echo html($item->title()) ?></h2>
							<?php echo kirbytext($item->text()) ?>
						</article>

						<?php $n++; ?>
					<?php elseif($section->fragment() == 'pipeline'): ?>
						
						<article class="<?php echo $item->fragment() ?>">
							<?php
							$classes = array('panel');

							$classes[] = 'align-' . $item->align();

							if ($item->text() == '') {
								$classes[] = 'notext';
							}
							$classes[] = 'images-' . $item->images()->count();

							echo '<div class="' . implode(' ', $classes) . '"><hr / ><div class="panel_inner">';

							if($item->title()) {
								echo '<h3>' . html($item->title()) . '</h3>';
							}

							echo kirbytext($item->text());

							if($item->hasImages()) {

								foreach($item->images() as $image) {
									echo '<figure><img src="' . $image->url() . '" /></figure>';
								}

							}

							echo '</div></div>';
							?>
						</article>

					<?php endif; ?>

				<?php endforeach ?>   
				
			<?php endif ?>

		</section>

	<?php endforeach ?>

	<div id="scrollfix"></div>
</div>


<?php snippet('footer') ?>