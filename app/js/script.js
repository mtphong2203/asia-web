const english = document.getElementById("english").textContent += "English"
const vietnamese = document.getElementById("vietnam").textContent += "VietNam"

const darkButton = document.getElementById("dark")
const lightButton = document.getElementById("light")

const setDarkMode = () => {
    document.querySelector("body").classList = "dark";
    localStorage.setItem("colorMode", "dark");
};

const setLightMode = () => {
    document.querySelector("body").classList = "light";
    localStorage.setItem("colorMode", "light");
};

const colorModeFromLocalStorage = () => {
    return localStorage.getItem("colorMode");
};

// const colorModeFromPreferences = () => {
//     // If preference is set or does not match anything (light is default)
//     return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
// };

const loadAndUpdateColor = () =>{
    // local storage has precendence over the prefers-color-scheme
    const color = colorModeFromLocalStorage();
    color == "dark" ? darkButton.click() : lightButton.click();
};

// when the inputs are clicked, check which radio button is checked and change the color
const radioButton = document.querySelectorAll(".toggle__wrapper input");
radioButton.forEach(button =>{
    button.addEventListener("click", (event) =>{
        lightButton.checked ? setLightMode() : setDarkMode();
    });
});
// when the prefers-color-scheme changes, this event will be emitted
// event reflects the media query, if it matches, the new color is dark, else it is light
// window.matchMedia("(prefers-color-scheme:dark)").addEventListener("change", (event) =>{
//     event.matches ? dartButton.click() : lightButton.click(); 
// });
// Load the right color on startup - localStorage has precedence
loadAndUpdateColor();



// Count number

const valueDisplays = document.querySelectorAll(".num");
const interval = 5000;

function startCounting(valueDisplay){
    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute("data-val"));
    let duration = Math.floor(interval / endValue);
    let counter = setInterval(function() {
        startValue += 1;
        valueDisplay.textContent = startValue;

        if (startValue === endValue) {
            clearInterval(counter);
        }
    }, duration);
}


// check position
function checkPosition(){
    valueDisplays.forEach((valueDisplay) => {
        const rect = valueDisplay.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if(rect.top <= windowHeight * 0.9 && rect.bottom >= 0){
            if (!valueDisplay.classList.contains('counted')) {
                startCounting(valueDisplay);
                valueDisplay.classList.add('counted'); // Prevents counting again
            }
        }

    });
}

window.addEventListener('scroll', checkPosition);

checkPosition();
