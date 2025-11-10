var body=document.querySelector("body");
var canvas=document.querySelector("canvas");
var context=canvas.getContext("2d");

//score
var score=0;
//interval
var interval;

//canvas details
var canvas_width=360;
var canvas_height=640;
var bird_image;
//bird details
var bird_width=34;
var bird_height=24;
var birdX=canvas_width/8;
var birdY=canvas_height/2;

//
var active=false;
//bird object
var bird={
    width:bird_width,
    height:bird_height,
    x:birdX,
    y:birdY
}

//gravity
var fly_velocity=-7;
var gravity=0.2;

//pipes
var top_img;
var toppipe;
var top_y;

var down_img;
var downpipe;
var down_y;

var pipes=[];
var pipe_height=544;
var pipe_width=bird.width*2;

window.onload=function(){
  
    //canvas setup
    canvas.width=canvas_width;
    canvas.height=canvas_height;
    
    //
    top_img=new Image();
    top_img.src="toppipe.png";

    down_img=new Image();
    down_img.src="bottompipe.png";
    //draws bird
    bird_image=new Image();
    bird_image.src="flappybird.png";
    bird_image.onload=function(){
        context.drawImage(bird_image,bird.x,bird.y,bird.width,bird.height);
    }
     document.addEventListener("keydown",reset);
     document.addEventListener("click",reset);
      
     
    
    }


    

        //move bird

    function move(){
        if(active==false){
            return;
        }
        context.clearRect(0,0,canvas_width,canvas_height);

    //moving bird
    fly_velocity=fly_velocity+gravity;
    gravity=gravity+0.02;
    bird.y+=fly_velocity;
    bird.y=Math.max(0,bird.y);
    context.drawImage(bird_image,bird.x,bird.y,bird.width,bird.height);
       
     //moves pipe
    for(var i=0;i<pipes.length;i++){

        context.drawImage(pipes[i].img,pipes[i].x,pipes[i].y,pipes[i].width,pipes[i].height);
                pipes[i].x=pipes[i].x-2;
    if(pipes[i].x==0){
    score=score+0.5;
    }
      
    //scores
         context.fillStyle="black";
        context.font="25px Arial";
        context.fillText("Score:"+score,20,40);

          if(end(bird,pipes[i])){
        active=false;
        
        }
    
    }
        requestAnimationFrame(move);
    }


    //add pipes
   function addPipes(){
    top_y=2.5*canvas_height/4-pipe_height-(306*Math.random());
    down_y=pipe_height+8*bird.height+top_y;
   toppipe={
    img:top_img,
    width:pipe_width,
    height:pipe_height,
    x:canvas_width,
    y:top_y
}  
downpipe={
    img:down_img,
    width:pipe_width,
    height:pipe_height,
    x:canvas_width,
    y:down_y
}  
pipes.push(toppipe);
pipes.push(downpipe);

   }

   function end(a,y){
    return (a.x+a.width>y.x && a.x+a.width<y.x+y.width
    && a.y<y.y+y.height&&a.y+a.height>y.y)||a.y+a.height>canvas_height;
   }
    
   function reset(){
    if(active==false){
      clearInterval(interval);

    interval=setInterval(addPipes,1500);

      requestAnimationFrame(move);
      active=true;
      pipes=[];
      bird.y=canvas_height/2;
      score=0; 
     
    }
    fly_velocity=-8;
    gravity=0.2;
   }


   