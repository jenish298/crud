const { userdata } = require('../models/crudschema.js');

const postdata = async (req, res) => {
  const data = req.body;
    console.log(data)
  if (!data.username || !data.password) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const newUser= await userdata.insertOne(data);
    res.json({ success: true, newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getallData = async(req,res)=>{

    try {
        const data = await userdata.find({})
        res.status(200).json({message:"all book are fetched",
            booklist:data,

        })
    } catch (error) {
        res.status(400).json({
            message:"error occured try again "
        })
    }
};


const deletedata = async(req,res)=>{
const body= req.body
    try {
        const deleted = await userdata.deleteOne({_id:body.Id})
        console.log('deleted',deleted)
        if (deleted.acknowledged) {
          return res.json({
            message:"data deleted success !",
            success:true,
          })
          
        }
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
};


const updateData = async (req, res) => {

  const { Id, username, password } = req.body;

  if (!Id || !username || !password) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const updatedUser = await userdata.updateOne(
      { _id: Id },
      { $set: { username, password } }
    );

    if (updatedUser.modifiedCount === 0) {
      return res.status(404).json({ success: false, message: "User not found or no changes made" });
    }

    res.json({ success: true, message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }

}
module.exports = { postdata, getallData, deletedata,updateData};
 