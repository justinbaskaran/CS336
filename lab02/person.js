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
Person.prototype.getName = function ()
{
    return this.name;
};
Person.prototype.setName = function (name)
{
    this.name = name;
    return this.name;
};
Person.prototype.getdob = function ()
{
  var today = new Date();
    var birthDate = new Date(this.dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};
Person.prototype.addFriend = function (friend)
{
    this.friends.push(friend);
};
Person.prototype.seeFriends = function ()
{
    if (this.friends.length > 0)
    {
      var str="";
      for(var i=0; i<this.friends.length ; i++){
           str +=  " "+this.friends[i].getName();
        }
    return str;;
    } else {
    return " I don't have any friends! :(";
  }
};
Person.prototype.personGreeting = function ()
{
    return "I am a person";
};


function Student(name,dob,friends,subject) {
    Person.call(this, name,dob,friends);
    this.subject = subject;
}
Student.prototype = Object.create(Person.prototype);
Student.prototype.printGreeting = function() {
    return "I'm a student!";
};
////////////////////////////////////////////////////////////

////////////////////////Tests//////////////////////////////
var p1 = new Person("Abc","2010/01/29",[new Person("sef","2011/03/13",[])]);
var p2 = new Person("Def","2009/03/13",[]);

console.log(p1.personGreeting());


console.log("\nMy name is "+ p1.getName() + ". I am "+ p1.getdob() + " years old."+ " I am friends with... "
            + p1.seeFriends());

console.log("\nChanging Abc's name to PrimeVideo...");
p1.setName("PrimeVideo");

console.log("\nMy name is "+ p1.getName() + ". I am "+ p1.getdob() + " years old."+ " I am friends with... "
            + p1.seeFriends());


console.log("\nPrimeVideo is making friends with Def....");
p1.addFriend(p2);
console.log("\nMy name is "+ p1.getName() + ". I am "+ p1.getdob() + " years old."+ " I am friends with... "
            + p1.seeFriends());

console.log("\nWho is older PrimeVideo or Def? ");

console.log("\nPrimveVideo's age: ",parseInt(p1.getdob()));
console.log("\nDef's age: ", parseInt(p2.getdob()));

console.log("\nIntense math calcuations...");


if (parseInt(p1.getdob()) > parseInt(p2.getdob()))
{
  var dif = parseInt(p2.getdob()) - parseInt(p1.getdob());
  console.log("\nPrimeVideo is older!" + " by " + dif.toString() + " years ");
} else {
    var dif = parseInt(p2.getdob()) - parseInt(p1.getdob());
    console.log("\nDef is older!" + " by " + dif.toString() + " years ");
}

var s1 = new Student("Defversiontwo","2009/03/13",[new Person("sef","2011/03/13","Computer networking")],"Computer Science");
var s2 = new Student("dsdfsdf","1977/03/13",[],"Computer engineering");

console.log("\nIs Defversiontwo a person?");


if (s1 instanceof Person)
{
  console.log("\nYES, Defversiontwo IS A PERSON!");
} else
{
  console.log("\nNO, Defversiontwo IS AN ILLEGAL ALIEN NOT FROM EARTH!");
}

console.log("\nMy name is "+ s1.getName() + ". I am "+ s1.getdob() + " years old."+ " I am friends with... "
            + s1.seeFriends());

console.log("\nChanging Defversiontwo's name to PrimeMusic...");
// addFriend
s1.setName("PrimeMusic");

// seeFriends

console.log("\nMy name is "+ s1.getName() + ". I am "+ s1.getdob() + " years old."+ " I am friends with... "
            + s1.seeFriends());

console.log("\nPrimeMusic is making friends with dsdfsdf....");
s1.addFriend(s2);

console.log("\nMy name is "+ s1.getName() + ". I am "+ s1.getdob() + " years old."+ " I am friends with... "
            + s1.seeFriends());
