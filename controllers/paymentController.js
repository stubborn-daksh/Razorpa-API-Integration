const Razorpay = require('razorpay'); 
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_ID_KEY,
    key_secret: RAZORPAY_SECRET_KEY
});

const renderProductPage = async(req,res)=>{
    try {
        res.render('product');
    } catch (error) {
        console.log(error.message);
    }
}

const createOrder = async(req,res)=>{
    try {
        //razorpay me jo amount pahunchta hh wo 100 se divide ho kr pahunchta hh isliye hm yhan pe amount ko 100 se multiply kr rhe taki exact amount whn pahunche
        const amount = req.body.amount*100;
        console.log(amount);
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'dakshkesarwanijasra@gmail.com'
        }

        razorpayInstance.orders.create(options, 
            (err, order)=>{
                if(!err){
                    res.status(200).send({
                        success:true,
                        msg:'Order Created',
                        order_id:order.id,
                        amount:amount,
                        key_id:RAZORPAY_ID_KEY,
                        product_name:req.body.name,
                        description:req.body.description,
                        contact:"6387971174",
                        name: "Daksh Kesarwani",
                        email: "dakshkesarwanijasra@gmail.com"
                    });
                }
                else{
                    res.status(400).send({success:false,msg:'Something went wrong!'});
                }
            }
        );

    } catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    renderProductPage,
    createOrder
}