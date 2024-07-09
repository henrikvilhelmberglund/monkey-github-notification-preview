// import "./app.css";
import { GM_addElement } from '$';
import 'virtual:uno.css'
import { mount } from "svelte";
import App from "./App.svelte";

const app = mount(App, {
  target: (() => {
    const app = document.createElement("div");
    // const app = GM_addElement("div");

    document.body.append(app);
    return app;
  })(),
});

// const app = createClassComponent({
//   component: App,
//   target: (() => {
//     const app = document.createElement("div");
//     document.body.append(app);
//     return app;
//   })(),
// });

export default app;
