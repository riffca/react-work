let typesObject = {
	"text":[
		"advt",
		"name",
		"decription",
	],
	"items":[
		"products",
		"images",
		"tags"
	]
}

const types = ()=>{
	let types = {}
	for ( let key in typesObject ) {
		typesObject[key].forEach(i=>{
			types[i]=key
		})
	}
	return types
}

const actions = {
	product: {
		change: {
			title: "",
			description: "",
			images: [],
			tags: [],
		}
	},

	shop: {
		change: {
			name: "",
			advt: "",
			products: [],
			images: [],
		}
	},

	auth: {
		login: {
			username: "",
			password: "",
		},
		signup: {
			username: "",
			email: "",
			password: ""
		}
	},
	tag: {
		create: {
			name: ""
		},
		get: {
			name: "",
			tag: 0
		}
	},

	delete: {
		what: {
			shop: 0,
			user: 0,
			product: 0,
			tag: 0
		}
	}

}

export default {

	types: types(),
	actions


}


