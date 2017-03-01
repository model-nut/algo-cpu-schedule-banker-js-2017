/**
 * author [luo0412]
 * date [2016-12-21]
 * description [银行家算法的dom操作]
 * @class [banker-dom.js]
 * @constructor
 */

// dom元素id如下
// progress_num_input
// resource_num_input
// available_input
// banker_demo_btn
// banker_manual_btn
// banker_rand_btn
// start_progress_btn
// request_vector_input
// banker_request_btn
// banker_table
// banker_textarea

$(document).ready(function() {
    // 示例查找的监听器
    $("#banker_demo_btn").click(function(){
        bankerDemo1Init();
        // bankerDemo2Init(); // 导入预存银行家算法的数据

        updateBankerInput();
        clearBankerTable(); // 清空表格
        updateBankerTable();
        updateBankerTextarea();

        // console.log("安全序列数" + SAFE_SEQUENCE_NUM);
    });

    // 手输查找的监听器
    $("#banker_manual_btn").click(function(){
        bankerManualInit(); // 根据input产生随机数组

        // 注意，不需要更新input
        clearBankerTable(); // 清空表格
        updateBankerTable();
        updateBankerTextarea();
    });

    // 随机查找的监听器
    $("#banker_rand_btn").click(function(){
        bankerRandInit(); // 随机生成初始化数据

        updateBankerInput();
        clearBankerTable(); // 清空表格
        updateBankerTable();
        updateBankerTextarea();
    });

    // 请求资源的监听器
    $("#banker_request_btn").click(function() {
        clearAvailableOfBankerTable(); // 清楚available列数据
        addAvailableToBankerTable(); // 将计算出来的available数据添加到表格
    });

    /**
     * @method [clearBankerTable]
     * @description [清空银行家算法表格所有数据]
     * @return {[type]} [description]
     */
    function clearBankerTable() {
        $("#banker_table td").html("");
    }

    /**
     * @method [clearAvailableOfBankerTable]
     * @description [清空银行家算法表格中availa列数据]
     * @return {[type]} [description]
     */
    function clearAvailableOfBankerTable() {
        for(i=0; i<6; i++) {
            $("#banker_table tr:eq(" + (i+1) + ") td:eq(3)").html("");
        }
    }

    /**
     * @method [updateBankerInput]
     * @description [初始化或更新input的值]
     * @return {[type]} [description]
     */
    function updateBankerInput() {
        $('#progress_num_input').val(PROGRESS_NUM);
        $('#resource_num_input').val(RESOURCE_NUM);
        $('#available_input').val(AVAILABLE.toString());
    }

    /**
     * @method [updateBankerTextarea]
     * @description [初始化或更新银行家算法的textarea]
     * @return {[type]} [description]
     */
    function updateBankerTextarea() {
        $('#banker_textarea').html(TEXTAREA_TXT);
    }

    /**
     * @method [updateBankerTable]
     * @description [初始化或更新银行家算法的table,显示max,allocation和need]
     * @return {[type]} [description]
     */
    function updateBankerTable() {
        // 显示max allocation need数据
        for(var i=0; i<PROGRESS_NUM; i++) {
            $("#banker_table tr:eq(" + (i+1) + ") td:eq(0)").html(MAX[i].toString());
            $("#banker_table tr:eq(" + (i+1) + ") td:eq(1)").html(ALLOCATION[i].toString());
            $("#banker_table tr:eq(" + (i+1) + ") td:eq(2)").html(NEED[i].toString());
        }
    }

    /**
     * @method [convertVectorToArr]
     * @description [将请求向量字符串转化成浮点型的数组]
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    function convertVectorToArr(str) {
        var s = str; // 值赋值
        s = s.replace(/ /gi, ""); // replace不改变str本身, 所以需要赋值
        s = s.replace(/,/gi, ""); // 去除空格和逗号
        var arr = s.split(""); // 拆成字符数组
        arr = arrParseFloat(arr); // 转化成浮点型数组
        return arr;
    }

    /**
     * @method [addAvailableToBankerTable]
     * @description [显示或更新银行家表格的available列]
     * @return {[type]} [description]
     */
    function addAvailableToBankerTable() {
        var progress = parseInt($("#start_progress_input").val()); // 获取请求进程号
        // console.log("开始进程" + progress);
        var arr = convertVectorToArr($("#request_vector_input").val()); // 获取请求向量数组
        // console.log("请求向量" + arr);

        // 请求向量与need和available的比较
        // 如果不符合条件提示
        for(var i=0; i<RESOURCE_NUM; i++) {
            if(arr[i] > AVAILABLE_COPY[i]) {
                alert("请求资源 > 可用资源, 需等待");
                return ;
            }

            if(arr[i] > NEED[progress][i]) {
                alert("请求资源 > need, 不安全");
                return ;
            }
        }

        var tmpArr = []; // 存储一条安全序列 例1,2,3,4,5
        for(i=0; i< SAFE_SEQUENCE_NUM; i++) {
            if(SAFE_SEQUENCE_ARR[i].toString().indexOf(progress + "") === 0) {
                // console.log("安全序列： " + SAFE_SEQUENCE_ARR[i]);
                tmpArr = SAFE_SEQUENCE_ARR[i];
                // console.log("安全序列： " + tmpArr);
                break;
            }
        }

        // 如果安全序列不存在
        if(tmpArr.length === 0) {
            alert("不存在安全序列");
            return ;
        } else {
            alert("存在安全序列" + tmpArr + "如表格所示");
            for(i=0; i<PROGRESS_NUM; i++) {
                $("#banker_table tr:eq(" + (tmpArr[i] + 1) + ") td:eq(3)").html( (i+1) + ") " + AVAILABLE_COPY);
                for(var j=0; j<RESOURCE_NUM; j++) {
                    AVAILABLE_COPY[j] += ALLOCATION[tmpArr[i]][j];
                }
            }
        }

    }

    /**
     * @method [bankerDemo1Init]
     * @description [导入教材示例1]
     * @return {[type]} [description]
     */
    function bankerDemo1Init() {
        var MAX1 = [[7, 5, 3],[3, 2, 2],[9, 0, 2],[2, 2, 2],[4, 3, 3]];
        var ALLOCATION1 = [[0, 1, 0],[2, 0, 0],[3, 0, 2],[2, 1, 1],[0, 0, 2]];
        var AVAILABLE1 = [3, 3, 2];

        resetBankerGlobalVar();
        PROGRESS_NUM = 5;
        RESOURCE_NUM = 3;

        MAX = cloneArr2D(MAX1);
        ALLOCATION = cloneArr2D(ALLOCATION1);
        AVAILABLE = cloneArr(AVAILABLE1);
        AVAILABLE_COPY = cloneArr(AVAILABLE);
        NEED = getSubArr2D(MAX, ALLOCATION);
        // console.log("NEED" + NEED);

        ORDER_STR = getOrderStr(PROGRESS_NUM);
        // console.log("ORDER_STR : " + ORDER_STR);
        generatePossOrderArr(""); // 生成顺序序列
        // displayArr2D(POSS_ORDER_ARR);
        generateSafeSequence(); // 生成安全序列
        // displayArr2D(SAFE_SEQUENCE_ARR);
        // console.log("安全序列数" + SAFE_SEQUENCE_NUM);

    }

    /**
     * @method [bankerDemo2Init]
     * @description [导入教材示例2]
     * @return {[type]} [description]
     */
    function bankerDemo2Init() {
        var MAX2 = [[8, 7, 5],[5, 2, 5],[6, 6, 2]];
        var ALLOCATION2 = [[4, 2, 0],[2, 0, 2],[1, 3, 2]];
        var AVAILABLE2 = [4, 3, 3];

        resetBankerGlobalVar();
        PROGRESS_NUM = 3;
        RESOURCE_NUM = 3;

        MAX = cloneArr2D(MAX2);
        ALLOCATION = cloneArr2D(ALLOCATION2);
        AVAILABLE = cloneArr(AVAILABLE2);
        AVAILABLE_COPY = cloneArr(AVAILABLE);
        NEED = getSubArr2D(MAX, ALLOCATION);
        // console.log("NEED" + NEED);

        ORDER_STR = getOrderStr(PROGRESS_NUM);
        // console.log("ORDER_STR : " + ORDER_STR);
        generatePossOrderArr(""); // 生成顺序序列
        // displayArr2D(POSS_ORDER_ARR);
        generateSafeSequence(); // 生成安全序列
        // displayArr2D(SAFE_SEQUENCE_ARR);
        // console.log("安全序列数" + SAFE_SEQUENCE_NUM);
    }

    /**
     * @method [bankerManualInit]
     * @description [指定资源数、进程数、AVAILABLE,其他数据随机]
     * @return {[type]} [description]
     */
    function bankerManualInit() {
        resetBankerGlobalVar();
        PROGRESS_NUM = parseInt( $("#progress_num_input").val() );
        RESOURCE_NUM = parseInt( $("#resource_num_input").val() );

        generateRandMaxAllocation(); // 随机初始化MAX 和 ALLOCATION
        AVAILABLE = convertVectorToArr($("#available_input").val()); // 获取AVAILABLE
        AVAILABLE_COPY = cloneArr(AVAILABLE); // 拷贝AVAILABLE副本
        NEED = getSubArr2D(MAX, ALLOCATION); // 获取NEED

        ORDER_STR = getOrderStr(PROGRESS_NUM);
        generatePossOrderArr(""); // 生成顺序序列
        generateSafeSequence(); // 生成安全序列
    }

    /**
     * @method [bankerRandInit]
     * @description [所有数据随机生成]
     * @return {[type]} [description]
     */
    function bankerRandInit() {
        resetBankerGlobalVar();
        PROGRESS_NUM = getRandIntBetweenAB(3, 6);
        RESOURCE_NUM = getRandIntBetweenAB(1, 4);

        generateRandMaxAllocation();
        generateRandAvailable();
        AVAILABLE_COPY = cloneArr(AVAILABLE); // 拷贝AVAILABLE副本
        NEED = getSubArr2D(MAX, ALLOCATION); // 获取NEED

        ORDER_STR = getOrderStr(PROGRESS_NUM);
        generatePossOrderArr(""); // 生成顺序序列
        generateSafeSequence(); // 生成安全序列
    }


}); // jq end