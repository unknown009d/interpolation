function factorial(o)
{
    if(o==1)
      return 1;
    else
      return o*factorial(o-1);  
}
function Newton_interpolation_forward()
{
    //x value input
    var x=[0.2,0.4,0.6,0.8,1.0];
    //creating 2d array
    var y=new Array(x.length);
    for(let i=0;i<x.length;i++)
    {
        y[i]=new Array(x.length);
    }
    //y/f(x) value input
    y[0]=[1.2214,1.4918,1.8221,2.2255,2.7183];
    //calcilating the diff table
    for(let i=0;i<(x.length-1);i++)
    {
           for(let j=0;j<(x.length-(i+1));j++)
           {    
               y[i+1][j]=y[i][j+1]-y[i][j];

           }
    }
    //outputing the diff table
    for(let H=1;H<x.length;H++)
    {
        for(let G=0;G<(x.length-H);G++)
        {
            process.stdout.write(y[H][G]+" ");
        }
        console.log();
    }
    //value input for X(destination)
    var des=0.25;
    var U,U_ter;
    U=(des-x[0])/(x[1]-x[0]);
    console.log("U = "+U);
    var f_x;
    f_x=y[0][0];
    for(let YU=0;YU<=x.length-2;YU++)
    {
        U_ter=1;
        for(let UY=0;UY<=YU;UY++)
        {
            U_ter*=(U-UY);
        }
        f_x+=(U_ter*y[YU+1][0])/factorial(YU+1);
    }
    console.log("The f(x) value is : "+f_x);
}
function Newton_interpolation_backward()
{
    //x value input
    var x=[1,2,3,4,5];
    //2d Y value
    var y=new Array(x.length);
    for(let i=0;i<x.length;i++)
    {
        y[i]=new Array(x.length);
    }
    //y value initializing
    y[0]=[0,0.3010,0.4771,0.6020,0.6989];
    //calcilating the diff table
    for(let i=0;i<(x.length-1);i++)
    {
           for(let j=0;j<(x.length-(i+1));j++)
           {    
               y[i+1][j]=y[i][j+1]-y[i][j];

           }
    }
    //outputing the diff table
    for(let H=1;H<x.length;H++)
    {
        for(let G=0;G<(x.length-H);G++)
        {
            process.stdout.write(y[H][G]+" ");
        }
        console.log();
    }
     //value input for X(destination)
    var des=5.3
    var U,U_ter;
    U=(des-x[x.length-1])/(x[1]-x[0]);
    console.log("U = "+U);
    var f_x;
    f_x=y[0][x.length-1];
    for(let YU=0;YU<=x.length-2;YU++)
    {
        U_ter=1;
        for(let UY=0;UY<=YU;UY++)
        {
            U_ter*=(U+UY);
        }
        f_x+=(U_ter*y[YU+1][x.length-(YU+2)])/factorial(YU+1);
    }
    console.log("The f(x) value is : "+f_x);
}

Newton_interpolation_backward();
Newton_interpolation_forward();
