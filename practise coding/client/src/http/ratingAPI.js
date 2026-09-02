
import {$authHost, $host} from "./index";

export const addRating = async (deviceId, rate) => {
    const {data} = await $authHost.post('api/rating', {
        deviceId,
        rate
    });

    return data;
};

export const fetchRating = async (deviceId) => {
    const {data} = await $host.get(`api/rating/${deviceId}`);

    return data;
};

