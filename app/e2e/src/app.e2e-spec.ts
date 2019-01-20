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

        it('should display title', () =>
        {
            expect(page.getMainContentAsText()).toMatch(/Midnight Lizard/);
        });
    });

    xdescribe(Route.Schemes, () =>
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
