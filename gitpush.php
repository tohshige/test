<?
// auto git push .gitpush.php maiji
exec('cd /home/mono-96/www/mono-96.jp/tmp/test', $op, $rv);
exec('/usr/local/bin/git status', $op, $rv);
exec('/usr/local/bin/git add -A', $op, $rv);
exec('/usr/local/bin/git commit -m ":up:変更感知 $(date "+%m-%d %T")" || true', $op, $rv);
exec('/usr/local/bin/git push -f origin master:master', $op, $rv);
print_r($op);
print_r($rv);

/* test add delete line number
git log --numstat --pretty="%H" --since=2017-01-01 --until=2017-03-31 --no-merges \
| awk 'NF==3 {plus+=$1; minus+=$2} END {printf("合計%d行 (追加+%d, 削除-%d)\n", plus+minus, plus, minus)}'

git log --numstat --pretty="%H" --no-merges | awk 'NF==3 {plus+=$1; minus+=$2} END {printf("%d (+%d, -%d)\n", plus+minus, plus, minus)}'
git log --numstat --pretty="%H" | awk 'NF==3 {plus+=$1; minus+=$2} END {printf("%d (+%d, -%d)\n", plus+minus, plus, minus)}'


*/
?>
