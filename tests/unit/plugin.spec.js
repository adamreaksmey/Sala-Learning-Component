import Vue from 'vue';
import { createLocalVue } from '@vue/test-utils';
import Plugin from '@/plugin';
import { SalaLearning } from '@/components';

describe('Plugin', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'test';
  });

  it('installs the SalaLearning component', () => {
    const localVue = createLocalVue();
    localVue.use(Plugin);
    const registeredComponent = localVue.options.components['SalaLearning'];
    
    expect(registeredComponent).toBeDefined();

    // Accessing the component's options depending on Vue version and how it's registered
    const componentOptions = registeredComponent.options || registeredComponent.extendOptions;

    expect(componentOptions.name).toBe(SalaLearning.name);
    expect(componentOptions.props).toEqual(SalaLearning.props);
  });
});
