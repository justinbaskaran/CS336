// Justin Baskaran
//Professor:  Dr. Keith Vander Linden
// Class: CS 336
// Date: September 12, 2018

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

}
Person.prototype.printPerson = function ()
{
    console.log("I'm a Person!");
}
