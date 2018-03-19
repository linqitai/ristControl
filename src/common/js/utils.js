export function headAPP(t) {

  if (jiexin.isIos()) {
    jiexin.isShowRight = function () {
      var aa = {};
      aa.title = '';
      aa.imageUrl = 'https://qiniujiexino2opublic.51icare.cn/icon_help@3x.png';
      isShowRightButton(aa);
    }
  }

  if (jiexin.isAndroid()) {
    jiexin.isShowRight = function () {
      var aa = {};
      aa.code = 1;
      aa.title = '';
      aa.imageUrl = 'https://qiniujiexino2opublic.51icare.cn/icon_help@3x.png';
      // https://qiniujiexino2opublic.51icare.cn/icon_help@3x.png
      // console.log(JSON.stringify(aa))
      htmlToJava.handleEDunWebViewAction(JSON.stringify(aa));
    }
  }

  jiexin.rightEvent = function(){
    jiexin.openWindow({
      url: document.location.protocol+'//'+window.location.host+ '/#/help',
      viewid:'zsfhelp',
      title:'帮助中心'
    })
  }

}