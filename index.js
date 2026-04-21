let win = false;
let inputs = document.querySelectorAll(".inputs");

window.onload = () => {
    let saved = JSON.parse(localStorage.getItem("sudoku_save"));
    if (saved) {
        inputs.forEach((ele, i) => {
            ele.innerHTML = saved[i];
        });
        inputs.forEach((ele) => {
            checkMistake(ele);
        });
    }
    AllNums()

};

inputs.forEach((ele) => {

    if (!ele.classList.contains("default")) ele.innerHTML = "";

    ele.addEventListener("click", (e) => {
        if (ele.classList.contains("default")) return;

        if (ele.classList.contains("clicked")) {
            ele.classList.remove("clicked");
            ele.innerHTML = ""
            inputs.forEach(el => {
                el.classList.remove("completedBg");
                el.classList.remove("mistake");
                checkMistake(el);
                el.classList.remove("row-coulmn");
            });
            AllNums();
            saveGame()

        } else {
            inputs.forEach((ele) => {
                ele.classList.remove("clicked");
                ele.classList.remove("row-coulmn");
            });
            ele.classList.add("clicked");
            addRowCoulmn(ele)
        }
    });
    checkMistake(ele)
});

let nums = document.querySelectorAll(".num");

nums.forEach((ele) => {
    ele.addEventListener("click", (e) => {
        let selected = document.querySelector(".clicked");
        if (!selected) return;

        selected.innerHTML = ele.innerHTML.trim();
        inputs.forEach(ele => {
            ele.classList.remove("mistake")
            ele.classList.remove("clicked")
            checkMistake(ele)
        });

        inputs.forEach(el => {
            el.classList.remove("completedBg")
        });

        saveGame()
        AllNums()
        youWin()
    });
});

document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("inputs")) {
        inputs.forEach((ele) => {
            if (ele.classList.contains("clicked")) ele.classList.remove("clicked")
            if (ele.classList.contains("row-coulmn")) ele.classList.remove("row-coulmn")
        })
    }
})

function addRowCoulmn(theEle) {
    let theEleRow = document.querySelectorAll(`.${theEle.classList.item(1)}`)
    let theElecol = document.querySelectorAll(`.${theEle.classList.item(2)}`)
    theEleRow.forEach(el => {
        el.classList.add("row-coulmn")
    })
    theElecol.forEach(el => {
        el.classList.add("row-coulmn")
    })
    theEle.classList.remove("row-coulmn")
}

function checkMistake(theEle) {
    let content = theEle.innerHTML.trim();
    if (content === "") return;
    let checkArray = [
        document.querySelectorAll(`.${theEle.classList.item(1)}`),
        document.querySelectorAll(`.${theEle.classList.item(2)}`),
        theEle.parentElement.parentElement.querySelectorAll(".inputs")
    ]

    checkArray.forEach(array => {
        array.forEach(ele => {
            if (theEle !== ele && content === ele.innerHTML.trim()) theEle.classList.add("mistake");
        })
    })

}

function youWin() {
    let checkWin = true;
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].classList.contains("mistake") || inputs[i].innerHTML.trim() === "") {
            checkWin = false;
            break;
        }
    }

    if (checkWin === true) {
        localStorage.removeItem("sudoku_save");
        document.querySelector(".blur-container").classList.add("active")
        document.querySelector(".card-container").classList.add("active")
    }
}

function checkAllNumI(theNumber) {
    let theTab = document.querySelectorAll(".table-container");
    let allHave = [];
    theTab.forEach(table => {
        let tabInp = table.querySelectorAll(".inputs")
        for (let i = 0; i < tabInp.length; i++) {
            if (tabInp[i].innerHTML == theNumber && !tabInp[i].classList.contains("mistake")) {
                allHave.push("have");
                break;
            }
        }
    })
    if (allHave.length === theTab.length) inputs.forEach(ele => {
        if (ele.innerHTML == theNumber) ele.classList.add("completedBg")
    })

}

function AllNums() {
    for (let i = 1; i <= 9; i++) {
        checkAllNumI(i)
    }
}

function saveGame() {
    let data = [];
    inputs.forEach(ele => {
        data.push(ele.innerHTML.trim())
    })
    localStorage.setItem("sudoku_save", JSON.stringify(data));
}

document.getElementById("rst").onclick = () => {
    localStorage.removeItem("sudoku_save");
    window.location.reload()
}
