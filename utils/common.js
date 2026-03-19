/**
* 显示消息提示框
* @param content 提示的标题
*/
export function toast(content) {
  uni.showToast({
    icon: 'none',
    title: content
  })
}

/**
* 显示模态弹窗
* @param content 提示的标题
*/
export function showConfirm(content) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: '提示',
      content: content,
      cancelText: '取消',
      confirmText: '确定',
      success: function(res) {
        resolve(res)
      }
    })
  })
}

/**
* 参数处理
* @param params 参数
*/
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + "="
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + "="
            result += subPart + encodeURIComponent(value[key]) + "&"
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&"
      }
    }
  }
  return result
}

// rgb转int
export function converRgbToArgb(r,g,b){
    var color = ((0x00 << 24)|(r << 16)|(g << 8)|b);
    return color;
}

// int转rgb
export function converArgbToRgb(argb){
    var rgb = [];
    rgb[0] = (argb & 0xff0000) >> 16;
    rgb[1] = (argb & 0xff00) >> 8;
    rgb[2] = (argb & 0xff);
    return "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")";
}

//16进制转rgb
export function HEXtoRGB(hex) {
	const HEX_REG = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
	const result = HEX_REG.exec(hex)
	return result ? [
		parseInt(result[1], 16),
		parseInt(result[2], 16),
		parseInt(result[3], 16)
	] : null;
}

//16进制转数组
export function hexStringToArray(str,lenth) {
  var pos = 0;
  var len = str.length;
  if (len % (lenth? lenth:2) != 0) {
	return null;
  }
  len /= lenth? lenth:2;
  var arrBytes = new Array();
  for (var i = 0; i < len; i++) {
	var s = str.substr(pos, lenth? lenth:2);
	arrBytes.push(s);
	pos += lenth? lenth:2;
  }
  return arrBytes;
}

//字节数组转16进制
export function BytesToHexString(arrBytes) {
  var str = "";
  for (var i = 0; i < arrBytes.length; i++) {
    var tmp;
    var num=arrBytes[i];
    if (num < 0) {
    //此处填坑，当byte因为符合位导致数值为负时候，需要对数据进行处理
      tmp =(255+num+1).toString(16);
    } else {
      tmp = num.toString(16);
    }
    if (tmp.length == 1) {
      tmp = "0" + tmp;
    }
    str += tmp;
  }
  return str;
}


// ASCII字符串转16进制字符串
export function asciiToHex(str) {
  let hex = '';
  for (let i = 0; i < str.length; i++) {
    let charCode = str.charCodeAt(i);
    hex += '0x'+charCode.toString(16).padStart(2, '0');
  }
  return hex;
}

// 16进制字符串转ASCII字符串
export function hexToAscii(hex) {
  let ascii = '';
  for (let i = 0; i < hex.length; i += 2) {
    let hexByte = hex.substr(i, 2);
    ascii += String.fromCharCode(parseInt(hexByte, 16));
  }
  return ascii;
}