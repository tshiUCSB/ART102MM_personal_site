


function init_index() {
	var projects = {
		studio: {
			count: 9,
			descrip: "Work from in-class studio time"
			// alt_links: {'8': "app/studio_9/public/studio_9.html"}
		},
		project: {
			count: 3,
			descrip: "Practicing and applying concepts in creative ways"
		},
		writing: {
			count: 2,
			descrip: "Reflection on readings with an emphasis on form"
		},
		sketch: {
			count: 2,
			descrip: "Daily inspirations and prevention from rustiness",
			alt_names: ["10/13/20", "10/15/20"]
		},
		final: {
			count: 1,
			descrip: "Final project to conclude the class",
			alt_names: ["Final Proposal"]
		}
	};

	var navigation_items = [["about", "About"], ["quote", "Quote"], 
		["artist-rec", "Artist Highlight"], ["gesture", "Website Recommendation"],
		["studio", "Studio"], ["project", "Project"], ["writing", "Writing"],
		["sketch", "Sketch"], [null, "GitHub"]];

	var NAV_ICON = document.getElementById("nav-icon");
	var NAV_ICON_BARS = document.getElementsByClassName("nav-icon-bar");
	var NAVIGATION = document.getElementById("navigation");

	function create_nav_item(nav_data) {
		let link = document.createElement('a');
		if (nav_data[0] == null && nav_data[1] == "GitHub") {
			link.setAttribute("href", "https://github.com/tshiUCSB/ART102MM_personal_site");
		}
		else {
			link.setAttribute("href", `#${nav_data[0]}`);
		}
		let nav_item = document.createElement('div');
		nav_item.setAttribute("class", "nav-item active-shrink");
		nav_item.innerHTML = nav_data[1];
		link.appendChild(nav_item);
		return link;
	}

	function populate_navigation(container, nav_items) {
		for(let i = 0; i < nav_items.length; i++) {
			let nav_item = create_nav_item(nav_items[i]);
			container.appendChild(nav_item);
		}
	}

	function create_title(type, descrip) {
		let title = document.createElement('div');
		title.setAttribute("class", "grid-item showcase-title");
		title.setAttribute("id", `${type}-title`);
		let h1 = document.createElement('h1');
		h1.innerHTML = type.charAt(0).toUpperCase() + type.substr(1);
		let p = document.createElement('p');
		p.setAttribute("class", "highlight");
		p.innerHTML = descrip;

		title.appendChild(h1);
		title.appendChild(p);

		return title;
	}

	function create_columns(col_count, type) {
		let columns = [];
		for(let i = 0; i < col_count; i++) {
			let col = document.createElement('div');
			col.setAttribute("class", "showcase-column grid-item");
			col.setAttribute("id", `${type}-col-${i + 1}`);
			columns.push(col);
		}
		return columns;
	}

	function create_card(type, proj_num, alt_name=undefined, alt_link=undefined) {
		let proj = `${type}/${type}_${proj_num}`;
		let card = document.createElement('div');
		card.setAttribute("class", "showcase-card hover-expand active-shrink pos-rel");
		let link = document.createElement('a');
		if (alt_link) {
			link.setAttribute("href", alt_link);
		}
		else {
			link.setAttribute("href", `html/${proj}.html`);
		}
		let img = document.createElement('img');
		img.setAttribute("src", `assets/thumbnails/${proj}.png`);
		img.setAttribute("class", "showcase-card-thumbnail");
		let info = document.createElement('div');
		info.setAttribute("class", "showcase-card-info pos-abs");
		let h2 = document.createElement('h2');
		h2.setAttribute("class", "abs-pos");
		if (alt_name) {
			h2.innerHTML = alt_name;
		}
		else {
			h2.innerHTML = `${type} ${proj_num}`;
		}

		info.appendChild(h2);
		link.appendChild(img);
		link.appendChild(info);
		card.appendChild(link);

		return card;
	}

	function populate_columns(columns, type, proj_count, alt_names=undefined, alt_links=undefined) {
		for(let i = 0; i < proj_count; i++) {
			let card = null;
			let alt_name = undefined;
			let alt_link = undefined;
			if (alt_names) {
				alt_name = alt_names[i];
			}
			if (alt_links && i in alt_links) {
				alt_link = alt_links[i];
			}
			card = create_card(type, i + 1, alt_name, alt_link);
			let idx = i % columns.length;
			columns[idx].appendChild(card);
		}
	}

	function create_showcase(col_count, type, type_data) {
		let container = document.getElementById(type);
		let proj_count = type_data.count;
		let type_descrip = type_data.descrip;
		let title = create_title(type, type_descrip);
		let columns = create_columns(col_count, type);
		let alt_names = undefined;
		let alt_links = undefined;
		if ("alt_names" in type_data) {
			alt_names = type_data.alt_names;
		}
		if ("alt_links" in type_data) {
			alt_links = type_data.alt_links;
		}
		populate_columns(columns, type, proj_count, alt_names, alt_links);

		container.appendChild(title);
		for(let i = 0; i < columns.length; i++) {
			container.appendChild(columns[i]);
		}

		container.setAttribute("class", `display-grid showcase`);
		container.style.gridTemplateColumns = `repeat(${col_count + 1}, 1fr)`;
	}

	function generate_projects() {
		for(const key in projects) {
			create_showcase(3, key, projects[key]);
		}
	}

	NAV_ICON.addEventListener('click', function() {
		if (NAVIGATION.style.display != "none") {
			NAVIGATION.style.display = "none";
		}
		else {
			NAVIGATION.style.display = "initial";
			for(let i = 0; i < NAV_ICON_BARS.length; i++) {
				NAV_ICON_BARS[i].setAttribute("class", NAV_ICON_BARS[i].getAttribute("class") + " nav-icon-anim");
			}
		}
	})

	generate_projects();
	NAVIGATION.style.display = "none";
	populate_navigation(NAVIGATION, navigation_items);

}

window.addEventListener('load', function() {
	init_index();
});
