const { Router } = require("express");

const router = Router();

router.get("", (req, res) => {
	const { miles,sortBy } = req.query;
	const parsedMiles = parseInt(miles);
	if (!isNaN(parsedMiles)) {
		const filteredStore = supermarkets.filter(
			(store) => store.miles <= parsedMiles
        );
        
		res.send(filteredStore);
	} else res.send(supermarkets);
});

const supermarkets = [
	{
		id: 1,
		store: "Whole foods",
		miles: 0.6,
	},
	{
		id: 2,
		store: "Trader Joes",
		miles: 2.5,
	},
	{
		id: 3,
		store: "Albertsons",
		miles: 1.6,
	},
	{
		id: 4,
		store: "Whole foods",
		miles: 0.75,
	},
	{
		id: 5,
		store: "Trader Joes",
		miles: 4.5,
	},
	{
		id: 6,
		store: "Albertsons",
		miles: 2.2,
	},
];
module.exports = router;
