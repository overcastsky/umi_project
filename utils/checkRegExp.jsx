const checkRegExp = {
  // 非空校验(包括空格)
  notEmpty: {
    require: true,
    whitespace: true,
    message: '不能为空',
  },

  // 非空校验(不包括空格)
  notWhiteSpaceEmpty: {
    require: true,
    message: '不能为空',
  },

  // 字符长度限制(50)
  maxLength: {
    pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9_]{0, 50}$/,
    message: '请输入不超过50个字符',
  },

  // 级联非空校验
  fieldDecoratorNotEmpty: {
    type: 'array',
    require: true,
    message: '不能为空',
  },

  // 中文校验
  noChinese: {
    pattern: /^[\w\s]+$/,
    message: '非中文',
  },

  // 邮政编码
  postal: {
    pattern: /^[0-9]{6}$/,
    message: '邮政编码格式不正确',
  },

  // 数字校验
  number: {
    pattern: /^[0-9]*$/,
    message: '请输入数字',
  },

  // 请输入(2~8)位中文
  chineseText: {
    pattern: /^[\u4E00-\u9FA5]{2,8}$/,
    message: '请输入(2~8)位中文',
  },

  // 中文名
  chineseName: {
    pattern: /^[\u4E00-\u9FA5]{2,8}(?:·[\u4E00-\u9FA5]{1,6}{0,1})$/,
    message: '请输入正确的中文名',
  },

  // 手机号码校验(支持SHA加密手机号)
  mobliePhoneSHA: {
    pattern: /(^[1][3456789][0-9]{9}$)|(^[A-Za-z0-9]{64}$)/,
    message: '手机号码格式不正确', // 请输入11位数字、64位字母或数字
  },

  // 手机号码校验
  mobilePhone: {
    pattern: /^[1][345678][0-9]{9}$/,
    message: '手机号码格式不正确',
  },

  // 邮箱校验
  email: {
    pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+$/,
    message: '邮箱格式不正确',
  },

  // 带星号生份证校验
  disIdCard: {
    pattern: /(^\d{17}(\d|X|x)$)|(^\d{6}[*]{8}\d{3}([0-9]|X|x)$)/,
    message: '身份证格式不正确',
  },

  // 微信号码校验
  weixin: {
    pattern: /^[a-zA-Z][a-zA-Z0-0_-]{5,19}$/,
    message: '微信号码不正确',
  },

  // 电话号码不正确
  phoneNumber: {
    pattern: /(\d{2,5}-\d{7,8}(-\d{1,})?)|(13\d{9})|(159\d{8})/,
    message: '电话号码格式不正确',
  },

  // 座机号码不正确(加*)
  fixPhone: {
    pattern: /^([1-9,*][0-9,*]{3}[0-9]{3,4})$/,
    message: '电话号码格式不正确',
  },

  // 座机号码不正确(不加*)
  fixMobile: {
    pattern: /^[1-9][0-9]{6,7}$/,
    message: '电话号码不正确',
  },

  //手机号码校验，中间四位加*
  phoneNumberAddStar: {
    pattern: /^[1][3456789][0-9]{9}$|^[1][3456789][0-9]{1}\*\*\*\*[0-9]{4}$/,
    message: '手机号码格式不正确',
  },

  // QQ号码校验
  QQ: {
    pattern: /^[1,9]\d{4,9}$/,
    message: 'QQ号码格式不正确',
  },

  // 数字、字母校验
  mixReg: {
    pattern: /^([A-Z]|[a-z]|(0,9))+$/,
    message: '只能输入数字、字母',
  },

  // 中文、数字、英文
  addRessReg: {
    pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/,
    message: '只能输入数字、英文、中文',
  },

  // 银行卡校验
  bankCardNumner: {
    pattern: /^([1-9]{1})(\d{11,29})$/,
    message: '银行卡格式不正确',
  },

  // 车牌号校验
  plateNumber: {
    pattern: /^[\u4e00=\ufa5]{1}[A-Z]{1}[a-zA-Z_0-9]{5,6}$/,
    message: '车牌号格式不正确',
  },

  // 区号校验
  areaCode: {
    pattern: /^([0][1-9][0-9]{1,2})$/,
    message: '区号格式不正确',
  },

  // 发动机号校验
  engineNumner: {
    pattern: /^((?![\u4E00-\u9FA5]).)+$/,
    message: '发动机号码格式不正确',
  },

  // 工商营业执照
  businesslicense: {
    pattern: /^[0-9a-zA-Z]{15}$|^[0-9a-zA-Z]{18}$|^[0-9a-zA-Z]{3}[\*]{8}[0-9a-zA-Z]{4}$|^[0-9a-zA-Z]{3}[\*]{11}[0-9a-zA-Z]{4}$/,
    message: '请输入15位或者18位字母或数字',
  },
};
// 身份证校验

