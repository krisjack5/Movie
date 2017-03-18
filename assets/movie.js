
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCYWAG196VQMocNcqF2CzYrHn3BFTTLzrY",
  authDomain: "moviethrill-f470e.firebaseapp.com",
  databaseURL: "https://moviethrill-f470e.firebaseio.com",
  storageBucket: "moviethrill-f470e.appspot.com",
  messagingSenderId: "870241521240"
  };
  firebase.initializeApp(config);

var database = firebase.database();


var clickStatus = false;


var $myCarousel = $("#myCarousel");
$myCarousel.on("slide.bs.carousel", function (event) {
  var $currentSlide = $myCarousel.find(".active iframe");
  
  // exit if there's no iframe, i.e. if this is just an image and not a video player
  if (!$currentSlide.length) { return; }
  
  // pass that iframe into Froogaloop, and call api("pause") on it.
  var player = Froogaloop($currentSlide[0]);
  player.api("pause");
});


var foodStorage = {};
var movieStorage = {};
var FoodArray=[];
var count=0;
$("#mash").html("<img src= netflix2.jpg>") 


$(".foodbutton").on("click", function() {
  $("#back").css("background-color","#b00304");
  $("#first-input").val("")
  $("#last-input").val("")
  $("#roll").html("submit")
  $('.container').css("background-image",'');
  $("#mash").html("<img src= netflix2.jpg>") 
  $("#changeImg").css("background-color","black");
  $("#foodbox").empty();
  $("#moviebox").empty();
  
  foodStorage={};
  var qsearch = $(this).val().trim();
  //console.log(url);
  var apiKey = "f5a87ab9891de9962393334b9dd0bada&from=0&to=100";
  var apiID = "43e328ce"
            //var qsearch;
            var url = "https://api.edamam.com/search?q=" 
            + qsearch
            + "&app_id=" + apiID
            + "&app_key=" + apiKey;
  var randomNum = Math.floor(Math.random() * 100);
  console.log(randomNum);

  foodVal= $(this).val().trim();
  console.log(url);


  $.ajax({
        url: url,
        method:"GET",
    }) .done(function(response){

      $("#foodbox").empty();
      $("#foodframe").empty();
      
      console.log(response.hits);
        //for(i=0;i<response.data.length;i++){
        console.log(response.hits[randomNum].recipe.image);
        console.log(response.hits[randomNum].recipe.label);
        console.log(response.hits[randomNum].recipe.url);
        console.log(response.hits[randomNum].recipe.ingredientLines);
        
        foodStorage.image = response.hits[randomNum].recipe.image;
        foodStorage.label = response.hits[randomNum].recipe.label;
        foodStorage.url = response.hits[randomNum].recipe.url;
        foodStorage.ingredients = response.hits[randomNum].recipe.ingredientLines;
        console.log("after:");
        console.log(foodStorage);
       

        });
    //console.log("after:" + hey);
  
});

console.log("before:");
console.log(foodStorage);


$("#roll").on("click", function() {
$("#back").css("background-color","black");
$("#roll").html("try another gif")
      $("#mash").html("Click the images for more options") 
    $("#foodbox").empty();
      $("#moviebox").empty();
    $("#foodframe").empty();
    event.preventDefault();
      var foodURL = foodStorage.url;
    var foodimg = $("<img>").attr("src", foodURL);
          foodimg.attr("src", foodStorage.image);
          $("#foodbox").append(foodimg);
   
   var movieID = movieStorage.showId;      
   var movieLink="https://www.netflix.com/title/" + movieID ;      
    var movieimg = $("<img>").attr("src", movieLink);
          movieimg.attr("src", movieStorage.poster);
          $("#moviebox").append(movieimg);

        
    console.log(movieLink);   


    var randomNum = Math.floor(Math.random() * 30);
    var url= "http://api.giphy.com/v1/gifs/search?q="+ movieStorage.firstname + "+" + movieStorage.lastname + "&api_key=dc6zaTOxFJmzC";
    $.ajax({
        url: url,
        method:"GET",
    }).then(function(gifs){
      console.log(gifs.data[randomNum].images.original.url);
      
      movieStorage.gif= gifs.data[randomNum].images.original.url;
      console.log(movieStorage.gif);
      
      $('.container').css('background-repeat',"no-repeat");
      $('.container').css('background-size',"cover");
      $('.container').css('background-image', 'url('+movieStorage.gif+')');
      movieStorage.dateAdded = moment().format("X");
      database.ref().push(movieStorage);
        
});




});
$(document).on(...