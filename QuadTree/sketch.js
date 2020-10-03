let qt;
let count = 0;
function setup(){
    createCanvas(400,400);
    let boundary=new Rectangle(200,200,200,200);
    qt=new QuadTree(boundary,4);
    console.log(qt);

    for(let i=0;i<10;i++){
        let p=new Point(Math.random()*400,Math.random()*400);
        qt.insert(p);
    }
    background(0);
    qt.show();
}