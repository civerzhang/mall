// 活期理财，单个产品
export const hqlc = {
  name: "中融货币E",
  cards: [
    ["活期理财", "card-blue"],
    ["中低风险", "card-gray"]
  ],
  sy: ["七日年化收益率", "4.21%"]
};

// 定期理财，单个产品
export const dqlc = {
  name: "和盈滚滚添利90天",
  cards: [
    ["定期理财", "card-blue"],
    ["中低风险", "card-gray"]
  ],
  sy: ["业绩报酬基准", "4.95%"]
};

// 热门产品列表
export const hotList = [
  {
    name: "稳赢30天",
    cards: [
      ["定期理财", "card-blue"],
      ["中低风险", "card-gray"]
    ],
    col1: ["业绩报酬基准", "4.95%"],
    col2: ["起购金额", "1000", "0"], // 0 - 人民币，1 - 美元，2 - 港币
    label: ["保本理财  限量发售", "label-blue"]
  },
  {
    name: "大成景阳领先混合",
    cards: [
      ["基金", "card-orange"],
      ["中风险", "card-gray"]
    ],
    col1: ["今年以来涨幅", "10.22%"],
    col2: ["最新净值", "0.9199"],
    col3: ["起购金额", "1", "0"]
  },
  {
    name: "南方现金通货币E",
    cards: [
      ["基金", "card-orange"],
      ["中风险", "card-gray"],
      ["支持快赎", "card-blue2"]
    ],
    col1: ["七日年化收益率", "4.26%"],
    col2: ["万份收益", "1.3162"],
    col3: ["起购金额", "0", "0"]
  },
  {
    name: "国债理财",
    cards: [
      ["低风险", "card-gray"]
    ],
    col1: ["业绩报酬基准", "3.95%"],
    col2: ["最新净值", "1000", "0"],
    col3: ["起购金额", "1", "0"]
  }
];