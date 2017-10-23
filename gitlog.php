<?
// auto git push .gitpush.php maiji
exec('cd /home/mono-96/www/mono-96.jp/tmp/test', $op, $rv);
exec('git log',$op,$rv);
echo '<pre>';
print_r($op);
print_r($rv);
echo '</pre>'
?>

