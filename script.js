// script.js

// カスタムカーソルの動作
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});

// セクションごとに設定する背景色
const sectionColors = {
  about: '#FFFFF0',   // アイボリー
  menu: '#FFF8E7',    // やや暖かみのあるアイボリー
  access: '#FFF4DC',  // 明るいベージュ
  contact: '#FFF0D1'  // ソフトなアイボリー
};

const backgroundOverlay = document.querySelector('.background-overlay');

// IntersectionObserver によるセクションの監視とテキストアニメーション
const sections = document.querySelectorAll('.section');

const options = {
  threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 対応する背景色に変更
      const sectionId = entry.target.id;
      if (sectionColors[sectionId]) {
        backgroundOverlay.style.backgroundColor = sectionColors[sectionId];
      }
      // セクション内の .animate 要素に順次 visible クラスを付与して動きを出す
      const animates = entry.target.querySelectorAll('.animate');
      animates.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('visible');
        }, index * 200); // 200ms ずつずらして表示
      });
    } else {
      // セクションが視界から外れた際に visible クラスを除去（再度スクロールした際にアニメーション）
      const animates = entry.target.querySelectorAll('.animate');
      animates.forEach(el => {
        el.classList.remove('visible');
      });
    }
  });
}, options);

// 各セクションを監視対象に追加
sections.forEach(section => {
  observer.observe(section);
});
