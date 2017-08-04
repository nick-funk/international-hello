var greetings = [
    "Witaj świecie!",
    "こんにちは世界",
    "Привет мир!",
    "Hej Verden!",
    "Hallo, Welt!",
    "你好，世界",
    "Hello, World!"
]
var index = 0;

var updateMessage = function() {
    $("#content").html(greetings[index]);

    index++;

    if (index >= greetings.length) {
        index = 0;
    }

    setTimeout(updateMessage, 2000);
}

setTimeout(updateMessage, 2000);