# vanilla-JS-Essentials
a set of essential shorthand prototypes, functions and vars for large Vanilla JS (libs/packages/frameworks) development.

# # Contents:

1- wndw=window and w=wndw

2- doc=document

3- debg=console.log

4- info=console.info

5- warn=console.warn

6- err=console.error

7- lS=localStorage

8- mean_val(a,b): get the mean value between 2 given values

9- toggleAtt(el,a): toggle the given attribute of given element/object, if the attribute exists 

10- rmAtt(el,a): remove the given attribute of the given element/objec

11- addAtt(el,a,v): add attribute with value to a given element/objec

12- on(el,evt,fn): addEventListener to given element/object, if the object is not passed, the "window" object will be considered.

13- createEl(t): createElement("tagName") creates an Element with given tagName

14- setAtt(el,a,v): sets given attribute with its value for the given element

15- findEl(el,s): finds specific single Element using querySelector("css selector")

16- findEls(el,s): finds specific multiple Elements using querySelectorAll("css selectors")

17- updateAtts(el,nAtts): updates existing attributes of given element, the new attributes should be passed as an object of (key:value) pairs.

18- hasAtt(el,a): checks if the given element has given attribute.

19- att(el,a): gets the value of the given attribute of the given element

20- capitalize(): capitalizes the string instance (i.e: "welcome home".capitalize() will output "Welcome Home")

21-  format(): similar to the python string.format(), applied to the string instance, Replaces placeholders like {0}, {1}, etc., with corresponding arguments, and escapes curly braces using {{ and }}, (i.e: "welcome home {0}, you are {1}.".format(username, "amazing") will output "Welcome Home John, you are amazing.")

22- escapeHTML(str): Sanitizes passed string against some Cyber atacks like (XSS). Basicly it escapes HTML special characters (&, <, >, ", ') in a string with their corresponding HTML entities.


# # Contribution Note:

Kindly suggest any improvements you can put in this repo, thanks in advance...!

