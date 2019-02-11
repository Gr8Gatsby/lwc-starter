import { LightningElement, api } from 'lwc';

export default class Nav extends LightningElement {
    @api path;
    @api linkText;

    handleNavigate(event){
        event.stopPropagation();
        console.log("navigating to " + this.path);
        this.dispatchEvent(
            new CustomEvent('nav', {
                bubbles: true,
                composed: true,
                detail: {
                    path: this.path,
                },
            }),
        );
    }
}