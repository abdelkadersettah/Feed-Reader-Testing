$(
  (function() {
    // Feed TEst make sure that the
    // allFeeds variable has been defined and that it is not
    //empty.
    describe("RSS Feeds", function() {
      it("AllFeeds Variable are defined and not empty", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });
      // test that loops through each feed
      //  in the allFeeds object and ensures it has a URL defined
      //  and that the URL is not empty.
      it("All urls are defined and not empty", function() {
        allFeeds.forEach(x => {
          expect(x.url).toBeDefined();
          expect(x.url.length).not.toBe(0);
        });
      });
      //   test that loops through each feed
      //  in the allFeeds object and ensures it has a name defined
      //  and that the name is not empty.
      it("All Names are Defined and not empty", function() {
        allFeeds.forEach(x => {
          expect(x.name).toBeDefined();
          expect(x.name.length).not.toBe(0);
        });
      });
    });

    //  "The menu" Test
    describe("The menu", function() {
      // test that ensures the menu element is
      //  hidden by default.
      let body;
      let menuIconLink;
      beforeEach(() => {
        body = document.querySelector("body");
        menuIconLink = document.querySelector(".menu-icon-link");
      });

      it("if the Menu is hidden by Default", function() {
        expect(body).toHaveClass("menu-hidden");
      });
      // test that ensures the menu changes
      //    visibility when the menu icon is clicked

      it("Menu appears or  when the icon is clicked", function() {
        menuIconLink.click();
        expect(body.classList.contains("menu-hidden")).toBeFalsy();
        menuIconLink.click();
        expect(body.classList.contains("menu-hidden")).toBeTruthy();
      });
    });

    //"Initial Entries Test"
    describe("Initial Entries", function() {
      //   test that ensures when the loadFeed
      //   function is called and completes its work, there is at least
      //   a single .entry element within the .feed container.
      let feedContainer;
      beforeEach(function(done) {
        feedContainer = document.querySelector(".feed");
        loadFeed(0, done);
      });

      it("at least a Single element in feed Container", function(done) {
        let result = feedContainer.children.length > 0;
        expect(result).toBe(true);
        done();
      });
    });
    // "New Feed Selection" Test
    describe("New Feed Selection", function() {
      let firstFeed, secondFeed, thirdFeed, FourthFeed;
      firstFeed = document.querySelector(".feed").innerText;

      beforeEach(function(done) {
        loadFeed(1, function() {
          secondFeed = document.querySelector(".feed").innerText;
        });
        loadFeed(2, () => {
          thirdFeed = document.querySelector(".feed").innerText;
        });
        loadFeed(3, () => {
          FourthFeed = document.querySelector(".feed").innerText;
          done();
        });
        // test that ensures when a new feed is loaded
        // the content actually changes.
      });
      it("content changes when new feed loaded", function(done) {
        let contentArray = [firstFeed, secondFeed, thirdFeed, FourthFeed];
        let findDuplicatedContent = arr =>
          arr.filter((item, index) => arr.indexOf(item) != index);
        expect(findDuplicatedContent(contentArray).length == 0).toBe(true);
        done();
      });
    });
  })()
);
