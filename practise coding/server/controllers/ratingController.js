const { Rating } = require('../models/models');

class RatingController {

    async add(req, res) {
        try {
            const { deviceId, rate } = req.body;
            const userId = req.user.id;

            if (!deviceId || !rate) {
                return res.status(400).json({
                    message: 'Необхідно вказати товар та оцінку'
                });
            }

            if (rate < 1 || rate > 5) {
                return res.status(400).json({
                    message: 'Оцінка повинна бути від 1 до 5'
                });
            }

            let rating = await Rating.findOne({
                where: {
                    userId,
                    deviceId
                }
            });

            if (rating) {
                rating.rate = rate;
                await rating.save();
            } else {
                rating = await Rating.create({
                    userId,
                    deviceId,
                    rate
                });
            }

            const ratings = await Rating.findAll({
                where: {
                    deviceId
                }
            });

            const average =
                ratings.reduce((sum, item) => sum + item.rate, 0)
                / ratings.length;

            return res.json({
                rating,
                average: Number(average.toFixed(1))
            });

        } catch (e) {
            console.error('ПОМИЛКА РЕЙТИНГУ:', e);
            return res.status(500).json({
                message: e.message
            });
        }
    }

    async getByDevice(req, res) {
        try {
            const { deviceId } = req.params;

            const ratings = await Rating.findAll({
                where: {
                    deviceId
                }
            });

            if (ratings.length === 0) {
                return res.json({
                    average: 0,
                    count: 0,
                    ratings: []
                });
            }

            const average =
                ratings.reduce((sum, item) => sum + item.rate, 0)
                / ratings.length;

            return res.json({
                average: Number(average.toFixed(1)),
                count: ratings.length,
                ratings
            });

        } catch (e) {
            console.error('ПОМИЛКА ОТРИМАННЯ РЕЙТИНГУ:', e);
            return res.status(500).json({
                message: e.message
            });
        }
    }
}

module.exports = new RatingController();