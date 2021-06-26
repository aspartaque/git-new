if (document.querySelector("#period_selector_news")) {
  let periodSelectorNews = new Vue({
    el: "#period_selector_news",
    data: {
      ru: vdp_translation_ru.js,
      start: null,
      end: null,
    },
    components: {
      vuejsDatepicker,
    },
  });
}
