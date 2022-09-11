var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = (canvas.width/2)*0.9;      //körlap sugara
//setInterval(oraRajzol,1000);          //1 mp-enként kirajzoljuk az órát
setInterval(oraRajzol,40); 

function oraRajzol(){
    ctx.beginPath();
    korlapRajzol();
    kozeppontRajzol();
    arnyekRajzol();
    szamokRajzol();
    aktualisIdoRajzol();

    ctx.fillStyle = "#1E1845";
    ctx.strokeStyle = "#1E1845";
}

/*
mutatoRajzol(ctx, 150, 270, 0, 15);         //óramutató
mutatoRajzol(ctx, 120, 300, 0, 12);         //percmutató
mutatoRajzol(ctx, 385, 385, 0, 4);          //mpmutato
*/

function korlapRajzol(){
    ctx.arc(250,250,radius,0, 2*Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
}

function kozeppontRajzol(){
    ctx.beginPath();                    //ctx ürítése
    ctx.arc(250,250, 17, 0, 2*Math.PI);
    ctx.fillStyle = ("steelblue");
    ctx.fill();
}

function arnyekRajzol(){
    ctx.beginPath();
    ctx.arc(250,250,radius, 0, 2*Math.PI);      

    let grad = ctx.createRadialGradient(250,250,radius*0.95,250,250,radius*1.05);
    grad.addColorStop(0,"steelblue");
    grad.addColorStop(0.5, "white");
    grad.addColorStop(1,"steelblue");

    ctx.strokeStyle = grad;
    ctx.lineWidth = radius*0.1;
    ctx.stroke();
}

function szamokRajzol(){
    let R = radius*0.85;                        //számok távolsága a körlap szélétől
    let fi;

    ctx.beginPath();
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";


    for(let i=0; i<12; i++){
        fi = i*Math.PI/6-Math.PI/3;             //számok sorrendje
        let x= R*Math.cos(fi);
        let y= R*Math.sin(fi);
        x += 250;
        y += 250;

        ctx.fillText((i+1).toString(),x, y);
    }
}

function mutatoRajzol(ctx, posX, posY, width){
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(250,250);
    ctx.lineTo(posX, posY);
    ctx.stroke();

}

function aktualisIdoRajzol(){
    let ido = new Date;

    let ora = ido.getHours();
    let perc = ido.getMinutes();
    let mp = ido.getSeconds();
    let ms = ido.getMilliseconds();

    ora = (ora%12)-3;
    ora = ora*(1/6)*Math.PI;                    // elfordulás szöge radiánban
    ora += (perc/60)*(1/6)*Math.PI;             // percek miatti korrekció
    let R = radius*0.4;                         // óramutató hossza
    let x = R*Math.cos(ora)+250;                
    let y = R*Math.sin(ora)+250;

    mutatoRajzol(ctx, x, y, 20);


    perc = (perc/30)*Math.PI-1/2*Math.PI;
    perc += (mp/30)*(1/60)*Math.PI;
    R =radius*0.7;
    x = R*Math.cos(perc)+250;
    y = R*Math.sin(perc)+250;

    mutatoRajzol(ctx, x , y, 15);


    mp = (mp/30)*Math.PI-1/2*Math.PI;
    mp += (ms/1000)*(1/60)*2*Math.PI;
    R =radius*0.8;
    x = R*Math.cos(mp)+250;
    y = R*Math.sin(mp)+250;

    mutatoRajzol(ctx, x, y, 8);

}