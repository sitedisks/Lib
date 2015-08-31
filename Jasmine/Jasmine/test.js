describe("Hello world", function() {
	it("says hello", function() {
		expect(helloWorld()).toEqual("Hello world!");
	});
});

// describe("canBeAny", function(){}); -- suite
describe("sorting the list of users", function(){
	// individual tests go here
	it("sorts in descending order by default", function(){
		// your test assertion goes here
		var users = ['jack', 'igor', 'jeff'];
		var sorted = sortUsers(users);  // here you test your function of sortUsers() 
		expect(sorted).toEqual(['jeff', 'igor', 'jack']);
	});
});

//To use Jasmine with Karma - Karma-jasmine - the test runner