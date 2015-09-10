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

        var param = {fontSize: 128, fontFamily: "Orbitron-Regular"};
        this.label = phina.display.Label("test", param).addChildTo(this).setPosition(SC_W*0.5, SC_H*0.5);

        this.sprite = phina.display.Sprite("hiyoko", 32, 32)
            .addChildTo(this)
            .setPosition(SC_W*0.5, SC_H*0.5);
        this.sprite.setFrameIndex(0);
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
