// string to show output
let expression = "";

// string to check weather the key is action key or not
const actionString = "/*-+%";

// string to check weather the key is valid or not for keyboard input
const validKeys = "0123456789+-*/%";

// targetting the output section
const expressionOutput = document.getElementById("output");

// getting all the regular buttons
const btn = document.querySelectorAll(".btn-regular");

// handling regular buttons click
function regularButtonClickHandler(e) {
    if (e.target.name) {
        if (expression == "Infinity") {
            expression = "";
            expressionOutput.innerText = expression;
        }

        if (actionString.includes(expression[0])) {
            expression = expression.substring(1);
            if (!expression) {
                expressionOutput.innerText = "0";
                return

            }
            expressionOutput.innerText = expression;
            return
        }

        expression += e.target.name;
        expressionOutput.innerText = expression;
    }
    console.log(expression);
}

// applying the event handler to those buttons 
for (const child of btn) {
    child.addEventListener("click", regularButtonClickHandler);
}

// A/C button click handler
const clearOutput = document.getElementById("clearOutput");
clearOutput.addEventListener("click", function () {
    expression = "";
    expressionOutput.innerText = "0";
});

//  = button targetting
const showResult = document.getElementById("equal");

//  = button click handler / result show function
const showOutputHandler = function () {
    if (actionString.includes(expression[expression.length - 1])) {
        expression = expression.slice(0, -1);
        expressionOutput.innerText = expression;
    }
    if (expression) {
        expression = eval(expression);
        expression = expression.toString();
        expressionOutput.innerText = expression;
    }
}

// appliying the eventlistener to = button
showResult.addEventListener("click", showOutputHandler);

//  backspace click hanlder 
const deleteOutputHandler = function () {
    if (expression) {
        expression = expression.slice(0, -1);
        if (expression) {

            expressionOutput.innerText = expression;
        } else {
            expressionOutput.innerText = "0";

        }
    }

}

// targetting the backspace button
const deleteOutput = document.getElementById("deleteOutput");

// adding eventlistener to backspace button
deleteOutput.addEventListener("click", deleteOutputHandler)


// adding small click effect to keyboard input
function highlightButton(key) {
    const button = document.querySelector(`[name="${key}"]`);
    if (button) {
        button.classList.add("btn-pressed");
        setTimeout(() => {
            button.classList.remove("btn-pressed");
        }, 200);
    }
}


// adding logic to handle keyboard input for pc/ computers
window.addEventListener("keydown", function (e) {

    console.log(e.key);
    if (validKeys.includes(e.key)) {
        expression += e.key;
        expressionOutput.innerText = expression;
        highlightButton(e.key);
    }

    if (e.key === "Enter") {
        showOutputHandler();
        highlightButton("Enter");

    }

    if (e.key === "Backspace") {
        deleteOutputHandler();
        highlightButton("Backspace");

    }

})

