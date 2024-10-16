const {
  createPromotions,
  findAllpromotion,
  findOnePromotion,
  updatePromotion,
  deletePromotion,
} = require("../controllers/promotions");
const upload = require ("../middleware/upload")

const promotionRouter = require("express").Router();

promotionRouter.post(`/`,upload.single("image"), createPromotions);
promotionRouter.get("/", findAllpromotion);
promotionRouter.get("/:id", findOnePromotion);
promotionRouter.patch("/:id",upload.single("image"), updatePromotion);
promotionRouter.delete("/:id", deletePromotion);

module.exports = promotionRouter;
