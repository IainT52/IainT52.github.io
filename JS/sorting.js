// Init variables
var unsortedArray = [10, 20, 10, 6, 73, 43, 65, 2],
numberOf_Bars = 60,
curSorting = false,
pauseBool = false,
speed = 300;

const heightRange_min = 20,
heightRange_max = $('.barContainer').height() - 100;

// Initialize bars on load and render modal tutorial pop up
$(function() {
    initArray(numberOf_Bars, heightRange_min, heightRange_max);
    $('#myModal').modal('show');
});

// Responsive Bars
$(window).resize(function () {
    calculateBar_Width();
});

// Get selected Sorting Algorithm when the options change
$("select.algoSelector").change(function(){
    speed = 300;
    switchCase_Algo();
});

// Speed control by hovering over bars
// Set interval is required to refresh '.bar' DOM elements as they are destroyed 
// after every sort.
$(function() {
    window.setInterval(function(){
        $('.bar').mousemove(function(e) {
            var mouseX = e.pageX,
            offset = $('body').width() * .50;
            calcSpeed = (5000 / $('body').width() * ((mouseX - offset)/2));
            if(calcSpeed <= 0) speed = 1;
            else speed = calcSpeed
        });
      }, 2000);
});

// Switch case to match selected algorithm with function call
function switchCase_Algo(){
    var selectedAlgo = $("select.algoSelector").children("option:selected").val();
    switch(selectedAlgo) {
        case "Bubble Sort":
            bubbleSort();
            break;
        case "Insertion Sort":
            insertionSort();
            break;
        case "Selection Sort":
            selectionSort();
            break;
        case "Quick Sort":
            init_quickSort(unsortedArray,0,unsortedArray.length -1);
            break;
        default:
            break;
    }
};



// ..............................SORTING ALGORITHMS..............................




// Quick Sort Algorithm
async function init_quickSort(arr,start,end){
    if(!curSorting){
        curSorting = true;
        await quickSort(arr,start,end);
        curSorting = false;
    }
}
async function quickSort(arr, start, end){
    if(curSorting){
        if (start >= end){
            return;
        }
        let index = await partition(arr,start,end);
        await quickSort(arr,start, index - 1);
        await quickSort(arr,index + 1,end);
        return arr;
    }
}

async function partition(arr,start,end){
    if(curSorting){
        let pivotIndex = start;
        let pivotVal = arr[end];
        $("#" + end).css("background-color", "#b5ff4d");
        await new Promise(resolve => setTimeout(resolve, speed + (speed * .5)));
        for (let i = start; i < end; i++){
            if (arr[i] < pivotVal && curSorting){
                await visualSwap(i, pivotIndex);
                $("#" + i).css("background-color", "#1df0de");
                $("#" + pivotIndex).css("background-color", "#1df0de");
                [arr[i],arr[pivotIndex]] = [arr[pivotIndex],arr[i]];
                pivotIndex++;
            }
        }
        await visualSwap(end, pivotIndex);
        $("#" + end).css("background-color", "#1df0de");
        $("#" + pivotIndex).css("background-color", "#1df0de");
        [arr[end],arr[pivotIndex]] = [arr[pivotIndex],arr[end]];
        return pivotIndex;
    }
}


// Selection Sorting Algorithm
async function selectionSort() {
    if (!curSorting) {
        curSorting = true;
        // I could run to i < unsortedArray.length - 1 but it is running one iteration 
        // longer to change the opacity of the last bar
        for (let i = 0; i < unsortedArray.length; i++) {
            let min = i;
            for (let j = i; j < unsortedArray.length; j++) {
                if(unsortedArray[j] < unsortedArray[min] && curSorting) min = j;
            }
            if(curSorting){
                await visualSwap(i, min);
                $("#" + i).css("background-color", "#1df0de");
                $("#" + min).css("background-color", "#1df0de");
                [unsortedArray[i], unsortedArray[min]] = [unsortedArray[min], unsortedArray[i]];
                $("#" + i).css("opacity", "20%");
            }
        }
        curSorting = false;
    }
    return unsortedArray;
}


