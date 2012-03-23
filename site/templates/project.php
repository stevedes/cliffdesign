<?php
// tags?
if ($page->tags()) {
	$tags = split(', ', $page->tags());

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
$panels = $page->children()->visible();

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
