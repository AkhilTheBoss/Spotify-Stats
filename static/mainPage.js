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

const submitButton = document.getElementById("Songssubmit");
submitButton.addEventListener("click", buttonAction);

function buttonAction(){
  console.log("FavSongs");
  window.location = "/songs";
}


const submitButton1 = document.getElementById("Artistssubmit");
submitButton1.addEventListener("click", buttonAction1);

function buttonAction1(){
  console.log("FavArtists");
  window.location = "/artists";
}


const submitButton2 = document.getElementById("Currentsubmit");
submitButton2.addEventListener("click", buttonAction2);

function buttonAction2(){
  console.log("CurrentSongs");
  window.location = "/current";
}
