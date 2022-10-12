async function sendPostRequest(url, data) {
  params = {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: data,
  };
  console.log("Abt to send the post req");
  let response = await fetch(url, params);
  // console.log(response);

  if (response.ok) {
    let data = response.text();
    return data;
  } else {
    throw Error(response.status);
  }
}


const submitButton1 = document.getElementById("Top-4Weeks");
submitButton1.addEventListener("click", buttonAction1);

const submitButton2 = document.getElementById("Top-6Months");
submitButton2.addEventListener("click", buttonAction2);

const submitButton3 = document.getElementById("AllTime");
submitButton3.addEventListener("click", buttonAction3);

const HomeButton = document.getElementById("Home");
HomeButton.addEventListener("click", HomeAction);

function buttonAction1(){
  document.getElementById("FillArtists").innerHTML = " "; // This is to reset the div

  console.log(submitButton1.textContent);
  let cityObj = { Explain: submitButton1.textContent }; // It is an obj, this provides the name of the button
  let cityJson = JSON.stringify(cityObj); // It is a JSON string of the object
  sendPostRequest("/getArtists", cityJson)
    .then(function (val) {
        console.log(
          "The following string was recieved from the server to the browser:",
          val
        );
        var text = "";;

        val = JSON.parse(val);
        var elem = document.getElementById("FillArtists");


        for (let i = 0; i < val.length; ++i){
          var img = document.createElement('img');
          img.src = val[i].Url;
          text = i+1 + ":        " + val[i].Name;

          var stuffToAdd = document.createTextNode(text);
          var br = document.createElement("br");

          elem.appendChild(img);   // appends an image to the div
          elem.appendChild(stuffToAdd); // appends text to the div
          elem.appendChild(br);   // appends a <br> to the div
          img.style.marginLeft = "100px";
          img.style.height = "100px";
        }

    })
    .catch(function (error) {
      console.error("Error:", error);
    });
    // window.location = "/songs";
}

function buttonAction2(){
  document.getElementById("FillArtists").innerHTML = " ";  // This is to reset the div
  console.log(submitButton2.textContent);
  let cityObj = { Explain: submitButton2.textContent }; // It is an obj, this provides the name of the button
  let cityJson = JSON.stringify(cityObj); // It is a JSON string of the object
  sendPostRequest("/getArtists", cityJson)
    .then(function (val) {
        console.log(
          "The following string was recieved from the server to the browser:",
          val
        );
        var text = "";;

        val = JSON.parse(val);
        var elem = document.getElementById("FillArtists");


        for (let i = 0; i < val.length; ++i){
          img = document.createElement('img');
          img.src = val[i].Url;
          text = i+1 + ":        " + val[i].Name;

          var stuffToAdd = document.createTextNode(text);
          var br = document.createElement("br");

          elem.appendChild(img);   // appends an image to the div
          elem.appendChild(stuffToAdd); // appends text to the div
          elem.appendChild(br);   // appends a <br> to the div
          img.style.marginLeft = "100px";
          img.style.height = "100px";
        }

    })
    .catch(function (error) {
      console.error("Error:", error);
    });
    // window.location = "/songs";
}

function buttonAction3(){
  console.log(submitButton3.textContent);
  document.getElementById("FillArtists").innerHTML = " "; // This is to reset the div

  console.log(submitButton3.textContent);
  let cityObj = { Explain: submitButton3.textContent }; // It is an obj, this provides the name of the button
  let cityJson = JSON.stringify(cityObj); // It is a JSON string of the object
  sendPostRequest("/getArtists", cityJson)
    .then(function (val) {
        console.log(
          "The following string was recieved from the server to the browser:",
          val
        );
        var text = "";;

        val = JSON.parse(val);
        var elem = document.getElementById("FillArtists");


        for (let i = 0; i < val.length; ++i){
          var img = document.createElement('img');
          img.src = val[i].Url;
          text = i+1 + ":        " + val[i].Name;

          var stuffToAdd = document.createTextNode(text);
          var br = document.createElement("br");

          elem.appendChild(img);   // appends an image to the div
          elem.appendChild(stuffToAdd); // appends text to the div
          elem.appendChild(br);   // appends a <br> to the div
          img.style.marginLeft = "100px";
          img.style.height = "100px";

        }

    })
    .catch(function (error) {
      console.error("Error:", error);
    });
  // console.log("FavSongs");
  // window.location = "/songs";
}

function HomeAction(){
  console.log(HomeButton.textContent);
  window.location = "/";
}
