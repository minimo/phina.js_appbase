/*
 *  Application.js
 *  2015/09/09
 *  @auther minimo  
 *  This Program is MIT license.
 */

//namespace phinaApp
phinaApp = {};

phina.define("phinaApp.Application", {
    superClass: "phina.display.CanvasApp",

	_static: {
        version: "0.0.1",

        //ＢＧＭ＆効果音
        bgm: null,
        bgmIsPlay: false,
        sounds: null,
        volumeBGM: 1,
        volumeSE: 1,

        //バックグラウンドカラー
        backgroundColor: 'rgba(0, 0, 0, 1)',
    },

    init: function(param) {
        this.superInit(param);
        this.$extend(this._static);

        //設定情報の読み込み
        this.loadConfig();
    },

    _onLoadAssets: function() {
    },

    //設定データの保存
    saveConfig: function() {
        return this;
    },

    //設定データの読み込み
    loadConfig: function() {
        return this;
    },

    playBGM: function(asset) {
    },

    setVolumeBGM: function(vol) {

    },

    playSE: function(asset) {
    },

    setVolumeSE: function(vol) {

    },

    _accessor: {
        volumeBGM: {
            "get": function() { return this.sounds.volumeBGM; },
            "set": function(vol) { this.setVolumeBGM(vol); }
        },
        volumeSE: {
            "get": function() { return this.sounds.volumeSE; },
            "set": function(vol) { this.setVolumeSE(vol); }
        }
    }
});
