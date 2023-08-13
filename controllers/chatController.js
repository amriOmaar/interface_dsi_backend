const { render } = require("../app");
const Chat = require("../models/schema");

const ajoutChat = (req, res) => {
  const { pseudo, message, creation_time } =
    req.body;
  const newChat = new Chat({
    pseudo,
    message,
    creation_time,
  });

  newChat
    .save()
    .then(() => {
      res.status(200).json({
        newChat,
      });
    })
    .catch((err) => console.log(err));
};

// const getPlats = async (req, res) => {
//   try {
//     const platsList = await Plat.find({});
//     res.render("plats", { platsList });
//   } catch (error) {
//     console.log("Error retrieving plats:", error);
//     res.status(500).send("Error retrieving plats");
//   }
// };

// const updatePlatView = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const plat = await Plat.findById(id);
//     console.log(plat);
//     res.render("updatePlat", { plat });
//   } catch (error) {
//     console.log(error);
//   }
// };

// const updatePlat = async (req, res) => {
//   const platUpdated = req.body;
//   try {
//     const plat = await Plat.findByIdAndUpdate(req.params.id, platUpdated, {
//       new: true,
//     });

    
//   } catch (error) {
//     console.log(error);
//   }
// //   res.redirect("/plat/getPlats");
// };


// const deletePlat = (req, res) => {
//     const id = req.params.id;
//     Plat.findByIdAndRemove(id).then(()=>{
//         res.status(200)
//     });
//   };

// const ajoutPlatView = (req, res) => {
//   res.render("addPlat");
// };

module.exports = {
    ajoutChat
};
