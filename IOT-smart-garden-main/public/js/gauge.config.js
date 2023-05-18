const CONFIG_GAUGE_DEFAULT = (max) => ([
	{
		level: max,
		color: "#CF0A0A"
	},
	{
		level: 0.75 * max,
		color: "#FF6D28"
	},
	{
		level: 0.5 * max,
		color: "#FFB200"
	},
	{
		level: 0.25 * max,
		color: "#3CCF4E"
	}
]);

export default CONFIG_GAUGE_DEFAULT;