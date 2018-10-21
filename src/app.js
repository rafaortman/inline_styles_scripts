//deletando um item de uma lista
	var list = document.querySelector('#lista');
	list.addEventListener('click',function (e) {
		if(e.target.className == 'delete') {
			e.preventDefault();
			var li = e.target.parentElement; 
			this.removeChild(li);
		}
	});

	var todo = document.forms['ToDo'];

//inserindo um novo item em uma lista
	todo.addEventListener('submit',function(e){
		e.preventDefault();
		var texto = todo.querySelector('input[name="texto"]').value;
		var link = todo.querySelector('input[name="link"]').value;
		var sufixo = todo.querySelector('select').value;
		var li = document.createElement('li')
		var a = document.createElement('a');
		var x = document.createElement('button');

		x.textContent = 'x';
		a.textContent = texto;
		a.setAttribute('href', 'http://' + link + sufixo);
		x.classList.add('delete');
		
		li.appendChild(a);
		li.appendChild(x);
		list.appendChild(li);

		todo.reset();
	});

//show/hide content
	var hide = document.querySelector('#hide');

	hide.addEventListener('change', function(e){
		if (hide.checked) {
			list.style.display = "none";
		} else {
			list.style.display = "initial";
		}
	})

//filtrando conteúdo
	var searchBar = document.forms['filter'].querySelector('input')
	searchBar.addEventListener('keyup',function(e){
		var term = e.target.value.toLowerCase();
		var sites = list.getElementsByTagName('li');
		Array.from(sites).forEach(function(site) {
			var siteName = site.firstElementChild.textContent;
			if(siteName.toLowerCase().indexOf(term) != -1) {
				site.style.display = 'block';
			} else {
				site.style.display = 'none';
			}
		});
	});

//toggle class
var menu = document.querySelector('.menu');
var paineis = document.querySelectorAll('.painel');
var menuItens = document.querySelectorAll('.menu li');

menu.addEventListener('click', function(e) {
	if (e.target.tagName == 'LI') {
		var targetPainel = document.querySelector(e.target.dataset.target);
		console.log(e.target);
		paineis.forEach( function(painel) {
			if (targetPainel == painel) {
				painel.classList.add('ativo');
			} else {
				painel.classList.remove('ativo');
			}
		});
		menuItens.forEach( function(menuItem) {
			if (e.target == menuItem) {
				menuItem.classList.add('ativo');
			} else {
				menuItem.classList.remove('ativo');
			}
		});
	}
})