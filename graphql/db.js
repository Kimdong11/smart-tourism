import axios from "axios";

const CATEGORY_URL =
    "http://203.253.207.111:8080/jsmith/restful/content?type=0&page=1&scd=A00";

export const getNature = async () => {
    const nature = await axios.get(CATEGORY_URL);
    console.log(nature);
};
