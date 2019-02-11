import { LightningElement, createElement, track } from 'lwc';
import Navigo from 'navigo';

export default class App extends LightningElement {
    releaseVersion = process.env.RELEASE_VERSION;
    releaseDate = process.env.RELEASE_DATE;

    router = new Navigo(location.origin, false);

    constructor(){
        super();

        this.router.on({
            '/default': async () => {
                const { default: ViewDefault } = await import('view/default');
                this.setPage('view-default', ViewDefault);
            },
            '/about': async () => {
                const { default: ViewAbout } = await import('view/about');
                this.setPage('view-about', ViewAbout);
            }
        })

        const navigateToDefault = () => {
            this.router.navigate('/default');
        }

        this.router.notFound(navigateToDefault);
        this.router.on(navigateToDefault);
    }

    renderedCallback(){
        if (!this.isRendered) {
            this.isRendered = true;
            this.router.resolve();
        }
    }

    setPage(tagName, component, props = {}) {
        console.log("Setting page to " + tagName);
        const el = createElement(tagName, {
            is: component,
            fallback: false,
        });

        Object.assign(el, props);

        const container = this.template.querySelector('.container');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        container.appendChild(el);
    }

    handleNavigationEvent(evt) {
        const { path } = evt.detail;
        this.router.navigate(path);
    }
    
}