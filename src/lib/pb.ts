import Pocketbase from "pocketbase";

const pb =  new Pocketbase("https://surveysurfer.pockethost.io");

pb.autoCancellation(false)

export default pb