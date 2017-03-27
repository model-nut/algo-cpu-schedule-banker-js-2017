/**
 * author luo0412
 * date 2016-09-11
 * description 公共函数库，可复用
 * @class [common.js]
 * @constructor
 */

/**
 * @method [isArrAllTrue]
 * @description [判断一个数组的元素是否全为true]
 * @param  {[type]}  arr [description]
 * @return {Boolean}     [description]
 * @example
 *     console.log(isArrAllTrue([true, false, true])); // false
 *     console.log(isArrAllTrue([true, true, true]));  // true
 */
function isArrAllTrue(arr) {
    for(var i in arr) {
        if(arr[i] === false) {
            return false;
        }
    }
    return true;
}

/**
 * @method  [isArrAllZero ]
 * @description [判断一个数组的元素是否全为0]
 * @param  {[type]}  arr [description]
 * @return {Boolean}     [description]
 * @example
 *     console.log(isArrAllZero([0, 9, 0])); // false
 *     console.log(isArrAllZero([0, 0, 0])); // true
 */
function isArrAllZero(arr) {
    for(var i in arr) {
        if(arr[i] !== 0) {
            return false;
        }
    }
    return true;
}


/**
 * @method [getExecOrderStr]
 * @description [ 执行顺序数组转化成字符串]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 * @example
 *     console.log(getExecOrderStr([0, 2, 1, 3])); // p0->p2->p1->p3
 */
function getExecOrderStr(arr) {
    var a = [];
    a.push(arr[0]);
    for(var i=1,len=arr.length;i<len; i++) {
        if(arr[i] !== a[a.length - 1]) {
            a.push(arr[i]);
        }
    }
    return "p" + a.join("->p");
}



/**
 * @method [getSubArr]
 * @description [ 数组作差得到的arr 例arr1 - arr2]
 * @param  {[type]} arr1 [description]
 * @param  {[type]} arr2 [description]
 * @return {[type]}      [description]
 * @example
 *     console.log(getSubArr([6, 4.2, 2], [4, 1, 6]));
 */
function getSubArr(arr1, arr2) {
    var a = [];
    for(var i in arr1) {
        a[i] = arr1[i] - arr2[i];
    }
    return a;
}

/**
 * @method [getSubArr2D]
 * @description [ 数组作差得到的arr2D 例arr1 - arr2]
 * @param  {[type]} arr1 [description]
 * @param  {[type]} arr2 [description]
 * @return {[type]}      [description]
 */
function getSubArr2D(arr1, arr2) {
    var a = [];
    var b = []; // 二维数组
    for(var i=0, len1=arr1.length;i<len1; i++) {
        a = [];
        for(var j=0, len2=arr1[i].length;j<len2; j++) {
            a[j] = arr1[i][j] - arr2[i][j];
        }
        b.push(a);
    }
    return b;
}


/**
 * @method [getDivArr]
 * @description [ 数组作商得到的arr 例arr1 / arr2]
 * @param  {[type]} arr1 [description]
 * @param  {[type]} arr2 [description]
 * @return {[type]}      [description]
 * @example
 *     console.log(getDivArr([6, 4, 2], [4, 1, 6]));
 */
function getDivArr(arr1, arr2) {
    var a = [];
    for(var i in arr1) {
        a[i] = parseFloat( (arr1[i] / arr2[i]).toFixed(3) ); // 数组存为str
    }
    return a;
}


/**
 * @method [getAvgValOfArr]
 * @description [获取数组的平均值]
 * @param  {[type]} arr [description]
 * @return {[float]}     [description]
 * @example
 *      console.log( "getAvgValOfArr : " + getAvgValOfArr([1, 5, 8]) );
 */
function getAvgValOfArr(arr) {
    var len = arr.length;
    var sum = 0;
    for(var i in arr) {
        sum += arr[i];
    }
    return sum / len;
}


