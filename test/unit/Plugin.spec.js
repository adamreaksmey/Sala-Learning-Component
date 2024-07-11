import Vue from 'vue';
import { createLocalVue } from '@vue/test-utils';
import Plugin from '@/plugin';
import { SalaLearning } from '@/components';

describe('Plugin', () => {
  it('installs the SalaLearning component', () => {
    const localVue = createLocalVue();
    localVue.use(Plugin);
    expect(localVue.options.components['SalaLearning']).toBe(SalaLearning);
  });
});
