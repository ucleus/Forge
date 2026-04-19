<?php
if (!isset($pageTitle)) {
  $pageTitle = 'Forge';
}
if (!isset($pageId)) {
  $pageId = 'fashion';
}
if (!isset($pageStyles)) {
  $pageStyles = [];
}
if (!isset($pageScripts)) {
  $pageScripts = [];
}
if (!isset($exportAction)) {
  $exportAction = "forgeShowToast(2200, 'Build a prompt before exporting.');";
}
if (!isset($newPromptAction)) {
  $newPromptAction = "forgeShowToast(2200, 'New prompt not available on this page.');";
}
if (!isset($newPromptLabel)) {
  $newPromptLabel = '+ New Prompt';
}
$navItems = [
  'dalle.php' => 'Dall-e',
  'midjourney.php' => 'Midjourney',
  'nanobanana.php' => 'Nano Banana',
  'fashion.php' => 'Fashion',
  'characters.php' => 'Characters'
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?php echo htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8'); ?></title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/styles.css" type="text/css" media="all" />
<?php foreach ($pageStyles as $style): ?>
<link rel="stylesheet" href="<?php echo htmlspecialchars($style, ENT_QUOTES, 'UTF-8'); ?>" type="text/css" media="all" />
<?php endforeach; ?>
</head>
<body>
<nav class="topnav">
  <div class="nav-brand">
    <div class="brand-dot">✦</div>
    FORGE
  </div>
  <div class="nav-tabs">
    <?php foreach ($navItems as $href => $label): ?>
      <a class="nav-tab <?php echo ($pageId === pathinfo($href, PATHINFO_FILENAME) ? 'active' : ''); ?>" href="<?php echo $href; ?>"><?php echo htmlspecialchars($label, ENT_QUOTES, 'UTF-8'); ?></a>
    <?php endforeach; ?>
  </div>
  <div class="nav-actions">
    <button class="nav-icon-btn" title="Grid" aria-label="Jump to section grid" onclick="forgeShowLayoutGrid()">⊞</button>
    <button class="nav-icon-btn" title="Settings" aria-label="Focus settings controls" onclick="forgeOpenSettings()">⚙</button>
    <button class="btn-create" onclick="<?php echo $newPromptAction; ?>"><?php echo htmlspecialchars($newPromptLabel, ENT_QUOTES, 'UTF-8'); ?></button>
  </div>
</nav>
