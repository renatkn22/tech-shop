const uuid = require("uuid");
const path = require("path");
const { Device, DeviceInfo } = require("../models/models");
const ApiError = require("../middleware/ErrorHandlingMiddleware");
const { title } = require("process");

class DeviceController {
 async create(req, res, next) {
    try {
        console.log("BODY:", req.body);
        console.log("FILES:", req.files);

        const { name, price, brandId, typeId, info } = req.body;

        if (!req.files || !req.files.img) {
            return res.status(400).json({
                message: "Файл изображения не был загружен"
            });
        }

        const { img } = req.files;

        const fileName = uuid.v4() + ".jpg";

        img.mv(
            path.resolve(__dirname, "..", "static", fileName)
        );

        const device = await Device.create({
            name,
            price,
            brandId,
            typeId,
            img: fileName
        });

        if (info) {
            const deviceInfo = JSON.parse(info);

            for (const i of deviceInfo) {
                await DeviceInfo.create({
                    title: i.title,
                    description: i.description,
                    deviceId: device.id
                });
            }
        }

        return res.json(device);

    } catch (err) {
        console.error("CREATE DEVICE ERROR:", err);
        return res.status(500).json({
            message: err.message
        });
    }
}

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }

    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }

    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
    }
    return res.json(devices);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    return res.json(device);
  }
}

module.exports = new DeviceController();
