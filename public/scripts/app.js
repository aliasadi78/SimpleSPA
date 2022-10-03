import page1 from './pages/page1.js'
import page2 from './pages/page2.js'
import page3 from './pages/page3.js'

const navTo = (url) => {
    history.pushState(null, null, url)
    router()
}
const router = () => {
    const routes = [
        { path: '/', view: page1 },
        { path: '/page2', view: page2 },
        { path: '/page3', view: page3 }
    ]

    const matchRoutes = routes.map((item) => {
        return {
            route: item,
            inMatch: location.pathname === item.path
        }
    })

    let match = matchRoutes.find(item => item.inMatch)
    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        }
    }
    document.querySelector('#app').innerHTML = match.route.view()
}

window.addEventListener('popstate', router)


document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (event) => {
        if (event.target.matches('[data-link]')) {
            event.preventDefault()
            navTo(event.target.href)
        }
    })
    router()
})