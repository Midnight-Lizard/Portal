import { TestBed, fakeAsync, ComponentFixture, ComponentFixtureAutoDetect, inject, tick, flushMicrotasks, flush, async, discardPeriodicTasks }
    from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from "@angular/core";
import { expect as assume } from 'chai';
import { By } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ObservableMedia } from "@angular/flex-layout";
import { MatTooltip, MatCardTitle, MatCardImage, MatButton, MatPaginator }
    from "@angular/material";
import { Subject } from "rxjs/Subject";
import { Store } from "@ngrx/store";

import { SchemesListComponent } from './list.component';
import { SchemesPaginatorComponent } from "../paginator/paginator.component";
import { SchemeEntry, SchemesSide } from "../model/scheme.entry";
import { SchemesList } from "../model/schemes.lists";
import { ObservableMediaStub, MqAlias } from "../../test/stubs/observable-media.stub";
import { SchemesTestingModule } from "../schemes.testing-module";
import { RouterStub } from "../../test/stubs/router.stub";
import { because } from "../../test/utils/because";
import { nameof } from "../../test/utils/nameof";
import { click } from "../../test/utils/click.helper";
import { PageOptions } from "../model/page.options";
import { RootState } from "../store/schemes.state";
import * as Act from "../store/schemes.actions";
import { getTestScheduler } from "jasmine-marbles";
import { TestScheduler } from "jasmine-marbles/src/scheduler";
import { MarbleSchedulerInjector } from "../../test/utils/marble-scheduler-injector";

let component: SchemesListComponent;
let fixture: ComponentFixture<SchemesListComponent>;
let scheduler: TestScheduler;
const testPageOptions: PageOptions = { pageIndex: 0, pageSize: 5 };
const testSchemes = new Array<SchemeEntry>(
    {
        "id": 1,
        "name": "Apple Mint",
        "favorited": false,
        "liked": true,
        "likes": 45,
        "side": SchemesSide.dark,
        "screenshots": [
            { "url": "https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/17880136_1983863495175218_8889275720830076097_o.png?oh=9e4ae79ae77330a51cfca71571360f29&oe=59CCDBD5" }
        ]
    },
    {
        "id": 2,
        "name": "Morning Mist",
        "favorited": true,
        "liked": false,
        "likes": 25,
        "side": SchemesSide.light,
        "screenshots": [
            { "url": "https://scontent-arn2-1.xx.fbcdn.net/v/t31.0-8/15776902_1927113247516910_1850860440997664456_o.png?oh=b74302d59217c8c2fe477a1790519fc5&oe=59FF4D1E" }
        ]
    });

