export default {
  mounted (el, binding) {
    const observer = new IntersectionObserver((entires, observer) => {
      console.log('intersected')
      if (entires[entires.length - 1].isIntersecting) {
        binding.value()
      }
    }, {
      rootMargin: '0px',
      threshold: 1.0
    });

    observer.observe(el)
  }
}
