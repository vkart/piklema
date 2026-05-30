export default {
  id: 'polymer',
  name: {
    ru: 'Полимер',
    en: 'Polymer'
  },
  try: {
    family: 'Polymer-Trial',
    file: ''
  },
  weights: [{
    name: 'normal',
    value: '400'
  }, {
    name: 'text',
    value: '500'
  }, {
    name: 'semibold',
    value: '600'
  }, {
    name: 'bold',
    value: '700'
  }],
  sets: [{
    value: 'salt',
    name: 'Stylistic alternates'
  }, {
    value: 'ss01',
    name: 'Stylistic set #1'
  }, {
    value: 'ss02',
    name: 'Stylistic set #2'
  }, {
    value: 'sinf',
    name: 'Scientific inferiors'
  }],
  price: {
    desktop: 100, // per 1 user
    web: 0.001 // per 10000 views
  },
  teaser: {
    src: 'fonts/polymer/polymer-teaser.png'
  },
  heroImage: {
    src: 'fonts/polymer/polymer-hero.png'
  },
  specimen: {
    href: '/upload/fonts/polymer/polymer-specimen.pdf'
  },
  content: [
    {
      type: 'Grid',
      modifier: 'center',
      items: [{
        type: 'Image',
        src: 'fonts/plastinka/Picture-0.png',
        size: 34,
        orientation: 'vertical',
        ratio: '4:3'
      }, {
        type: 'Image',
        src: 'fonts/plastinka/Picture-1.png',
        size: 34,
        orientation: 'vertical',
        ratio: '4:3'
      }, {
        type: 'Image',
        src: 'fonts/plastinka/Picture-2.png',
        size: 34,
        orientation: 'vertical',
        ratio: '4:3'
      }, {
        type: 'Image',
        src: 'fonts/plastinka/Picture-3.png',
        size: 34,
        orientation: 'vertical',
        ratio: '4:3'
      }, {
        type: 'Image',
        src: 'fonts/plastinka/Picture-4.png',
        size: 34,
        orientation: 'vertical',
        ratio: '4:3'
      }, {
        type: 'Image',
        src: 'fonts/plastinka/Picture-5.png',
        size: 34,
        orientation: 'vertical',
        ratio: '4:3'
      }, {
        type: 'Image',
        src: 'fonts/plastinka/Picture-6.png',
        size: 34,
        orientation: 'vertical',
        ratio: '4:3'
      }]
    }
  ]
};
