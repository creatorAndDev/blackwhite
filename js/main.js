//functions
function hamburger(){
	// lockScroll();
	const actions = document.querySelectorAll('[data-hamburger]'),
	menu = document.querySelectorAll('[data-hamburger-menu]');
	
	if (actions.length) {
		actions.forEach(action => {
			action.addEventListener('click', function() {
				toggleActiveStateForAll();
			});
		});

		document.addEventListener('click', function(event) {
			if (!event.target.closest('.hold') && !event.target.closest('[data-hamburger]')) {
				setActiveStateForAll(false);
				isAnyActionClicked = true;
				// unlockScroll();
			}
		});
	}

	function toggleActiveStateForAll() {
		const body = document.querySelector('body');
		
		actions.forEach(action => {
			const currentState = action.getAttribute('data-hamburger') === 'true';
			
			action.setAttribute('data-hamburger', !currentState);
			
			if(!currentState){
				// lockScroll();
				body.classList.add('open');
			} else {
				// unlockScroll();
				body.classList.remove('open');
			}

			if (msnry) {
				setTimeout(() => {
					msnry.layout();
				}, 300);
			}
		});
		menu.forEach(item => {
			const currentState = item.getAttribute('data-hamburger-menu') === 'true';
			
			item.setAttribute('data-hamburger-menu', !currentState);
		});
	}

	function setActiveStateForAll(state) {
		const body = document.querySelector('body');

		actions.forEach(action => {
			action.setAttribute('data-hamburger', state);
		});
		menu.forEach(item => {
			item.setAttribute('data-hamburger-menu', state);
		});

		if (state === 'true') {
			body.classList.add('open');
		} else {
			body.classList.remove('open');
		}

		if (msnry) {
			setTimeout(() => {
				msnry.layout();
			}, 300);
		}
	}
}

function searchMobile(){
	const actions = document.querySelectorAll('[data-search-button]'),
	blocks = document.querySelectorAll('[data-search-visible]'),
	divs = document.querySelectorAll('[data-autocomplete]');
	
	if (actions.length) {
		actions.forEach(action => {
			action.addEventListener('click', function() {
				toggleActiveStateForAll();
			});
		})
	}

	function toggleActiveStateForAll() {
		actions.forEach(action => {
			const currentState = action.getAttribute('data-search-button') === 'true';
			action.setAttribute('data-search-button', !currentState);
		});

		blocks.forEach(block => {
			const currentState = block.getAttribute('data-search-visible') === 'true';
			block.setAttribute('data-search-visible', !currentState);
		});

		divs.forEach(div => {
			div.innerHTML = "";

			div.setAttribute('data-autocomplete', false);
		});
	}
}

function postComment(){
	document.querySelectorAll('[data-action-comment]').forEach(function(button) {
		button.addEventListener('click', function() {
			let parentContainer = this.closest('[data-attr-post]');
			
			if (parentContainer) {
				let comment = parentContainer.querySelector('[data-comment-visibility]');
				
				if (this.getAttribute('data-action-comment') === 'true') {
					this.setAttribute('data-action-comment', 'false');
					comment.setAttribute('data-comment-visibility', 'false');
				} else {
					this.setAttribute('data-action-comment', 'true');
					comment.setAttribute('data-comment-visibility', 'true');
				}
			}
		});
	});
}

function postFav(){
	document.querySelectorAll('[data-action-fav]').forEach(function(button) {
		button.addEventListener('click', function() {
			let parentContainer = this.closest('[data-attr-post]');
			
			if (parentContainer) {
				if (this.getAttribute('data-action-fav') === 'true') {
					this.setAttribute('data-action-fav', 'false');
				} else {
					this.setAttribute('data-action-fav', 'true');
				}
			}
		});
	});
}

function postRemove(){
	document.querySelectorAll('[data-remove]').forEach(function(button) {
		button.addEventListener('click', function() {
			this.closest(".notify").remove();
		});
	});
}

