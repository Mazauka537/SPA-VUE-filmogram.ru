export default {
  mounted (el, binding) {
    const observer = new IntersectionObserver((entries, observer) => {
      if (entries[entries.length - 1].isIntersecting) {
        binding.value(entries[entries.length - 1])
      }
    }, {
      rootMargin: '0px',
      threshold: 1.0
    });

    observer.observe(el)
  }
}
