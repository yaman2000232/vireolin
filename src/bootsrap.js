import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: "pusher",
    key: "382a1f3a6e935277e22d",
    cluster: "us2",
    forceTLS: true,

  authEndpoint: "https://api.vireolin.de/vireolin/broadcasting/auth",

    auth: {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    },
});
