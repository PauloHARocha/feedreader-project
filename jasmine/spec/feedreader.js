/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        let allFeedsLength = allFeeds.length;// put the length on a variable for better performance

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeedsLength).not.toBe(0);
        });
        
        it('have a url', function(){ // Test that ensures that all feeds have a url defined and non empty
            allFeeds.forEach(function(feed){
                var feedUrl = feed.url;
                expect(feedUrl).toBeDefined();
                expect(feedUrl).not.toBe('');
            });
        });

        it('have a name', function () { // Test that ensures that all feeds have a name defined and non empty
            allFeeds.forEach(function (feed) {
                var feedName = feed.name;
                expect(feedName).toBeDefined();
                expect(feedName).not.toBe('');
            });
        });
    });

    describe('The menu',function(){

        it('is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true); //tests the visibility using the class menu-hiden
        })

        it('is show and hidden when clicked', function () {
            $('.menu-icon-link').trigger('click'); //trigger the click event on menu-icon-link
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click'); //back to normal state
            expect($('body').hasClass('menu-hidden')).toBe(true);
        })

    });

    
    describe('Initial Entries', function () {
        
        beforeEach(function (done) {
            loadFeed(0, done)
        });

        it('has at least one', function () {
            expect($('.feed .entry').length > 0).toBe(true); //tests if there is any entry using the length of the container feed
        })

    });

    describe('New Feed Selection', function(){
        
        let oldFirstFeed = '',
            newFirstFeed = '';
        beforeEach(function (done) {
            loadFeed(0, function () {// call the first loadFeed to load content
                oldFirstFeed = $('.feed').html() //Save the first entry of the feed
                //try to change the id of loadFeed to 0 and see that the test fails
                loadFeed(1, function () { // call the second loadFeed to update the content with another url
                    newFirstFeed = $('.feed').html() //Save the first entry of the update feed
                    done();
                });
            });

        })

        it('update the content', function () {
            expect(oldFirstFeed == newFirstFeed).toBe(false); // If they are different the content has been updated
        })

    })

}());
