export function convertToASCII(img, scale, chars, colorMode="colored", invert=false, mirror="none") {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const width = Math.floor(img.width / scale);
  const height = Math.floor(img.height / scale);
  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(img, 0, 0, width, height);
  const data = ctx.getImageData(0, 0, width, height).data;

  let ascii = "";
  for(let y=0;y<height;y++){
    for(let x=0;x<width;x++){
      let px = x, py = y;
      if(mirror==="horizontal") px = width-1-x;
      if(mirror==="vertical") py = height-1-y;

      const idx = (py*width + px)*4;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      let brightness = (0.299*r + 0.587*g + 0.114*b)/255;
      if(invert) brightness = 1-brightness;
      const char = chars[Math.floor((chars.length-1)*(1-brightness))];
      if(colorMode==="colored") ascii += `<span style="color:rgb(${r},${g},${b})">${char}</span>`;
      else ascii += char;
    }
    ascii += "\n";
  }
  return ascii;
}
