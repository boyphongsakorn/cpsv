export const actions = {
	default: async (event) => {
		console.log('Rollback page');
		console.log(event);
		const test = await event.request.formData();
		const username = test.get('player-name');
		console.log(username);
	}
};
