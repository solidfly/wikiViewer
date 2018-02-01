$(document).ready(function() {

  //Search .inputbox autocomplete suggestion function:
 $("#search").autocomplete({
    source: function(request, response) {
      $.ajax({
        url: "http://en.wikipedia.org/w/api.php",
        dataType: "jsonp",
        data: {
          'action': "opensearch",
          'format': "json",
          'search': request.term
        },
        success: function(data) {
          response(data[1]);

        }
      })
    }
  });

  //clear .inputbox when user clicks .inputbox
  document.getElementById("search").addEventListener("click", function() {
    document.getElementById("search").value = "";
  });

  //perform search when user keys down "Enter"
  document.getElementById("search").addEventListener("keydown", function() {
    if (event.keyCode == 13) {
        clearPage();
        searchWiki();

    }
  });

 //perform search when user clicks on autocomplete suggestion
  document.getElementById("ui-id-1").addEventListener("click", function() {
    clearPage();
    searchWiki();
  });

  //clear previous results.
  function clearPage() {
      $('#title1').empty();
      $('#title2').empty();
      $('#title3').empty();
      $('#title4').empty();
      $('#title5').empty();

      $('#snippet1').empty();
      $('#snippet2').empty();
      $('#snippet3').empty();
      $('#snippet4').empty();
      $('#snippet5').empty();

      $('#link1').empty();
      $('#link2').empty();
      $('#link3').empty();
      $('#link4').empty();
      $('#link5').empty();
  };



  function searchWiki() {
    const textInput = document.getElementById('search');
    const textInBox = search.value;
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&formatversion=2&callback=?&search=" + textInBox;
    $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      success: function(data){
        console.log(url);

        var queryResults = data.splice(1);  //remove query from returned array

        var titleArray = queryResults[0];
        var title1 = "\"" + titleArray[0] + "\"";
        var title2 = titleArray[1];
        var title3 = titleArray[2];
        var title4 = titleArray[3];
        var title5 = titleArray[4];

        var snippetArray = queryResults[1];
        var snippet1 = snippetArray[0];
        var snippet2 = snippetArray[1];
        var snippet3 = snippetArray[2];
        var snippet4 = snippetArray[3];
        var snippet5 = snippetArray[4];

        var linkArray = queryResults[2];
        var link1 = linkArray[0];
        var link2 = linkArray[1];
        var link3 = linkArray[2];
        var link4 = linkArray[3];
        var link5 = linkArray[4];


        $("#title1").append(title1);
        $("#snippet1").append(snippet1);
        $("#link1").attr('href', link1);
        $("#link1").append(link1);

        $("#title2").append(title2);
        $("#snippet2").append(snippet2);
        $("#link2").attr('href', link2);
        $("#link2").append(link2);

        $("#title3").append(title3);
        $("#snippet3").append(snippet3);
        $("#link3").attr('href', link3);
        $("#link3").append(link3);

        $("#title4").append(title4);
        $("#snippet4").append(snippet4);
        $("#link4").attr('href', link4);
        $("#link4").append(link4);

        $("#title5").append(title5);
        $("#snippet5").append(snippet5);
        $("#link5").attr('href', link5);
        $("#link5").append(link5);
      }
    });
  };

});
