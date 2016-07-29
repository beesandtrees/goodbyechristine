var mainAppArea = document.getElementById('main'), infoBar = document.getElementById('infoBar'), infoTakeover = document.getElementById('infoTakeover'), clickGrid = document.getElementById('clickGrid');
infoBar.addEventListener("click", function () { infoBar.style.display = "none"; }, false);
var buttonSize;
(function (buttonSize) {
    buttonSize[buttonSize["full"] = 0] = "full";
    buttonSize[buttonSize["oneCell"] = 1] = "oneCell";
    buttonSize[buttonSize["twoSquare"] = 2] = "twoSquare";
    buttonSize[buttonSize["threeSquare"] = 3] = "threeSquare";
    buttonSize[buttonSize["twoDown"] = 4] = "twoDown";
    buttonSize[buttonSize["twoAcross"] = 5] = "twoAcross";
    buttonSize[buttonSize["oneRow"] = 6] = "oneRow";
    buttonSize[buttonSize["twoRows"] = 7] = "twoRows";
    buttonSize[buttonSize["oneCol"] = 8] = "oneCol";
    buttonSize[buttonSize["twoCol"] = 9] = "twoCol";
    buttonSize[buttonSize["inline"] = 10] = "inline";
})(buttonSize || (buttonSize = {}));
var gameGrid;
(function (gameGrid) {
    gameGrid[gameGrid["A1"] = 0] = "A1";
    gameGrid[gameGrid["A2"] = 1] = "A2";
    gameGrid[gameGrid["A3"] = 2] = "A3";
    gameGrid[gameGrid["A4"] = 3] = "A4";
    gameGrid[gameGrid["B1"] = 4] = "B1";
    gameGrid[gameGrid["B2"] = 5] = "B2";
    gameGrid[gameGrid["B3"] = 6] = "B3";
    gameGrid[gameGrid["B4"] = 7] = "B4";
    gameGrid[gameGrid["C1"] = 8] = "C1";
    gameGrid[gameGrid["C2"] = 9] = "C2";
    gameGrid[gameGrid["C3"] = 10] = "C3";
    gameGrid[gameGrid["C4"] = 11] = "C4";
    gameGrid[gameGrid["D1"] = 12] = "D1";
    gameGrid[gameGrid["D2"] = 13] = "D2";
    gameGrid[gameGrid["D3"] = 14] = "D3";
    gameGrid[gameGrid["D4"] = 15] = "D4";
    gameGrid[gameGrid["inline"] = 16] = "inline";
    gameGrid[gameGrid["midCenter"] = 17] = "midCenter";
})(gameGrid || (gameGrid = {}));
var levelType;
(function (levelType) {
    levelType[levelType["basic"] = 0] = "basic";
    levelType[levelType["textOnly"] = 1] = "textOnly";
    levelType[levelType["textInput"] = 2] = "textInput";
    levelType[levelType["textMessage"] = 3] = "textMessage";
    levelType[levelType["puzzle"] = 4] = "puzzle";
})(levelType || (levelType = {}));
var exitArray = {};
var Scene = (function () {
    function Scene(name, imageName, title, linkText, type) {
        this.name = name;
        this.imageName = imageName;
        this.title = title;
        this.linkText = linkText;
        this.type = type;
    }
    Scene.prototype.initInfo = function () {
        if (this.title !== null) {
            infoBar.style.display = "block";
            infoBar.innerHTML = "<p>" + this.title + "</p>";
        }
        else {
            infoBar.style.display = "none";
            infoTakeover.innerHTML = "";
        }
    };
    Scene.prototype.initGridButtons = function () {
        var sceneType = this.type;
        if (exitArray[this.name] !== undefined) {
            var _loop_1 = function(sceneExit) {
                but = document.createElement("button");
                but.value = sceneExit.title;
                but.className += "pos-" + sceneExit.position;
                but.className += " size-" + sceneExit.size;
                but.style.color = sceneExit.color;
                if (sceneExit.hasImage == true) {
                    but.style.backgroundImage = "url(img/buttons/" + this_1.imageName + ".png)";
                }
                but.onclick = function () { updateHash(sceneArray[sceneExit.scene]); };
                if (sceneExit.position == gameGrid.inline) {
                    but.innerHTML = sceneExit.title + "&nbsp;<span class=\"go\">></span>";
                    infoBar.appendChild(but);
                }
                else {
                    if (this_1.type == levelType.textOnly) {
                        but.innerHTML = sceneExit.title;
                    }
                    clickGrid.appendChild(but);
                }
            };
            var this_1 = this;
            var but;
            for (var _i = 0, _a = exitArray[this.name]; _i < _a.length; _i++) {
                var sceneExit = _a[_i];
                _loop_1(sceneExit);
            }
        }
        else {
            var but = document.createElement("button");
            but.value = "Start Over";
            but.innerHTML = "Start Over >";
            but.className += "pos-0";
            but.className += " size-0";
            but.onclick = function () { updateHash(sceneArray["Home"]); };
            clickGrid.appendChild(but);
        }
    };
    return Scene;
}());
function clearScene() {
    mainAppArea.style.backgroundImage = "";
    mainAppArea.classList.remove("textOnly");
    infoBar.classList.add("expanded");
    clickGrid.innerHTML = "";
    infoTakeover.innerHTML = "";
}
function updateHash(scene) {
    window.location.hash = scene.name;
}
function checkHash() {
    if (window.location.hash) {
        loadScene(sceneArray[window.location.hash.substring(1)]);
    }
    else {
        loadScene(sceneArray["Home"]);
    }
}
function loadScene(scene) {
    clearScene();
    backgroundImage(scene);
    scene.initInfo();
    scene.initGridButtons();
}
function updateInfobar(scene, title) {
    infoBar.innerHTML = title;
    if (scene !== null) {
        var but = document.createElement("button");
        but.value = title;
        but.className += "pos-16 size-10";
        but.innerHTML = scene.linkText + " <span class=\"go\">></span>";
        but.onclick = function () { updateHash(scene); };
        infoBar.appendChild(but);
    }
}
function backgroundImage(scene) {
    if (scene.imageName !== null && scene.imageName !== "color") {
        mainAppArea.style.backgroundImage = "url(img/backgrounds/" + scene.imageName + ".jpg)";
    }
    else {
        mainAppArea.style.backgroundColor = "#fe37aa";
    }
    if (scene.type == levelType.textOnly) {
        mainAppArea.className += " textOnly";
    }
}
var sceneArray = {
    "Home": new Scene("Home", "leftRight", "Monday morning. You don't have to go to work today! But you do have a job interview.", "Start Game", levelType.textOnly),
    "Shopping": new Scene("Shopping", "shopping", "At the mall you think, \"I'm pretty thristy, but it looks like Bloomingdale's is having a huge sale! What should I do first?\"", "Go In", levelType.basic),
    "Starbucks": new Scene("Starbucks", "starbucks2", "You order a Caramel Macchiato in honor of Melissa because it is totally her favorite. Unfortunately it's barely sweet at all - and what's the point of buying a Caramel Macchiato if it isn't sweet??", "Buy some coffee", levelType.textOnly),
    "ReturnStarbucks": new Scene("ReturnStarbucks", "starbucks3", "You go up to the counter to return the coffee and the person refuses to make you a new one.", "Return the coffee", levelType.textOnly),
    "Security": new Scene("Security", "security", "You get chased by security and they throw you out of the mall.", "Game Over", levelType.textOnly),
    "Bloomingdales": new Scene("Bloomingdales", "shopping2v4", "You try on some clothes, but decide you need a smaller size.", "Buy some clothes", levelType.textOnly),
    "Manager": new Scene("Manager", "manager", "When the manager shows up he says,<br>\"We can make your coffee sweeter, but it still won't be as sweet as me. Here's a coupon for free coffee for the rest of your life.\"", "Game Over", levelType.textOnly),
    "JeansInterview": new Scene("JeansInterview", "secondInterview", "When you arrive for your interview you are introduced to the CEO who hires you on the spot because he loves your outfit.", "Wear your jeans to the interview", levelType.textOnly),
    "CheckBack": new Scene("CheckBack", "justin-bloomingdales", "When the stock boy arrives from the back he says,<br>\"The outfit looks great on you, but denim is the best choice for all occasions.\"", "Ask someone to check in the back", levelType.textOnly),
    "JobInterview": new Scene("JobInterview", "interview", "You feel like the interview went well, but something wasn't quite right. They say they will call you back in a couple of days to let you know their decision.", "Go In", levelType.textOnly),
    "OutsideInterview": new Scene("OutsideInterview", "justin-outside", "You go outside and run into a friend. He asks what's up? You tell him about the interview and he suggests buying a pair of jeans to wear next time.", "Go outside", levelType.textOnly),
    "CEO": new Scene("CEO", "justin-timberlake", "Almost there... ", "Happily Ever After <3", levelType.textOnly)
};
exitArray["Home"] = [
    { title: "Hang out at home then<br>go to the interview", size: buttonSize.twoCol, position: gameGrid.A1, hasImage: false, scene: "JobInterview", color: "#fff" },
    { title: "Go shopping for<br>new clothes", size: buttonSize.twoCol, position: gameGrid.A3, hasImage: false, scene: "Shopping", color: "#fff" }
];
exitArray["Shopping"] = [
    { title: "Get a latte before starting the shopping spree", size: buttonSize.twoCol, position: gameGrid.A1, hasImage: true, scene: "Starbucks", color: "#fff" },
    { title: "Head over to Bloomingdale's to get a new outfit", size: buttonSize.twoCol, position: gameGrid.A3, hasImage: true, scene: "Bloomingdales", color: "#fff" }
];
exitArray["Starbucks"] = [
    { title: "Take it back and make them put more SUGAR in it!", size: buttonSize.twoCol, position: gameGrid.A1, hasImage: false, scene: "ReturnStarbucks", color: "#000" },
    { title: "Say forget it and go to Bloomingdale's", size: buttonSize.twoCol, position: gameGrid.A3, hasImage: false, scene: "Bloomingdales", color: "#000" }
];
exitArray["ReturnStarbucks"] = [
    { title: "Ask to see the manager", size: buttonSize.twoCol, position: gameGrid.A1, hasImage: false, scene: "Manager", color: "#fff" },
    { title: "Throw coffee against the wall in anger and stomp off", size: buttonSize.twoCol, position: gameGrid.A3, hasImage: false, scene: "Security", color: "#fff" }
];
exitArray["Manager"] = [
    { title: "You're super psyched and decide to go get your interview clothes", size: buttonSize.twoSquare, position: gameGrid.C1, hasImage: false, scene: "Bloomingdales", color: "#fff" },
    { title: "You decide this has given you confidence to go to the interview without buying new clothes", size: buttonSize.twoSquare, position: gameGrid.C3, hasImage: false, scene: "JobInterview", color: "#fff" }
];
exitArray["JobInterview"] = [
    { title: "Shake hands and head out", size: buttonSize.oneRow, position: gameGrid.D1, hasImage: false, scene: "OutsideInterview", color: "#000" }
];
exitArray["OutsideInterview"] = [
    { title: "Better take his advice and get some new threads", size: buttonSize.oneRow, position: gameGrid.D1, hasImage: false, scene: "Shopping", color: "#000" }
];
exitArray["JeansInterview"] = [
    { title: "Meet the CEO", size: buttonSize.full, position: gameGrid.midCenter, hasImage: false, scene: "CEO", color: "#ff37aa" }
];
exitArray["Bloomingdales"] = [
    { title: "You can't find it on the floor, so you ask someone to check the back", size: buttonSize.twoCol, position: gameGrid.A1, hasImage: false, scene: "CheckBack", color: "#fff" },
    { title: "You decide to say forget it and go to Starbucks", size: buttonSize.twoCol, position: gameGrid.A3, hasImage: false, scene: "Starbucks", color: "#000" }
];
exitArray["CheckBack"] = [
    { title: "Buy new jeans for your interview", size: buttonSize.twoSquare, position: gameGrid.C1, hasImage: false, scene: "JeansInterview", color: "#fff" },
    { title: "Go with your original outfit choice", size: buttonSize.twoSquare, position: gameGrid.C3, hasImage: false, scene: "JobInterview", color: "#fff" }
];
exitArray["CEO"] = [
    { title: "", size: buttonSize.full, position: gameGrid.midCenter, hasImage: false, scene: "Home", color: "#fff" }
];
