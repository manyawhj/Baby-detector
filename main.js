img="";
Status="";
objects=[];
ring="";

function preload(){
img=loadImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsNXhIiTYb6WBVsZINyQ0Zy9LA1Luu-Jtyuw&usqp=CAU");
ring=loadSound("ringing_old_phone.mp3");
}

function setup(){
    Canvas=createCanvas(500,420);
    Canvas.position(560,150);
    Video=createCapture(VIDEO);
    Video.hide();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Identifying Objects...";
    document.getElementById("number").innerHTML="LOADING...";
}

function modelLoaded(){
    console.log("Model is loaded");
    Status="true";
    }

function gotPoses(error,results){

    if (error){
        console.log("error");
    }
    else{
        console.log(results);
        objects=results;
    }
}

function draw() {
 
    image(Video,0,0,640,420);
    r=random(255);
    g=random(255);
    b=random(255);
 if (Status != ""){

    objectDetector.detect(Video,gotPoses);
     
  for (i= 0; i< objects.length; i++) {
        percentage=floor(objects[i].confidence*100);
        fill(r,g,b);
        text(objects[i].label+" "+percentage+"%",objects[i].x,objects[i].y);
        stroke(r,g,b);
        noFill();
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        if (objects[i].label=="person"){
       document.getElementById("status").innerHTML="Status : Identified"
       document.getElementById("number").innerHTML="Baby Found";
        ring.stop();
     }
     else {
        ring.play();
        ring.setVolume(1);
        ring.rate(1);
        document.getElementById("status").innerHTML="Status : Identified";
    document.getElementById("number").innerHTML="Baby Not Found";
    }

    }
}}
 