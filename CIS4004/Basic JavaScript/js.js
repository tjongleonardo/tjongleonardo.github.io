let counter = 0;

function tickUp() {
    counter++;
    document.getElementById("counter").textContent = counter;
}

function tickDown() {
    counter--;
    document.getElementById("counter").textContent = counter;
}

function runForLoop() {
    let result = "";

    for (let i = 0; i <= counter; i++) {
        result += i + " ";
    }

    document.getElementById("forLoopResult").textContent = result.trim();
}

function showOddNumbers() {
    let result = "";

    for (let i = 1; i <= counter; i++) {
        if (i % 2 !== 0) {
            result += i + " ";
        }
    }

    document.getElementById("oddNumberResult").textContent = result.trim();
}

function addMultiplesToArray() {
    let arr = [];

    if (counter >= 5) {
        for (let i = counter; i >= 5; i--) {
            if (i % 5 === 0) {
                arr.push(i);
            }
        }
    }

    console.log(arr);
}

function printCarObject() {
    let type = document.getElementById("carType").value;
    let mpg = document.getElementById("carMPG").value;
    let color = document.getElementById("carColor").value;

    let carObject = {
        cType: type,
        cMPG: mpg,
        cColor: color
    };

    console.log(carObject);
}

function loadCar(carNumber) {
    let selectedCar;    

    if (carNumber === 1) {
        selectedCar = carObject1;
    } else if (carNumber === 2) {
        selectedCar = carObject2;
    } else if (carNumber === 3) {
        selectedCar = carObject3;
    }

    document.getElementById("carType").value = selectedCar.cType;
    document.getElementById("carMPG").value = selectedCar.cMPG;
    document.getElementById("carColor").value = selectedCar.cColor;
}

function changeColor(colorNumber) {
    let paragraph = document.getElementById("styleParagraph");

    if (colorNumber === 1) {
        paragraph.style.color = "red";
    } else if (colorNumber === 2) {
        paragraph.style.color = "green";
    } else if (colorNumber === 3) {
        paragraph.style.color = "blue";
    }
}