// Insertion Sorting Algorithm
async function insertionSort() {
    if (!curSorting) {
        curSorting = true;
        for (let i = 0; i < unsortedArray.length; i++) {
            for (let j = i; j > 0; j--) {
                if (unsortedArray[j] < unsortedArray[j - 1] && curSorting) {
                    await visualSwap(j, j - 1);
                    $("#" + (j - 1)).css("background-color", "#1df0de");
                    $("#" + j).css("background-color", "#1df0de");
                    [unsortedArray[j], unsortedArray[j - 1]] = [unsortedArray[j - 1], unsortedArray[j]];
                }
                else break;
            }
        }
        curSorting = false;
    }
    return unsortedArray;
}

// Bubble Sort Algorithm
async function bubbleSort() {
    if (!curSorting) {
        curSorting = true;
        let swapped = true;
        let bounds = unsortedArray.length - 1;
        while (swapped) {
            swapped = false;
            for (let i = 0, j = 1; i < bounds; i++, j++) {
                if (unsortedArray[i] > unsortedArray[j] && curSorting) {
                    await visualSwap(i, j);
                    $("#" + i).css("background-color", "#1df0de");
                    $("#" + j).css("background-color", "#1df0de");
                    swapped = true;
                    [unsortedArray[i], unsortedArray[j]] = [unsortedArray[j], unsortedArray[i]];
                }
            }
            if(curSorting){
                $("#" + bounds).css("opacity", "20%");
                bounds--;
            }
        }
        // While loop fills the rest of the bars with a lower opacity to represent that it finishes
        while (bounds >= 0 && curSorting) {
            $("#" + (bounds)).css("opacity", "20%");
            bounds--;
        }
        curSorting = false;
    }
    return unsortedArray;
}



// END OF SORTING ALGORITHMS.............................



// Toggle play and pause sorting
function togglePlay() {
    if(pauseBool) {
        pauseBool = false;
        $("#pauseButton").html("Pause");
        switchCase_Algo();
    }
    else {
        pauseBool = true; 
        curSorting = false;
        $("#pauseButton").html("Play");
    }
}

// Clear previous bars and reshuffle new bars 
function randomize() {
    //Check play/pause button
    if(pauseBool == true) togglePlay();
    // Update html option selector
    $("#inputState").val('Sorting Algorithm'); 
    speed = 300;
    curSorting = false;
    $(".barContainer").empty();
    // Recalculate numberOf_Bars (23 is arbitrary but works well to achieve optimal bar width)
    numberOf_Bars = Math.floor($(".barContainer").width()/23);
    initArray(numberOf_Bars, heightRange_min, heightRange_max);
}

// Initialize the random array of ints and bars on the screen
function initArray(arrLength, min, max) {
    let arr = []
    for (let i = 0; i < arrLength; i++) {
        arr.push(Math.floor(Math.random() * (max - min) + min));
    }
    unsortedArray = arr;
    return createDiv_Bars(arr);
}

// Create the divs for each bar on the screen
function createDiv_Bars(arr) {
    for (let i = 0; i < arr.length; i++) {
        $("<div />", {
            "class": "bar",
            "style": "height:" + arr[i] + "px;",
            "id": i
        }).appendTo(".barContainer");
    }
    calculateBar_Width();
}

// Recalculates the bars' width on screen adjustments and for creating new bars
function calculateBar_Width() {
    let pixelsLeft = $(".barContainer").width() - (numberOf_Bars * 10);
    let barWidth = Math.floor(pixelsLeft / numberOf_Bars);
    if (barWidth < 1) {
        numberOf_Bars = Math.floor(numberOf_Bars*.7);
        randomize();
    }
   else $(".bar").css("width", barWidth);
}

// Colors the two bars that are being compared (pink) and sets timeout using promises to show animation
function visualSwap(i, j) {
    $("#" + i).css("background-color", "#cf70ba");
    $("#" + j).css("background-color", "#cf70ba");
    $("#" + i).animate({ height: unsortedArray[j] + "px" }, speed);
    $("#" + j).animate({ height: unsortedArray[i] + "px" }, speed);
    return new Promise(resolve => setTimeout(resolve, speed + (speed * .05 )));
}