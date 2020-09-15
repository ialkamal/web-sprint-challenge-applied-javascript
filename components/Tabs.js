// STEP 2: Create tabs
// -----------------------
// Using axios send a GET request to the address: https://lambda-times-api.herokuapp.com/topics
// Once the data is resolved use console logs or breakpoints to review the structure.
// Iterate over the topics creating a new tab for each topic, and appending it to the DOM
// under the div.topics element.
//
//  Each tab should look like this:
//    <div class="tab">topic here</div>
//
// NOTE: you do _not_ need to install axios as it's included in the HTML via script element



function tabCreator(topic) {
    const tab = document.createElement("div");
    tab.classList.add("tab");
    tab.textContent = topic;

    tab.addEventListener("click", (event) => {

        const tabs = document.querySelectorAll(".tab");
        tabs.forEach((tab) => {
            tab.classList.remove("active-tab");
        });

        event.target.classList.add("active-tab");

        const cards = document.querySelectorAll(".card")
        cards.forEach((card) => {
            const tabValue = event.target.textContent === "node.js" ? "node" : event.target.textContent;

            if (tabValue === card.classList[1] || tabValue === "all")
                card.classList.remove("invisible");
            else
                card.classList.add("invisible");
        });
    });

    return tab;
}

const topics = document.querySelector(".topics");
const allTab = tabCreator("all");
allTab.classList.add("active-tab");
topics.appendChild(allTab);

axios.get('https://lambda-times-api.herokuapp.com/topics').then(
    (response) => {
        response.data.topics.forEach(topic => {
            topics.appendChild(tabCreator(topic));
        });
    }
).catch((err) => {
    console.log(err);
});