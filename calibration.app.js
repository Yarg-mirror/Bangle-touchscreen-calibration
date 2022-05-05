app = {};

function init() {
  E.srand(Date.now());
  g.setFont('Vector', 10);
	app.appName = 'calibration';
  app.xoffset = 0;
  app.yoffset = 0;
	app.x = 0;
	app.y = 0;

  let modes = {
    idx   : 0,
    mode  : 'custom',
    btn   : function(n) {
      save();
      Bangle.showLauncher();
    },
    touch : function(btn, xy) {
      app.xoffset = Math.round((app.xoffset + (app.x - Math.floor((app.x + xy.x)/2)))/2);
      app.yoffset = Math.round((app.yoffset + (app.y - Math.floor((app.y + xy.y)/2)))/2);
      drawTarget();
    },
  };
  Bangle.setUI(modes);
  }

function explain() {
  /*
   * TODO:
   * Present how to use the application
   *
   */
}

function save() {
  require('Storage').writeJSON(app.appName + '.json', {
    xoffset: app.xoffset,
    yoffset: app.yoffset,
  });
}

function drawTarget() {
  app.x = 16 + Math.floor(Math.random() * (g.getWidth() - 32));
  app.y = 40 + Math.floor(Math.random() * (g.getHeight() - 80));

  g.clearRect(0, 24, g.getWidth(), g.getHeight() - 24);
  g.drawLine(app.x, app.y - 5, app.x, app.y + 5);
  g.drawLine(app.x - 5, app.y, app.x + 5, app.y);
  g.drawString('current offset: ' + app.xoffset + ', ' + app.yoffset, 0, 24);
}


Bangle.loadWidgets();
Bangle.drawWidgets();

explain();

// if a calibration was previously made cancel it's effects
save();

init();

drawTarget();
