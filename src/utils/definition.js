let typesObject = {
	"text":[
		"advt",
		"name"
	],
	"items":[
		"products",
		"images"
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
			images: []
		}
	},

	shop: {
		change: {
			name: "",
			advt: "",
			products: []
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
	}
}

export default {

	types: types(),
	actions


}

