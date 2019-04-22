import { AsyncStorage } from "react-native"
import Constants from "../../variable/Constants";

export default class LoginService {

    static async storeToken(accessToken) {
        try {
            await AsyncStorage.setItem("ACCESS_TOKEN", accessToken);
            this.getToken()
        } catch (error) {
            console.log("cann't store token");
        }
    }

    static async getToken() {
        try {
            token = await AsyncStorage.getItem("ACCESS_TOKEN");
            if (token) {
                Constants.TOKEN = token
            }
            console.log(token);

        } catch (error) {
            console.log("don't have token");
        }
    }

    static async removeToken() {
        try {
            await AsyncStorage.removeItem("ACCESS_TOKEN");
            this.getToken()
        } catch (error) {
            console.log("errrr");
        }
    }

}