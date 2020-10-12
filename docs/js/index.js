


function init_index() {
	var projects = {
		studio: {
			count: 2,
			descrip: "Work from in-class studio time"
		},
		project: {
			count: 1,
			descrip: "Practicing and applying concepts in creative ways"
		}
		// sketch: {
		// 	count: 0,
		// 	descrip: "Daily inspirations andd prevention from rustiness",
		// 	alt_names: ["10/12/20"]
		// }
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

	function create_card(type, proj_num) {
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
		h2.innerHTML = `${type} ${proj_num}`;

		info.appendChild(h2);
		link.appendChild(img);
		link.appendChild(info);
		card.appendChild(link);

		return card;
	}

	function populate_columns(columns, type, proj_count) {
		for(let i = 0; i < proj_count; i++) {
			let card = create_card(type, i + 1);
			let idx = i % columns.length;
			columns[idx].appendChild(card);
			console.log(idx);
		}
	}

	function create_showcase(col_count, type, type_data) {
		let container = document.getElementById(type);
		let proj_count = type_data.count;
		let type_descrip = type_data.descrip;
		let title = create_title(type, type_descrip);
		let columns = create_columns(col_count, type);
		populate_columns(columns, type, proj_count);

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
