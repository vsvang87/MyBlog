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
              <button class="delete-btn">Delete</button>
              <hr />
          `;
  }
  //grabbing html element
  let blogList = document.getElementById("blog-list");
  blogList.innerHTML = html;
}

//get item from local storage
let getBlogsFromLocalStorage = JSON.parse(localStorage.getItem("blogs"));
console.log(getBlogsFromLocalStorage);

//checking if its in local storage
if (getBlogsFromLocalStorage) {
  data = getBlogsFromLocalStorage;
  renderPost();
}

//requesting from dummy blog from scrimba url
/* fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((res) => res.json())
  .then((data) => {
    postsArray = data.slice(0, 5);
    renderPost();
  }); */

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const postTitle = titleInput.value;
  const postBody = bodyInput.value;
  let data = {
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

  //local storage
  localStorage.setItem("blogs", JSON.stringify(data));

  //posting to blog
  const url = fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then((res) => res.json())
    .then((post) => {
      postsArray.unshift(post);
      renderPost();

      //clear out form
      titleInput.value = "";
      bodyInput.value = "";
    });
});

//saving my blogs to local storage

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

/* let obj = {
  name: "Visay",
  age: 35,
};

let convertObj = JSON.stringify(obj);

localStorage.setItem("Me", convertObj);
console.log(localStorage); */
