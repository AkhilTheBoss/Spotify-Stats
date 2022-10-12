async function sendPostRequest(url, data) {
  params = {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: data,
  };
  console.log("Abt to send the post req");
  let response = await fetch(url, params);
  console.log(response);

  if (response.ok) {
    let data = response.text();
    return data;
  } else {
    throw Error(response.status);
  }
}

document.getElementById("CurrentSongs").innerHTML = " ";  // This is to reset the div
let cityObj = { Explain: "recent" }; // It is an obj, this provides the name of the button
let cityJson = JSON.stringify(cityObj); // It is a JSON string of the object
sendPostRequest("/recent", cityJson)
  .then(function (val) {
      console.log(
        "The following string was recieved from the server to the browser:",
        val
      );
      var text = "";;

      val = JSON.parse(val);
      var elem = document.getElementById("CurrentSongs");


      for (let i = 0; i < val.length; ++i){
        text = i+1 + ":        " + val[i].Name;
        text1 = "  --->  By: " + val[i].artist;

        var stuffToAdd2 = document.createTextNode(text1);
        var stuffToAdd1 = document.createTextNode(text);
        var br = document.createElement("br");

        elem.appendChild(stuffToAdd1); // appends text to the div
        elem.appendChild(stuffToAdd2); // appends text to the div
        elem.appendChild(br);   // appends a <br> to the div
        // img.style.marginLeft = "100px";
        // img.style.height = "100px";
      }

  })
  .catch(function (error) {
    console.error("Error:", error);
  });

const HomeButton = document.getElementById("Home");
HomeButton.addEventListener("click", HomeAction);

function HomeAction(){
  console.log(HomeButton.textContent);
  window.location = "/";
}
