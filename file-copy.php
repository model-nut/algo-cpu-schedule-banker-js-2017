<?php
    if(!file_exists("source.txt")) { echo "source.txt文件不存在, 请先创建";}
    elseif(!file_exists("target.txt")) {
        echo "target.txt文件不存在, 现已创建";
        fopen("target.txt", "w"); //  不存在则创建
    } else {
        file_put_contents("target.txt", "\n" . file_get_contents("source.txt"), FILE_APPEND); // 追加内容
    }
?>