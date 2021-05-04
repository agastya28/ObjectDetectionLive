
img = ""
status = ""
objects = []

function preload() {
    img = loadImage("dog_cat.jpg");
}

function setup() {

    canvas = createCanvas(380, 380);
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()

    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Staus: Detecting Objects"
}

function draw() {
    image(video, 0, 0, 380, 380);
/*
    fill("#ba170b")
    text("Dog", 90, 80)
    noFill()
    stroke('#ba170b')
    rect(75, 60, 500, 355)

    fill("#ba170b")
    text("Cat", 310, 100)
    noFill()
    stroke('#ba170b')
    rect(300, 75, 295, 315) */
    if (status !="") {
        objectDetector.detect(video, gotResults);

r = random(255)
g = random(255)
b = random(255)

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected"
            document.getElementById("objectsdetected").innerHTML= "Number of Object Detected: " + objects.length;
            fill(r, g, b)
            percent = floor(objects[i].confidence*100);
            console.log(percent);
            text(objects[i].label + " " + percent + "%", objects[i].x + 10, objects[i].y + 20)
            noFill()
            stroke(r, g, b)
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            
        }
    }

}

function modelLoaded() {
    console.log("Model Loaded")
    status = true;
    
}

function gotResults(error, results) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(results);
        objects = results;
    }
}