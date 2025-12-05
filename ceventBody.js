const fs = require('fs');
app.post('/api/ceventBody', (req,res)=> {
    fs.writeFileSync('./announcements.json',JSON.stringify(req.body,null,2)); //writes the announcement from the json
    res.JSON({success:true,message:'Successfully sent.'}); //responds if the send was successful
});