/**
 * @method [getMinValOfArr]
 * @description [获取一维数组最小值]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function getMinValOfArr(arr) {
    var min = arr[0];
    for(var i in arr) {
        if(arr[i] < min) {
            min = arr[i];
        }
    }
    return min;
}


/**
 * @method [getMaxValOfArr]
 * @description [获取一维数组最大值]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function getMaxValOfArr(arr) {
    var max = arr[0];
    for(var i in arr) {
        if(arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}


/**
 * @method [arr2DParseFloat]
 * @description [二维数组全部元素转化成float类型]
 * @param  {[type]} arr [description]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function arr2DParseFloat(arr) {
    var a = cloneArr2D(arr);
    for(var i=0, len1= arr.length; i<len1; i++) {
        for(var j=0, len2=arr[0].length; j<len2; j++) {
            a[i][j] = parseFloat(a[i][j]);
        }
    }
    return a;
}


/**
 * @method [arrParseFloat]
 * @description [一维数组全部元素转化成float类型]
 * @param  {[type]} arr [description]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function arrParseFloat(arr) {
    var a = cloneArr(arr);
    for(var i=0, len1= arr.length; i<len1; i++) {
        a[i] = parseFloat(a[i]);
    }
    return a;
}

/**
 * @method [arrParseInt]
 * @description [一维数组全部元素转化成int类型]
 * @param  {[type]} arr [description]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function arrParseInt(arr) {
    var a = cloneArr(arr);
    for(var i=0, len1= arr.length; i<len1; i++) {
        a[i] = parseInt(a[i]);
    }
    return a;
}



/**
 * @method [arr2DToFixedN]
 * @description [将二维数组各个固定小数点后位数]
 * @param  {[arr]} n  [元素都为number的二维数组]
 * @param  {[number]} n [int, 小数点后固定的位数]
 * @return {[arr]}   [str二维数组]
 * @example
 *     var a = [["1.233333", 2], [4,5], [5, 78, 9], [9, 0]];
 *     displayArr2D(arr2DToFixedN(arr2DParseFloat(a), 3));
 *     // output:
 *     // 1.233   2.000
 *     // 4.000   5.000
 *     // 5.000   78.000  9
 *     // 9.000   0.000
 * @example
 *     console.log(typeof arr2DParseFloat(a)[0][0]); // number
 *     console.log(typeof arr2DToFixedN(arr2DParseFloat(a), 3)[0][0]); // string
 */
function arr2DToFixedN(arr, n) {
    var a = cloneArr2D(arr);
    for(var i=0, len1= arr.length; i<len1; i++) {
        for(var j=0, len2=arr[0].length; j<len2; j++) {
            a[i][j] = a[i][j].toFixed(n);
        }
    }
    return a;
}

/**
 * @method [arrToFixedN]
 * @description [将一维数组各个固定小数点后位数]
 * @param  {[arr]} n  [元素都为number的二维数组]
 * @param  {[number]} n [int, 小数点后固定的位数]
 * @return {[arr]}   [str二维数组]
 */
function arrToFixedN(arr, n) {
    var a = cloneArr(arr);
    for(var i=0, len1= arr.length; i<len1; i++) {
        a[i] = a[i].toFixed(n);
    }
    return a;
}


/**
 * @method [cloneArr]
 * @description [复制一维数组]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function cloneArr(arr) {
    var a = [];
    for(var i in arr) {
        a.push(arr[i]);
    }
    return a;
}

/**
 * @method [cloneArr2D]
 * @description [复制二维数组]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function cloneArr2D(arr) {
    var a = []; // 二维数组
    var b = [];
    for(var i=0,len1=arr.length; i<len1; i++) {
        b = [];
         for(var j=0,len2=arr[i].length; j<len2; j++) {
            b.push(arr[i][j]);
         }
         a.push(b); // 二维数组拷贝分两步
    }
    return a;
}

/**
 * @method [displayArr]
 * @description 打印一维数组,测试用
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function displayArr(arr) {
    var str = "";
    for(var i in arr) {
        str +=  "\t" + arr[i];
    }
    console.log(str + "\n");
}

/**
 * @method [displayArr2D]
 * @description 打印二维数组,测试用
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function displayArr2D(arr) {
    var str = "";
    for(var i=0,len1=arr.length; i<len1; i++) {
        str = "";
        for(var j=0,len2=arr[i].length; j<len2; j++) {
            str += "\t" + arr[i][j];
        }
        console.log(str);
    }
    console.log();
}

/**
 * @method [getReciprocalArr]
 * @description [将一维数组各元素取倒数后得到的数组]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 * @example
 *     var arr = getReciprocalArr([1,2,3]);
 *     displayArr( arr );
 *     arr = arrToFixedN( arr, 3 );
 *     displayArr( arr);
 */
