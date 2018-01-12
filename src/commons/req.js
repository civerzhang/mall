
/*
  APP 调转页面封装
*/
export const tdxOpenUrl = args => {

  let openParam = $.extend(true, {
    OpenName: "你未设置Title",
    OpenType: "native",
    OpenUrl: "",
    OpenParam: {
      UrlType: "Relative",
      WebViewType: __tdxMobSystem == "Android" ? "JyURL" : "LocalURL"
    }
  }, args);

  __webCallTql.send("tdxOpenUrl", openParam, () => {});
};

/*
  APP 跳转 UIConfig.xml 功能
*/
export const tdxOpenNativeModule = urlParam => {

  let param = $.extend(true, {
    OpenParam: {},
    OpenID: ""
  }, urlParam);

  // alert(JSON.stringify(param));
  __webCallTql.send("tdxOpenNativeModule", param, () => {});
};

/*
  行情 session 发送交易请求
*/
const HqJyCallTql = function(params) {

  this.def = JSON.parse(JSON.stringify(params));
};

/*
  @param { String } entry 功能号
  @param { Array } params 对象数组 [{k1: v1, k2: v2, ...}]
  @param { Function } callback 回调
*/
HqJyCallTql.prototype.send = function(entry, params, callback) {

  __hqCallTql.objOptParam = {'sessionType': 'HQSession',"PasswordSessionID":"CurSession"};
  __hqCallTql.send(`TSTC.${entry}`, $.extend({}, this.def, params[0]), callback);
};

exports.HqJyCallTql = HqJyCallTql;