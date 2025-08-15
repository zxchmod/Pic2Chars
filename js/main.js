import { convertToASCII } from "./asciiConverter.js";
import { saveAsTXT, saveAsHTML } from "./fileHandler.js";
import { toggleTheme } from "./ui.js";

const upload = document.getElementById("upload");
const asciiOutput = document.getElementById("asciiOutput");
const scaleInput = document.getElementById("scale");
const fontSizeInput = document.getElementById("fontSize");
const charSetSelect = document.getElementById("charSet");
const colorModeSelect = document.getElementById("colorMode");
const invertCheckbox = document.getElementById("invert");
const mirrorSelect = document.getElementById("mirror");

const dropZone = document.getElementById("dropZone");
const saveTXTBtn = document.getElementById("saveTXT");
const saveHTMLBtn = document.getElementById("saveHTML");
const toggleThemeBtn = document.getElementById("toggleTheme");

let currentImage = null;

dropZone.addEventListener("dragover", e=>{e.preventDefault(); dropZone.style.borderColor="#f5f5f5";});
dropZone.addEventListener("dragleave", e=>{e.preventDefault(); dropZone.style.borderColor="#888";});
dropZone.addEventListener("drop", e=>{e.preventDefault(); dropZone.style.borderColor="#888"; loadImage(e.dataTransfer.files[0]); });
upload.addEventListener("change", e=>loadImage(e.target.files[0]));

function loadImage(file){
  if(!file) return;
  const reader = new FileReader();
  reader.onload = e=>{
    const img = new Image();
    img.onload = ()=>{
      currentImage = img;
      renderASCII();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function renderASCII(){
  if(!currentImage) return;
  const scale = parseInt(scaleInput.value);
  const chars = charSetSelect.value;
  const fontSize = fontSizeInput.value;
  const colorMode = colorModeSelect.value;
  const invert = invertCheckbox.checked;
  const mirror = mirrorSelect.value;

  asciiOutput.innerHTML = convertToASCII(currentImage, scale, chars, colorMode, invert, mirror);
  asciiOutput.style.fontSize = fontSize+"px";
}

[scaleInput,fontSizeInput,charSetSelect,colorModeSelect,invertCheckbox,mirrorSelect].forEach(el=>{
  el.addEventListener("input",renderASCII);
  el.addEventListener("change",renderASCII);
});

saveTXTBtn.addEventListener("click", ()=>saveAsTXT(asciiOutput.innerHTML));
saveHTMLBtn.addEventListener("click", ()=>saveAsHTML(asciiOutput.innerHTML));
toggleThemeBtn.addEventListener("click", toggleTheme);
