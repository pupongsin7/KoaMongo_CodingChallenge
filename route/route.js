const BlackPink = require('../src/core/resource/BlackPink.model')
const Route = require('koa-router')
const routes = new Route()
// const mongoose = require('mongoose');
// const studentRepository = require('./src/core/resource/student.model')

routes.post('/SetAmountDate', async ctx => {
    let params = ctx.request.body;
    console.log(params)
    let data = await BlackPink.find()
    data = data[0]
    data.Amount = 0
    data.OnSale = params.Date
    data.AmountMax = params.Amount
    data.ReceiptTicket = []
    data.save()
    ctx.body = data
})
routes.get('/getTimeOnSale', async ctx => {
    let data = await BlackPink.find()
    ctx.body = data
})
routes.post('/BlackPinkSetAmount', async ctx => {
    await BlackPink.create({
        Amount: 3,
    });
    ctx.body = 'Test Request'
})
routes.get('/BlackPinkSell', async ctx => {
   
   
    
    // let data = await BlackPink.find()
    let data = await BlackPink.findOneAndUpdate({},  {$inc: { Amount: 1 }}, {
        new: true
    });
    // let data = await BlackPink.find({}, null, { session })
    // data = data[0]
    console.log(data)
    if (data.Amount <= data.AmountMax) {
        // data.ReceiptTicket = 
        TempData = {
            id: "BP" + (data.Amount).pad(4),
            date: Date.now(),
        }
        data.ReceiptTicket.push(TempData)
        data.save()
        // await session.commitTransaction();
        // await session.endSession();
        ctx.body = {
            status: "OK",
            TempData
        }
    }
    else {
        ctx.body = {
            status: "SoldOut",
        }
    }
   

})
Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}
module.exports = routes