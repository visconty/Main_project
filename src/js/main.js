$(document).ready(function() {
    $('#fullpage').fullpage({
        anchors: ['Home1', 'Services1', 'About1', 'Work1', 'Contacs1'],
        menu: '#menu',
        responsiveWidth:1200
    });
    const btn = document.querySelector('.btn-nav');
		const holder = document.body;

		btn.addEventListener('click', (e)=>{
			e.preventDefault();
			holder.classList.toggle('nav-active');
		});
});