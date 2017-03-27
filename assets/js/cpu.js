/**
 * author [luo0412]
 * date [2016-12-21]
 * description [cpu调度有关js代码]
 * @class [cpu.js]
 * @constructor
 */
// var PROGRESS_NUM = 0; // 在银行家算法处已经定义
var ARRIVE_TIME = [];       // 到达时间
var SERVICE_TIME = [];      // 服务时间
var SERVICE_TIME_COPY = []; // 服务时间副本
var TIME_SLICE = 0;         // 时间片
var PRIORITY = [];          // 优先级

var START_TIME = [];        // 各进程开始时间
var FINISH_TIME = [];       // 各进程结束时间
var TURNAROUND_TIME = [];   // 各进程周转时间
var WEIGHTED_TURNAROUND_TIME = [];  // 各进程带权周转时间

var EXEC_ORDER = [];    // 执行顺序
var IS_FINISHED = [];   // 进程是否执行完毕的状态标记,默认都是false

var LEFT = 0;    // 时间标记
var ONINDEX = 0; // 当前时刻正在执行的进程号
// var TEXTAREA_TXT = ""; // 这个全局变量在银行家算法处已经声明, 共用

/**
 * @method [resetCpuGloabalVar]
 * @description [重置CPU调度算法的全局变量]
 * @return {[type]} [description]
 */
function resetCpuGloabalVar() {
    PROGRESS_NUM = 0;       // 进程数
    ARRIVE_TIME = [];       // 到达时间
    SERVICE_TIME = [];      // 服务时间
    SERVICE_TIME_COPY = []; // 服务时间副本
    TIME_SLICE = 0;         // 时间片
    PRIORITY = [];          // 优先级

    START_TIME = [];        // 各进程开始时间
    FINISH_TIME = [];       // 各进程结束时间
    TURNAROUND_TIME = [];   // 各进程周转时间
    WEIGHTED_TURNAROUND_TIME = [];  // 各进程带权周转时间

    EXEC_ORDER = [];    // 执行顺序
    IS_FINISHED = [];   // 进程是否执行完毕的状态标记,默认都是false

    LEFT = 0;    // 时间标记
    ONINDEX = 0; // 当前时刻正在执行的进程号
    TEXTAREA_TXT = ""; // 这个全局变量在银行家算法处已经声明, 共用
}

/**
 * @method [getSjfNextIndex]
 * @description [获取下一个执行的进程号]
 * @param  {[array]} arr1 [优先级, 数字越大越高, 这里指的是剩余服务时间的倒数]
 * @param  {[array]} arr2 [获取获取arr2中不为false,且在arr1种的最大数的下标]
 * @param  {[array]} arr3 [执行完毕状态]
 * @return {[type]}      [description]
 */
function getSjfNextIndex(arr1, arr2, arr3) {
    var index = 0;
    var n = 0; // 服务时间的导数

    // 随意选取一个还没有执行的进程
    for(var i in arr1) {
        if(arr3[i] === false) {
            index = i;
            n = arr1[i];
            break; // 不要忘记
        }
    }
    
    // 选出最早执行的进程号
    for(i in arr1) {
        // 已经到达的尚未结束的进程中选择优先级最高的进程
        if(arr2[i] <= LEFT && arr3[i] === false && arr1[i] > n) {
            index = i;
            n = arr1[i];
        }
    }

    return index;
}

/**
 * @method [seizedSjf]
 * @description [短作业优先调度 - 抢占式]
 * @return {[type]} [description]
 */
