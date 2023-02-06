let express = require('express');
let axios = require('axios')
let router = express.Router();


const carousel = require("../middleware/collections/Carousel")
const send = require("../middleware/functions/sender")



router.get('/get-product', async function(req, res, next) {
  const   {
    carouselid,
      companyid
  } = req.query
  const object = {
    carouselID:carouselid,
  }
  const value = await carousel.getCarousel(object);
  const resultObject = value[0].data
  let link="http://localhost:3001/api/find/carouselproduct?companyid="+companyid +"&productids="
  for (let i = 0; i < resultObject.length; i++) {
    if (i == 0){
      link = link+resultObject[i]
    }
    else{
      link = link+"%"+resultObject[i]
    }
  }
  let response = await axios(link)
  send.Success(res,req,response.data.data)
});

router.post('/create', async function(req,res,nex){
  const   {
    companyID,
    name,
    data
  } = req.body
  if (companyID == null || name == null || data == null)
  {
    send.Denied(res,req,"Lütfen gönderdiğiniz verileri kontrol edin.",400)
  }
  else{
    const object = {
      companyID:companyID,
      name:name,
      data:data
    }
    const result = await carousel.carouselCreate(object);
    if (result == 400)
    {
      
      send.Denied(res,req,"Lütfen gönderdiğiniz verileri kontrol edin.",400)
    } else if ( result == 404){
      send.Denied(res,req,"Sunucu hatası.",404)
    }
    else {
      send.Success(res,req,result)
    }
  }
})

router.post('/update', async function(req,res,nex){
  const   {
    carouselID,
    isActive,
    isDelete,
    data
  } = req.body
  const object = {
    carouselID:carouselID,
    isActive:isActive,
    isDelete:isDelete,
    data:data
  }
  const result = await carousel.carouselUpdate(object);
  send.Success(res,req,result)
})

router.get('/get-all', async function(req,res,nex){
  const   {
    companyid,
  } = req.query
  const object = {
    companyID:companyid,
  }
  const result = await carousel.getAllCarousel(object);
  send.Success(res,req,result)
})

router.get('/find', async function(req,res,nex){
  const   {
    carouselid,
  } = req.query
  const object = {
    carouselID:carouselid,
  }
  
  const result = await carousel.getCarousel(object);
  send.Success(res,req,result)
})

module.exports = router;
