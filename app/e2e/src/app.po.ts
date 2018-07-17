import { browser, by, element } from 'protractor';

export enum Route
{
    Home = '/home',
    Schemes = '/schemes'
}

export class AppPage
{
    navigateTo(route: Route)
    {
        return browser.get(route);
    }

    getMainContentAsText()
    {
        return element(by.css('.main-content')).getText();
    }

    getLeftSideContentAsText()
    {
        return element(by.css('.left-side')).getText();
    }
}
