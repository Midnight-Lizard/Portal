import { AppPage, Route } from './app.po';

describe('portal', () =>
{
    let page: AppPage;

    beforeEach(() =>
    {
        page = new AppPage();
    });

    describe(Route.Home, () =>
    {
        beforeEach(() =>
        {
            page.navigateTo(Route.Home);
        });

        it('should display lorem ipsum', () =>
        {
            expect(page.getMainContentAsText()).toMatch(/Lorem ipsum/);
        });
    });

    describe(Route.Schemes, () =>
    {
        beforeEach(() =>
        {
            page.navigateTo(Route.Schemes);
        });

        it('should display links in side-nav', () =>
        {
            expect(page.getLeftSideContentAsText()).toMatch(/All schemes/);
        });
    });
});