function seizedSjf() {

    // 如果所有进程执行完毕,那么函数结束
    if(isArrAllTrue(IS_FINISHED) === true) {
        return ;
    }

    // 如果所有进程都已达到
    if( getFloorNumOfArr(ARRIVE_TIME, LEFT) === false ) {
        IS_FINISHED[ONINDEX] = true; // 执行完毕,做好标记
        LEFT += SERVICE_TIME_COPY[ONINDEX];
        // console.log();
        TEXTAREA_TXT += "下一个可能发生抢占的时刻: " + LEFT + "\n";
        FINISH_TIME[ONINDEX] = LEFT;
        SERVICE_TIME_COPY[ONINDEX] = 0; // 该进程服务时间变为0
        // console.log("服务时间 " + service_time);
        TEXTAREA_TXT += "服务时间" + SERVICE_TIME_COPY + "\n";

        // 如果所有进程服务时间都为0 必要???
        if(isArrAllZero(SERVICE_TIME_COPY) === true) {
            TEXTAREA_TXT += "所有进程执行结束<<<<<<<<<<<<" + "\n\n";
            return ;
        } else {
            ONINDEX = getSjfNextIndex(getReciprocalArr(SERVICE_TIME_COPY),
                                        ARRIVE_TIME, IS_FINISHED);
            EXEC_ORDER.push(ONINDEX);
            if(SERVICE_TIME_COPY[ONINDEX] === SERVICE_TIME[ONINDEX]) {
                START_TIME[ONINDEX] = LEFT;
            }
            TEXTAREA_TXT += "下一步执行p" + ONINDEX + "\n\n";
            // console.log("下一步执行p" + onIndex + "\n");
        }

        // sjf();
    }


    // 可能还有进程没有到达,那么要考虑抢占
    else {
         // 有了抢占的可能
        if(LEFT + SERVICE_TIME_COPY[ONINDEX] > getFloorNumOfArr(ARRIVE_TIME, LEFT)) {
            var tmp = getFloorNumOfArr(ARRIVE_TIME, LEFT) - LEFT;
            SERVICE_TIME_COPY[ONINDEX] -= tmp;
            LEFT = getFloorNumOfArr(ARRIVE_TIME, LEFT);
            TEXTAREA_TXT += "下一个可能发生抢占的时刻: " + LEFT + "\n";
            // console.log("left: " + left);
            FINISH_TIME[ONINDEX] = LEFT;
            // console.log("服务时间 " + service_time);
            TEXTAREA_TXT += "服务时间" + SERVICE_TIME_COPY + "\n";
            ONINDEX = getSjfNextIndex(getReciprocalArr(SERVICE_TIME_COPY),
                                        ARRIVE_TIME, IS_FINISHED);
            EXEC_ORDER.push(ONINDEX);
            if(SERVICE_TIME_COPY[ONINDEX] === SERVICE_TIME[ONINDEX]) {
                START_TIME[ONINDEX] = LEFT;
            }
            // console.log("下一步执行p" + onIndex + "\n");
            TEXTAREA_TXT += "下一步执行p" + ONINDEX + "\n\n";
            // sjf();
        }

        // 可以一直执行完也没有抢占
        else {
            IS_FINISHED[ONINDEX] = true; // 执行完毕,做好标记
            LEFT += SERVICE_TIME_COPY[ONINDEX];
            // console.log("left: " + left);
            TEXTAREA_TXT += "下一个可能发生抢占的时刻: " + LEFT + "\n";
            FINISH_TIME[ONINDEX] = LEFT;
            SERVICE_TIME_COPY[ONINDEX] = 0;
            // console.log("服务时间: absolute" + service_time);
            TEXTAREA_TXT += "服务时间" + SERVICE_TIME_COPY + "\n";
            ONINDEX = getSjfNextIndex(getReciprocalArr(SERVICE_TIME_COPY),
                                        ARRIVE_TIME, IS_FINISHED);
            EXEC_ORDER.push(ONINDEX);
            if(SERVICE_TIME_COPY[ONINDEX] === SERVICE_TIME[ONINDEX]) {
                START_TIME[ONINDEX] = LEFT;
            }
            TEXTAREA_TXT += "下一步执行p" + ONINDEX + "\n\n";
            // sjf();
        }
    }

}

/**
 * @method [fcfsDemoInit]
 * @description [导入fcfs,sjf,phf调度算法的初始数据]
 * @return {[type]} [description]
 */
function fcfsDemoInit() {
    PROGRESS_NUM = 4;
    ARRIVE_TIME = [0, 1, 2, 3];
    SERVICE_TIME = [8, 4, 9, 5];
    PRIORITY = [3, 1, 0, 2];
    SERVICE_TIME_COPY = cloneArr(SERVICE_TIME);
    IS_FINISHED = [false, false, false, false];
    LEFT = 0; // 下一个可能发生抢占的时刻
    ONINDEX = 0;
    EXEC_ORDER = [];
    TEXTAREA_TXT = "";
}

/**
 * @method [sjfLauncher]
 * @description [启动sjf抢占式调度]
 * @return {[type]} [description]
 */
