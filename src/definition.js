export default {


	"account-receive": {

		req: {
			username: "riffca",
			balance: 10,
			//or
			id: 1
		},
		
		res: {
			username: "riffca",
			products: [],
			basket: {items: []}
		}

	},

	"account-edit": {
		req: {
			id: 1,
			//or
			username: "riffca",
			balance: 99999,
			products: [
				{
					id: 1
					articule: "1qrrgd", 
					model:"one", 
					name: "some tickets",
					description: "some text",
					title: "move your share",
				}
			]

		}

	},

	"product-edit": {
		req: {
			id: 1,
			//or
			title: "one",
			description: "one is the best",
			image: ""
		},

	},

	"product-edit": {


	}

	"product-fetch": {
		req: {
			id: 1
			//or
			auth: true,
			//or
			all: false,
			//or
			user: nul
		},
	},

	"shop-get": {
		req: {

		}
	},

	"shop-manage": {
		req: {
			id: null
			//or
		}
	}

}