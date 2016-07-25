var mainAppArea = document.getElementById('main'), infoBar = document.getElementById('infoBar'), infoTakeover = document.getElementById('infoTakeover'), clickGrid = document.getElementById('clickGrid');
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
            infoBar.innerHTML = this.title;
        }
        else {
            infoBar.style.display = "none";
            infoTakeover.innerHTML = this.title;
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
                if (sceneExit.hasImage == true) {
                    but.style.backgroundImage = "url(img/buttons/" + this_1.imageName + ".jpg)";
                }
                if (sceneExit.position !== gameGrid.inline && this_1.type == levelType.basic) {
                    but.onclick = function () { updateInfobar(sceneArray[sceneExit.scene], sceneExit.title); };
                }
                else {
                    but.onclick = function () { loadScene(sceneArray[sceneExit.scene]); };
                }
                if (sceneExit.position == gameGrid.inline) {
                    but.innerHTML = sceneExit.title + "&nbsp;<span class=\"go\">></span>";
                    infoBar.appendChild(but);
                }
                else {
                    if (this_1.type == levelType.textOnly) {
                        but.innerHTML = sceneExit.title + "&nbsp;<span class=\"go\">></span>";
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
            but.onclick = function () { loadScene(sceneArray["Home"]); };
            clickGrid.appendChild(but);
        }
    };
    return Scene;
}());
function clearScene() {
    mainAppArea.style.backgroundImage = "";
    mainAppArea.classList.remove("textOnly");
    clickGrid.innerHTML = "";
    infoTakeover.innerHTML = "";
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
        but.onclick = function () { loadScene(scene); };
        infoBar.appendChild(but);
    }
}
function backgroundImage(scene) {
    if (scene.imageName !== null) {
        mainAppArea.style.backgroundImage = "url(img/backgrounds/" + scene.imageName + ".jpg)";
    }
    if (scene.type == levelType.textOnly) {
        mainAppArea.className += " textOnly";
    }
}
var sceneArray = {
    "Home": new Scene("Home", null, "Monday morning. You don't have to go to work today! But you do have a job interview.", "Start Game", levelType.textOnly),
    "JobInterview": new Scene("JobInterview", null, "Hmmm, this place looks pretty creepy. I'm not sure I should go in there.", "Go In", levelType.textOnly),
    "Shopping": new Scene("Shopping", "shopping", "I'm pretty thristy, but it looks like Bloomingdale's is having a huge sale!", "Go In", levelType.basic),
    "Starbucks": new Scene("Starbucks", null, "You order a Caramel Macchiato in honor of Melissa bc it is toally her favorite. Unfortunately it's barely sweet at all - and what's the point of the caramel part if it isn't sweet??", "Buy some coffee", levelType.textOnly),
    "ReturnStarbucks": new Scene("ReturnStarbucks", null, null, "Game Over", levelType.textOnly),
    "Security": new Scene("ReturnStarbucks", null, null, "Game Over", levelType.textOnly),
    "Bloomingdales": new Scene("ReturnStarbucks", null, null, "Buy some clothes", levelType.textOnly),
    "Manager": new Scene("ReturnStarbucks", null, null, "Game Over", levelType.textOnly),
    "JeansInterview": new Scene("ReturnStarbucks", null, null, "Game Over", levelType.textOnly),
    "CheckBack": new Scene("ReturnStarbucks", null, null, "Game Over", levelType.textOnly),
    "CEO": new Scene("ReturnStarbucks", null, null, "Game Over", levelType.textOnly)
};
exitArray["Home"] = [
    { title: "Hang out at home then head out to the interview", size: buttonSize.twoCol, position: gameGrid.A1, hasImage: false, scene: "JobInterview" },
    { title: "Go shopping for new clothes", size: buttonSize.twoCol, position: gameGrid.A3, hasImage: false, scene: "Shopping" }
];
exitArray["Shopping"] = [
    { title: "Get a latte before starting the shopping spree", size: buttonSize.twoCol, position: gameGrid.A1, hasImage: false, scene: "Starbucks" },
    { title: "Head over to Bloomingdale's to get a new outfit", size: buttonSize.twoCol, position: gameGrid.A3, hasImage: false, scene: "Bloomingdales" }
];
exitArray["Starbucks"] = [
    { title: "Take it back and make them put more SUGAR in it!", size: buttonSize.twoCol, position: gameGrid.A1, hasImage: false, scene: "ReturnStarbucks" },
    { title: "Say forget it and go to Bloomingdale's", size: buttonSize.twoCol, position: gameGrid.A3, hasImage: false, scene: "Bloomingdales" }
];
exitArray["JobInterview"] = [
    { title: "Job Interview", size: buttonSize.twoCol, position: gameGrid.A1, hasImage: false, scene: "JobInterview" },
    { title: "Go shopping", size: buttonSize.twoCol, position: gameGrid.A3, hasImage: false, scene: "Shopping" }
];
