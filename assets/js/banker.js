/**
 * author [luo0412]
 * date [2016-12-21]
 * description [银行家算法的js代码]
 * @class [banker.js]
 * @constructor
 */

// 全局变量命名全部大写,用下划线连接
var PROGRESS_NUM = 0; // 进程数
var RESOURCE_NUM = 0; // 资源数

var MAX = [];
var ALLOCATION = [];
var AVAILABLE = [];
var AVAILABLE_COPY = []; // AVAILABLE的副本,用于需要更改的全局变量
var NEED = [];

var SAFE_SEQUENCE_ARR = []; // 安全序列数组
var SAFE_SEQUENCE_NUM = 0;  // 安全序列总数

var ORDER_STR = ""; // 如果有5个进程, 即为 "01234"
var POSS_ORDER_ARR = []; // 可能的安全序列数组，只是简单排列组合

var TEXTAREA_TXT; // 在textarea中输出执行过程


/**
 * @method [generateOrderStr]
 * @description [生成顺序字符串,用于生成POSS_ORDER_ARR]
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
function getOrderStr(num) {
    var str = "";
    for(var i=0; i<num; i++) {
        str += i;
    }
    return str;
}

/**
 * @method [generatePossOrderArr]
 * @description [递归生成POSS_ORDER_ARR]
 * @param  {[type]} s [description]
 * @return {[type]}   [description]
 * @example
 *     generatePossOrderArr(""); // 返回整型二维数组
 */
function generatePossOrderArr(s) {
    for(var i=0,length = ORDER_STR.length; i<length; i++) {
        // 最后输出, 只差一个元素的时候
        if(s.length == length - 1) {
            if(s.indexOf(ORDER_STR[i]) < 0) {
                var tmpArr = (s + ORDER_STR[i]).split("");
                POSS_ORDER_ARR.push(arrParseInt(tmpArr)); // 转化成浮点型
            }
            continue;
        }

        // 递归，只要这个元素之前没有过，说明字符串长度还不够，要往上加
        if(s.indexOf(ORDER_STR[i]) < 0) {
            generatePossOrderArr(s + ORDER_STR[i]);
        }
    }
}

/**
 * @method [resetGlobalVar]
 * @description [重置全局变量, 在初始化时调用]
 * @return {[type]} [description]
 */
function resetBankerGlobalVar() {
    PROGRESS_NUM = 0; // 进程数
    RESOURCE_NUM = 0; // 资源数

    SAFE_SEQUENCE_NUM = 0;
    SAFE_SEQUENCE_ARR = [];

    TEXTAREA_TXT = "";

    MAX = [];
    ALLOCATION = [];
    AVAILABLE = [];
    AVAILABLE_COPY = [];
    NEED = [];

    ORDER_STR = [];
    POSS_ORDER_ARR = [];
}


/**
 * @method  [generateRandMaxAllocation]
 * @description [随机初始化MAX和ALLOCATION]
 * @return {[type]} [description]
 */
function generateRandMaxAllocation() {
    var tmpArr1 = [], tmpArr2 = []; // 用于临时存储
    var rand = 0;

    for(var i=0; i<PROGRESS_NUM; i++) {
        tmpArr1 = [];
        tmpArr2 = [];
        for(var j=0; j<RESOURCE_NUM; j++) {
            rand = getRandIntBetweenAB(0, 3);
            tmpArr1.push(rand);
            tmpArr2.push(rand + getRandIntBetweenAB(0, 6));
        }
        ALLOCATION.push(tmpArr1);
        MAX.push(tmpArr2);
    }
}


/**
 * @method [generateRandAvailable]
 * @description [随机初始化AVAILABLE]
 * @return {[type]} [description]
 */
function generateRandAvailable() {
    for(var i=0; i<RESOURCE_NUM; i++) {
        AVAILABLE.push(getRandIntBetweenAB(0, 3));
    }
}


/**
 * @method [isNeedSafe]
 * @description [判断现有资源AVAILABLE_COPY是否小于某进程NEED]
 * @param  {[type]}  pos [description]
 * @return {Boolean}     [description]
 */
function isNeedSafe(pos) {
    for(var i=0; i<RESOURCE_NUM; i++) {
        if(AVAILABLE_COPY[i] < NEED[pos][i]) {
            return false;
        }
    }

    return true;
}


/**
 * @method [updateAvailableCopy]
 * @description [更新AVAILABLE_COPY]
 * @param  {[type]}  pos [description]
 * @return {Boolean}     [description]
 */
function updateAvailableCopy(pos) {
    for(var i=0; i<RESOURCE_NUM; i++) {
        AVAILABLE_COPY[i] += ALLOCATION[pos][i]; // 不需要减去NEED,因为也会释放
    }
}


/**
 * @method [generateSafeSequence]
 * @description [计算所有安全序列]
 * @return {[type]} [description]
 */
function generateSafeSequence() {
    TEXTAREA_TXT = "所有安全序列如下:\n"; // 开始记录过程
    AVAILABLE_COPY = cloneArr(AVAILABLE);

    // 按照可能的顺序依次判断
    for(var i=0, len1=POSS_ORDER_ARR.length; i<len1; i++) {
        for(var j=0, len2=PROGRESS_NUM; j<len2; j++) {
            // 判断是否安全
            if(isNeedSafe(POSS_ORDER_ARR[i][j]) === false) {
                break;
            } else {
                updateAvailableCopy(POSS_ORDER_ARR[i][j]); // 暂时安全,更新AVAILABLE_COPY
            }

            // 形成一条安全序列
            if(j === PROGRESS_NUM - 1) {
                SAFE_SEQUENCE_NUM++;
                TEXTAREA_TXT += "安全序列" + SAFE_SEQUENCE_NUM + ":  " +
                          getExecOrderStr(POSS_ORDER_ARR[i]) + "\n";
                SAFE_SEQUENCE_ARR.push(POSS_ORDER_ARR[i]);
            }
        }
        AVAILABLE_COPY = cloneArr(AVAILABLE);
    }
}