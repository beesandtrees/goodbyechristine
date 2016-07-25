var mainAppArea = document.getElementById('main'),
    infoBar = document.getElementById('infoBar'),
    infoTakeover = document.getElementById('infoTakeover'),
    clickGrid = document.getElementById('clickGrid');

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

type sceneName =
    "Home" |
    "Shopping" |
    "JobInterview" |
    "Starbucks" |
    "ReturnStarbucks" |
    "Security" |
    "Bloomingdales" |
    "Manager" |
    "JeansInterview" |
    "CheckBack" |
    "CEO";

interface Choice {
    title: string;
    size: buttonSize;
    position: gameGrid;
    hasImage: boolean;
    scene: sceneName;
}
interface Exit<T> {
    [K: string]: Array<Choice>;
}

let exitArray: Exit<Choice> = {};

class Scene {
    constructor(
        private name: sceneName,
        public imageName: string,
        public title: string,
        public linkText: string,
        public type: levelType
    ) { }

    initInfo() {
        if (this.title !== null) {
            infoBar.style.display = "block";
            infoBar.innerHTML = this.title;
        } else {
            infoBar.style.display = "none";
            infoTakeover.innerHTML = this.title;
        }
    }

    initGridButtons() {
        var sceneType = this.type;
        if (exitArray[this.name] !== undefined) {
            for (let sceneExit of exitArray[this.name]) {
                var but = document.createElement("button");
                but.value = sceneExit.title;
                but.className += "pos-" + sceneExit.position;
                but.className += " size-" + sceneExit.size;

                if (sceneExit.hasImage == true) {
                    but.style.backgroundImage = "url(img/buttons/" + this.imageName + ".png)";
                }

                if (sceneExit.position !== gameGrid.inline && this.type == levelType.basic) {
                    but.onclick = function() { updateInfobar(sceneArray[sceneExit.scene], sceneExit.title) };
                } else {
                    but.onclick = function() { loadScene(sceneArray[sceneExit.scene]) };
                }

                if (sceneExit.position == gameGrid.inline) {
                    but.innerHTML = sceneExit.title + "&nbsp;<span class=\"go\">></span>";
                    infoBar.appendChild(but);
                } else {
                    if (this.type == levelType.textOnly) {
                        but.innerHTML = sceneExit.title + "&nbsp;<span class=\"go\">></span>";
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
            but.onclick = function() { loadScene(sceneArray["Home"]) };
            clickGrid.appendChild(but);
        }
    }

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
    scene.initInfo();
    scene.initGridButtons();
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

var sceneArray = {
    "Home": new Scene(
        "Home",
        null,
        "Monday morning. You don't have to go to work today! But you do have a job interview.",
        "Start Game",
        levelType.textOnly
    ),
    "JobInterview": new Scene(
        "JobInterview",
        null,
        "Hmmm, this place looks pretty creepy. I'm not sure I should go in there.",
        "Go In",
        levelType.textOnly
    ),
    "Shopping": new Scene(
        "Shopping",
        "shopping",
        "I'm pretty thristy, but it looks like Bloomingdale's is having a huge sale!",
        "Go In",
        levelType.basic
    ),
    "Starbucks": new Scene(
        "Starbucks",
        null,
        "You order a Caramel Macchiato in honor of Melissa bc it is totally her favorite. Unfortunately it's barely sweet at all - and what's the point of buying a caramel macchiato if it isn't sweet??",
        "Buy some coffee",
        levelType.textOnly
    ),
    "ReturnStarbucks": new Scene(
        "ReturnStarbucks",
        null,
        null,
        "Game Over",
        levelType.textOnly
    ),
    "Security": new Scene(
        "ReturnStarbucks",
        null,
        null,
        "Game Over",
        levelType.textOnly
    ),
    "Bloomingdales": new Scene(
        "ReturnStarbucks",
        null,
        null,
        "Buy some clothes",
        levelType.textOnly
    ),
    "Manager": new Scene(
        "ReturnStarbucks",
        null,
        null,
        "Game Over",
        levelType.textOnly
    ),
    "JeansInterview": new Scene(
        "ReturnStarbucks",
        null,
        null,
        "Game Over",
        levelType.textOnly
    ),
    "CheckBack": new Scene(
        "ReturnStarbucks",
        null,
        null,
        "Game Over",
        levelType.textOnly
    ),
    "CEO": new Scene(
        "ReturnStarbucks",
        null,
        null,
        "Game Over",
        levelType.textOnly
    )
};

exitArray["Home"] = [
    { title: "Hang out at home then head out to the interview", size: buttonSize.twoCol, position: gameGrid.A1, hasImage: false, scene: "JobInterview" },
    { title: "Go shopping for new clothes", size: buttonSize.twoCol, position: gameGrid.A3, hasImage: false, scene: "Shopping" }
];
exitArray["Shopping"] = [
    { title: "Get a latte before starting the shopping spree", size: buttonSize.twoCol, position: gameGrid.A1, hasImage: true, scene: "Starbucks" },
    { title: "Head over to Bloomingdale's to get a new outfit", size: buttonSize.twoCol, position: gameGrid.A3, hasImage: true, scene: "Bloomingdales" }
];
exitArray["Starbucks"] = [
    { title: "Take it back and make them put more SUGAR in it!", size: buttonSize.twoCol, position: gameGrid.A1, hasImage: false, scene: "ReturnStarbucks" },
    { title: "Say forget it and go to Bloomingdale's", size: buttonSize.twoCol, position: gameGrid.A3, hasImage: false, scene: "Bloomingdales" }
];
exitArray["JobInterview"] = [
    { title: "Job Interview", size: buttonSize.twoCol, position: gameGrid.A1, hasImage: false, scene: "JobInterview" },
    { title: "Go shopping", size: buttonSize.twoCol, position: gameGrid.A3, hasImage: false, scene: "Shopping" }
];
