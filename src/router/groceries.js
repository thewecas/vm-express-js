const { Router } = require("express");

const router = Router();

router.get("/", (req, res, next) => {
	res.send(groceriesList);
});

router.post("/", (req, res) => {
	groceriesList.push(req.body);

	res.sendStatus(201);
});

router.get("/cart", (req, res) => {
	const { cart } = req.session;
	if (!cart) {
		res.send("You have no cart items");
	} else {
		res.send(cart.items);
	}
});

router.post("/cart/item", (req, res) => {
	const { item, quantity } = req.body;
	const cartItem = { item, quantity };
	const { cart } = req.session;
	if (cart) {
		req.session.cart.items.push(cartItem);
	} else {
		req.session.cart = {
			items: [cartItem],
		};
	}
	res.status(201).send(req.session);
});

router.get("/:item", (req, res) => {
	const { item } = req.params;
	const groceryItem = groceriesList.find((ele) => ele.item === item);
	res.send(groceryItem);
});

const groceriesList = [
	{
		item: "milk",
		quantity: 2,
	},
	{
		item: "cereal",
		quantity: 4,
	},
	{
		item: "egg",
		quantity: 10,
	},
	{
		item: "pen",
		quantity: 5,
	},
];

module.exports = router;