describe('SchemesListComponent', function (this: { schemes: Subject<typeof testSchemes> })
{
    beforeEach(fakeAsync(() =>
    {
        TestBed.configureTestingModule({
            declarations: [SchemesListComponent, SchemesPaginatorComponent],
            imports: [SchemesTestingModule],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true },
                { provide: ObservableMedia, useClass: ObservableMediaStub },
                { provide: Router, useClass: RouterStub }
            ]
        });
        scheduler = getTestScheduler();
        scheduler.maxFrames = 100;
        MarbleSchedulerInjector.inject(scheduler);
        fixture = TestBed.createComponent(SchemesListComponent);
        component = fixture.componentInstance;
    }));

    beforeEach(inject([Store], (store$: Store<RootState>) =>
    {
        store$.dispatch(new Act.SchemesCurrentPageLoaded({
            currPage: testSchemes, total: testSchemes.length, list: SchemesList.full,
            filters: { name: "", side: SchemesSide.none },
            pageOptions: testPageOptions
        }));
        spyOn(store$, "dispatch");
        scheduler.flush();
        fixture.detectChanges();
    }));

    it("should display cards for all test schemes", fakeAsync(() =>
    {
        const cards = fixture.debugElement.queryAll(By.css("mat-card"));
        expect(cards.length).toEqual(testSchemes.length);
    }));

    it("should display paginator with correct page options", fakeAsync(() =>
    {
        const paginator = fixture.debugElement.query(By.directive(MatPaginator)).componentInstance as MatPaginator;
        const actualPageOptions: PageOptions = {
            pageIndex: paginator.pageIndex,
            pageSize: paginator.pageSize
        };
        expect(actualPageOptions).toEqual(testPageOptions);
        expect(paginator.length).toEqual(testSchemes.length);
    }));

    for (let i = 0; i < testSchemes.length; i++)
    {
        const scheme = testSchemes[i];
        describe(`Card [${i}] for scheme [${scheme.name}]`,
            function (this: { card: DebugElement }) 
            {
                beforeEach(fakeAsync(() =>
                {
                    this.card = fixture.debugElement.queryAll(By.css("mat-card"))[i];
                }));

                it(`should have Id in sid attribute`, fakeAsync(() =>
                {
                    expect(this.card.attributes["sid"]).toEqual(scheme.id.toString());
                }));

                describe(`Header`, function (this: { header: DebugElement })
                {
                    beforeEach(fakeAsync(() =>
                    {
                        this.header = fixture.debugElement
                            .queryAll(By.css("mat-card"))[i]
                            .query(By.css("mat-card-header"));
                    }));

                    it(`should have tooltip with scheme name`, fakeAsync(() =>
                    {
                        expect(this.header.attributes["ng-reflect-message"]).toEqual(scheme.name);
                    }));

                    describe(`Title`, function (this: { titleElement: HTMLAnchorElement })
                    {
                        beforeEach(fakeAsync(() =>
                        {
                            this.titleElement = fixture.debugElement
                                .queryAll(By.css("mat-card"))[i]
                                .query(By.directive(MatCardTitle))
                                .nativeElement as HTMLAnchorElement;
                        }));
                        it(`should have reference to scheme image url`, fakeAsync(() =>
                        {
                            expect(this.titleElement.href).toEqual(scheme.screenshots[0].url);
                        }));
                        it(`should contain scheme name`, fakeAsync(() =>
                        {
                            expect(this.titleElement.textContent!.trim()).toEqual(scheme.name);
                        }));
                    });
                });

                describe(`Image`, function (this: { image: DebugElement })
                {
                    beforeEach(fakeAsync(() =>
                    {
                        this.image = fixture.debugElement
                            .queryAll(By.css("mat-card"))[i]
                            .query(By.directive(MatCardImage));
                    }));

                    it(`should have source bound to scheme image url`, fakeAsync(() =>
                    {
                        expect(this.image.properties["src"]).toEqual(scheme.screenshots[0].url);
                    }));
                });

                describe(`Actions`, function ()
                {
                    it(`should have 5 action buttons`, fakeAsync(() =>
                    {
                        expect(fixture.debugElement
                            .queryAll(By.css("mat-card"))[i]
                            .queryAll(By.directive(MatButton)).length).toEqual(5);
                    }));

                    describe(`Like button`, function (this: { likeButton: DebugElement }) 
                    {
                        beforeEach(fakeAsync(() =>
                        {
                            this.likeButton = fixture.debugElement
                                .queryAll(By.css("mat-card"))[i]
                                .queryAll(By.directive(MatButton))[0];
                        }));
                        it(`should be filled with accent color if scheme is liked otherwise with primary`, fakeAsync(() =>
                        {
                            assume(this.likeButton.attributes["ng-reflect-color"])
                                .is.equal(scheme.liked ? "accent" : "primary",
                                because(() => scheme.liked));
                        }));
                        it(`should have appropriate tooltip`, fakeAsync(() =>
                        {
                            assume(this.likeButton.attributes["ng-reflect-message"])
                                .equal(scheme.liked ? "Remove like" : "Add like",
                                because(() => scheme.liked));
                        }));
                        it(`should dispatch LikeScheme or DislikeScheme EventAction on click`, fakeAsync(inject(
                            [Store], (store$: Store<RootState>) =>
                            {
                                click(this.likeButton);
                                fixture.detectChanges();
                                const expectedEventAction = scheme.liked
                                    ? new Act.DislikeScheme(scheme)
                                    : new Act.LikeScheme(scheme);
                                expect(store$.dispatch).toHaveBeenCalledWith(expectedEventAction);
                            })));
                    });
                    describe(`Favorites button`, function (this: { favoritesButton: DebugElement }) 
                    {
                        beforeEach(fakeAsync(() =>
                        {
                            this.favoritesButton = fixture.debugElement
                                .queryAll(By.css("mat-card"))[i]
                                .queryAll(By.directive(MatButton))[1];
                        }));
                        it(`should be filled with warn color if scheme is in favorites otherwise with primary`, fakeAsync(() =>
                        {
                            assume(this.favoritesButton.attributes["ng-reflect-color"])
                                .is.equal(scheme.favorited ? "warn" : "primary",
                                because(() => scheme.favorited));
                        }));
                        it(`should have appropriate tooltip`, fakeAsync(() =>
                        {
                            assume(this.favoritesButton.attributes["ng-reflect-message"])
                                .is.equal(scheme.favorited ? "Remove from favorites" : "Add to favorites",
                                because(() => scheme.favorited));
                        }));
                        it(`should have appropriate icon`, fakeAsync(() =>
                        {
                            const iconText = (this.favoritesButton.query(By.css("mat-icon")).nativeElement as HTMLElement).textContent;
                            assume(iconText).is.equal(scheme.favorited ? "favorite" : "favorite_border",
                                because(() => scheme.favorited));
                        }));
                        it(`should dispatch AddSchemeToFavorites or RemoveSchemeFromFavorites EventAction on click`, fakeAsync(inject(
                            [Store], (store$: Store<RootState>) =>
                            {
                                click(this.favoritesButton);
                                fixture.detectChanges();
                                const expectedEventAction = scheme.favorited
                                    ? new Act.RemoveSchemeFromFavorites(scheme)
                                    : new Act.AddSchemeToFavorites(scheme);
                                expect(store$.dispatch).toHaveBeenCalledWith(expectedEventAction);
                            })));
                    });
                });
            });
    }

    describe(`Media query`, function ()
    {
        const medium: { mqAlias: MqAlias, cols: number, aspect: string }[] = [
            { mqAlias: "default", cols: 2, aspect: "4:5" },
            { mqAlias: "xx", cols: 2, aspect: "95:100" },
            { mqAlias: "xs", cols: 1, aspect: "4:5" },
            { mqAlias: "sm", cols: 1, aspect: "100:95" },
            { mqAlias: "md", cols: 2, aspect: "6:7" },
            { mqAlias: "lg", cols: 2, aspect: "95:100" },
            { mqAlias: "xl", cols: 3, aspect: "95:100" }
        ];
        for (let media of medium)
        {
            describe(media.mqAlias, function (this: { grid: DebugElement })
            {
                beforeEach(fakeAsync(inject([ObservableMedia], (mediaStub: ObservableMediaStub) =>
                {
                    if (media.mqAlias !== "default")
                    {
                        mediaStub.changeMedia(media.mqAlias);
                    }
                    this.grid = fixture.debugElement.query(By.css("mat-grid-list"));
                    fixture.detectChanges();
                })));

                it(`should change grid to ${media.cols} columns`, fakeAsync(() =>
                {
                    assume(this.grid.attributes["ng-reflect-cols"]).equal(media.cols.toString());
                }));

                it(`should change tile aspect ratio to ${media.aspect}`, fakeAsync(() =>
                {
                    assume(this.grid.attributes["ng-reflect-row-height"]).equal(media.aspect.toString());
                }));
            });
        }
    });
});