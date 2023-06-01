// 格式化时间
export const dateFormat = (date: string, format?: string) => {
    let dateObj = new Date(Date.parse(date));
    let fmt = format || 'yyyy-MM-dd hh:mm:ss';

    var o: O = {
        'M+': dateObj.getMonth() + 1, //月份
        'd+': dateObj.getDate(), //日
        'h+': dateObj.getHours(), //小时
        'm+': dateObj.getMinutes(), //分
        's+': dateObj.getSeconds(), //秒
        'q+': Math.floor((dateObj.getMonth() + 3) / 3), //季度
        S: dateObj.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (dateObj.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k as keyof O].toString() : ('00' + o[k as keyof O].toString()).substr(('' + o[k as keyof O].toString()).length));
    return fmt;
};
// 创建uuid
export const uuid = (len?: number, radix?: number) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
    const uuid = []
    let i
    radix = radix || chars.length
    if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        let r
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}

export const imgBase64 = (name: string) => {
    let shaObj = new jsSHA('SHA-512', 'TEXT');
    shaObj.update(name);
    var hash = shaObj.getHash('HEX');
    let data = new Identicon(hash, 280).toString();
    return 'data:image/png;base64,' + data;
};

// 已知文件比特求文件大小
export function getFileSize(fileByte: number) {
    let fileSizeByte = fileByte;
    let fileSizeMsg = "";
    if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + " KB";
    else if (fileSizeByte == 1048576) fileSizeMsg = "1 MB";
    else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + " MB";
    else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = "1 GB";
    else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + " GB";
    else fileSizeMsg = "文件超过1 TB";
    return fileSizeMsg;
}