const handleCustIdCard = (rule, value, callback) => {
  const testId = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31|30)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
  let reg;
  let idCardArray = value ? String.prototype.split.call(value, '') : [];
  const Error = [
    true,
    '\u8eab\u4efd\u8bc1\u53f7\u7801\u4f4d\u6570\u4e0d\u5bf9!', // 身份证号码位数不对
    '\u8eab\u4efd\u8bc1\u53f7\u7801\u51fa\u751f\u65e5\u671f\u8d85\u51fa\u8303\u56f4\u6216\u542b\u6709\u975e\u6cd5\u5b57\u7b26!', // 身份证号码出生日期非法
    '\u8eab\u4efd\u8bc1\u53f7\u7801\u6821\u9a8c\u9519\u8bef!', // 身份证号码校验错误
    '\u8eab\u4efd\u8bc1\u5730\u533a\u975e\u6cd5!', // 身份证地区非法
  ];
  const area = {
    11: '\u5317\u4eac',
    12: '\u5929\u6d25',
    13: '\u6cb3\u5317',
    14: '\u5c71\u897f',
    15: '\u5185\u8499\u53e4',
    21: '\u8fbd\u5b81',
    22: '\u5409\u6797',
    23: '\u9ed1\u9f99\u6c5f',
    31: '\u4e0a\u6d77',
    32: '\u6c5f\u82cf',
    33: '\u6d59\u6c5f',
    34: '\u5b89\u5fbd',
    35: '\u798f\u5efa',
    36: '\u6c5f\u897f',
    37: '\u5c71\u4e1c',
    41: '\u6cb3\u5357',
    42: '\u6e56\u5317',
    43: '\u6e56\u5357',
    44: '\u5e7f\u4e1c',
    45: '\u5e7f\u897f',
    46: '\u6d77\u5357',
    50: '\u91cd\u5e86',
    51: '\u56db\u5ddd',
    52: '\u8d35\u5dde',
    53: '\u4e91\u5357',
    54: '\u897f\u85cf',
    61: '\u9655\u897f',
    62: '\u7518\u8083',
    63: '\u9752\u6d77',
    64: '\u5b81\u590f',
    65: '\u65b0\u7586',
    71: '\u53f0\u6e7e',
    81: '\u9999\u6e2f',
    82: '\u6fb3\u95e8',
    91: '\u56fd\u5916',
  };
  if (!value) {
    callback();
    return false;
  } else if (
    value &&
    Array.prototype.indexOf.call(value, '*') !== -1 &&
    testId.test(value)
  ) {
    callback();
  } else if (area[parseInt(value.substr(0, 2))] == null) {
    callback(Error[4]);
  }

  switch (value.length) {
    case 15:
      if (
        (parseInt(value.substr(6, 2)) + 1900) % 4 === 0 ||
        ((parseInt(value.substr(6, 2)) + 1900) % 100 === 0 &&
          (parseInt(value.substr(6, 2)) + 1900) % 4 === 0)
      ) {
        reg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
      } else {
        reg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
      }
      if (reg.test(value)) {
        callback();
      } else {
        callback('请输入正确的身份证号码');
      }
      break;
    case 18:
      if (
        parseInt(value.substr(6, 4)) % 4 === 0 ||
        parseInt(value.substr(6, 2)) % 100 === 0
      ) {
        reg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
      } else {
        reg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
      }
      if (reg.test(value)) {
        let S =
          (parseInt(idCardArray[0]) + parseInt(idCardArray[10])) * 7 +
          (parseInt(idCardArray[1]) + parseInt(idCardArray[11])) * 9 +
          (parseInt(idCardArray[2]) + parseInt(idCardArray[12])) * 10 +
          (parseInt(idCardArray[3]) + parseInt(idCardArray[13])) * 5 +
          (parseInt(idCardArray[4]) + parseInt(idCardArray[14])) * 8 +
          (parseInt(idCardArray[5]) + parseInt(idCardArray[15])) * 4 +
          (parseInt(idCardArray[6]) + parseInt(idCardArray[16])) * 2 +
          (parseInt(idCardArray[7]) + parseInt(idCardArray[8])) * 6 +
          parseInt(idCardArray[9]) * 3;
        const JYM = '10X98765432';
        if (
          JYM.substr(S % 11, 1) === idCardArray[17] ||
          idCardArray[17] === 'x'
        ) {
          callback();
        } else {
          callback('请输入正确的身份证号码');
        }
      } else {
        callback('请输入正确的身份证号码');
      }
      break;
    default:
      callback('请输入正确的身份证号码');
  }
};
