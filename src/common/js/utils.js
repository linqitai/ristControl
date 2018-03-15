export function headAPP(t) {
  if (jiexin.isIos()) {
    jiexin.isShowRight = function () {
      alert(123);
      var aa = {};
      aa.title = '我的';
      aa.imageUrl = '';
      isShowRightButton(aa);
    }
  }
  if (jiexin.isAndroid()) {
    jiexin.isShowRight = function () {
      alert(123);
      var aa = {};
      aa.code = 1;
      aa.title = '我的';
      aa.imageUrl = '';
      // console.log(JSON.stringify(aa))
      htmlToJava.handleEDunWebViewAction(JSON.stringify(aa));
    }
  }
}