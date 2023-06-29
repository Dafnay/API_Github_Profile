
const main = document.querySelector("#main");
const form = document.querySelector("#form");
const search = document.querySelector("#search");



search.addEventListener('keydown', (event)=>{
  let searchValue = search.value;
  let emptyValue = ''; 
  const enterCode = 'Enter';

  if((event.code === enterCode) && (searchValue !== emptyValue)){
    event.preventDefault()
    getUser(searchValue)
  }
})



function getUser(userName){

  const APIURL = `https://api.github.com/users/${userName}`
    axios.get(APIURL)
    .then((response) => {
      console.log(response.data);
      const avatar = response.data.avatar_url
      const name = response.data.name
      const followers = response.data.followers
      const repos = response.data.repos_url
      createCard({avatar: avatar,name: name, followers: followers, repos: repos})
    })
    .catch(err =>{
        console.log(err)
    })
}

function createCard({avatar, name, repos}){ 
  let card = document.createElement('div')
  card.setAttribute('class', 'card')
  let avatarImg = document.createElement('img')
  avatarImg.setAttribute('class', 'avatar')
  avatarImg.setAttribute('src', avatar)
  let textCard = document.createElement('h2')
  textCard.innerText = name
  
  card.appendChild(avatarImg)
  card.appendChild(textCard)
  main.appendChild(card)
}