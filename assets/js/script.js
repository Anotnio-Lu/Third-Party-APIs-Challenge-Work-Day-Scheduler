
var list = []

$(function () {
  var main = $('.main-container')

  //click listener to save input into the local storage
  main.on('click', '.saveBtn', function(event){
    var parent = $(this).parent('div')
    var text = parent.children('textarea').val()
    var dataId = parent.attr("id");

    let storedInfo = JSON.parse(localStorage.getItem("To do list"));

    if(storedInfo !== null){
        list = storedInfo
    } 

    $.each ( list, function( indexes, values ) {
      if (dataId == values.id){
        list.splice(indexes, 1);
        return false
      }
    })

    let timeInto = new listObject();
    timeInto.id = dataId
    timeInto.input = text

    list.push(timeInto);

    localStorage.setItem("To do list", JSON.stringify(list))
  })

  function listObject(){
    this.id
    this.input
  }

  //function that displays saved information that was stored in local storage
  function print(){
    var Fulllist = JSON.parse(localStorage.getItem("To do list"));
    
    if (Fulllist !== null) {
      list = Fulllist;
    }

    $( "textarea" ).each(function() {
      var divId = $( this ).parent().attr("id")
      var div = $( this )

      $.each (list, function( index, values ) {
        var storedId = values.id
        if(divId == storedId){
          div.text(values.input)
        }
      })
    });
  }

  print()

  changeHighlight()

  // function that changes the class of div
  function changeHighlight(){
    setInterval(function() {
      $( ".row" ).each(function() {
        var rowId = $( this ).attr("id")
        var hour = dayjs().get('hour')

        if(rowId == hour){
          $( this ).removeClass( "future past" ).addClass( "present" );
        }
        if(rowId < hour){
          $( this ).removeClass( "present future" ).addClass( "past" );
        }
        if(rowId > hour){
          $( this ).removeClass( "present past" ).addClass( "future" );
        }
      });
    }, 100);
  }

  var today = dayjs();
  $('#currentDay').text(today.format('dddd, MMM D'));
  
});