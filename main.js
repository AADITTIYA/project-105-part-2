Webcam.set({
    height:300,
    width:350,
    image_format: "png",
    png_quality:90
});

Webcam.attach("live_camera");
 

function take_snap(){
    Webcam.snap(function(data_uri){
        document.getElementById("snap").innerHTML = '<img id="captured_image" src="'+data_uri+'">'
    });
}

console.log("ml5 version :",ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/OaZxwr3oP/model.json",modleLoaded);

function modleLoaded(){
    console.log("YOUR MODEL IS LOADED" );
}

function check(){
    img = document.getElementById("captured_image");

    classifier.classify(img,gotResult);
};

function gotResult(error,results){
    if (error) {
        console.error(error);
    }

    else {
        console.log(results);
        document.getElementById("object_name").innerHTML = results[0].label;
        document.getElementById("accuracy").innerHTML = results[0].confidence.toFixed(2);
    }
}