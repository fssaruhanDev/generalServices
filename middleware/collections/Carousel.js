const db = require("../../database/connect")
const dates = require("date-and-time");
const collection = "cls_Carousel";
const generate=require("../functions/generate")


async function carouselCreate(object){
	let date_ob = new Date()
	let dateTime =  dates.format(date_ob, 'MM/DD/YYYY HH:mm:ss [GMT]Z')
	const autoID = generate.AutoID("carousel");
	let data =[{
		"companyID" : object.companyID,
		"carouselName":object.name,
		"carouselID":autoID,
		"carouselData":object.data,
		"createDate" : dateTime,
		"updateTime" :"00.00.0000-00:00:00",
		"isActive":true,
		"isDelete":false

	}]
	let value;
	await db.Create(data, collection)
		.then( function(response) {
			value = response
		}, function(error) {
			value =  error
		})
	
	let findValue
	const filter = {
		_id: value.insertedIds[0]
	}
	const options = {
	}
	const sort={}
	const limit = 1
	await db.Read(filter,options,sort,limit,collection)
		.then( function(response) {
			findValue = response
		}, function(error) {
			return 400
		}).catch(function (e) {
			return 404
		})
	return findValue[0].carouselID
}

async function carouselUpdate(object){
	const filter ={
		"carouselID":object.carouselID
	}
	let date_ob = new Date()
	let dateTime =  dates.format(date_ob, 'MM/DD/YYYY HH:mm:ss [GMT]Z')
	
    const data = {
		$set:{"carouselData" : object.data, "updateTime":dateTime}
	}
	const options = {}
	let value
	await db.Update(filter,data,options,collection)
		.then(function (response) {
			value = response
		}, function (err) {
			value = err
		}).catch(function (err) {
			value = err
		})
	
	return object.carouselID + " başarılı şekilde güncellendi"
}

async function getCarousel(object){
	let value
	const filter = {
		"carouselID": object.carouselID
	}
	const options = {
	}
	const sort={}
	const limit = 1
	await db.Read(filter,options,sort,limit,collection)
		.then( function(response) {
			value = response
		}, function(error) {
			value =  error
		}).catch(function (e) {
			value = e
		})
	let carousel = [{
	"id" : value[0].carouselID,
	"name" : value[0].carouselName,
	"data" : value[0].carouselData,
	"isActive" : value[0].isActive
	}]
	return carousel
}

async function getAllCarousel(object){
	let value
	const filter = {
		"companyID": object.companyID
	}
	const options = {
	}
	const sort={}
	const limit = 50
	await db.Read(filter,options,sort,limit,collection)
		.then( function(response) {
			value = response
		}, function(error) {
			value =  error
		}).catch(function (e) {
			value = e
		})
	let carousels = []
	for (let i = 0; i < value.length; i++) {
		let carousel = {}
		carousel.id = value[i].carouselID
		carousel.name = value[i].carouselName
		carousel.data = value[i].carouselData
		carousel.isActive = value[i].isActive
		carousels.push(carousel)
	}
	
	return carousels
}
// a function get all carusel for companyID
async function getAllCarousel(object){
	let value
	const filter = {
		"companyID": object.companyID
	}
	const options = {
	}
	const sort={}
	const limit = 50
	await db.Read(filter,options,sort,limit,collection)
		.then( function(response) {
			value = response
		}, function(error) {
			value =  error
		}).catch(function (e) {
			value = e
		})
	let carousels = []
	for (let i = 0; i < value.length; i++) {
		let carousel = {}
		carousel.id = value[i].carouselID
		carousel.name = value[i].carouselName
		carousel.data = value[i].carouselData
		carousel.isActive = value[i].isActive
		carousels.push(carousel)
	}
	
	return carousels
}

module.exports =
	{
		carouselCreate,
		carouselUpdate,
		getCarousel,
		getAllCarousel
	}

