import { AppState } from "../AppState"
import { Ad } from "../models/Ad"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class AdsService{
    async getAds(){
        const res = await api.get('api/ads')
        AppState.ads = res.data
        logger.log('[ads from the appstate]', AppState.ads)
    }
}

export const adsService = new AdsService