function getReciprocalArr(arr) {
    var a = [];
    for(var i in arr) {
        a[i] = 1 / arr[i];
    }
    return a;
}


/**
 * @method [getNumFloorOfArr]
 * @description [找出数组中比num大的最小元素]
 * @param  {[type]} arr [description]
 * @param  {[type]} num [description]
 * @return {[type]}     [description]
 */
function getFloorNumOfArr(arr, num) {
    var a = [];

    // 找出所有比num大的元素加入数组a
    for(var i in arr) {
        if(arr[i] > num) {
            a.push(arr[i]);
        }
    }

    // 如arr不存在大于等于num的数，则返回false
    if(a.length === 0) {
        return false;
    } else {
       return getMinValOfArr(a);
    }
}


/**
 * @method [getRandIntBetweenAB]
 * @description [ 获取[A,B]的随机整数 ]
 * @param  {[type]} A [description]
 * @param  {[type]} B [description]
 * @return {[type]}   [description]
 * @example
 *     console.log(getRandIntBetweenAB(2, 10));
 */
function getRandIntBetweenAB(A, B) {
    return parseInt(Math.random()*(B-A)) + A;
}

/**
 * @method [getRandArr2D]
 * @description [ 生成二维数组arr[x][y] ]
 * @param  {[type]} x [description]
 * @param  {[type]} y [description]
 * @return {[type]}   [description]
 */
function getRandArr2D(x, y) {
    var a = [];
    var b = []; // 二维数组
    for(var i=0; i<x; i++) {
        a = [];
        for(var j=0; j<y; j++) {
            a.push(getRandIntBetweenAB());
        }
        b.push(a);
    }
    return b;
}


// function Import()
// {
//     for( var i=0; i<arguments.length; i++ )
//     {
//         var file = arguments;
//         if ( file.match(/\\.js$/i))
//             document.write('<script type=\\"text/javascript\\" src=\\"' + file + '\\"></sc' + 'ript>');
//         else
//             document.write('<style type=\\"text/css\\">@import \\"' + file + '\\" ;</style>');
//     }
// };


/**
 * @method [getIndexOfAscendSortArr]
 * @description [值排序后输出值排序的下标]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 * @example
 *     console.log(getIndexOfAscendSortArr([2, 1, 3, 4])); // [ 1, 0, 2, 3 ]
 */
function getIndexOfAscendSortArr(arr) {
    var clonedArr = cloneArr(arr); // 克隆的值数组
    var len = arr.length;
    var indexArr = []; // 下标数组
    var tmpVal = 0;

    // 初始化下标数组
    for(var i=0; i<len; i++) {
        indexArr.push(i);
    }

    // 冒泡排序
    for(i=0; i<len-1; i++) {
        for(var j=0; j<len-1-i; j++) {
            if(clonedArr[j] > clonedArr[j+1]) {
                // 交换值
                tmpVal = clonedArr[j];
                clonedArr[j] = clonedArr[j+1];
                clonedArr[j+1] = tmpVal;

                // 同步交换下标
                tmpVal = indexArr[j];
                indexArr[j] = indexArr[j+1];
                indexArr[j+1] = tmpVal;
            }
        }
    }

    return indexArr;
}