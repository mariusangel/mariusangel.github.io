const myImage = document.querySelector("img");

myImage.onclick = () => {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "C:\Users/User/Documents/PrimulWebsite/images/firefox2.png.png") {
    myImage.setAttribute("src", "C:/Users/User/Documents/PrimulWebsite/images/firefox2.png.png");
  } else {
    myImage.setAttribute("src", "C:/Users/User/Documents/PrimulWebsite/images/firefox2.png.png");
  }
};

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function setUserName(){
  const myName = prompt("Please enter your name!");
  if (!myName){
      setUserName();
  } else {
    localStorage.setItem("name", myName);
    myHeading.textContent = `Mozilla is cool, ${myName}`;
  }
}

if(!localStorage.getItem("name")){
  setUserName();
}else{
  const storedName = localStorage.getItem("name");
  myHeading.textContent = `Mozilla is cool, ${storedName}`;
}

myButton.onclick = () => {
  setUserName();
}