function filterAutocomplete() {
	const items = [
		{
			text: 'Anthony' 
		},
		{
			text: 'Mark'
		},
		{
			text: 'Donald'
		},
		{
			text: 'Robert'
		},
		{
			text: 'Scott'
		},
		{
			text: 'Frank'
		}
	];

	const input = document.getElementById("search"),
		filter = input.value.toUpperCase(),
		divs = document.querySelectorAll('[data-autocomplete]');

	divs.forEach(div => div.innerHTML = "");

	let found = false;

	if (!filter) {
		divs.forEach(div => {
			div.innerHTML = "";
			div.setAttribute('data-autocomplete', false);
		});
		return false;
	}

	for (let i = 0; i < items.length; i++) {
		if (items[i].text.toUpperCase().includes(filter)) {

			const itemDiv = document.createElement("div"),
			wrapText = document.createElement("div");

			itemDiv.className = "item";
			wrapText.className = "wrapped";

			const uriSVG = "http://www.w3.org/2000/svg",
			uriXlink = "http://www.w3.org/1999/xlink";

			const svgElement = document.createElementNS(uriSVG, "svg");
			svgElement.setAttribute("class", "svg_icon");
			
			const useElement = document.createElementNS(uriSVG, "use");
			useElement.setAttributeNS(uriXlink, "xlink:href", "#icon-search");
			svgElement.appendChild(useElement);

			itemDiv.appendChild(svgElement);
			itemDiv.appendChild(wrapText);

			const parts = items[i].text.split(new RegExp(`(${filter})`, 'i'));
			for (const part of parts) {
				if (part.toUpperCase() === filter) {
					const highlightSpan = document.createElement("span");
					highlightSpan.className = "highlight";
					highlightSpan.textContent = part;
					wrapText.appendChild(highlightSpan);
					found = false;
				} else {
					wrapText.appendChild(document.createTextNode(part));
					found = true;
				}
			}

			divs.forEach(div => {
				const clonedItemDiv = itemDiv.cloneNode(true);

				clonedItemDiv.addEventListener('click', function() {
					input.value = items[i].text;
					divs.forEach(innerDiv => innerDiv.innerHTML = "");

					divs.forEach(div => {
						div.innerHTML = "";
						div.setAttribute('data-autocomplete', false);
					});
				});

				div.appendChild(clonedItemDiv);
			});
		}
	}

	divs.forEach(div => div.setAttribute('data-autocomplete', found));
}

function gallery(){
	new Swiper(".gallery", {
		autoHeight: true,
		effect: 'fade',
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
}

let msnry;
function massonryGrid() {
    var grid = document.querySelector('.grid');

    if(grid){
		imagesLoaded(grid, function() {
			msnry = new Masonry(grid, {
				itemSelector: '.grid-item',
				columnWidth: '.grid-item',
				percentPosition: true,
			});
			// console.log("Masonry initialized:", msnry);
		});
	}
}

function selectMessage() {
	let items = document.querySelectorAll('[data-action-message]');

	items.forEach(function(item) {
		item.addEventListener('click', function() {
			items.forEach(function(innerItem) {
				innerItem.classList.remove('selected');
			});

			this.classList.add('selected');

			let parentChatSection = this.closest('.chat_section');
			if (this.classList.contains('selected')) {
				parentChatSection.classList.add('visible');
			} else {
				parentChatSection.classList.remove('visible');
			}
		});
	});
}

function closeMessage() {
	let btn = document.querySelector('[data-action-close]'),
		items = document.querySelectorAll('[data-action-message]'),
		chats = document.querySelectorAll('.chat_section');

	if(btn){
		btn.addEventListener('click', function() {
			chats.forEach(function(chat) {
				chat.classList.remove('visible');
			});
	
			items.forEach(function(item) {
				item.classList.remove('selected');
			});
		});
	}
}

function modalAuth(){
	const buttons = document.querySelectorAll('[data-modal]'),
    modals = document.querySelectorAll('.modal'),
    closeButtons = document.querySelectorAll('[data-close=true]');

    buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
			e.preventDefault();

            const modalId = this.getAttribute('data-modal') + 'Modal';
            document.getElementById(modalId).classList.add('show');
        });
    });

    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            modals.forEach(function(modal) {
                modal.classList.remove('show');
            });
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            modals.forEach(function(modal) {
                modal.classList.remove('show');
            });
        }
    });
}

function tabs() {
	document.querySelectorAll('.tabs_panel a').forEach(function(tabLink) {
		tabLink.addEventListener('click', function(event) {
			event.preventDefault();
	
			var linkId = this.getAttribute('href');
	
			this.closest('.item').parentNode.querySelectorAll('.item').forEach(function(sibling) {
				sibling.classList.remove('active');
			});
	
			this.closest('.item').classList.add('active');
	
			document.querySelectorAll('.tabs_content').forEach(function(drop) {
				drop.classList.remove('selected');
			});

			document.querySelector(linkId).classList.add('selected');
		});
	});	
}

//calls
hamburger();
searchMobile();
postComment();
postFav();
postRemove();
gallery();
massonryGrid();
tabs();
selectMessage();
closeMessage();
modalAuth();