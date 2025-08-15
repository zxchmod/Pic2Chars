export function saveAsTXT(content){
  const blob = new Blob([content.replace(/<[^>]+>/g,"")], {type:"text/plain"});
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "ascii.txt";
  link.click();
}

export function saveAsHTML(content){
  const blob = new Blob([`<pre>${content}</pre>`], {type:"text/html"});
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "ascii.html";
  link.click();
}
