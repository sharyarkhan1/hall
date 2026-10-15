<?php

$is_https = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';

$protocol = $is_https ? 'https' : 'http';

$host = $_SERVER['HTTP_HOST'] ?? 'localhost';

$script_dir = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? ''));

if (substr($script_dir, -9) === '/includes') {
    $script_dir = substr($script_dir, 0, -9);
}

$script_dir = trim($script_dir, '/');

$site_url = $protocol . '://' . $host . ($script_dir ? '/' . $script_dir : '');