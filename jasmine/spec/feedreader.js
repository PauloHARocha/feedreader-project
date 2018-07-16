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
        

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have a url', function(){
            for(let i = 0; i < allFeedsLength; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a name', function () {
            
            for (let i = 0; i < allFeedsLength; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });

    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu',function(){
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function(){
            expect($('body').attr('class')).toBe('menu-hidden'); //tests the visibility using the class menu-hiden
        })

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

        it('is show when clicked', function () {
            $('.menu-icon-link').trigger('click'); //trigger the click event on menu-icon-link
            expect($('body').attr('class')).toBe('');
            $('.menu-icon-link').trigger('click'); //back to normal state
        })

        it('is hidden when clicked again', function () {
            $('.menu-icon-link').trigger('click');
            $('.menu-icon-link').trigger('click');
            expect($('body').attr('class')).toBe('menu-hidden');
        })

        

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });

        })

        it('has at least one', function (done) {
            expect($('.feed').children().length > 0).toBe(true); //tests if there is any entry using the length of the container feed
            done();
        })

    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let oldFirstFeed = '',
            newFirstFeed = '';
        beforeEach(function (done) {
            loadFeed(0, function () {// call the first loadFeed to load content
                oldFirstFeed = $('.feed').children().first().has('h2').html() //Save the first entry of the feed
                //try to change the id of loadFeed to 0 and see that the test fails
                loadFeed(1, function () { // call the second loadFeed to update the content with another url
                    newFirstFeed = $('.feed').children().first().has('h2').html() //Save the first entry of the update feed
                    done();
                });
            });

        })

        it('update the content', function (done) {
            expect(oldFirstFeed == newFirstFeed).toBe(false); // If they are different the content has been updated
            done();
        })

    })




}());
