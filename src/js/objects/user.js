const user = {
    avatarUrl: '',
    name: '',
    bio: '',
    userName: '',
    followers: '',
    following: '',
    events: [],
    repositories: [],
    setInfo(gitHubUser) {
        this.avatarUrl = gitHubUser.avatar_url
        this.name = gitHubUser.name
        this.bio = gitHubUser.bio
        this.userName = gitHubUser.login
        this.followers = `👥Seguidores: ${gitHubUser.followers}`
        this.following = `👥Seguindo: ${gitHubUser.following}`
    },
    setEvents(events) {
        this.events = events
    },
    setRepositories(repositories) {
        this.repositories = repositories
    }
}

export { user }