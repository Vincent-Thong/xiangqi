class CommonHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="topnav">
        <a href="https://xiangqi.xyz/index.html">首页</a>
        <div class="dropdown">
          <button class="dropbtn" onclick="myFunction()">赛事报道
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content" id="myDropdown">
            <a href="https://xiangqi.xyz/赛事/2025/qiyoubei2025.html">棋友杯2025</a>
          </div>
        </div>
        <a href="https://xiangqi.xyz/tournament.html">近期赛事</a>
        <a href="https://xiangqi.xyz/ranking.html">麒麟榜</a>
        <a href="https://xiangqi.xyz/livestream.html">直播室</a>
        <a href="https://xiangqi.xyz/merchant.html">商品</a>
        <a href="https://xiangqi.xyz/contact.html">联络我们</a>
        <a href="https://xiangqi.xyz/about.html">关于我们</a>
      </div>
    `
  }
}

customElements.define('common-header', CommonHeader)

// dynamically highlight the active page (change the style of the nav link for the current page)
function setActivePage() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('common-header div a');
  console.log(currentPage)  // for debugging purpose

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    _linkPage = linkPage.split('/').pop()
    console.log(_linkPage + " compared with " + currentPage)  // for debugging purpose
    if (_linkPage === currentPage) {
      link.classList.add('active');
      console.log(_linkPage + " matches " + currentPage)  // for debugging purpose
    }
  });
}

// Call the function when the page loads
setActivePage();
