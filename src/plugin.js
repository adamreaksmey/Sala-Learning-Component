import * as components from './components';
dotenv.config()
import dotenv from 'dotenv'

const debugModeOn = process.env.DEBUG_MODE === 'false'
const Plugin = {
  /**
   * The following install function dynamically registers
   * each component to allow for local imports.
   * @param {*} Vue 
   */
  install(Vue) {
    debugModeOn ?? console.log('Components:', components);
    for (const key in components) {
      if (Object.prototype.hasOwnProperty.call(components, key)) {
        const component = components[key];
        debugModeOn ?? console.log('Registering component:', component.name, component);
        Vue.component(component.name, component);
      }
    }
  }
};

export default Plugin;

// To allow individual component use
export * from './components';
