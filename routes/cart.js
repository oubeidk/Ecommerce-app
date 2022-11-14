const router = require("express").Router();

const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorzation,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//Create
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Product(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update
router.put("/:id", verifyTokenAndAuthorzation, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Delete
router.delete("/:id", verifyTokenAndAuthorzation, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart deleted successfly!!");
  } catch (err) {
    res.status(500).json(err);
  }
});
//get User Cart
router.get("/find/:userId", verifyTokenAndAuthorzation, async (req, res) => {
  try {
    const cart = await Cart.findOne({userId:req.params.userId});
    
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get all 
router.get("/",verifyTokenAndAdmin, async (req,res)=>{
    try{
        const carts = await Cart.find()
        res.status(200).json(carts)

    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;
