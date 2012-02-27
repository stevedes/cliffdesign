<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <title><?php echo html($site->title()) ?></title>
  <meta name="description" content="<?php echo html($site->description()) ?>" />
  <meta name="author" content="<?php echo html($site->author()) ?> ?>">

  <meta name="viewport" content="width=device-width,initial-scale=1">

  <?php echo js('assets/scripts/libs/modernizr-2.5.2.min.js') ?>

  <script type="text/javascript">
      (function(doc) {

          var addEvent = 'addEventListener',
              type = 'gesturestart',
              qsa = 'querySelectorAll',
              scales = [1, 1],
              meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

          function fix() {
              meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
              doc.removeEventListener(type, fix, true);
          }

          if ((meta = meta[meta.length - 1]) && addEvent in doc) {
              fix();
              scales = [.25, 1.6];
              doc[addEvent](type, fix, true);
          }

      }(document));
  </script>

  <?php echo css('assets/styles/screen.css') ?>
  
</head>
<body>
    
    <!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->

    <div id="welcome">
        
        <header id="top">
            <h1><a href="#welcome"><span><?php echo h($site->title()) ?></span></a></h1>
            <nav id="navigation">
                <ul>
                <?php foreach($pages->visible() AS $p): ?>
                    <li><a href="#<?php echo $p->fragment() ?>"><?php echo html($p->title()) ?></a></li>
                <?php endforeach ?>
                </ul>
            </nav>
        </header>