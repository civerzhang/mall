/*
  数字进行3位加逗号处理，资产展示时需要


*/
export const toMoneyFormat = (num, dotNum) => {

  // 数字化，3位小数处理
  if(typeof num == "string") {
    num = parseFloat(num);
  }

  if(isNaN(num)) {
    return "--";
  }

  dotNum = dotNum == undefined ? 3 : dotNum; 
  num = num.toFixed(dotNum);

  let x = num.split(".");
  let x0 = x[0];
  let x1 = x[1];

  // 这里把 x0 如果为负数的情形去掉
  let x2 = "";
  if(x0[0] == "-") {
    x2 = "-";
    x0 = x0.substr(1);
  }

  let result = "";
  let re = /\d{3}$/;
  while( re.test(x0)) {

    result = `${RegExp.lastMatch}${result}`;
    if( x0 != RegExp.lastMatch) {
      result = `,${result}`;
      x0 = RegExp.leftContext;
    }
    else {
      x0 = "";
      break;
    }
  }

  if(x0) {
    result = `${x0}${result}`;
  }

  return `${x2}${result}.${x1}`;
};


/*
  币种判断：F5710 - 价格币种（人民币，美元，港币）
  盈亏，F204 字段相加
  总市值，F205 字段相加
  总资产：总市值 + 资金余额（F300）
*/
export const computeYk = rows => {

  let zyk = [0, 0, 0];
  let zsz = [0, 0, 0];
  rows.map( row => {
    let bz = row.F5710;
    bz = bz == "美元" ? 1 : (bz == "港币" ? 2 : 0);
    let yk = parseFloat(row.F204);
    let sz = parseFloat(row.F205);
    zyk[bz] += yk;
    zsz[bz] += sz;
  });

  return { 
    rmbYk: zyk[0], 
    gbYk: zyk[2], 
    myYk: zyk[1],
    rmbSz: zsz[0],
    gbSz: zsz[2],
    mySz: zsz[1]
  };
};

/*
  获取某个元素相对于 document 的位置 offsetLeft
*/
export const getRealOffset = target => {

  let offsetLeft = target.offsetLeft;
  let offsetTop = target.offsetTop;
  let current = target.offsetParent;

  while(current) {

    offsetLeft += current.offsetLeft;
    offsetTop += current.offsetTop;
    current = current.offsetParent;
  }

  return {
    offsetLeft,
    offsetTop
  };
};

/*
  获取 16 进制随机数
*/
export const getRnHex = () => {
  return parseInt(Math.random() * 10000).toString(16);
};

/*
  字段颜色应答

  @param { String } colorType 颜色配置设置，如 rg（涨红跌绿）
  @param { String } fieldValue 字段值
*/
export const getFieldColor = (colorType, fieldValue) => {

  if(colorType == "rg") {

    let value = parseFloat(fieldValue);
    if(value > 0) {
      return "#ff4d34";
    }
    else if(value < 0) {
      return "#1cbc54";
    }
  }

  return undefined;
};

/*
  格式化数据
*/
export const formatValueType = (value, type) => {

  if(value == -999 || !value) {
    return "--";
  }

  if(!type) {
    return value;
  }

  // 浮点型，小数
  let matchF = type.match(/^\.(\d)f$/);
  if(matchF) {
    let num = matchF[1];
    return parseFloat(value).toFixed(num);
  }

  // 金钱
  let matchM = type.match(/^(\d)m$/);
  if(matchM) {
    let num = matchM[1];
    return toMoneyFormat(value, num);
  }

  // 百分比
  let matchP = type.match(/^(\d)%$/);
  if(matchP) {
    let num = matchP[1];
    let p = parseFloat(value).toFixed(num);
    return `${p}%`;
  }

  return value || "--";
};

/*
  
  获取 url 中的参数

  @param { String } search location.search 部分
*/
export const getUrlParam = search => {

  if(search) {

    let rt = {};
    let sArr = search.substr(1).split("&");
    sArr.map(ss => {
      let o = ss.split("=");
      rt[o[0]] = o[1];
    });
    
    return rt;
  }
  else {
    return {};
  }
};


/*
  highcharts 默认配置
*/
export const hcDefConf = {

  credits: {
    enabled: false
  },
  colors: [
    "#4696f5", '#7cb5ec', '#434348', 
    '#90ed7d', '#f7a35c', '#8085e9', 
    '#f15c80', '#e4d354', '#2b908f', 
    '#f45b5b', '#91e8e1'
  ],          // 需要添加多个线的颜色
  title: {
    text: null
  },
  yAxis: {
    min: 0,
    labels: {
      style: {
        "color": "#bababa",
        "fontSize": "10px"
      }
    },
    title: {
      text: null
    },
    tickAmount: 10,
    gridLineColor: "#f0f0f0",
    gridLineDashStyle: "ShortDot"
  },
  xAxis: {
    tickLength: 0,
    labels: {
      style: {
        "color": "#bababa",
        "fontSize": "10px"
      },
      align: "right",
      enabled: false
    },
    lineColor: "#f0f0f0"
  },
  legend: {
    align: "right",
    verticalAlign: "top",
    floating: true,
    x: 0,
    y: -15,
    symbolRadius: 0,
    symbolWidth: 10,
    symbolHeight: 3,
    itemStyle: {
      "color": "#bababa",
      "fontSize": "10px",
      "lineHeight": "20px"
    }
  },
  plotOptions: {
    line: {
      lineWidth: 1,
      marker: {
        radius: 0
      }
    }
  },
  labels: {
    style: {
      "color": "#bababa",
      "fontSize": "10px"
    }
  }
};

/*
  双轴 highcharts 配置
*/
export const hcDefConf2 = {

  credits: {
    enabled: false
  },
  colors: [
    "#4696f5", '#7cb5ec', '#434348', 
    '#90ed7d', '#f7a35c', '#8085e9', 
    '#f15c80', '#e4d354', '#2b908f', 
    '#f45b5b', '#91e8e1'
  ],          // 需要添加多个线的颜色
  title: {
    text: null
  },
  yAxis: [
    {
      min: 0,
      labels: {
        style: {
          "color": "#bababa",
          "fontSize": "10px"
        }
      },
      title: {
        text: null
      },
      tickAmount: 10,
      gridLineColor: "#f0f0f0",
      gridLineDashStyle: "ShortDot"
    },
    {
      min: 0,
      opposite: true,
      labels: {
        style: {
          "color": "#bababa",
          "fontSize": "10px"
        }
      },
      title: {
        text: null
      },
      tickAmount: 10,
      gridLineColor: "#f0f0f0",
      gridLineDashStyle: "ShortDot"
    }
  ],
  xAxis: {
    tickLength: 0,
    labels: {
      style: {
        "color": "#bababa",
        "fontSize": "10px"
      },
      align: "right",
      enabled: false
    },
    lineColor: "#f0f0f0"
  },
  legend: {
    // align: "right",
    // verticalAlign: "top",
    // floating: true,
    // x: 0,
    // y: -15,
    symbolRadius: 0,
    symbolWidth: 10,
    symbolHeight: 3,
    itemStyle: {
      "color": "#bababa",
      "fontSize": "10px",
      "lineHeight": "20px"
    }
  },
  plotOptions: {
    line: {
      lineWidth: 1,
      marker: {
        radius: 0
      }
    }
  },
  labels: {
    style: {
      "color": "#bababa",
      "fontSize": "10px"
    }
  }
};