Plan:-
A fully independent system, ie to add product create a new page fill all the fields directly from UI no forms and all like others, 

Updates:-

Header:- add table option too for  preview, on chage of preview update the width of the main preview window according to the screen width

Alignment:- Logo with slogan text, in the middle the page selector, in the right save, preview, mobile, tablet, desktop view, undo, redo options, with clean bg white theme, see shopify

Preview section:- ratio the preview should be zoomable scrollable and only the website preview inside this section, should also have active item selection like current one, beside this i wnat nothing

in the left section, i want kind of hearicy view for all components, the compoennt shouold be categorized by item should be reperated, 

each components will have the options like add remove, 








Major Update:-

EG:- a carasoul with image as item to slide view, and it takes items like img text as child for viewing like that.

Insted of adding unwanted componenets into the editor fill it with only things for ecommerce see top , like 

Carasoul - show in slide view, anything text image or else, feature should expose settings that will make the components work dynamically like show arrow, like show dots, dot type, 

Image Banner - SHow the image in the given height and width,

horizontal product view - autoscroll? scroll-control?, max items, scroll-item-a-time

verticle card view - max items, pagination, pagination type[autoload, page], 


Good to be:-
Now i already have tons of compoents, but adding all compoennts is a nmess, insted you will continusouldy add new components which uses the existing comeponts to do a task, eg if a new compoents needs a button, it won't use <button> insted use a Button from given compeonnts, doing this the system is scalable because everything is in a closed env, every ccompoents is predictivable, 

After time you will create a collection of widgets like bootstrap, tw components, or radix-ui, 

fromthese the admin will import whats needed, beacuse letting admin edit each and everything is expensive for now too.


Scalable:-
each compoennt will accepts its own children once the compeont becomes fewer and heavier, so the comepont should also define what children are allowed with count?

like NavBar > Navitems > Navlinks [Input children], the compeont will define what the input is in this case its link, 
and link itself is a comepont which haves its own customization options, now this will 