phina.namespace(function() {
  phina.define('phina.asset.AssetLoader', {
    superClass: "phina.util.EventDispatcher",

    /**
     * @constructor
     */
    init: function(params) {
      this.superInit();

      params = (params || {}).$safe({
        cache: true,
      });

      this.assets = {};
      this.cache = params.cache;
    },

    load: function(params) {
      var self = this;
      var flows = [];

      params.forIn(function(type, assets) {
        assets.forIn(function(key, value) {
          var func = phina.asset.AssetLoader.assetLoadFunctions[type];
          var flow = func(value);
          flow.then(function(asset) {
            if (self.cache) {
              phina.asset.AssetManager.set(type, key, asset);
            }
          });
          flows.push(flow);
        });
      });

      return phina.util.Flow.all(flows).then(function(args) {
      });
    },

    _static: {
      assetLoadFunctions: {
        image: function(path) {
          var texture = phina.asset.Texture();
          var flow = texture.load(path);
          return flow;
        },
        sound: function(path) {
          var sound = phina.asset.Sound();
          var flow = audio.load(path);
          return flow;
        },
        spritesheet: function(path) {
          var ss = phina.asset.SpriteSheet();
          var flow = ss.load(path);
          return flow;
        },
        script: function(path) {
          var script = phina.asset.Script();
          return script.load(path);
        },
        font: function(path) {
          var font = phina.asset.Font();
          return font.load(path);
        },
      }
    }

  });
});

phina.namespace(function() {
    phina.define("phina.asset.Font", {
        superClass: "phina.asset.Asset",

        init: function(path) {
            this.superInit();

            var fontFaceStyleElement = tm.dom.Element("head").create("style");
            fontFaceStyleElement.text = "@font-face { font-family: '{0}'; src: url({1}) format('{2}'); }".format(key, path, format);

            tm.asset.Font.checkLoaded(key, function() {
                this.flare("load");
            }.bind(this));
        },
    });

    tm.asset.Font.checkLoaded = function (font, callback) {
        var canvas = tm.graphics.Canvas();
        var DEFAULT_FONT = canvas.context.font.split(' ')[1];
        canvas.context.font = '40px ' + DEFAULT_FONT;

        var checkText = "1234567890-^\\qwertyuiop@[asdfghjkl;:]zxcvbnm,./\!\"#$%&'()=~|QWERTYUIOP`{ASDFGHJKL+*}ZXCVBNM<>?_１２３４５６７８９０－＾￥ｑｗｅｒｔｙｕｉｏｐａｓｄｆｇｈｊｋｌｚｘｃｖｂｎｍ，．あいうかさたなをん時は金なり";

        var before = canvas.context.measureText(checkText).width;
        canvas.context.font = '40px ' + font + ', ' + DEFAULT_FONT;

        var checkLoadFont = function () {
            if (canvas.context.measureText(checkText).width !== before) {
                callback && callback();
            } else {
                setTimeout(checkLoadFont, 100);
            }
        };
        setTimeout(checkLoadFont, 100);
    };

    tm.asset.Loader.register("ttf", function(path, key) {
        return tm.asset.Font(path, key, "truetype");
    });
    tm.asset.Loader.register("otf", function(path, key) {
        return tm.asset.Font(path, key, "opentype");
    });
    tm.asset.Loader.register("woff", function(path, key) {
        return tm.asset.Font(path, key, "woff");
    });
    tm.asset.Loader.register("woff2", function(path, key) {
        return tm.asset.Font(path, key, "woff2");
    });
});
