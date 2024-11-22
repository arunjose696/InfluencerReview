import { h } from 'vue'

// ... rest of the code remains the same ...
const Card = {
  name: 'Card',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  render() {
    return h(
      'div',
      {
        class: `border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-4 ${this.class}`
      },
      this.$slots.default?.()
    )
  }
}

const CardHeader = {
  name: 'CardHeader',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  render() {
    return h(
      'div',
      {
        class: `flex flex-col space-y-1.5 p-6 ${this.class}`
      },
      this.$slots.default?.()
    )
  }
}

const CardTitle = {
  name: 'CardTitle',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  render() {
    return h(
      'h3',
      {
        class: `text-2xl font-semibold leading-none tracking-tight ${this.class}`
      },
      this.$slots.default?.()
    )
  }
}

const CardContent = {
  name: 'CardContent',
  props: {
    class: {
      type: String,
      default: ''
    }
  },
  render() {
    return h(
      'div',
      {
        class: `p-6 pt-0 ${this.class}`
      },
      this.$slots.default?.()
    )
  }
}

export { Card, CardHeader, CardTitle, CardContent } 