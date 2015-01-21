var numRows = 16;
var gridPixels = 600;
var mode = 'single color';

function main() {
  createBoxes(numRows);
  colorBoxes();
  $('#num-boxes-button').on('click', function() {
    var rowChoice = parseInt(prompt("Enter number of rows between 2 and 80.\nInvalid input will revert to the default of 16.", "16"));
    if (rowChoice >= 2 && rowChoice <= 80) {
      numRows = rowChoice;
    } else {
      numRows = 16;
    }
    $('#num-boxes').text(numRows + 'x' + numRows);
    createBoxes(numRows);
    colorBoxes();
  });
  $('#grid-size-button').on('click', function() {
    var pixelChoice = parseInt(prompt("Enter number of pixels between 100 and 960.\nInvalid input will revert to the default of 600.", "600"));
    if (pixelChoice >= 100 && pixelChoice <= 960) {
      gridPixels = pixelChoice;
    } else {
      gridPixels = 600;
    }
    $('#grid').width(gridPixels);
    $('#grid').height(gridPixels);
    $('#grid-size').text(gridPixels + 'x' + gridPixels);
    createBoxes(numRows);
    colorBoxes();
  });
  $('#single-button').on('click', function() {
    mode = 'single color';
    $('#mode').text(mode);
    createBoxes(numRows);
    colorBoxes();
  });
  $('#multi-button').on('click', function() {
    mode = 'multi-color';
    $('#mode').text(mode);
    createBoxes(numRows);
    colorBoxes();
  });
  $('#gradient-button').on('click', function() {
    mode = 'gradient';
    $('#mode').text(mode);
    createBoxes(numRows);
    colorBoxes();
  });
}

function createBoxes(size) {
  $('#grid').empty();
  for (var row = 0; row < size; row++) {
    $('<div id="row' + row + '"></div>').appendTo('#grid');
    for (var col = 0; col < size; col++) {
      $('<div class="gridbox" id="col' + col + '"></div>').appendTo('#row' + row);
    }
  }
  var boxWidth = $('#grid').width();
  $('.gridbox').outerWidth(Math.floor(boxWidth / size));
  var boxHeight = $('#grid').height();
  $('.gridbox').outerHeight(Math.floor(boxHeight / size));
}

function colorBoxes() {
  if (mode == 'single color') {
    $('.gridbox').on('mouseenter', function() {
      $(this).css('background-color', '#009933');
    });
  } else if (mode == 'multi-color') {
    $('.gridbox').on('mouseenter', function() {
      $(this).css('background-color', getRandomColor());
    });
  } else if (mode == 'gradient') {
     $('.gridbox').on('mouseenter', function() {
      $(this).css('background-color', 'black');
      var opacity = $(this).css('opacity');
      if (opacity > 0) {
        $(this).css('opacity', '' + (opacity - 0.1));
      }
    });
  }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

$(document).ready(main());