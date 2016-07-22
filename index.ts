var sceneArray: Array<Scene>, mainAppArea = document.getElementById('main'),
    infoBar = document.getElementById('infoBar'),
    infoTakeover = document.getElementById('infoTakeover'),
    clickGrid = document.getElementById('clickGrid');

var app = {
    initialize: function() {
        loadScene(Home);
    }
};

interface Choice {
    title: string;
    size: buttonSize;
    position: gameGrid;
    hasImage: boolean;
    scene: Scene;
}

enum buttonSize {
    full,       // size-0 full grid
    oneCell,    // size-1 one cell
    twoSquare,  // size-2 two across two down
    threeSquare,// size-3 three across three down
    twoDown,    // size-4 one across 2 down
    twoAcross,  // size-5 two across one down
    oneRow,     // size-6 100% across one down
    twoRows,    // size-7 100% across two down
    oneCol,     // size-8 one across 100% down
    twoCol,     // size-9 two across 100% down
    inline      // inline
}

enum gameGrid {
    A1,       // pos-0
    A2,       // pos-1
    A3,       // pos-2
    A4,       // pos-3
    B1,       // pos-4
    B2,       // pos-5
    B3,       // pos-6
    B4,       // pos-7
    C1,       // pos-8
    C2,       // pos-9
    C3,       // pos-10
    C4,       // pos-11
    D1,       // pos-12
    D2,       // pos-13
    D3,       // pos-14
    D4,       // pos-15
    inline,   // pos-16 display inline
    midCenter // pos-17 display in the center
}

enum levelType {
    basic,
    textOnly,
    textInput,
    textMessage,
    puzzle
}

class Scene {
    constructor(
        public imageName: string,
        public title: string,
        public linkText: string,
        public type: levelType,
        public exits: Array<Choice>
    ) { }
}

function clearScene() {
    mainAppArea.style.backgroundImage = "";
    mainAppArea.classList.remove("textOnly");
    clickGrid.innerHTML = "";
    infoTakeover.innerHTML = "";
}

function loadScene(scene: Scene) {
    clearScene();
    backgroundImage(scene);
    initInfo(scene);
    initGridButtons(scene);
}

function updateInfobar(scene: Scene, title: string) {
    infoBar.innerHTML = title;
    if (scene !== null) {
        var but = document.createElement("button");
        but.value = title;
        but.className += "pos-16 size-10";
        but.innerHTML = scene.linkText + " <span class=\"go\">></span>";
        but.onclick = function() { loadScene(scene) };
        infoBar.appendChild(but);
    }
}

function backgroundImage(scene: Scene) {
    if (scene.imageName !== null) {
        mainAppArea.style.backgroundImage = "url(img/backgrounds/" + scene.imageName + ".jpg)";
    }
    if (scene.type == levelType.textOnly) {
        mainAppArea.className += " textOnly";
    }
}

function initInfo(scene: Scene) {
    if (scene.title !== null) {
        infoBar.style.display = "block";
        infoBar.innerHTML = scene.title;
    } else {
        infoBar.style.display = "none";
        infoTakeover.innerHTML = scene.title;
    }
}

function initGridButtons(scene: Scene) {
    var sceneType = scene.type;
    if (scene.exits !== null) {
        for (let sceneExit of scene.exits) {
            var but = document.createElement("button");
            but.value = sceneExit.title;
            but.className += "pos-" + sceneExit.position;
            but.className += " size-" + sceneExit.size;

            if (sceneExit.hasImage == true) {
                but.style.backgroundImage = "url(img/buttons/" + scene.imageName + ".jpg)";
            }

            if (sceneExit.position !== gameGrid.inline && scene.type == levelType.basic) {
                but.onclick = function() { updateInfobar(sceneExit.scene, sceneExit.title) };
            } else {
                but.onclick = function() { loadScene(sceneExit.scene) };
            }

            if (sceneExit.position == gameGrid.inline) {
                but.innerHTML = sceneExit.title + " <span class=\"go\">></span>";
                infoBar.appendChild(but);
            } else {
                if (scene.type == levelType.textOnly) {
                    but.innerHTML = sceneExit.title + " <span class=\"go\">></span>";
                }
                clickGrid.appendChild(but);
            }
        }
    } else {
        var but = document.createElement("button");
        but.value = "Start Over";
        but.innerHTML = "Start Over >";
        but.className += "pos-0";
        but.className += " size-0";
        but.onclick = function() { loadScene(Home) };
        clickGrid.appendChild(but);
    }
}

const EndCredits = new Scene(
    null,
    null,
    "Game Over",
    levelType.basic,
    null
);

const Shopping = new Scene(
    null,
    null,
    "Start Game",
    levelType.basic,
    [{ title: "Start Game", size: buttonSize.full, position: gameGrid.midCenter, hasImage: false, scene: EndCredits }]
);

const Concession = new Scene(
    "concessionStand",
    "Well this looks really nice.",
    "Buy some popcorn",
    levelType.basic,
    [
        { title: "I'm ready to order!", size: buttonSize.oneCol, position: gameGrid.A3, hasImage: true, scene: EndCredits },
        { title: "I definitely want some popcorn.", size: buttonSize.oneCol, position: gameGrid.A4, hasImage: true, scene: EndCredits },
        { title: "Specials at a movie theater?", size: buttonSize.oneCol, position: gameGrid.A2, hasImage: true, scene: EndCredits }
    ]
);

const Movies = new Scene(
    "sleazyTheatre",
    "Hmmm, this place looks pretty creepy. I'm not sure I should go in there.",
    "Go In",
    levelType.basic,
    [
        { title: "Go in anyway - it's an adventure!", size: buttonSize.inline, position: gameGrid.inline, hasImage: false, scene: Concession },
        { title: "Try somewhere else.", size: buttonSize.inline, position: gameGrid.inline, hasImage: false, scene: EndCredits }
    ]
);

const Home = new Scene(
    null,
    "We Love Christine!",
    "Start Game",
    levelType.textOnly,
    [
        { title: "Go to the movies", size: buttonSize.twoCol, position: gameGrid.A1, hasImage: false, scene: Movies },
        { title: "Go shopping", size: buttonSize.twoCol, position: gameGrid.A3, hasImage: false, scene: Shopping }
    ]
);

window.onload = function() { app.initialize(); };
