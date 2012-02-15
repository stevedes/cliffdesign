<nav id="navigation">
	<ul>
    	<?php foreach($pages->visible() AS $p): ?>
    	<li><a href="/#<?php echo $p->fragment() ?>"><?php echo html($p->title()) ?></a></li>
    	<?php endforeach ?>
  	</ul>
</nav>