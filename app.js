const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const https=require("https");
app.use(bodyParser.urlencoded({extended:true}));

app.listen("3000",function(){
    console.log("Server set up at port 3000");
})

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
   

app.post("/",function(req,res){
    const pincode=req.body.pincode;
    var dateUser=req.body.date;
    dateUser.toString();
    var day=dateUser.substring(dateUser.lastIndexOf('-')+1);
    var month=dateUser.substring(dateUser.lastIndexOf('-')-2,dateUser.lastIndexOf('-'));
    var year=dateUser.substring(0,4);
    var date=day+"-"+month+"-"+year;

    const apiEndPoint="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin";

    const string="hi_IN";

    const url=apiEndPoint+"?string="+string+"&date="+date+"&pincode="+pincode;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on('data',function(data){
            const slots=JSON.parse(data);
            var count=slots.sessions.length;
            console.log(count);
            res.set("Content-Type", "text/html");
            for(let i=0;i<count;i++){
                var centre=slots.sessions[i].name;
                res.write("<h2>Centre Name: "+centre+"</h2>");
                var vaccine=slots.sessions[i].vaccine;
                res.write("<p><strong>Vaccine: </strong></p>"+vaccine);
                var price=slots.sessions[i].fee_type;
                
                res.write("<p><strong>Price: </strong></p>"+price);

                var dose1=slots.sessions[i].available_capacity_dose1;
                res.write("<p><strong>Dose 1 Availability: </strong></p>"+dose1);

                var dose2=slots.sessions[i].available_capacity_dose2;
                res.write("<p><strong>Dose 2 Availability: </strong></p>"+dose2);
                
                
            }
            res.send();
            
        })
    })
       
    console.log(pincode,date);
    
})
})



