const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require ('dotenv').config()
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.User_DB}:${process.env.User_pass}@cluster0.df9nipl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
  
  try{
  const userRegisterDataCollection= client.db("happy-campers").collection("register-data")


  app.post('/registerData', async(req, res) => {
    const userData = req.body;
    const result = await userRegisterDataCollection.insertOne(userData)
    res.send(result)
  })

  app.get('/allUserData', async (req, res) => {

    const query = {}
    const allUser = await userRegisterDataCollection.find(query).toArray()
    res.send(allUser)

    

  })

  app.get("/adminState/:email", async (req, res) => {
    
    console.log(req.params.email);
    const query = { email: req.params.email };
    const curser = await userRegisterDataCollection.findOne(query);
    if (curser?.role === "admin") {
      console.log("admin");
      return res.send(true);
    }
    console.log("not admin");
    res.send(false);

  })


  }
   finally{

   }
}
run().catch(error => console.log(error))




app.get('/', async (req, res) => {
  res.send('Happy campers server running')
})

app.listen(port, () => console.log(`Happy campers server running on ${port}`))