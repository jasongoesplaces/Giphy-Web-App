$( document ).ready(function() {

    //an array of the seach topics that we are starting with
    var topics = [
        "manatee", 
        "duck", 
        "cat", 
        "dog", 
        "giraffe", 
        "hampster", 
        "fish", 
        "horse", 
        "capybara", 
        "seagull", 
        "zebra"
    ];

    //function that creates and displays buttons for each of the topics in the array
    function displayButtons(){

        //deletes contents of the div to prevent duplicating topics
        $("#searchButtons").empty();

        //loops through the topics array and creates a button for each one
        for (var i = 0; i < topics.length; i++){
            var newButton = $("<button>");
            newButton.addClass("animals btn btn-info");
            newButton.attr("animal", topics[i]);
            newButton.text(topics[i]);
            $("#searchButtons").append(newButton);
        }
    }

    //function that adds the user input as a new button for searching
    function addNewButton(){
        $("#addButton").on("click", function(){
        var input = $("#userSearch").val().trim();

        //prevents user from creating a blank button
        if (input == ""){
          return false;
        }

        //pushes user input to the topics array
        topics.push(input);
    
        //display buttons function is run again to show the new button
        displayButtons();
        return false
        });
    }
   
    
    //function to show gifs from the search button on screen
    function showGifs(){

        //variables used to set the search url
        //takes the animal attribute from the button clicked on and inserts it into the url as the search term
        var animal = $(this).attr("animal");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&api_key=dYOQQLuboy9Bcqafl7dwoUSKA86xYSlB";
        
        //ajax is run
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {

            //empties the div for displaying the gifs so only the most recent button's results show
            $("#displayGifs").empty(); 
            var results = response.data;

            //loops through each of the results from giphy
            for (var i=0; i<results.length; i++){
    
                //creates a div for the gifs and adds for use with css
                var gifs = $("<div>");
                gifs.addClass("gifs");

                //images are added to the div with their default state set as still
                var image = $("<img>");
                image.attr("src", results[i].images.fixed_height_small_still.url);
                image.attr("data-still",results[i].images.fixed_height_small_still.url);
                image.attr("data-animate",results[i].images.fixed_height_small.url);
                image.attr("data-state", "still");
                image.addClass("image");
                gifs.append(image);

                //rating for each gif is added in a p tag below the image
                var rating = $("<p>").text("Rating: " + results[i].rating);
                gifs.append(rating);

                //the new gifs div is added to the display gifs section in the html
                $("#displayGifs").prepend(gifs);
            }
        });
    }

    //initializes the page by running the functions to display the default buttons and allow the user to add new buttons
    displayButtons();
    addNewButton();


    //event listeners

    //when one of the buttons with the animals class is clicked it shows the gifs for that animal search
    $(document).on("click", ".animals", showGifs());

    //when an image is clicked, its state is changed to from still to animated and back when it is clicked again
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });