<!DOCTYPE html>
<html lang="en">

    <head>
        <title>Wedding Venue Booker</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <script defer src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

        <script defer src="./Validation.js"></script>

        <script defer src="./DisplayControl.js"></script>

        <link rel="stylesheet" href="StyleSheet.css" />

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossorigin="anonymous" />

        <link rel="icon" type="image/png" href="./Images/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="./Images/favicon-32x32.png" sizes="32x32" />
    </head>

    <body style="background-color: #f8f9fa">

        <div id="TopBanner" class="shadow-sm p-3 mb-5 rounded">
            <br />
        </div>

        <section class="text-center" id="bannerContainer">
            <h1 class="fw-light" id="Title">Book the perfect wedding venue</h1>
            <!--Filter entry bar-->
            <form action="#" class="" id="SearchBar">
                <div class="row" id="SearchForm">
                    <!--Start date entry-->
                    <div class="d-flex align-items-center form-group col-md-3">
                        Start:
                        <input for="Start Date" id="StartDate" type="date" name="Start date"
                            class="border-0 shadow-0 form-control" required />
                        <div class="vr d-none d-md-block"></div>
                    </div>
                    <div class="d-md-none" id="SearchHR">
                        <hr />
                    </div>
                    <!--End date entry-->
                    <div class="d-flex align-items-center form-group col-md-3">
                        End:
                        <input for="End Date" id="EndDate" type="date" name="End date"
                            class="border-0 shadow-0 form-control" required />
                        <div class="vr d-none d-md-block"></div>
                    </div>
                    <div class="d-md-none" id="SearchHR">
                        <hr />
                    </div>
                    <!--Party size entry-->
                    <div class="d-flex align-items-center form-group col-md-2">
                        <input for="Party Size" type="number" id="PartySize" name="PartySize" placeholder="Party size"
                            class="border-0 shadow-0 form-control" required min="0" />
                        <div class="vr d-none d-md-block"></div>
                    </div>
                    <div class="d-md-none" id="SearchHR">
                        <hr />
                    </div>
                    <!--Catering grade entry-->
                    <div class="d-grid form-group col-md-2">
                        <select for="Catering Grade" id="select" name="CateringGrade"
                            class="border-0 shadow-0 form-control" required style="padding-right: 0px">
                            <option value="" disabled selected hidden>Catering grade</option>
                            <option value="1">Catering grade: 1</option>
                            <option value="2">Catering grade: 2</option>
                            <option value="3">Catering grade: 3</option>
                            <option value="4">Catering grade: 4</option>
                            <option value="5">Catering grade: 5</option>
                        </select>
                    </div>
                    <div class="d-md-none" id="SearchHR">
                        <br />
                    </div>
                    <!--Submit button-->
                    <div class="d-grid form-group col-md-2">
                        <button for="Search" type="submit" class="h-100 rounded-pill btn btn-primary">
                            Search
                        </button>
                    </div>
                </div>
            </form>

            <p id="TitleDescription">
                Our venues can accomidate a variety of party sizes and catering grades.
                Select the start and end date and we'll find the perfect place for your
                wedding.
            </p>

            <fade/>
        </section>
        <!--Pagination bar used to select the date-->
        <section class="text-center" id="PaginationContainer">
            <br />
            <h4 class="fw-light" id="ResultsInfo">
                Please search for a venue, currently showing all venues:
            </h4>
            <nav class="px-4">
                <ul class="pagination justify-content-center" id="Pagination">
                    <li class="page-item prev">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li class="page-item active">
                        <a class="page-link" href="#">temp</a>
                    </li>
                    <li class="page-item next">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </section>

        <div id="Results">
            <div class="album m-4 bg-light">
                <div class="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3" id="ResultsContainer">
                    <!--Individual card-->
                    <div class="col" id="venue_id_Default">
                        <div class="card shadow-sm">
                            <!--Card image dark grey svg witch image scaled inside-->
                            <svg class="bd-placeholder-img card-img-top" width="100%" height="225"
                                xmlns="http://www.w3.org/2000/svg" role="img" preserveAspectRatio="xMidYMid slice"
                                focusable="false" id="CardImage" style="
                            background-repeat: no-repeat;
                            background-size: cover;
                            background-position: center;
                            "></svg>
                            <!--Card text-->
                            <div class="card-body">
                                <!--Card title and Description-->
                                <h5 class="card-text" id="CardTitle">Title</h5>
                                <p class="card-text" id="CardDescription">Description</p>
                                <br />
                                <!--Card info-->
                                <p class="card-text">
                                    <span id="LeftSpan">Capacity:
                                        <span id="CardCapacity">NA</span>
                                    </span>
                                    <span id="RightSpan">Catering cost/pp:
                                        <span id="CardCateringCost">NA</span>
                                    </span>
                                </p>
                                <br />
                                <p class="card-text">
                                    <span id="LeftSpan">Weekday price:
                                        <span id="CardWeekdayPrice">NA</span>
                                    </span>
                                    <span id="RightSpan">Weekend price:
                                        <span id="CardWeekendPrice">NA</span>
                                    </span>
                                </p>
                                <br />
                                <p class="card-text">
                                    <span id="LeftSpan">Licensed:
                                        <span id="CardLicensed">NA</span>
                                    </span>
                                    <span id="RightSpan">Total bookings:
                                        <span id="CardTotalBookings">NA</span>
                                    </span>
                                </p>
                                <br />
                                <p class="card-text">
                                    <span id="BoldSpan">Total price: </span>
                                    <span id="CardTotalPrice">Please search to get price</span>
                                </p>

                                <button type="button" class="btn btn-sm btn-outline-secondary" style="width: 100%;"
                                    onclick="console.log('Booked: ' + this.parentElement.parentElement.parentElement.id)">Book</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--Footer-->
        <footer class="text-muted">
            <invFade></invFade>
            <div class="text-center p-3" id="footer">
                
                <p class="text-dark">
                    Wedding venue booking website by Jonathon Axford
                </p>

                <button class="btn btn-primary" id="BackToTopButton">
                    Back to top
                </button>
                
            </div>
        </footer>
    </body>

</html>