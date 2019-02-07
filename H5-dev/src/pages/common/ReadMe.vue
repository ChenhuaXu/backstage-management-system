<template>
  <div class="read-me">
    <vue-markdown>{{ content }}</vue-markdown>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import content from '@/doc/README.md'
export default {
  name: 'read-me',
  components:{
    'vue-markdown': VueMarkdown
  },
  data () {
    return {
      content
    }
  }
}
</script>