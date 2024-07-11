import * as components from './components';

const Plugin = {
  install(Vue) {
    for (const component in components) {
      Vue.component(components[component].name, components[component]);
    }
  }
};

export default Plugin;

// To allow individual component use
export * from './components';
