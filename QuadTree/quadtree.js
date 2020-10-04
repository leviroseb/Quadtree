class Point{
    constructor(x,y,userData){
        this.x=x;
        this.y=y;
        this.userData=userData;
    }
}

class Rectangle{
    constructor(x,y,w,h){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
    }

    //Verifica si este objeto contiene un objeto Punto
    contains(point){
        if (point.x>=this.x-this.w && point.x<=this.w+this.x &&
            point.y>=this.y-this.h && point.y<=this.y+this.h){
                return true;
            }
            return false
    }

    //Verifica si este objeto se intersecta con otro objeto rectangulo
    intersects(range){
        return !(range.x-range.w>this.x+this.w ||
            range.x+range.w<this.x-this.w ||
            range.y-range.h>this.y+this.h ||
            range.y+range.h<this.y-this.h);
    }
}


class QuadTree{
    constructor(boundary,n){
        this.boundary=boundary;
        this.capacity=n;
        this.points=[];
        this.divided=false;    
    }

    subdivide(){
        let x=this.boundary.x;
        let y=this.boundary.y;
        let w=this.boundary.w/2;
        let h=this.boundary.h/2;

        let qt_northeast=new Rectangle(x+w,y-h,w,h);
        this.northeast=new QuadTree(qt_northeast,this.capacity);
        let qt_northwest=new Rectangle(x-w,y-h,w,h);
        this.northwest=new QuadTree(qt_northwest,this.capacity);
        let qt_southeast=new Rectangle(x+w,y+h,w,h);
        this.southeast=new QuadTree(qt_southeast,this.capacity);
        let qt_southwest=new Rectangle(x-w,y+h,w,h);
        this.southwest=new QuadTree(qt_southwest,this.capacity);

        this.divided=true;
    }

    insert(point){
        if(!this.boundary.contains(point)){
            return false;
        }

        if (this.points.length<this.capacity){
            this.points.push(point);
            return true;
        }

        if(!this.divided){
            this.subdivide();
        }

        return (this.northeast.insert(point)||
                this.northwest.insert(point)||
                this.southeast.insert(point)||
                this.southwest.insert(point)
        );
    }
    
    query(range,found){

        if(!found){
            found=[];
        }

        if(!this.boundary.intersects(range)){
            return;
        }else{
            for(let p of this.points){
                count++
                if(range.contains(p)){
                    found.push(p);
                }
            }

        
        }

        if(this.divided){
            this.northwest.query(range,found);
            this.northeast.query(range,found);
            this.southwest.query(range,found);
            this.southeast.query(range,found);
        }

        return found;
    }

    show(){
        stroke(255);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(this.boundary.x,this.boundary.y,this.boundary.w*2,this.boundary.h*2);
        if(this.divided){
            this.northeast.show();
            this.northwest.show();
            this.southeast.show();
            this.southwest.show();
        }

        for(let p of this.points){
            strokeWeight(4);
            point(p.x,p.y);

        }
    }
}
