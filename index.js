var sceneArray, mainAppArea = document.getElementById('main'), infoBar = document.getElementById('infoBar'), infoTakeover = document.getElementById('infoTakeover'), clickGrid = document.getElementById('clickGrid');
var app = {
    initialize: function () {
        loadScene(Home);
    }
};
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
var Scene = (function () {
    function Scene(imageName, title, linkText, type, exits) {
        this.imageName = imageName;
        this.title = title;
        this.linkText = linkText;
        this.type = type;
        this.exits = exits;
    }
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
    initInfo(scene);
    initGridButtons(scene);
}
function updateInfobar(scene, title) {
    infoBar.innerHTML = title;
    if (scene !== null) {
        var but = document.createElement("button");
        but.value = title;
        but.className += "pos-inline";
        but.innerHTML = scene.linkText + " >";
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
function initInfo(scene) {
    if (scene.title !== null) {
        infoBar.style.display = "block";
        infoBar.innerHTML = scene.title;
    }
    else {
        infoBar.style.display = "none";
        infoTakeover.innerHTML = scene.title;
    }
}
function initGridButtons(scene) {
    var sceneType = scene.type;
    if (scene.exits !== null) {
        var _loop_1 = function(sceneExit) {
            but = document.createElement("button");
            but.value = sceneExit.title;
            but.className += "pos-" + sceneExit.position;
            but.className += " size-" + sceneExit.size;
            if (sceneExit.hasImage == true) {
                but.style.backgroundImage = "url(img/buttons/" + scene.imageName + ".jpg)";
            }
            but.innerHTML = sceneExit.title + " <span class=\"go\">></span>";
            if (sceneExit.scene == null) {
                but.onclick = function () { updateInfobar(sceneExit.scene, sceneExit.title); };
            }
            else {
                but.onclick = function () { loadScene(sceneExit.scene); };
            }
            if (sceneExit.position == 16) {
                infoBar.appendChild(but);
            }
            else {
                clickGrid.appendChild(but);
            }
        };
        var but;
        for (var _i = 0, _a = scene.exits; _i < _a.length; _i++) {
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
        but.onclick = function () { loadScene(Home); };
        clickGrid.appendChild(but);
    }
}
var EndCredits = new Scene(null, null, "Game Over", levelType.basic, null);
var Shopping = new Scene(null, null, "Start Game", levelType.basic, [{ title: "Start Game", size: buttonSize.full, position: gameGrid.midCenter, hasImage: false, scene: EndCredits }]);
var Concession = new Scene("concessionStand", "Well this looks really nice.", "Buy some popcorn", levelType.basic, [
    { title: "Go in anyway - it's an adventure!", size: buttonSize.oneCell, position: gameGrid.A1, hasImage: true, scene: EndCredits },
    { title: "Try somewhere else.", size: buttonSize.oneCol, position: gameGrid.A2, hasImage: true, scene: EndCredits }
]);
var Movies = new Scene("sleazyTheatre", "Hmmm, this place looks pretty creepy. I'm not sure I should go in there.", "Go In", levelType.basic, [
    { title: "Go in anyway - it's an adventure!", size: buttonSize.inline, position: gameGrid.inline, hasImage: false, scene: Concession },
    { title: "Try somewhere else.", size: buttonSize.inline, position: gameGrid.inline, hasImage: false, scene: EndCredits }
]);
var Home = new Scene(null, "We Love Christine!", "Start Game", levelType.textOnly, [
    { title: "Go to the movies", size: buttonSize.twoCol, position: gameGrid.A1, hasImage: false, scene: Movies },
    { title: "Go shopping", size: buttonSize.twoCol, position: gameGrid.A3, hasImage: false, scene: Shopping }
]);
window.onload = function () { app.initialize(); };
