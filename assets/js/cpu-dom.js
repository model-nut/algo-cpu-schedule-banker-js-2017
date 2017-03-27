/**
 * author [luo0412]
 * date [2016-12-21]
 * description [cpu调度的dom操作]
 * @class [cpu-dom.js]
 * @constructor
 */

$(document).ready(function() {

$("#rr_import_btn").click(function() {
    resetCpuGloabalVar();
    $("#rr_table td").html("");
    $("#rr_textarea").html("");
    rrDemoInit();

    for(var i=0; i<PROGRESS_NUM; i++) {
        $("#rr_table tr:eq(" + (i+1) + ") td:eq(0)").html(ARRIVE_TIME[i]);
        $("#rr_table tr:eq(" + (i+1) + ") td:eq(1)").html(SERVICE_TIME[i]);
    }
});

$("#rr_exec_btn").click(function() {
    $("#rr_textarea").html(displayRREachExec(SERVICE_TIME, 3));
});

$("#fcfs_import_btn").click(function() {
    resetCpuGloabalVar(); // 重置
    $("#fcfs_table td").html(""); // 清空表格
    $("#fcfs_textarea").html(""); // 清空文本域
    fcfsDemoInit();       // 导入fcfs, sjf, phf公用数据

    // 显示前三列数据
    for(var i=0; i<PROGRESS_NUM; i++) {
        $("#fcfs_table tr:eq(" + (i+1) + ") td:eq(0)").html(ARRIVE_TIME[i]);
        $("#fcfs_table tr:eq(" + (i+1) + ") td:eq(1)").html(SERVICE_TIME[i]);
        $("#fcfs_table tr:eq(" + (i+1) + ") td:eq(2)").html(PRIORITY[i]);
    }
});

$("#fcfs_exec_btn").click(function() {
    resetCpuGloabalVar(); // 重置

    $("#fcfs_table td").html(""); // 清空表格
    $("#fcfs_textarea").html(""); // 清空文本域
    fcfsDemoInit();       // 导入fcfs, sjf, phf公用数据

    // 显示前三列数据
    for(var i=0; i<PROGRESS_NUM; i++) {
        $("#fcfs_table tr:eq(" + (i+1) + ") td:eq(0)").html(ARRIVE_TIME[i]);
        $("#fcfs_table tr:eq(" + (i+1) + ") td:eq(1)").html(SERVICE_TIME[i]);
        $("#fcfs_table tr:eq(" + (i+1) + ") td:eq(2)").html(PRIORITY[i]);
    }

    fcfs(); // 已经包括了周转时间等的计算
    for(i=0; i<PROGRESS_NUM; i++) {
        $("#fcfs_table tr:eq(" + (i+1) + ") td:eq(3)").html(START_TIME[i]);
        $("#fcfs_table tr:eq(" + (i+1) + ") td:eq(4)").html(FINISH_TIME[i]);
        $("#fcfs_table tr:eq(" + (i+1) + ") td:eq(5)").html(TURNAROUND_TIME[i]);
        $("#fcfs_table tr:eq(" + (i+1) + ") td:eq(6)").html(WEIGHTED_TURNAROUND_TIME[i]);
    }
    $("#fcfs_table tr:eq(" + 6 + ") td:eq(0)").html("FCFS执行顺序：" + getExecOrderStr(EXEC_ORDER));
    $("#fcfs_table tr:eq(" + 7 + ") td:eq(0)").html("" + getAvgValOfArr(TURNAROUND_TIME).toFixed(3));
    $("#fcfs_table tr:eq(" + 8 + ") td:eq(0)").html("" + getAvgValOfArr(WEIGHTED_TURNAROUND_TIME).toFixed(3));
    $("#fcfs_textarea").html(TEXTAREA_TXT);
});


$("#phf_exec_btn").click(function() {
    resetCpuGloabalVar(); // 重置

    $("#fcfs_table td").html(""); // 清空表格
    $("#fcfs_textarea").html(""); // 清空文本域
    fcfsDemoInit();       // 导入fcfs, sjf, phf公用数据

    // 显示前三列数据
    for(var i=0; i<PROGRESS_NUM; i++) {
        $("#fcfs_table tr:eq(" + (i+1) + ") td:eq(0)").html(ARRIVE_TIME[i]);
        $("#fcfs_table tr:eq(" + (i+1) + ") td:eq(1)").html(SERVICE_TIME[i]);
        $("#fcfs_table tr:eq(" + (i+1) + ") td:eq(2)").html(PRIORITY[i]);
    }

    phf(); // 已经包括了周转时间等的计算
    for(i=0; i<PROGRESS_NUM; i++) {
        $("#fcfs_table tr:eq(" + (i+1) + ") td:eq(3)").html(START_TIME[i]);
        $("#fcfs_table tr:eq(" + (i+1) + ") td:eq(4)").html(FINISH_TIME[i]);
        $("#fcfs_table tr:eq(" + (i+1) + ") td:eq(5)").html(TURNAROUND_TIME[i]);
        $("#fcfs_table tr:eq(" + (i+1) + ") td:eq(6)").html(WEIGHTED_TURNAROUND_TIME[i]);
    }
    $("#fcfs_table tr:eq(" + 6 + ") td:eq(0)").html("phf执行顺序：" + getExecOrderStr(EXEC_ORDER));
    $("#fcfs_table tr:eq(" + 7 + ") td:eq(0)").html("" + getAvgValOfArr(TURNAROUND_TIME).toFixed(3));
    $("#fcfs_table tr:eq(" + 8 + ") td:eq(0)").html("" + getAvgValOfArr(WEIGHTED_TURNAROUND_TIME).toFixed(3));
    $("#fcfs_textarea").html(TEXTAREA_TXT);
});


$("#sjf_exec_btn").click(function(event) {
    resetCpuGloabalVar(); // 重置
    $("#fcfs_table td").html(""); // 清空表格
    $("#fcfs_textarea").html(""); // 清空文本域
    fcfsDemoInit();       // 导入fcfs, sjf, phf公用数据

    // 显示前三列数据
    for(var i=0; i<PROGRESS_NUM; i++) {
        $("#fcfs_table tr:eq(" + (i+1) + ") td:eq(0)").html(ARRIVE_TIME[i]);
        $("#fcfs_table tr:eq(" + (i+1) + ") td:eq(1)").html(SERVICE_TIME[i]);
        $("#fcfs_table tr:eq(" + (i+1) + ") td:eq(2)").html(PRIORITY[i]);
    }

    // sjfDemoInit(); // 导入初始化数据
    sjfLauncher(); // 启动sjf抢占式调度

    // 计算周转时间和带权周转时间
    TURNAROUND_TIME = getSubArr(FINISH_TIME, ARRIVE_TIME);
    WEIGHTED_TURNAROUND_TIME = getDivArr(getSubArr(FINISH_TIME, ARRIVE_TIME), SERVICE_TIME);

    // 显示起止时间,周转时间等
    for(i=0; i<PROGRESS_NUM; i++) {
        $("#fcfs_table tr:eq(" + (i+1) + ") td:eq(3)").html(START_TIME[i].toString());
        $("#fcfs_table tr:eq(" + (i+1) + ") td:eq(4)").html(FINISH_TIME[i].toString());
        $("#fcfs_table tr:eq(" + (i+1) + ") td:eq(5)").html(TURNAROUND_TIME[i].toString());
        $("#fcfs_table tr:eq(" + (i+1) + ") td:eq(6)").html(WEIGHTED_TURNAROUND_TIME[i].toString());
    }

    $("#fcfs_table tr:eq(" + 6 + ") td:eq(0)").html("sjf执行顺序：" + getExecOrderStr(EXEC_ORDER));
                    // 输出执行顺序,包含去重

    // 显示平均周转时间和平均带权周转时间
    $("#fcfs_table tr:eq(" + 7 + ") td:eq(0)").html(getAvgValOfArr(TURNAROUND_TIME));
    $("#fcfs_table tr:eq(" + 8 + ") td:eq(0)").html(getAvgValOfArr(WEIGHTED_TURNAROUND_TIME));

    // 计算等待时间和平均等待时间
    var tmpArr3 = getSubArr(getSubArr(FINISH_TIME, SERVICE_TIME), ARRIVE_TIME);
    TEXTAREA_TXT += "等待时间" + tmpArr3 + "\n";
    TEXTAREA_TXT += "平均等待时间" + getAvgValOfArr(tmpArr3) + "\n";

    $("#fcfs_textarea").html(TEXTAREA_TXT); // 输出执行过程情况
});


$("#hrrf_import_btn").click(function() {
    resetCpuGloabalVar(); // 重置
    $("#hrrf_table td").html(""); // 清空表格
    $("#hrrf_textarea").html(""); // 清空文本域
    hrrfDemoInit();

    // 显示前两列数据
    for(var i=0; i<PROGRESS_NUM; i++) {
        $("#hrrf_table tr:eq(" + (i+1) + ") td:eq(0)").html(ARRIVE_TIME[i]);
        $("#hrrf_table tr:eq(" + (i+1) + ") td:eq(1)").html(SERVICE_TIME[i]);
    }
});

$("#hrrf_exec_btn").click(function() {
    hrrf();
    TURNAROUND_TIME = arrParseFloat(arrToFixedN(getSubArr(FINISH_TIME, ARRIVE_TIME), 1));
    WEIGHTED_TURNAROUND_TIME = getDivArr(TURNAROUND_TIME, SERVICE_TIME);
    for(var i=0; i<PROGRESS_NUM; i++) {
        $("#hrrf_table tr:eq(" + (i+1) + ") td:eq(2)").html(START_TIME[i]);
        $("#hrrf_table tr:eq(" + (i+1) + ") td:eq(3)").html(FINISH_TIME[i]);
        $("#hrrf_table tr:eq(" + (i+1) + ") td:eq(4)").html(TURNAROUND_TIME[i]);
        $("#hrrf_table tr:eq(" + (i+1) + ") td:eq(5)").html(WEIGHTED_TURNAROUND_TIME[i]);
    }

    $("#hrrf_table tr:eq(" + 6 + ") td:eq(0)").html("HRRF执行顺序：" + getExecOrderStr(EXEC_ORDER));
    $("#hrrf_table tr:eq(" + 7 + ") td:eq(0)").html("" + getAvgValOfArr(TURNAROUND_TIME).toFixed(3) );
    $("#hrrf_table tr:eq(" + 8 + ") td:eq(0)").html("" + getAvgValOfArr(WEIGHTED_TURNAROUND_TIME).toFixed(3) );
    $("#hrrf_textarea").html(TEXTAREA_TXT);
});

}); // jquery end