// 文章数据
const articles = [
    {
        title: "Git 与 SSH 密钥配置踩坑记录",
        date: "2026-10-14",
        desc: "SSH连接Github常见报错，命令空格、私钥找不到、域名解析失败等问题完整排查方案。",
        link: "#"
    },
    {
        title: "HTML+CSS 静态博客页面搭建",
        date: "2026-10-10",
        desc: "原生前端三分离结构，响应式布局，暗黑模式，适合新手学习静态页面开发。",
        link: "#"
    },
    {
        title: "PowerShell 常用命令笔记",
        date: "2026-10-05",
        desc: "Windows终端ssh、文件操作、服务管理等常用命令整理，开发必备。",
        link: "#"
    }
];

// 渲染文章列表
const articleListDom = document.getElementById('articleList');
articles.forEach(item => {
    const card = document.createElement('div');
    card.className = "article-card";
    card.innerHTML = `
        <h3>${item.title}</h3>
        <div class="meta">📅 ${item.date}</div>
        <p>${item.desc}</p>
        <a href="${item.link}">阅读全文 →</a>
    `;
    articleListDom.appendChild(card);
});

// 暗黑模式切换
const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    if(document.body.classList.contains('dark')){
        themeBtn.textContent = "☀️";
    }else{
        themeBtn.textContent = "🌙";
    }
});

// 回到顶部
const backTopBtn = document.getElementById('backTop');
window.addEventListener('scroll', ()=>{
    if(window.scrollY > 200){
        backTopBtn.classList.add('show');
    }else{
        backTopBtn.classList.remove('show');
    }
})
backTopBtn.addEventListener('click', ()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
});

// 平滑滚动（导航锚点）
document.querySelectorAll('.nav-menu a').forEach(anchor=>{
    anchor.addEventListener('click', function(e){
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetEl = document.querySelector(targetId);
        targetEl.scrollIntoView({behavior:"smooth"});
    })
})
