import * as components from "./components";
// Remove dotenv.config(); and import dotenv from "dotenv";

const debugModeOn = process.env.DEBUG_MODE === "false";
const Plugin = {
  /**
   * The following install function dynamically registers
   * each component to allow for local imports.
   * @param {*} Vue
   *
   * For bootstrap css import options.
   * @param {{}} [options={}]
   */
  install(Vue, options = {}) {
    // UNDER MAINTAINENCE
    // if (!options.skipCss) {
    //   // Import Bootstrap and BootstrapVue CSS files only if not skipped
    //   require("bootstrap/dist/css/bootstrap.css");
    //   require("bootstrap-vue/dist/bootstrap-vue.css");
    // }
    if (!debugModeOn) {
      console.log("Components:", components);
    }
    for (const key in components) {
      if (Object.prototype.hasOwnProperty.call(components, key)) {
        const component = components[key];
        if (!debugModeOn) {
          console.log("Registering component:", component.name, component);
        }
        Vue.component(component.name, component);
      }
    }
  },
};

export default Plugin;

// To allow individual component use
export * from "./components";
