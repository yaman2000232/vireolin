import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

export const echo = new Echo({
    broadcaster: "pusher",
    key: "382a1f3a6e935277e22d",
    cluster: "us2",
    forceTLS: true,
  authEndpoint: 'http://localhost:8000/vireolin/broadcasting/auth'

});