function sjfLauncher() {
    // 初始化
    TEXTAREA_TXT += "执行抢占式sjf调度>>>>>>>>>>" + "\n\n";
    TEXTAREA_TXT += "下一个可能发生抢占的时刻: " + LEFT + "\n";
    TEXTAREA_TXT += "服务时间" + SERVICE_TIME_COPY + "\n";
    ONINDEX = getSjfNextIndex(getReciprocalArr(SERVICE_TIME_COPY),
                            ARRIVE_TIME, IS_FINISHED);
    EXEC_ORDER.push(ONINDEX);
    START_TIME[ONINDEX] = LEFT;
    TEXTAREA_TXT += "下一步执行p" + ONINDEX + "\n\n";

    // 一种妥协的方式，代替递归
    var exec_counter = 101; // 这个数字稍微大点，防止出错
    while(exec_counter --) {
        seizedSjf();
    }
}


/**
 * @method [hrrf]
 * @description [执行最高响应比调度]
 * @return {[type]} [description]
 */
function hrrf() {
    LEFT = 0;
    TEXTAREA_TXT = "";

    var tmpIndex = 0;
    var tmpArr = getIndexOfAscendSortArr(ARRIVE_TIME); // 存储到达进程下标

    // 每次有进程达到就需要判断
    for(var i=0, len=PROGRESS_NUM; i<len; i++) {
        tmpIndex = tmpArr[i]; // 最先到达的进程号下标

        // 如果LEFT小于那一次所有进程到达的时刻, 那么执行最早达到的
        if(LEFT <= ARRIVE_TIME[tmpIndex]) {
            LEFT = ARRIVE_TIME[tmpIndex];
            TEXTAREA_TXT += "进程开始 " + LEFT.toFixed(1) + "\n";
            EXEC_ORDER.push(tmpIndex); // 加入执行顺序
            START_TIME[tmpIndex] = LEFT.toFixed(1);

            TEXTAREA_TXT += "执行p" + tmpIndex + "\n";
            LEFT = ARRIVE_TIME[tmpIndex] + SERVICE_TIME_COPY[tmpIndex]; // 更新时间标志

            TEXTAREA_TXT += "进程结束 " + LEFT.toFixed(1) + "\n\n";
            FINISH_TIME[tmpIndex] = LEFT.toFixed(1);
            IS_FINISHED[tmpIndex] = true; // 该进程标记已结束
            SERVICE_TIME_COPY[tmpIndex] = 0;
        }

        // 第i+1个进程到达时刻有进程再执行
        // 根据响应比排序然后选出执行进程
        else {
            TEXTAREA_TXT += "进程开始 " + LEFT.toFixed(1) + "\n";
            tmpIndex = getHrrfRatioIndex(); // 获取响应比最高的进程号
            EXEC_ORDER.push(tmpIndex);
            START_TIME[tmpIndex] = LEFT.toFixed(1);

            TEXTAREA_TXT += "执行p" + tmpIndex + "\n";
            LEFT += SERVICE_TIME_COPY[tmpIndex];

            TEXTAREA_TXT += "进程结束 " + LEFT.toFixed(1) + "\n\n";
            FINISH_TIME[tmpIndex] = LEFT.toFixed(1);
            IS_FINISHED[tmpIndex] = true;
            SERVICE_TIME_COPY[tmpIndex] = 0;

        }
    }

}

/**
 * @method [getHrrfRatio]
 * @description [获取最高响应比进程下标]
 * @return {[type]} [description]
 */
function getHrrfRatioIndex() {
    var max = 0; // 最高响应比
    var maxIndex = 0; // 响应比最高的进程号
    var tmpVal = 1; // 临时变量

    TEXTAREA_TXT += "剩余进程的响应比如下:\n";
    for(var i=0, len=PROGRESS_NUM; i<len; i++) {
        if(IS_FINISHED[i] === true) {
            continue; // 已完毕进程不参加比赛
        }

        tmpVal = 1 + (LEFT - ARRIVE_TIME[i]) / SERVICE_TIME_COPY[i];
        TEXTAREA_TXT += "p" + i + " : " + tmpVal.toFixed(1) + "\n";

        // 更新最高响应比值及下标
        if(max < tmpVal) {
            max = tmpVal;
            maxIndex = i;
        }
    }

    return maxIndex;
}

/**
 * @method [hrrfDemoInit]
 * @description [导入响应比测试数据]
 * @return {[type]} [description]
 */
