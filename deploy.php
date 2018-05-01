<?
exec('/usr/local/bin/git pull', $op, $rv);
print_r($op);
print_r($rv);

// phpでフォルダごと圧縮した場合がある。
// そんな時は、linux コマンドを使うべき。

// $dir 取得したいフォルダパス
$dir "/home/mono-96/www/mono-96.jp/tmp/test";
// $zipFileSavePath 一時、zipを保存しておくフォルダパス
$zipFileSavePath "/home/mono-96/www/mono-96.jp/tmp/";

function getZip($dir,$zipFileSavePath){

// zipファイル名
    $fileName = "zipFile".time();
// 圧縮対象フォルダ
    $compressDir = $dir;

// コマンド
// cd：ディレクトリの移動
// zip:zipファイルの作成
    $command =  "cd ". $compressDir .";".
        "zip -r ". $zipFileSavePath . $fileName .".zip .";

// Linuxコマンドの実行
    exec($command);

// 圧縮したファイルをダウンロードさせる。
//     header('Pragma: public');
//     header("Content-Type: application/octet-stream");
//     header("Content-Disposition: attachment; filename=".$fileName.".zip");
//     readfile($zipFileSavePath.$fileName.".zip");

// //    消す
//     unlink($zipFileSavePath.$fileName.".zip");
}

?>
