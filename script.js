if (document.getElementById('my-work-link')) {
  document.getElementById('my-work-link').addEventListener('click', () => {
    document.getElementById('about-section').scrollIntoView({behavior: "smooth"})
  })
}