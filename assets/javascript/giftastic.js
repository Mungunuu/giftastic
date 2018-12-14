var animals = ['Dog', 'Cat', 'Bird', 'Horse', 'Fish', 'Monkey', 'Lion', 'Tiger','Wolf']
function displayAnimalInfo () {
  var animal = $(this).attr('data-name')
  var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=m24wOx1shF88Z3Im8EwSiRWKgVJPifBF&limit=10&q=' + animal
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    $('#animals-view').empty()

    for (var i = 0; i < 10; i++) {
      // console.log(response)
      // console.log(response.data[i].rating)
      var animalDiv = $("<div class = 'animal'>")
      var rating = response.data[i].rating
      var pOne = $('<p>').text('Rating: ' + rating)
      animalDiv.append(pOne)
      var animatedUrl = response.data[i].images.fixed_height.url
      var stillUrl = response.data[i].images.fixed_height_still.url

      var image = $('<img>').attr('src', animatedUrl)
      image.addClass('gif')
      image.attr('data-state', 'animated')

      image.attr('data-still', stillUrl)
      image.attr('data-animated', animatedUrl)

      image.on('click', function () {
        var state = $(this).attr('data-state')
        if (state === 'still') {
          $(this).attr('src', $(this).attr('data-animated'))
          $(this).attr('data-state', 'animated')
        } else {
          $(this).attr('src', $(this).attr('data-still'))
          $(this).attr('data-state', 'still')
        }
      })

      animalDiv.append(image)
      $('#animals-view').prepend(animalDiv)
    }
  })
}

function renderButtons () {
  $('#buttons-view').empty()
  for (var i = 0; i < animals.length; i++) {
    var a = $('<button>')
    a.addClass('animal-btn')
    a.attr('data-name', animals[i])
    a.text(animals[i])
    $('#buttons-view').append(a)
  }
}

$('#add-animal').on('click', function (event) {
  event.preventDefault()
  var animal = $('#animal-input').val().trim()
  animals.push(animal)
  renderButtons()
})

$(document).on('click', '.animal-btn', displayAnimalInfo)
$('#animals-view').empty()

renderButtons()
