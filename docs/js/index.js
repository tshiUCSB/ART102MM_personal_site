


function init_index() {
	var projects = {
		studio: {
			count: 3,
			descrip: "Work from in-class studio time"
		},
		project: {
			count: 1,
			descrip: "Practicing and applying concepts in creative ways"
		},
		writing: {
			count: 1,
			descrip: "Reflection on readings with an emphasis on form"
		},
		sketch: {
			count: 2,
			descrip: "Daily inspirations and prevention from rustiness",
			alt_names: ["10/13/20", "10/15/20"]
		}
	};

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

	function create_card(type, proj_num, alt_name=null) {
		let proj = `${type}/${type}_${proj_num}`;
		let card = document.createElement('div');
		card.setAttribute("class", "showcase-card hover-expand active-shrink pos-rel");
		let link = document.createElement('a');
		link.setAttribute("href", `html/${proj}.html`);
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

	function populate_columns(columns, type, proj_count, alt_names=null) {
		for(let i = 0; i < proj_count; i++) {
			let card = null;
			if (alt_names) {
				card = create_card(type, i + 1, alt_names[i]);
			}
			else {
				card = create_card(type, i + 1);
			}
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
		if ("alt_names" in type_data) {
			populate_columns(columns, type, proj_count, type_data.alt_names);
		}
		else {
			populate_columns(columns, type, proj_count);
		}

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

	generate_projects();

}

window.addEventListener('load', function() {
	init_index();
});
