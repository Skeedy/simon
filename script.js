var go = document.getElementById('start');
var red= document.getElementById('rouge');
var blue = document.getElementById('bleu');
var yellow= document.getElementById('jaune');
var green= document.getElementById('vert');
var touches = document.getElementsByClassName('couleur');
var test= {1: vert, 2 : rouge, 3 : jaune, 4 : bleu}
var sonUn = new Audio ("sounds/son1.mp3");
var sonDeux = new Audio ("sounds/son2.mp3");
var sonTrois =new Audio("sounds/son3.mp3");
var sonQuatre = new Audio("sounds/son4.mp3")
var countdown = document.getElementById('countdown');
var randomTab = [];
var playerTab =[];
var compte = 0;
var count = null;
var manche = document.getElementById('manche')
var round=0;

go.onclick = start;

function start(){
	compte = 0;
	for(let j = 0; j< touches.length; j++){
		touches[j].style.pointerEvents = "none";
		}
	go.disabled = true;
	setRandom(randomTab);
	launchTimer(randomTab);
}

green.onmousedown = function(){
	sonUn.play()
	test[1].src = './images/l_green.png';
	}

green.onmouseup = function(){
	playerTab.push(1);
	compare(randomTab, playerTab);
	test[1].src = './images/green.png';
	return playerTab
}
red.onmousedown = function(){
	sonDeux.play()
	test[2].src = './images/l_red.png';
}
red.onmouseup = function(){
	playerTab.push(2);
	compare(randomTab, playerTab);
	test[2].src = './images/red.png';

	return playerTab}

yellow.onmousedown = function(){
	sonTrois.play();
	test[3].src = './images/l_yellow.png';
}
yellow.onmouseup = function(){
	playerTab.push(3);
	compare(randomTab, playerTab);
	test[3].src = './images/yellow.png';

	return playerTab
}

blue.onmousedown = function(){
	sonQuatre.play();
	test[4].src = './images/l_blue.png';
}
blue.onmouseup = function(){
	playerTab.push(4);
	compare(randomTab, playerTab)
	test[4].src = './images/blue.png';

	return playerTab
}
function setRandom(tab){
	var random = Math.ceil(Math.random()*4);
	tab.push(random);
	return tab;

}
var i = 0;

function launchTimer(tab){
	countdown.innerHTML = "Ready ?!"
	i=0;
	compte = 0;
	playerTab =[];
	var timer = setInterval(function(){
		var index = tab[i];
		changeImg(tab, index)
		++i;
		if (i == tab.length){
			countdown.innerHTML = "A vous !"
			for(let j = 0; j< touches.length; j++){
				touches[j].style.pointerEvents = "";
				touches[j].setAttribute('style','pointer-events : auto;' )
			}
			clearInterval(timer)
			var time = Math.ceil(tab.length*1.5);
			count = setInterval(function(){
				countdown.innerHTML = time;
				time--;
				if (time == -1){
					countdown.innerHTML = "Time Up!"
					clearInterval(count)
					createLayer()
				}
			},1000);;
	for(let j = 0; j< touches.length; j++){
		touches[j].disabled = false;
			}
		 }
	},600);
	
}

function changeImg(tab, index){
	if (index == 1){
		test[index].src = './images/l_green.png';
		sonUn.play()
		setTimeout(function(){
		test[index].src = './images/green.png';
	},500);
	}
	if (index == 2){
		test[index].src = './images/l_red.png';
		sonDeux.play()
		setTimeout(function(){
		test[index].src = './images/red.png';
	},500);
	}
	if (index == 3){
		test[index].src = './images/l_yellow.png';
		sonTrois.play();
		setTimeout(function(){
		test[index].src = './images/yellow.png';
	},500);
	}
	if (index == 4){
		test[index].src = './images/l_blue.png';
		sonQuatre.play();
		setTimeout(function(){
		test[index].src = './images/blue.png';
	},500);
	}

}

function compare(tabC, tabP){
	if(tabC[compte] != tabP[compte]){
		countdown.innerHTML= "Perdu"
		for(let j = 0; j< touches.length; j++){
		touches[j].style.pointerEvents = "none";
		}
		clearInterval(count)
		createLayer()
		
	}
	if (tabP.length == tabC.length && tabC[compte] == tabP[compte]){
		setTimeout(start(), 2000)	
		countdown.innerHTML= "Gagné !";
		manche.innerHTML = ++round;
		clearInterval(count)
	}
	else {compte++;
	}
		
}

function createLayer(){
	var div = document.createElement('div');
	document.body.appendChild(div);
	div.innerHTML="Perdu ! retentez votre chance !";
	div.setAttribute('style','position : absolute; top: 22vh; left: 35vw; width: 10vw; height: 10vh; background: grey; display: flex; justify-content: space-around; align-items: center; flex-direction: column;');
	var btn = document.createElement('btn');
	div.appendChild(btn);
	btn.setAttribute('style','border: solid; background: white; cursor: pointer;');
	btn.innerHTML= "Recommencer ?";
	btn.onclick = function(){
		div.remove();
		go.disabled = false;
		round = 0
		manche.innerHTML = round;
	}
	randomTab =[];
}
