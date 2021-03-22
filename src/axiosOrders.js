import axios from "axios";

const instance = axios.create({
	baseURL: "https://react-burger-aa2c7-default-rtdb.firebaseio.com/",
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": ["GET", "POST", "PUT", "DELETE"],
		"Access-Control-Allow-Headers": "Authorization",
	},
});

export default instance;
