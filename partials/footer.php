<div class="toast" id="toast"><span class="t-lime">✓</span> Copied to clipboard!</div>
<script src="assets/js/core.js"></script>
<?php foreach ($pageScripts as $script): ?>
<script src="<?php echo htmlspecialchars($script, ENT_QUOTES, 'UTF-8'); ?>"></script>
<?php endforeach; ?>
</body>
</html>
