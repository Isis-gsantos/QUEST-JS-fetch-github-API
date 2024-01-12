const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                            <div class="data">
                                <h1>${user.name ?? 'Não possui nome cadastrado '}</h1>
                                <p>${user.bio ?? 'Não possui bio cadastrada'}</p>
                                <p>${user.followers ?? 'Não possui seguidores'}</p>
                                <p>${user.following ?? 'Não possui pessoas que o usuário segue'}</p>
                            </div>
                        </div>`

        let eventsItens = ''
        if (user.events.length === 0) {
            eventsItens = '<li><span>O usuário não possui eventos recentes</span></li>';
        } else {
            user.events.forEach(event => {
                if (event.type === 'PushEvent') {
                    eventsItens += `<li>${event.repo.name}
                                        <span>- ${event.payload.commits[0].message}</span>
                                    </li>`;
                } else if (event.type === 'CreateEvent') {
                    eventsItens += `<li>${event.repo.name}
                                        <span>- O usuário criou um repositório</span>
                                    </li>`;
                }
            })
        }

        this.userProfile.innerHTML += `<div class="event-itens">
                                            <h2>Eventos Recentes</h2>
                                            <ul>${eventsItens}</ul>
                                       </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li>
                                                                    <a href="${repo.html_url}" target="_blank">
                                                                    ${repo.name}</a>
                                                                    <ul class="repositories-info">
                                                                        <li>🍴${repo.forks}</li>
                                                                        <li>⭐${repo.stargazers_count}</li>
                                                                        <li>👀${repo.watchers_count}</li>
                                                                        <li>💻${repo.language}</li>
                                                                    </ul>
                                                                </li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                           </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }