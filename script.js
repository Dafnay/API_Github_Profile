const main = document.querySelector("#main");
const form = document.querySelector("#form");
const search = document.querySelector("#search");

search.addEventListener("keydown", (event) => {
  let searchValue = search.value;
  let emptyValue = "";
  const enterCode = "Enter";

  if (event.code === enterCode && searchValue !== emptyValue) {
    event.preventDefault();
    getUser(searchValue);
    getUserRepos(searchValue);
  }
});

function getUser(userName) {
  const APIURL = `https://api.github.com/users/${userName}`;
  axios
    .get(APIURL)
    .then(async (response) => {
      const avatar = response.data.avatar_url;
      const name = response.data.name;
      const bio = response.data.bio;
      const followers = response.data.followers;
      const following = response.data.following;
      const reposNumber = response.data.public_repos;

      const reposUrl = response.data.repos_url;
      const reposResponse = await getUserRepos(reposUrl);
      const repos = reposResponse.data;
      createCard({
        avatar: avatar,
        name: name,
        bio: bio,
        followers: followers,
        following: following,
        reposNumber: reposNumber,
        repos: repos,
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getUserRepos(url) {
  return axios.get(url);
}

function createCard({
  avatar,
  name,
  bio,
  followers,
  following,
  reposNumber,
  repos,
}) {
  // card
  let card = document.createElement("div");
  card.setAttribute("class", "card");

  // avatar
  let avatarImg = document.createElement("img");
  avatarImg.setAttribute("class", "avatar");
  avatarImg.setAttribute("src", avatar);

  // userInfo
  let userInfo = document.createElement("div");
  userInfo.setAttribute("class", "user-info");

  // name h2
  let textCard = document.createElement("h2");
  textCard.innerText = name;

  // bio
  let bioText = document.createElement("p");
  bioText.innerText = bio;

  // followers list
  let followerList = document.createElement("ul");
  let followersNumber = document.createElement("li");
  followersNumber.innerText = `${followers} Followers`;
  let followingNumber = document.createElement("li");
  followingNumber.innerHTML = `${following} Following`;
  let reposNumbers = document.createElement("li");
  reposNumbers.innerText = `${reposNumber} Repos`;

  // repos list
  let reposList = document.createElement("ul");

  const splitRepos = repos.splice(0, 5);
  splitRepos.forEach((repo) => {
    const repoName = repo.name;
    const nameLi = document.createElement("li");
    nameLi.setAttribute("class", "repo");
    nameLi.innerText = repoName;
    reposList.appendChild(nameLi);
  });

  // append elements
  card.appendChild(avatarImg);
  card.appendChild(userInfo);
  userInfo.appendChild(textCard);
  userInfo.appendChild(bioText);
  userInfo.appendChild(followerList);
  followerList.appendChild(followersNumber);
  followerList.appendChild(followingNumber);
  followerList.appendChild(reposNumbers);

  userInfo.appendChild(reposList);
  main.appendChild(card);
}
