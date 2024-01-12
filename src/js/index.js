import { getUser } from "/src/js/services/user.js"
import { getRepositories } from "/src/js/services/repositories.js"
import { getUserEvents } from "/src/js/services/user-events.js"

import { user } from "/src/js/objects/user.js"
import { screen } from "/src/js/objects/screen.js"

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if(validateEmpityinput(userName)) return
    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value  
    const key = e.which || e.keyCode 
    const isEnterKeyPressed = key === 13

    if(isEnterKeyPressed){
        if(validateEmpityinput(userName)) return
        getUserData(userName)
    }
})

function validateEmpityinput(userName) {
    if(userName.length === 0) {
        alert('Preencha o campo com o nome do usuário do GitHub')
        return true
    }
}

async function getUserData(userName) {
    const userResponse = await getUser(userName)

    if(userResponse.message === "Not Found") {
        screen.renderNotFound()
        return
    }

    const eventsResponse = await getUserEvents(userName)
    user.setEvents(eventsResponse)

    const repositoriesResponse = await getRepositories(userName)
    user.setInfo(userResponse)

    user.setRepositories(repositoriesResponse)

    screen.renderUser(user)
}