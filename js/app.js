window.onload = function() {
  var calc = {
    buttonClicked: '',
    currentInput: '',
    finalInput: '',
    ansFormat: ''
  };

  $('.button').on('click', function() {
    calc.buttonClicked = $(this).attr('id'); // The text of the button clicked is assigned a variable
    // calc.currentInput = $('.screen-top').text(); // The text at the top of the screen is assigned a variable

    if (/^0+$/g.test(calc.currentInput)) { // If the currentInput variable string is only zeros
      calc.finalInput = calc.buttonClicked; // discard the zeros and assign a variable to the text of the button clicked.
    } else {
      calc.finalInput = calc.currentInput + calc.buttonClicked; // else concatenate the text of the button clicked to the end of the currentInput string.
    }
    // console.log(calc.finalInput);
    
    if (calc.buttonClicked == 'AC') {
      calc.finalInput = '';
      printTop('0');
      printBottom(calc.finalInput);
    } else if (calc.buttonClicked == 'CE') {
      calc.finalInput = calc.finalInput.replace(/[0-9.]*(CE)*$/g, ''); // remove any digits and decimal point after the final operator/sign
      if (calc.finalInput.length === 0) { // after removing digits and decimal point, if there is nothing in the string, print zero, else print the string
        calc.finalInput = '';
        printTop('0');
        printBottom(calc.finalInput);
      } else {
        printTop(calc.finalInput);
      }
    } else if (/[÷x\-+]/.test(calc.buttonClicked)) {
      calc.finalInput = calc.finalInput.replace(/[÷x\-+]+$/,''); // remove any sign at the end of the string at the top
      calc.finalInput = calc.finalInput + calc.buttonClicked;
      printTop(calc.finalInput);
    } else if (calc.buttonClicked == '.') {
      calc.finalInput = calc.finalInput.slice(0,-1);
      if (!calc.finalInput.match(/[0-9.]*$/)[0].match(/\./g)) {
        calc.finalInput = calc.finalInput + '.';
        printTop(calc.finalInput);
      } else {
        printTop(calc.finalInput);
      }
    } else if (calc.buttonClicked == '=') {
      calc.finalInput = calc.finalInput.slice(0,-1);
      calc.ansFormat = changeSign(calc.finalInput); // replace the division and multiplication sign with the correct javascript operators and remove any signs at the end of the input
      printTop(calculate(calc.ansFormat));
      calc.finalInput = '';
      printBottom(calc.finalInput);
    } else {
      printTop(calc.finalInput);
      calc.ansFormat = changeSign(calc.finalInput);
      printBottom(calculate(calc.ansFormat));
    }
    calc.currentInput = calc.finalInput;
  });
  
  function printTop(value) { // function to print to the top of the screen
    $('.screen-top').text(value);
  }
  
  function printBottom(value) { // function to print to the bottom of the screen
    $('.screen-bottom').text(value);
  }
  
  function calculate(value) { // function to calculate and round the answer
    console.log('value', value);
    return  Math.round(eval(value)*100000000000000)/100000000000000;
  }
  
  function changeSign(value) { // if function to replace the division and multiplication sign, and remove any sign at the end
    return value.replace(/[÷x]/g, v=>v=='÷' ? '/' : '*').replace(/[/*-+]$/, '');
  }
}