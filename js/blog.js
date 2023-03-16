//grabbing all selectors
let postsArray = [];
const titleInput = document.getElementById("post-title");
const bodyInput = document.getElementById("post-body");
const form = document.getElementById("new-post");
//posting in HTML
function renderPost() {
  let html = "";
  for (let post of postsArray) {
    html += `
              <h2>${post.title}</h2>
              <p>${post.body}</p>
              <hr />
          `;
  }
  //grabbing html element
  document.getElementById("blog-list").innerHTML = html;
}
//requesting from blog
fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((res) => res.json())
  .then((data) => {
    postsArray = data.slice(0, 5);
    renderPost();
  });

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const postTitle = titleInput.value;
  const postBody = bodyInput.value;
  const data = {
    title: postTitle,
    body: postBody,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  //posting to blog
  fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then((res) => res.json())
    .then((post) => {
      postsArray.unshift(post);
      renderPost();

      //clear out form
      titleInput.value = "";
      bodyInput.value = "";
    });
});

//query strings
//bikeracks?available=true&brand=Thule&numBikes=4
/*
fetch(
  "https://apis.scrimba.com/openweathermap/data/2.5/weather?q=salt lake+city&units=metric"
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
*/
