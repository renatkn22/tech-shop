const { Basket, BasketDevice, Device } = require('../models/models');

class BasketController {

    async add(req, res, next) {
        try {
            const { deviceId } = req.body;
            const userId = req.user.id;

            console.log("USER ID:", userId);
            console.log("DEVICE ID:", deviceId);

            let basket = await Basket.findOne({
                where: { userId }
            });

            if (!basket) {
                basket = await Basket.create({
                    userId: userId
                });

                console.log("Створено кошик:", basket.id);
            }

            let basketDevice = await BasketDevice.findOne({
                where: {
                    basketId: basket.id,
                    deviceId: deviceId
                }
            });

            if (basketDevice) {

                basketDevice.quantity += 1;

                await basketDevice.save();

                console.log("Кількість збільшено:", basketDevice.quantity);

            } else {

                basketDevice = await BasketDevice.create({
                    basketId: basket.id,
                    deviceId: deviceId,
                    quantity: 1
                });

                console.log("Товар додано до кошика");
            }

            return res.json(basketDevice);

        } catch (e) {

            console.error("ПОМИЛКА КОШИКА:", e);

            return res.status(500).json({
                message: e.message
            });
        }
    }


    async getBasket(req, res, next) {
        try {

            const userId = req.user.id;

            const basket = await Basket.findOne({
                where: { userId },
                include: [{
                    model: BasketDevice,
                    include: [Device]
                }]
            });

            if (!basket) {
                return res.json({
                    basket_devices: []
                });
            }

            return res.json(basket);

        } catch (e) {

            console.error("ПОМИЛКА ОТРИМАННЯ КОШИКА:", e);

            return res.status(500).json({
                message: e.message
            });
        }
    }


    async remove(req, res, next) {
        try {

            const { deviceId } = req.params;
            const userId = req.user.id;

            const basket = await Basket.findOne({
                where: { userId }
            });

            if (!basket) {
                return res.json({
                    message: "Кошик порожній"
                });
            }

            await BasketDevice.destroy({
                where: {
                    basketId: basket.id,
                    deviceId: deviceId
                }
            });

            return res.json({
                message: "Товар видалено"
            });

        } catch (e) {

            console.error("ПОМИЛКА ВИДАЛЕННЯ:", e);

            return res.status(500).json({
                message: e.message
            });
        }
    }
}

module.exports = new BasketController();