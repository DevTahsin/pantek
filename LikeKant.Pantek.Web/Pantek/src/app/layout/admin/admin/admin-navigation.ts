export const navigation = [
  {
    text: 'Home',
    path: '/admin/',
    icon: 'home'
  },
  {
    text: 'Sayfalar',
    icon: 'file',
    items: [
      {text: 'Anasayfa', path:'/admin/sayfalar/anasayfa'},
      {text: 'Ürunler', path:'/admin/sayfalar/urunler'},
      {text: 'İletişim', path:'/admin/sayfalar/iletisim'},
      {text: 'Haberler', path:'/admin/sayfalar/haberler'},
      {text: 'Hakkımızda', path:'/admin/sayfalar/hakkimizda'}
    ]
  },
  {
    text: 'Ayarlar',
    icon: 'preferences',
    items: [
      {text: 'Çoklu Dil', path:'/admin/ayarlar/coklu-dil'},
      {text: 'Genel Ayarlar', path:'/admin/ayarlar/genel-ayarlar'}
    ]
  },
  {
    text: 'Loglar',
    path: '/admin/log-view',
    icon: 'warning'
  }
];
