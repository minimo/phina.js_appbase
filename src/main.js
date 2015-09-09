/*
 *  main.js
 *  2015/09/08
 *  @auther minimo  
 *  This Program is MIT license.
 */

//phina.globalize();

//スクリーンサイズ
var SC_W = 640;
var SC_H = 960;

window.onload = function() {
    var loader = phina.asset.AssetLoader();
    loader.load(assets["IPL"]).then(function() {
        app = phinaApp.Application({
            query: '#world',
            width: SC_W,
            height: SC_H,
        });
        app.replaceScene(phinaApp.MainScene());
        app.enableStats();
        app.run();
    });
};
