<?
// auto git push .gitpush.php
exec('cd /home/mono-96/www/mono-96.jp/tmp/test', $op, $rv);
exec('/usr/local/bin/git status', $op, $rv);
exec('/usr/local/bin/git add -A', $op, $rv);
exec('/usr/local/bin/git commit -m "auto git Commit and push at $(date "+%Y-%m-%d %T")" || true', $op, $rv);
exec('/usr/local/bin/git push -f origin master:master', $op, $rv);
print_r($op);
print_r($rv);
?>

