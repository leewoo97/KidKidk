import axios from "axios";

async function sendAlarm(subId, pubName, title, content, require) {
    const alarm = {
        subId : subId,
        pubName : pubName,
        title : title,
        content : content,
        require : require
    }
    await axios.post('https://notification.silvstone.xyz/publish', alarm)
        .then(() => {
            console.log(alarm);
        })
        .catch(()=>{
            console.log("Sending Failed")
        });
}

export { sendAlarm };
