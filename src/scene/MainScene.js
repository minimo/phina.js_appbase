/*
 *  MainScene.js
 *  2015/09/08
 *  @auther minimo  
 *  This Program is MIT license.
 */

phina.define("phinaApp.MainScene", {
    superClass: 'phina.display.CanvasScene',

    init: function() {
        this.superInit();

        this.group = phina.display.CanvasElement().addChildTo(this);
    },

    update: function(app) {
    },

    onpointstart: function(e) {
        var p = e.pointer;
        var wave = phina.effect.Wave().addChildTo(this);
        wave.x = p.x;
        wave.y = p.y;
    },
});
