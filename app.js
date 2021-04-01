//Déclaration de variables:
var mesTaches=document.querySelector('.mesTaches');
var addBtn=document.querySelector('.addBtn');
var todoList_ul=document.querySelector('.todoList_ul');

//Appel à la fonction addEventListener
document.addEventListener('DOMContentLoaded', getTodo);
addBtn.addEventListener('click', addTodo); //Le bouton de classe 'addBtn' déclenchera la fonction addTodo() à chaque click.
todoList_ul.addEventListener('click', deleteTodo); //La fonction deleteTodo() s'appliquera aux éléments contenus dans la liste 'todoList_ul' à chaque click.

//Définition des fonctions : addTodo() et deleteTodo()
function addTodo(evt){
	evt.preventDefault();
	//Création de la variable à laquelle on affecte la div contenant toutes les tâches:
	var tachesDiv=document.createElement('div');
	tachesDiv.classList.add('todo');
	//Création de variable à laquelle on affecte la liste des tâches saisies par l'utilisateur:
	var nouvelleTache=document.createElement('li');
	nouvelleTache.innerText=mesTaches.value;
	//Il n'est pas possible de laisser le champ vide. (MERCI BEAUCOUP ça fonctionne !!!!!)
	while(mesTaches.value.trim()===""){
		alert("Vous n'avez pas rempli le champ !");
		nouvelleTache.innerText=mesTaches.value=prompt("Quelle est la tâche à ajouter ?");
	};
	nouvelleTache.classList.add('newTodo');
	tachesDiv.appendChild(nouvelleTache);
	//Ajout de la tâche au localStorage
	saveTodoInLocalStorage(mesTaches.value);
	//Création du bouton de suppression de la tâche:
	const deleteBtn=document.createElement('button');
	deleteBtn.innerHTML='<i class="fas fa-trash"><i>';
	deleteBtn.classList.add('deleteBtn');
	tachesDiv.appendChild(deleteBtn);

	todoList_ul.appendChild(tachesDiv);
	//Vide la zone de saisie de texte après avoir exécuté les instructions précédentes
	mesTaches.value='';
};

function deleteTodo(evt){
	var cible=evt.target;
	if(cible.classList[0]==='deleteBtn'){
		var todo=cible.parentElement;
		todo.classList.add('deleteTransition');
		deleteFromLocalStorage(todo);
		todo.addEventListener('transitionend', ()=>{
			todo.remove();			
		});
		console.log('Tâche supprimée !');
	};
};

//Sauvegarder les tâches ajoutées par l'utilisateur dans le localStorage
function saveTodoInLocalStorage(todo){
	if(typeof localStorage!='undefined' && JSON){
		let todos;
		//Si 'todos' n'existe pas dans le localStorage on crée un nouveau tableau
		if(localStorage.getItem('todos')===null){
			todos=new Array();
		}else{
			todos=JSON.parse(localStorage.getItem('todos'));
		}
		//Dans les deux cas on fini avec un tableau dans lequel on ajoute avec push() notre nouvelle tâche
		todos.push(todo);
		localStorage.setItem('todos',JSON.stringify(todos));
	}else{
		alert('localStorage n\'est pas supporté par votre navigateur.');
	}
}
//Supprimer dans le localStorage
function deleteFromLocalStorage(todo){
	if(typeof localStorage!='undefined' && JSON){
		let todos;
		//Si 'todos' n'existe pas dans le localStorage on crée un nouveau tableau
		if(localStorage.getItem('todos')===null){
			todos=new Array();
		}else{
			todos=JSON.parse(localStorage.getItem('todos'));
		}
		//On récupère le texte du 1er enfant [0] de la div 'todo'
		var todoIndex=todo.children[0].innerText;
		//Suppression dans le tableau 'todos'
		todos.splice(todos.indexOf(todoIndex),1);
		//On actualise le localStorage minus l'élément supprimé
		localStorage.setItem('todos',JSON.stringify(todos));
	}else{
		alert('localStorage n\'est pas supporté par votre navigateur.');
	}
}
//Afficher les tâches du localStorage 
function getTodo(){
	if(typeof localStorage!='undefined'){
		let todos;
		if(localStorage.getItem('todos')===null){
			todos=new Array;
		}else{
			todos=JSON.parse(localStorage.getItem('todos'));
		}
		todos.forEach(function(todo){
			var tachesDiv=document.createElement('div');
			tachesDiv.classList.add('todo');
			
			var nouvelleTache=document.createElement('li');
			nouvelleTache.innerText=todo;
			
			nouvelleTache.classList.add('newTodo');
			tachesDiv.appendChild(nouvelleTache);
			
			const deleteBtn=document.createElement('button');
			deleteBtn.innerHTML='<i class="fas fa-trash"><i>';
			deleteBtn.classList.add('deleteBtn');
			tachesDiv.appendChild(deleteBtn);

			todoList_ul.appendChild(tachesDiv);
		})
	}else{
		alert('localStorage n\'est pas supporté par votre navigateur.');
	}
}