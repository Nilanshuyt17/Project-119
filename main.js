var quick_draw_data_set = ["aircraft carrier", "airplane", "alarm clock", "ambulance"
, "angel", "pencil", "ant", "anvil"];
score = 0;
answer_holder = "";
drawn_sketch = "";
timer_counter = 0;
timer_check = "";
random_number = Math.floor((Math.random() * quick_draw_data_set.length) + 1);
    console.log(quick_draw_data_set[random_number]);
    sketch = quick_draw_data_set[random_number];
    document.getElementById("label").innerHTML = "Sketch to be drawn - " + sketch;

function setup() {
    canvas = createCanvas(500, 500);
    canvas.position(690, 320);
    canvas.mouseReleased(classifyCanvas);
    synth = window.SpeechSynthesis;
    background("white");
    classifier = ml5.imageClassifier("DoodleNet");
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function updateCanvas() {
    background("white");
    random_number = Math.floor((Math.random() * quick_draw_data_set.length) + 1);
    console.log(quick_draw_data_set[random_number]);
    sketch = quick_draw_data_set[random_number];
    document.getElementById("label").innerHTML = "Sketch to be drawn - " + sketch;
}

function draw() {
    check_sketch();
    if(drawn_sketch == sketch) {
        answer_holder = "set";
        score++;
        document.getElementById("score").innerHTML = "Score:- " + score;
    }
    classifier.classify(canvas, gotResult);
    strokeWeight(7);
    stroke("black");
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function check_sketch() {
    timer_counter++;
    document.getElementById("timer").innerHTML = "Timer:- " + timer_counter;
    console.log(timer_counter);
    if(timer_counter > 10000) {
        timer_counter = 0;
        timer_check = "Completed";
    }
    if(timer_check == "Completed" || answer_holder == "set"){
        timer_check = "";
        answer_holder = "";
        updateCanvas();
    }
}

function gotResult(error, results) {
    if(error) {
      console.error(error);
    } else {
        console.log(results);
        drawn_sketch = results[0].label;
        speak_data = "Your sketch is - " + drawn_sketch;
        utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);
        confidence = results[0].confidence;
        document.getElementById("confidence").innerHTML = "Confidence:- " + Math.round(confidence * 100) + "%";
      }
    }