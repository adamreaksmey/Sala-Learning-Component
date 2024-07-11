import * as components from './components';

const Plugin = {
  install(Vue) {
    console.log('Components:', components); // Debugging line
    for (const key in components) {
      if (Object.prototype.hasOwnProperty.call(components, key)) {
        const component = components[key];
        Vue.component(component.name, component);
      }
    }
  }
};

export default Plugin;

// To allow individual component use
export * from './components';
