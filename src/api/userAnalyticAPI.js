import {analyticAPI} from "@/api/axiosInstances.js";

export const analyticService = {
    collectUserData(userData){
        return analyticAPI.post("/collect", userData);
    },
    analyticUserActivities(){
        return analyticAPI.get("/report");
    },
    analyticUserActivitiesByCloudFront(){
        return analyticAPI.get("/report/cloudFront");
    }
}