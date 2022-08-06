$(document).ready(function () {
  //Smoothly scrolls to top of page when user clicks on the back to top button
  $("#BackToTopButton").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });

  //Gets width of display
  function getWidth() {
    if (self.innerWidth) {
      return self.innerWidth;
    }
    if (document.documentElement && document.documentElement.clientWidth) {
      return document.documentElement.clientWidth;
    }
    if (document.body) {
      return document.body.clientWidth;
    }
  }

  const Banner = $("#bannerContainer");
  const TopBanner = $("#TopBanner");

  //Changes height of banner to fit display
  $(window).resize(function () {
    if (getWidth() < 768) {
      Banner.css("padding-bottom", "10px");
      TopBanner.hide();
    } else {
      Banner.css("padding-bottom", "50px");
      TopBanner.show();
    }
    $(window).scroll();
  });

  const SearchBar = $("#SearchBar");
  const Description = $("#TitleDescription");
  let SearchBarOffset = 98;

  const PaginationContainer = $("#PaginationContainer");
  const Results = $("#Results");
  let PaginationOffset = 196;

  //Set search and pagination bar's position when user scrolls down past certain boundaries
  $(window).scroll(function () {
    //Calculates offset after which search bar will be fixed
    const newSearchBarOffset = SearchBar[0].offsetTop;
    if (newSearchBarOffset != 0) {
      SearchBarOffset = newSearchBarOffset - 20;
    }
    //Calculates offset after which pagination bar will be fixed
    const newPaginationOffset = PaginationContainer[0].offsetTop;
    if (newPaginationOffset != 76) {
      PaginationOffset = newPaginationOffset - 76;
    }

    //If user scrolls down past certain boundaries then fixes search bar's position
    //Does not do this if search bar is vertical (if user is on mobile)
    if (SearchBarOffset < window.pageYOffset && getWidth() >= 768) {
      SearchBar.css("position", "fixed");
      SearchBar.css("top", 0 + "px");
      SearchBar.css("width", "100%");
      Description.css("margin-top", SearchBar.outerHeight() + "px");
    } else {
      SearchBar.css("position", "");
      SearchBar.css("top", "");
      SearchBar.css("width", "");
      Description.css("margin-top", "");
    }
    //If user scrolls down past certain boundaries then fixes pagination bar's position
    //Does not do this if search bar is vertical (if user is on mobile)
    if (PaginationOffset < window.pageYOffset && getWidth() >= 768) {
      PaginationContainer.css("position", "fixed");
      PaginationContainer.css("top", 76 + "px");
      PaginationContainer.css("width", "100%");
      Results.css("margin-top", PaginationContainer.outerHeight() + "px");
    } else {
      PaginationContainer.css("position", "");
      PaginationContainer.css("top", "");
      PaginationContainer.css("width", "");
      Results.css("margin-top", "");
    }
  });

  //Runs window resize function once page is loaded
  $(window).resize();

  //Array of image source paths for each venue
  const ImageSources = {
    1: "./Images/Central_Plaza.jpg",
    2: "./Images/Pacific_Towers_Hotel.jpg",
    3: "./Images/Sky_Center_Complex.jpg",
    4: "./Images/Sea_View_Tavern.jpg",
    5: "./Images/Ashby_Castle.jpg",
    6: "./Images/Fawlty_Towers.jpg",
    7: "./Images/Hilltop_Mansion.jpg",
    8: "./Images/Haslegrave_Hotel.jpg",
    9: "./Images/Forest_Inn.jpg",
    10: "./Images/Southwestern_Estate.jpg",
  };

  //Array of descriptions for each venue
  const Descriptions = {
    1: "Start at the top of the north tower and finish at the top of the south tower. This place will turn your wedding into an adventure to be remembered.",
    2: "For your wedding, you'll get an entire tower for the day. This includes elevator access, a full bar, and a full kitchen. The oppertunities are endless.",
    3: "Believe it or not, these colours are both photorealistic and copywrite free. The perfect place to get married, relax and enjoy the scenery.",
    4: "Great location with even better views. After all, there's nothing like going for a swim in the ocean after a long hard wedding day.",
    5: "Maybe you're the traditional type or fear a medieval besige. Either way, this castle is a must see and is a great place to celebrate your wedding.",
    6: "The two tallest buildings in the world, a metaphor for such a momentous day. Such stunning architecture makes for the perfect wedding venue.",
    7: "Yes, this mansion really is on top of a hill. Not a small hill, but a big hill. Celebrate your wedding like no one else before, on an incline.",
    8: "You may well be the very first Computer Scientist to muster up the social confidence and time to get married. What better place to celebrate.",
    9: "A great place if you don't want anyone to actually arrive. As much as your freinds and family love you, the're not travelling this far just because you like forests.",
    10: "Incredible gardens and culture. This place will add that special touch to you're wedding. If your a fan of bricks and chimneys, this is the place for you.",
  };

  let LeftMostItem = $("#Pagination > li.prev").next();
  let RightMostItem = $("#Pagination > li.next").prev();

  const Prev = $("#Pagination > li.prev");
  const Next = $("#Pagination > li.next");
  let Item;

  //Clicking on pagination bar item sets it as active
  function SelectItem(event, element) {
    //Prevents the default action for this event
    event.preventDefault();

    Item.removeClass("active");
    element.addClass("active");

    let DisplayedDate = new Date(EnteredStartDate);
    DisplayedDate.setDate(DisplayedDate.getDate() + Item.index(element));
    //Filters venues based on date, catering grade, and capacity
    GetResults(DisplayedDate, CateringGradeInput.value, PartySizeInput.value);
  }

  //Clicking next button sets next pagination bar item as active
  Next.click(function (event) {
    //Prevents the default action for this event
    event.preventDefault();
    //If the active item is not the rightmost item then set the next item as active
    if ($("#Pagination > li.active")[0] != RightMostItem[0]) {
      let element = $("#Pagination > li.active")
        .removeClass("active")
        .next()
        .addClass("active");

      let DisplayedDate = new Date(EnteredStartDate);
      DisplayedDate.setDate(DisplayedDate.getDate() + Item.index(element));
      //Filters venues based on date, catering grade, and capacity
      GetResults(DisplayedDate, CateringGradeInput.value, PartySizeInput.value);
    } //Otherwise, shift pagination bar once to the right
    else {
      ShiftNext();
    }
  });

  //Clicking previous button sets previous pagination bar item as active
  Prev.click(function (event) {
    //Prevents the default action for this event
    event.preventDefault();
    //If the active item is not the leftmost item then set the previous item as active
    if ($("#Pagination > li.active")[0] != LeftMostItem[0]) {
      let element = $("#Pagination > li.active")
        .removeClass("active")
        .prev()
        .addClass("active");

      let DisplayedDate = new Date(EnteredStartDate);
      DisplayedDate.setDate(DisplayedDate.getDate() + Item.index(element));
      //Filters venues based on date, catering grade, and capacity
      GetResults(DisplayedDate, CateringGradeInput.value, PartySizeInput.value);
    } //Otherwise, shift pagination bar once to the left
    else {
      ShiftPrev();
    }
  });

  //Shifts pagination bar items to the right by 1 item
  function ShiftNext() {
    if (!RightMostItem.next().hasClass("next")) {
      LeftMostItem.hide();
      LeftMostItem = LeftMostItem.next();
      RightMostItem.removeClass("active");
      RightMostItem = RightMostItem.next();
      RightMostItem.show();
      RightMostItem.addClass("active");

      let DisplayedDate = new Date(EnteredStartDate);
      DisplayedDate.setDate(
        DisplayedDate.getDate() + Item.index(RightMostItem)
      );
      //Filters venues based on date, catering grade, and capacity
      GetResults(DisplayedDate, CateringGradeInput.value, PartySizeInput.value);
    }
  }

  //Shifts pagination bar items to the left by 1 item
  function ShiftPrev() {
    if (!LeftMostItem.prev().hasClass("prev")) {
      RightMostItem.hide();
      RightMostItem = RightMostItem.prev();
      LeftMostItem.removeClass("active");
      LeftMostItem = LeftMostItem.prev();
      LeftMostItem.show();
      LeftMostItem.addClass("active");

      let DisplayedDate = new Date(EnteredStartDate);
      DisplayedDate.setDate(DisplayedDate.getDate() + Item.index(LeftMostItem));
      //Filters venues based on date, catering grade, and capacity
      GetResults(DisplayedDate, CateringGradeInput.value, PartySizeInput.value);
    }
  }

  const PaginationBar = $("#Pagination");
  PaginationBar.css("visibility", "hidden");

  let PageItems = $("#Pagination > li");
  let MaxItemWidth = 60;

  //Finds maximum width of pagination item
  function FindMaxItemWidth() {
    MaxItemWidth = 60;
    for (let i = 1; i < PageItems.length - 1; i++) {
      let Width = Math.round(PageItems.eq(i).outerWidth());
      MaxItemWidth = Math.max(Width, MaxItemWidth);
    }
  }
  FindMaxItemWidth();

  //Adjusts the number of items in the pagination bar so it fits on the screen
  function Adjust() {
    //Finds max number of items that can fit on the screen
    let MaxItems =
      Math.round((PaginationBar.outerWidth() - 70) / MaxItemWidth) - 1;

    //Displays active item and next and previous buttons
    const ActiveItem = $("li.active").index();
    PageItems.eq(0).show();
    PageItems.eq(PageItems.length - 1).show();
    PageItems.eq(ActiveItem).show();
    LeftMostItem = PageItems.eq(ActiveItem);
    RightMostItem = PageItems.eq(ActiveItem);

    //Shows items starting from left and right of active item
    let leftIndex = ActiveItem - 1;
    let rightIndex = ActiveItem + 1;
    while (
      !(leftIndex == 0 && rightIndex == PageItems.length - 1) &&
      MaxItems > 0
    ) {
      if (leftIndex > 0) {
        LeftMostItem = PageItems.eq(leftIndex);
        LeftMostItem.show();
        leftIndex--;
        MaxItems--;
      }
      if (rightIndex < PageItems.length - 1 && MaxItems > 0) {
        RightMostItem = PageItems.eq(rightIndex);
        RightMostItem.show();
        rightIndex++;
        MaxItems--;
      }
    }
    //Hides other items
    for (let i = leftIndex; i > 0; i--) {
      PageItems.eq(i).hide();
    }
    for (let i = rightIndex; i < PageItems.length - 1; i++) {
      PageItems.eq(i).hide();
    }
  }
  //Runs adjust function once page is loaded
  Adjust();

  //Adjusts pagination bar size when window is resized
  $(window).resize(function () {
    Adjust();
  });

  let EnteredStartDate = new Date();

  //Updates pagination bar to include dates between specified start and end dates
  function UpdatePagination(StartDate, EndDate) {
    EnteredStartDate = StartDate;
    //Removes current items
    for (let i = 1; i < PageItems.length - 1; i++) {
      PageItems.eq(i).remove();
    }
    //Adds new items
    let currentDate = EndDate;
    while (currentDate >= StartDate) {
      let day = currentDate.getDate();
      let item;
      switch (day) {
        case 1:
          item = day + "st";
          break;
        case 2:
          item = day + "nd";
          break;
        case 3:
          item = day + "rd";
          break;
        default:
          item = day + "th";
          break;
      }
      PageItems.eq(0).after(
        '<li class="page-item"><a class="page-link" href="#">' +
          item +
          "</a></li>"
      );
      currentDate.setDate(currentDate.getDate() - 1);
    }

    PageItems = $("#Pagination > li");
    //Sets first item as active item (equivalent to start date)
    PageItems.eq(1).addClass("active");
    Item = $("#Pagination > li").not(".prev").not(".next");
    //Adds click event to new pagination bar items
    for (let i = 0; i < Item.length; i++) {
      Item.eq(i).click(function (event) {
        SelectItem(event, Item.eq(i));
      });
    }
    PaginationBar.css("visibility", "visible");
    //Recalculates maximum width of pagination item
    FindMaxItemWidth();
    //Adjusts pagination bar to fit on screen
    Adjust();
  }

  function DateDisplay(Date) {
    //Returns date in format "Day of the week, Day/Month/Year"
    const options = {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return Date.toLocaleDateString("en-UK", options);
  }

  const PartySizeInput = $("#PartySize")[0];

  const CateringGradeInput = $("#select")[0];

  const StartDateInput = $("#StartDate")[0];
  const EndDateInput = $("#EndDate")[0];

  const ResultsInfo = $("#ResultsInfo")[0];

  $("#SearchBar").submit(function (event) {
    //Prevents the default action of submitting the form:
    event.preventDefault();

    //Updates pagination bar to include dates between specified start and end dates
    UpdatePagination(
      new Date(StartDateInput.value),
      new Date(EndDateInput.value)
    );
    //Filters venues based on date, catering grade, and capacity
    GetResults(
      new Date(StartDateInput.value),
      CateringGradeInput.value,
      PartySizeInput.value
    );
  });

  //Gets the number of times each hotel has been booked
  function GetVenueBookingCount() {
    $.ajax({
      url: "VenueBookingCount.php",
      type: "POST",
      cache: true,
      data: {},
      success: function (responseData) {
        const BookingCountData = JSON.parse(responseData);
        //Updates booking count for each venue
        for (let ID in BookingCountData) {
          $("#venue_id_" + ID)
            .find("#CardTotalBookings")
            .html(BookingCountData[ID]);
        }
      },
      error: function (xhr, status, error) {
        console.log(xhr.status + ": " + xhr.statusText);
      },
    });
  }

  const DefaultVenueCard = $("#venue_id_Default");

  DefaultVenueCard.hide();

  const AllVenues = [];

  //Gets venue details for all venues
  function GetVenueDetails() {
    $.ajax({
      url: "VenueDetails.php",
      type: "POST",
      cache: true,
      data: {},
      success: function (responseData) {
        const VenueDetailsData = JSON.parse(responseData);
        //Duplicates default venue card and adds it to the page with associated venue details venue
        for (let ID in VenueDetailsData) {
          AllVenues.push(ID);
          const VenueID = "venue_id_" + ID;

          const NewVenueCard = DefaultVenueCard.clone()
            .appendTo($("#ResultsContainer"))
            .attr("id", VenueID);

          NewVenueCard.find("#CardTitle").html(VenueDetailsData[ID].name);
          NewVenueCard.find("#CardCapacity").html(
            VenueDetailsData[ID].capacity
          );
          NewVenueCard.find("#CardWeekdayPrice").html(
            "£" + VenueDetailsData[ID].weekday_price
          );
          NewVenueCard.find("#CardWeekendPrice").html(
            "£" + VenueDetailsData[ID].weekend_price
          );
          if (VenueDetailsData[ID].licensed == 1) {
            NewVenueCard.find("#CardLicensed").html("Yes");
          } else {
            NewVenueCard.find("#CardLicensed").html("No");
          }
          NewVenueCard.find("#CardCapacity").html(
            VenueDetailsData[ID].capacity
          );

          NewVenueCard.find("#CardImage").css(
            "background-image",
            "url(" + ImageSources[ID] + ")"
          );

          NewVenueCard.find("#CardDescription").html(Descriptions[ID]);

          NewVenueCard.show();
        }
      },
      error: function (xhr, status, error) {
        console.log("ERRRORROROR");
        console.log(xhr.status + ": " + xhr.statusText);
      },
    });
  }

  GetVenueDetails();
  GetVenueBookingCount();

  //Filters venues based on date, catering grade, and capacity
  function GetResults(SearchDate, SearchGrade, SearchCapacity) {
    SearchDateString =
      SearchDate.getFullYear() +
      "-" +
      (SearchDate.getMonth() + 1) +
      "-" +
      SearchDate.getDate();

    let DisplayedVenues = [];

    $.ajax({
      url: "SearchVenues.php",
      type: "POST",
      cache: true,
      data: {
        date: SearchDateString,
        grade: SearchGrade,
        capacity: SearchCapacity,
      },
      success: function (responseData) {
        const SearchVenueData = JSON.parse(responseData);
        //Shows venues that meet search criteria
        for (let i = 0; i < SearchVenueData.length; i++) {
          DisplayedVenues.push(SearchVenueData[i].venue_id);
          $("#venue_id_" + SearchVenueData[i].venue_id)
            .find("#CardCateringCost")
            .html("£" + SearchVenueData[i].cost);

          $("#venue_id_" + SearchVenueData[i].venue_id)
            .find("#CardTotalPrice")
            .html(
              "£" +
                CalculatePrice(
                  SearchDate,
                  $("#venue_id_" + SearchVenueData[i].venue_id)
                    .find("#CardWeekdayPrice")
                    .html()
                    .substring(1),
                  $("#venue_id_" + SearchVenueData[i].venue_id)
                    .find("#CardWeekendPrice")
                    .html()
                    .substring(1),
                  SearchVenueData[i].cost,
                  SearchCapacity
                )
            );

          $("#venue_id_" + SearchVenueData[i].venue_id).show();
        }

        let RemovedVenues = AllVenues.filter(
          (x) => !DisplayedVenues.includes(x)
        );
        //Hides venues that do not meet search criteria
        for (let i = 0; i < RemovedVenues.length; i++) {
          $("#venue_id_" + RemovedVenues[i]).hide();
        }

        //Updates results info
        if (SearchVenueData.length == 0) {
          ResultsInfo.innerHTML =
            "No venues available on " +
            DateDisplay(SearchDate) +
            " that meet critera.";
        } else {
          ResultsInfo.innerHTML =
            "Venues available on " + DateDisplay(SearchDate) + ":";
        }
      },
      error: function (xhr, status, error) {
        console.log(xhr.status + ": " + xhr.statusText);
      },
    });
  }

  //Calculates price based on date, weekday and weekend prices, catering cost, and party size
  function CalculatePrice(
    Date,
    WeekdayPrice,
    WeekendPrice,
    CateringCost,
    PartySize
  ) {
    let DayCost = WeekdayPrice;
    if (Date.getDay() == 0 || Date.getDay() == 6) {
      DayCost = WeekendPrice;
    }
    return CateringCost * PartySize + Number(DayCost);
  }

  //Ajax get dows not update url with parameters

  //line graph to show hotel popularity over time for every month
});
