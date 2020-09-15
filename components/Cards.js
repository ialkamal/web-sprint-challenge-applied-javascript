// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-api.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each article in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that takes a single article object and returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// Use your function to create a card for each of the articles, and append each card to the DOM.

const cardContainer = document.querySelector(".cards-container");
const errorsContainer = document.querySelector(".errors-container");

function errorsCreator(err) {
  const error = document.createElement("div");
  error.textContent = err;
  return error;
}

axios
  .get("https://lambda-times-api.herokuapp.com/topics")
  .then((response) => {
    const topics = response.data.topics;
    topics[topics.indexOf("node.js")] = "node";

    axios
      .get("https://lambda-times-api.herokuapp.com/articles")
      .then((response) => {
        topics.forEach((topic) => {
          response.data.articles[topic].forEach((article) => {
            cardContainer.appendChild(cardCreator(article, topic));
          });
        });
      })
      .catch((err) => {
        errorsContainer.appendChild(errorsCreator(err));
      });
  })
  .catch((err) => {
    errorsContainer.appendChild(errorsCreator(err));
  });

const cardCreator = (article, topic) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.classList.add(topic);
  card.addEventListener("click", () => {
    console.log(article.headline);
  });

  const headline = document.createElement("div");
  headline.classList.add("headline");
  headline.textContent = article.headline;
  card.appendChild(headline);

  const author = document.createElement("div");
  author.classList.add("author");

  const authorImgDiv = document.createElement("div");
  authorImgDiv.classList.add("img-container");

  const authorImg = document.createElement("img");
  authorImg.src = article.authorPhoto;
  authorImgDiv.appendChild(authorImg);

  author.appendChild(authorImgDiv);

  const authorName = document.createElement("span");
  authorName.textContent = article.authorName;
  author.appendChild(authorName);

  card.appendChild(author);

  return card;
};
