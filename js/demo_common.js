function overshoot_smoothstep(min, max, t) {
	var tmp = (t-min) / (max-min);
	return tmp * tmp * tmp * (5.0 - 4.0 * tmp);
}

function smoothstep(min, max, t) {
	var tmp = (t-min) / (max-min);
	return tmp * tmp * (3.0 - 2.0 * tmp);
}

function smootherstep(min, max, t) {
	var tmp = (t-min) / (max-min);
	return tmp * tmp * tmp * (tmp * (tmp * 6.0 - 15.0) + 10.0);
}