function hrrfDemoInit() {
    resetCpuGloabalVar();

    PROGRESS_NUM = 4;
    ARRIVE_TIME = [8, 8.5, 9, 9.5];
    SERVICE_TIME = [2, 0.5, 0.1, 0.2];
    SERVICE_TIME_COPY = cloneArr(SERVICE_TIME);
    FINISH_TIME = [0, 0, 0, 0];
    IS_FINISHED = [false, false, false, false];

    // arrive_time = [12, 11, 10, 13, 15];
    // serve_time = [13, 9, 7, 5, 6];
    // isExeced = [false, false, false, false, false];

    // arrive_time = [8.8, 9.0, 9.5];
    // serve_time = [1.5, 0.4, 1.0];
    // isExeced = [false, false, false];

    // arrive_time = [8, 18.5, 29, 39.5];
    // serve_time = [2, 0.5, 0.1, 0.2];
    // isExeced = [false, false, false, false];
}

/**
 * @method [fcfs]
 * @description [先来先服务调度]
 * @return {[type]} [description]
 */
function fcfs() {
    // 根据达到时间, 生成执行顺序
    EXEC_ORDER = getIndexOfAscendSortArr(ARRIVE_TIME);

    TEXTAREA_TXT += "执行fcfs调度>>>>>>>>>" + "\n\n";

    // 计算达到时间和结束时间
    for(var i=0; i<PROGRESS_NUM; i++) {
        TEXTAREA_TXT += "进程开始时刻" + LEFT + "\n";
        START_TIME.push(LEFT);
        TEXTAREA_TXT += "执行p" + EXEC_ORDER[i] + "\n";
        LEFT += SERVICE_TIME[EXEC_ORDER[i]];
        FINISH_TIME.push(LEFT);
        TEXTAREA_TXT += "进程结束时刻" + LEFT + "\n";
        SERVICE_TIME_COPY[EXEC_ORDER[i]] = 0;
        TEXTAREA_TXT += "各进程剩余服务时间" + SERVICE_TIME_COPY + "\n\n";
    }
    TEXTAREA_TXT += "所有进程执行结束<<<<<<<<<<" + "\n";

    TURNAROUND_TIME = getSubArr(FINISH_TIME, START_TIME);
    WEIGHTED_TURNAROUND_TIME = getDivArr(TURNAROUND_TIME, SERVICE_TIME);

}

/**
 * @method [phf]
 * @description [优先级调度, 待完善]
 * @return {[type]} [description]
 */
function phf() {
    // 根据达到时间, 生成执行顺序
    EXEC_ORDER = getIndexOfAscendSortArr(PRIORITY);

    TEXTAREA_TXT += "执行phf优先级调度>>>>>>>>>" + "\n\n";

    // 计算达到时间和结束时间
    for(var i=0; i<PROGRESS_NUM; i++) {
        TEXTAREA_TXT += "进程开始时刻" + LEFT + "\n";
        START_TIME.push(LEFT);
        TEXTAREA_TXT += "执行p" + EXEC_ORDER[i] + "\n";
        LEFT += SERVICE_TIME[EXEC_ORDER[i]];
        FINISH_TIME.push(LEFT);
        TEXTAREA_TXT += "进程结束时刻" + LEFT + "\n";
        SERVICE_TIME_COPY[EXEC_ORDER[i]] = 0;
        TEXTAREA_TXT += "各进程剩余服务时间" + SERVICE_TIME_COPY + "\n\n";
    }
    TEXTAREA_TXT += "所有进程执行结束<<<<<<<<<<" + "\n";

    TURNAROUND_TIME = getSubArr(FINISH_TIME, START_TIME);
    WEIGHTED_TURNAROUND_TIME = getDivArr(TURNAROUND_TIME, SERVICE_TIME);

}


function rrDemoInit() {
    resetCpuGloabalVar();
    PROGRESS_NUM = 5;
    ARRIVE_TIME = [0, 0, 0, 0, 0];
    SERVICE_TIME = [9, 8, 11, 7, 10];
}

function displayRREachExec(arr, slice) {
    var len = arr.length;
    var times = Math.ceil(getMaxValOfArr(arr) / slice);
    var tmpValue = 0;
    var tmpStr = "时间片 = 3\n时间片轮转情况如下, 待完善>>>>>>>\n\n";
    for(var i=0; i<times; i++) {
        tmpStr += "第" + (i+1) + "次执行进程 ";
        tmpValue = slice * i;
        for(var j=0; j<len; j++) {
            if(arr[j] > slice * i)
            tmpStr += "p" + j + " ";
        }
        tmpStr += "\n";
    }
    return tmpStr;
}
