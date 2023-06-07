import { h } from 'vue';

export default {
  name: "FormExpand",
  functional: true,
  props: {
    render: Function,
    par: {}
  },
  render: ({ render, par }) => {
    return render(h, { par });
  }
};

