// Justin Baskaran
// Professor:  Dr. Keith Vander Linden
// Class: CS 336
// Date: September 12, 2018

///////////////////Peron Object & Methods //////////////////
function Person(name,dob,friends) {
    this.name = name;
    this.dob = dob;
    this.friends=friends;
}
Person.prototype.setName = function (name)
{
    this.name = name;
    return this.name;
}

Person.prototype.getdob = function ()
{
    return this.dob;
}
Person.prototype.addFriend = function (friend)
{
    this.friends.push(friend);
}
Person.prototype.printPerson = function ()
{
    console.log("I'm a Person!");
}
////////////////////////////////////////////////////////////

////////////////////////Tests//////////////////////////////
var p1 = new Person("Justin","01/01/2018",["friend1","friend2","friend3"]);

console.log(p1.getdob());
