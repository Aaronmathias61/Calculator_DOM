var count = 0,
  i,
  a,
  dup,
  last;
var resulting = [];
// temp = "";
// To clear the entire input field

function clr() {
  document.getElementById("display").value = "";
  resulting = [];
}

// Main function to do the calculation.

function res() {
  var result = document.getElementById("display").value;

  fun(result); // Main function for calculation
  //To prevent display of Undefined and NaN
  if (ans == undefined || ans == NaN)
    document.getElementById("display").value = "";
  count++;
}

// To remove the last digit added to the input

function clearlast() {
  if (count == 0) {
    var current = document.getElementById("display").value;
    var result = current.slice(0, -1);
    document.getElementById("display").value = result;
  } else {
    var current = document.getElementById("display").value;
    document.getElementById("display").value = current;
  }
}

// To get the input from the user using mouse click.

function dis(val) {
  document.getElementById("display").value += val;
  count = 0;
}

function fun(result) {
  var flow = result.split(""); // Temperorrly assigned tonew variable for further process.
  console.log(flow);
  var temp = "";
  for (i in flow) {
    dup = 0;
    if (
      flow[i] == "+" ||
      flow[i] == "-" ||
      flow[i] == "*" ||
      flow[i] == "/" ||
      flow[i] == "%"
    ) {
      a = flow[i];
      dup++;
    } else {
      temp = temp + flow[i];
      last = temp;
    }
    if (dup > 0) {
      resulting.push(Number(temp));
      resulting.push(a);
      temp = "";
    }
  }
  resulting.push(Number(last));
  last = "";
  a = "";
  if (resulting.length > 1) reduce();
}
function reduce() {
  do {
    for (i in resulting) {
      if (resulting[i] == "%") {
        resulting[parseInt(i) - 1] =
          (resulting[parseInt(i) - 1]) %
          (resulting[parseInt(i) + 1]);
        resulting.splice(i, 2); // Delete the completed element
      }
    }
    for (i in resulting) {
      if (resulting[i] == "*") {
        resulting[parseInt(i) - 1] =
          (resulting[parseInt(i) - 1]) *
          (resulting[parseInt(i) + 1]);
        resulting.splice(i, 2); // Delete the completed element
      }
    }
    for (i in resulting) {
      if (resulting[i] == "/") {
        resulting[parseInt(i) - 1] =
          (resulting[parseInt(i) - 1]) /
          (resulting[parseInt(i) + 1]);
        resulting.splice(i, 2); // Delete the completed element
      }
    }

    for (i in resulting) {
      if (resulting[parseInt(i)] == "-") {
        resulting[parseInt(i) + 1] = -Number(resulting[parseInt(i) + 1]);
        resulting[parseInt(i)] = "+";
      }
    }
    finalr = 0;
    for (i in resulting) {
      if (i % 2 == 0) {
        var finalr = finalr + Number(resulting[parseInt(i)]);
      }
    }
    resulting.splice(1, resulting.length);
    resulting[0] = finalr;
    resulting.splice(1, resulting.length);
  } while (resulting.length > 1);
  ans = resulting[0];
  document.getElementById("display").value = resulting[0];
  resulting = [];
}
