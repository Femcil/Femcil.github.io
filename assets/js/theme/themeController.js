const THEMES = {
  darkgrey: "./themes/DarkGreyTheme.css",
  dragon: "./themes/DragonOS.css"
};

const STORAGE_KEY = "site-theme";
const IFRAME_ID = "dragon-frame";

/* load css */
function loadTheme(theme){

  const css = THEMES[theme] || THEMES.darkgrey;

  let link = document.getElementById("theme-style");

  if(!link){
    link = document.createElement("link");
    link.id = "theme-style";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }

  link.href = css;
}

/* enable dragon iframe mode */
function enableDragon(){

  if(document.getElementById(IFRAME_ID)) return;

  const iframe = document.createElement("iframe");

  iframe.id = IFRAME_ID;
  iframe.src = window.location.pathname;

  iframe.style.position = "fixed";
  iframe.style.top = "0";
  iframe.style.left = "0";
  iframe.style.width = "100vw";
  iframe.style.height = "100vh";
  iframe.style.border = "none";
  iframe.style.zIndex = "9999";

  document.body.innerHTML = "";
  document.body.appendChild(iframe);

}

/* intercept links for dragon theme */
function interceptLinks(){

  document.addEventListener("click", e => {

    const link = e.target.closest("a");
    if(!link) return;

    const theme = localStorage.getItem(STORAGE_KEY);
    if(theme !== "dragon") return;

    const iframe = document.getElementById(IFRAME_ID);
    if(!iframe) return;

    e.preventDefault();
    iframe.src = link.href;

  });

}

/* initialize theme */
function initTheme(){

  let theme = localStorage.getItem(STORAGE_KEY);

  if(!theme || theme === "random"){
    const list = Object.keys(THEMES);
    theme = list[Math.floor(Math.random()*list.length)];
  }

  loadTheme(theme);

  if(theme === "dragon"){
    enableDragon();
  }

  interceptLinks();

}

document.addEventListener("DOMContentLoaded", initTheme);