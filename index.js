let win = false;

let inputs = document.querySelectorAll(".inputs");

window.onload = () => {
    let saved = JSON.parse(localStorage.getItem("sudoku_save"));
    if (saved) {
        inputs.forEach((ele, i) => {
            ele.innerHTML = saved[i];
            check(ele);
        });
    }
    for (let i = 1; i <= 9; i++) {
        test(i);
    }

};


inputs.forEach((ele) => {
    if (!ele.classList.contains("default")) ele.innerHTML = "";
    ele.addEventListener("click", (e) => {
        if (ele.classList.contains("default")) return;
        if (ele.classList.contains("clicked")) {
            ele.classList.remove("clicked");
        } else {
            inputs.forEach((ele) => {
                ele.classList.remove("clicked");
            });
            ele.classList.add("clicked");
        }
    });
    check(ele)
});

let nums = document.querySelectorAll(".num");
nums.forEach((ele) => {
    ele.addEventListener("click", (e) => {
        let selected = document.querySelector(".clicked");
        if (!selected) return;
        selected.innerHTML = ele.innerHTML.trim();
        inputs.forEach(el => el.classList.remove("mistake"));
        inputs.forEach((element) => {
            element.classList.remove("clicked")
            check(element)
        });

        let data = [];
        inputs.forEach(el => data.push(el.innerHTML.trim()));
        localStorage.setItem("sudoku_save", JSON.stringify(data));
        inputs.forEach(el => el.classList.remove("completedBg", "completed"));
        for (let i = 1; i <= 9; i++) {
            test(i)
        }
        youWin()
    });
});

function check(theEle) {
    let content = theEle.innerHTML.trim();
    if (content === "") return;
    let eleRow = document.querySelectorAll(`.${theEle.classList.item(1)}`)
    let eleCol = document.querySelectorAll(`.${theEle.classList.item(2)}`)
    let eleTab = theEle.parentElement.parentElement;
    for (let i = 0; i < eleRow.length; i++) {
        if (theEle !== eleRow[i] && content === eleRow[i].innerHTML.trim()) {
            theEle.classList.add("mistake");
        }
    }
    for (let i = 0; i < eleCol.length; i++) {
        if (theEle !== eleCol[i] && content === eleCol[i].innerHTML.trim()) {
            theEle.classList.add("mistake");
        }
    }
    let eleTabinputs = eleTab.querySelectorAll(`.inputs`)
    for (let i = 0; i < eleTabinputs.length; i++) {
        if (theEle !== eleTabinputs[i] && content === eleTabinputs[i].innerHTML.trim()) {
            theEle.classList.add("mistake");
        }
    }
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


document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("inputs")) {
        inputs.forEach((ele) => {
            if (ele.classList.contains("clicked")) ele.classList.remove("clicked")
        })
    }
})

function test(theNumber) {
    let theTab = document.querySelectorAll(".table-container");
    let allHave = [];
    theTab.forEach(table => {
        let tabInp = table.querySelectorAll(".inputs")
        for (let i = 0; i < tabInp.length; i++) {
            if (tabInp[i].innerHTML == theNumber && !tabInp[i].classList.contains("mistake")) {
                allHave.push("have");
                break
            }
        }
    })
    if (allHave.length === theTab.length) {
        inputs.forEach(ele => {
            if (ele.innerHTML == theNumber) ele.classList.add("completed")
            if (ele.classList.contains("completed") && ele.innerHTML == theNumber) {
                ele.classList.add("completedBg")
            }
        })
    }
}


document.getElementById("rst").onclick = () => {
    localStorage.removeItem("sudoku_save");
    window.location.reload()
}
