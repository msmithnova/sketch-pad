var numRows = 16;
var gridPixels = 600;
var mode = 'single color';
var fillColor = '#009933';
var fillImage = 'images/kitten1.jpeg'
var fillOpen = false;

function main() {
  createBoxes();
  colorBoxes();
  $('#num-boxes-button').on('click', function() {
    var rowChoice = parseInt(prompt("Enter number of rows between 2 and 80.\nInvalid input will revert to the default of 16.", "16"));
    if (rowChoice >= 2 && rowChoice <= 80) {
      numRows = rowChoice;
    } else {
      numRows = 16;
    }
    $('#num-boxes').text(numRows + 'x' + numRows);
    createBoxes();
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
    createBoxes();
    colorBoxes();
  });
  $('#single-button').on('click', function() {
    mode = 'single color';
    $('#mode').text(mode);
    createBoxes();
    colorBoxes();
  });
  $('#multi-button').on('click', function() {
    mode = 'multi-color';
    $('#mode').text(mode);
    createBoxes();
    colorBoxes();
  });
  $('#gradient-button').on('click', function() {
    mode = 'gradient';
    $('#mode').text(mode);
    createBoxes();
    colorBoxes();
  });
  $('#choose-fill-button').on('click', function() {
    fillOpen = true;
    $('#fill').slideDown(300);
  });
  $('#reveal-button').on('click', function() {
    mode = 'reveal image';
    $('#mode').text(mode);
    createBoxes();
    colorBoxes();
  });
  $('#header-bottom').mouseenter(function() {
    $('#header-bottom span').text("\u25B2 Options \u25B2");
    $('#buttons').slideDown(300);
  });
  $('#header').mouseleave(function() {
    if (!fillOpen) {
      $('#header-bottom span').text("\u25BC Options \u25BC");
      $('#buttons').slideUp(300);
    }
  });
  $('#fill-images img').on('click', function() {
    $('#fill-images img').removeClass('image-selected');
    $(this).addClass('image-selected');
  });
}

function createBoxes() {
  $('#grid').empty();
  for (var row = 0; row < numRows; row++) {
    $('<div id="row' + row + '"></div>').appendTo('#grid');
    for (var col = 0; col < numRows; col++) {
      $('<div class="gridbox" id="col' + col + '"></div>').appendTo('#row' + row);
    }
  }
  var boxWidth = Math.floor($('#grid').width() / numRows);
  $('.gridbox').outerWidth(boxWidth);
  $('.gridbox').outerHeight(boxWidth);
  setGridImage(boxWidth);
}

function colorBoxes() {
  $('.gridbox').on('mouseenter', function() {
    if (mode == 'single color') {
      if (fillColor != '') {
        $(this).css('background-color', fillColor);
      } else {
        $(this).css('background-image', 'url(' + fillImage + ')');
      }
    } else if (mode == 'multi-color') {
      if (fillColor != '') {
        $(this).css('background-color', getRandomColor());
      } else {
        var image = 'images/kitten' + (Math.floor((Math.random() * 10) + 1)) + '.jpeg';
        $(this).css('background-image', 'url(' + image + ')');
      }
    } else if (mode == 'gradient') {
      if (fillColor != '') {
        $(this).css('background-color', fillColor);
      } else if ($(this).css('background-image') == 'none') {
        var image = 'images/kitten' + (Math.floor((Math.random() * 10) + 1)) + '.jpeg';
        $(this).css('background-image', 'url(' + image + ')');
      }
      var opacity = $(this).css('opacity');
      if (opacity > 0) {
        $(this).css('opacity', '' + (opacity - 0.1));
      }
    } else if (mode == 'reveal image') {
      $(this).css('opacity', '0');
    }
  });
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setGridImage(boxWidth) {
  $('#grid').css('background-image',  'url(' + fillImage + ')');
  imageSize = boxWidth * numRows;
  $('#grid').css('background-size',  '' + imageSize + 'px');
}

function formResults(form) {
  fillOpen = false;
  $('#header-bottom span').text("\u25BC Options \u25BC");
  $('#buttons').slideUp(300);
  $('#fill').slideUp(300);
  if (form.fillrad[0].checked) {
    fillColor = '#' + $('.color').val();
  } else {
    fillColor = '';
    var imageIndex = $('#fill-images img').index($('.image-selected'));
    fillImage = 'images/kitten' + (imageIndex + 1) + '.jpeg';
  }
  createBoxes(numRows);
  colorBoxes();
}

$(document).ready(main());