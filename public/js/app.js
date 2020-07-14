console.log("Client side javascript file is loaded");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

//messageOne.textContent = "From Javascript";

weatherform.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
  const url = `http://localhost:3000/weather?address=${location}`;
  messageOne.textContent = "Loading...";

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log("There is an error");
        messageOne.textContent = "There is an error";
      } else {
        messageOne.textContent = `${data.location}`;
        messageTwo.textContent = `Today's temperatue is ${data.forecast.temp_c}`;
      }
    });
  });
});
