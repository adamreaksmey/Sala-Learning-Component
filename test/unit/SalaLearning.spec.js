import { shallowMount } from '@vue/test-utils';
import SalaLearning from '@/components/SalaLearning.vue';

describe('SalaLearning.vue', () => {
  it('renders props.title when passed', () => {
    const title = 'hellooooo';
    const wrapper = shallowMount(SalaLearning, {
      propsData: { title }
    });
    expect(wrapper.text()).toMatch(title);
  });
});
