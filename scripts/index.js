function IndexViewModel() {
    this.greetings = [
        "Witaj świecie!",
        "こんにちは世界",
        "Привет мир!",
        "Hej Verden!",
        "Hallo, Welt!",
        "你好，世界",
        "Hello, World!"
    ];

    this.greetingIndex = 0;
    this.currentGreeting = ko.observable("");
    this.currentGreeting(this.greetings[this.greetingIndex]);

    this.gradientCss = ko.observable("");

    this.colors = [
        [62,35,255],
        [60,255,60],
        [255,35,98],
        [45,175,230],
        [255,0,255],
        [255,128,0]
    ];

    this.colorStep = 0;
    this.colorIndices = [0, 1, 2, 3];
    this.gradientSpeed = 0.002;
    this.gradientDiv = $("#gradient");

    setInterval(UpdateGreeting, 1500);
    setInterval(UpdateGradient, 10);
}

function UpdateGreeting() {
    viewModel.greetingIndex++;

    if (viewModel.greetingIndex >= viewModel.greetings.length) {
        viewModel.greetingIndex = 0;
    }

    viewModel.currentGreeting(viewModel.greetings[viewModel.greetingIndex]);
}

function UpdateGradient() {
    var c0_0 = viewModel.colors[viewModel.colorIndices[0]];
    var c0_1 = viewModel.colors[viewModel.colorIndices[1]];
    var c1_0 = viewModel.colors[viewModel.colorIndices[2]];
    var c1_1 = viewModel.colors[viewModel.colorIndices[3]];

    var istep = 1 - viewModel.colorStep;
    var r1 = Math.round(istep * c0_0[0] + viewModel.colorStep * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + viewModel.colorStep * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + viewModel.colorStep * c0_1[2]);
    var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

    var r2 = Math.round(istep * c1_0[0] + viewModel.colorStep * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + viewModel.colorStep * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + viewModel.colorStep * c1_1[2]);
    var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

    viewModel.gradientDiv
        .css(
            { background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))" }
        )
        .css(
            { background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)" }
        );
  
    viewModel.colorStep += viewModel.gradientSpeed;
    if (viewModel.colorStep >= 1)
    {
        viewModel.colorStep %= 1;
        viewModel.colorIndices[0] = viewModel.colorIndices[1];
        viewModel.colorIndices[2] = viewModel.colorIndices[3];
        
        viewModel.colorIndices[1] = (viewModel.colorIndices[1] + Math.floor( 1 + Math.random() * (viewModel.colors.length - 1))) % viewModel.colors.length;
        viewModel.colorIndices[3] = (viewModel.colorIndices[3] + Math.floor( 1 + Math.random() * (viewModel.colors.length - 1))) % viewModel.colors.length;
    }
}

var viewModel;

window.onload = function() {
    viewModel = new IndexViewModel();
    ko.applyBindings(viewModel, document.getElementById("#content"));
}