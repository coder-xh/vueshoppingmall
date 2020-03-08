export let mixin = {
  methods: {
    BackTopClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500);
    }
  }
  
}
